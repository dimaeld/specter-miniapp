#!/usr/bin/env python3
import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
from datetime import datetime

DB_FILE = 'db.json'
HOST = '0.0.0.0'
PORT = 8787

DEFAULT_DB = {
    "applications": [],
    "accessCodes": [
        {"code": "BASIC2024", "tariffType": "BASIC EDUCATION", "active": True},
        {"code": "PREMIUM2024", "tariffType": "PREMIUM EDUCATION", "active": True},
        {"code": "MENTOR2024", "tariffType": "MENTORSHIP EDUCATION", "active": True}
    ],
    "users": []
}


def load_db():
    if not os.path.exists(DB_FILE):
        save_db(DEFAULT_DB)
    with open(DB_FILE, 'r', encoding='utf-8') as fh:
        return json.load(fh)


def save_db(data):
    with open(DB_FILE, 'w', encoding='utf-8') as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)


class SpecterHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        db = load_db()

        if path == '/applications':
            self._set_headers()
            self.wfile.write(json.dumps(db['applications']).encode('utf-8'))
            return

        if path == '/access-codes':
            self._set_headers()
            self.wfile.write(json.dumps(db['accessCodes']).encode('utf-8'))
            return

        if path == '/progress':
            params = parse_qs(parsed.query)
            user_id = params.get('userId', [None])[0]
            self._set_headers()
            if not user_id:
                self.wfile.write(json.dumps({}).encode('utf-8'))
                return
            user = next((u for u in db['users'] if u['userId'] == user_id), None)
            self.wfile.write(json.dumps(user or {}).encode('utf-8'))
            return

        self._set_headers(404)
        self.wfile.write(json.dumps({'error': 'Not found'}).encode('utf-8'))

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length) if content_length else b'{}'
        try:
            payload = json.loads(body.decode('utf-8') or '{}')
        except json.JSONDecodeError:
            payload = {}

        db = load_db()

        if path == '/applications':
            record = dict(payload)
            record['id'] = record.get('id') or f"app-{int(datetime.utcnow().timestamp())}"
            record['createdAt'] = datetime.utcnow().isoformat() + 'Z'
            db['applications'].append(record)
            save_db(db)
            self._set_headers(201)
            self.wfile.write(json.dumps(record).encode('utf-8'))
            return

        if path == '/access-codes/verify':
            code = (payload.get('code') or '').strip()
            match = next((c for c in db['accessCodes'] if c['code'] == code and c.get('active')), None)
            self._set_headers()
            if match:
                self.wfile.write(json.dumps({'valid': True, 'tariffType': match['tariffType']}).encode('utf-8'))
            else:
                self.wfile.write(json.dumps({'valid': False, 'message': 'Код не знайдено або деактивовано.'}).encode('utf-8'))
            return

        if path == '/progress':
            user_id = payload.get('userId')
            if not user_id:
                self._set_headers(400)
                self.wfile.write(json.dumps({'error': 'userId required'}).encode('utf-8'))
                return
            user_entry = next((u for u in db['users'] if u['userId'] == user_id), None)
            if user_entry:
                user_entry.update(payload)
            else:
                payload['userId'] = user_id
                db['users'].append(payload)
            save_db(db)
            self._set_headers(201)
            self.wfile.write(json.dumps({'status': 'stored'}).encode('utf-8'))
            return

        self._set_headers(404)
        self.wfile.write(json.dumps({'error': 'Not found'}).encode('utf-8'))


def run():
    print(f"SPECTER local API listening on http://{HOST}:{PORT}")
    server = HTTPServer((HOST, PORT), SpecterHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == '__main__':
    run()
