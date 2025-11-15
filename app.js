const tg = window.Telegram?.WebApp || null;
const storageKey = 'specter-inc-webapp-state-v1';
const supportLink = 'https://t.me/specter_support';
const defaultUsername = 'гість';
const API_BASE = window.SPECTER_API_BASE || null;
let backendAvailable = Boolean(API_BASE);

const aboutContent = {
  left:
    'Ми прийшли в трейдинг не заради престижу чи заголовків. Ми прийшли через досвід — реальний, складний, формуючий. Ми бачили, як бажання “заробити швидко” руйнує дисципліну. Ми бачили, як емоції перетворюють ринок на хаос. Тут і сформувалась наша філософія: Емоції створюють хаос. Дисципліна створює результат.',
  right:
    'Наша академія створена для тих, хто втомився від шуму й порожніх обіцянок. Для тих, хто розуміє: ринок не винагороджує збудження — він винагороджує ясність. Не імпульсивна дія, а структура. Не надія, а точне виконання. Ми розробили власний підхід до аналізу ринку. Він базується на логіці, послідовності та читанні поведінки ціни. Ми не даємо сигнали. Ми формуємо мислення трейдера. Ми — місце, де трейдер знаходить спокій, контроль та впевненість. Де дисципліна стає перевагою. А ясність — силою.'
};

const tradingCards = [
  {
    title: 'Трейдинг',
    text: 'Кожен трейдер починає з однакової бази, але справжній трейдинг починається, коли ви адаптуєте її під себе.'
  },
  {
    title: 'Емоційний контроль',
    text: 'Емоції — головний фактор, який віддаляє вас від успіху.'
  },
  {
    title: 'Дисципліна та ризик-менеджмент',
    text: 'Це фундамент, з якого починається розвиток трейдера.'
  },
  {
    title: 'Успіх',
    text: 'Успіх — це не вдача. Це важка праця, дисципліна і емоційний контроль.'
  }
];

const timelineData = [
  { year: '2020', detail: 'Засновано SPECTERTRADER та GRAMMTRADER' },
  { year: '2021', detail: 'Новий офіс у Києві' },
  {
    year: '2022',
    detail: 'Нова адаптивна стратегія з унікальними підходами'
  }
];

const mentors = [
  {
    name: 'SPECTERTRADER',
    bullets: ['Risk management', 'Market discipline', 'Unemotional trading', '27 успішних кейсів', '50+ виплат']
  },
  {
    name: 'GRAMMTRADER',
    bullets: ['Ринок через поведінку ціни', 'Фреймворк структур', 'Психологія виконання', '18 командних запусків', '70% учнів з реальним прогресом']
  }
];

const faqItems = [
  {
    q: 'Скільки часу я матиму доступ до матеріалів?',
    a: 'Доступ дійсний протягом усього навчання та оновлень у межах вибраного тарифу.'
  },
  {
    q: 'У якому форматі проходить оплата?',
    a: 'Оплата здійснюється у доларах США. Після заявки ментор надішле актуальний курс для вашого регіону.'
  },
  {
    q: 'Що робити, якщо пропустив онлайн-сесію?',
    a: 'Усі сесії зберігаються в архіві академії. Ви отримуєте доступ до записів одразу після входу.'
  },
  {
    q: 'Чи потрібен депозит для старту?',
    a: 'Ми фокусуємося на мисленні й структурі. Стартовий депозит не обов’язковий — головне дисципліна.'
  }
];

const baseModules = [
  {
    id: 'module-1',
    title: 'Про академію',
    description: 'Хто ми, чому існуємо та як мислимо.',
    lessons: [
      {
        id: 'm1-l1',
        title: 'Філософія дисципліни',
        summary: 'Ядро підходу SPECTER INC.',
        videoUrl: 'https://www.youtube.com/embed/2Xc9gXyf2G4',
        content: 'Ми розбираємо фундаментальні принципи академії й те, чому дисципліна важливіша за емоції.',
        notes: 'Випишіть 3 власні тригери хаосу.',
        materials: '',
        enabled: true
      },
      {
        id: 'm1-l2',
        title: 'Стандарти команди',
        summary: 'Що ми вимагаємо від себе та учнів.',
        videoUrl: 'https://www.youtube.com/embed/oHg5SJYRHA0',
        content: 'Процеси, чек-листи та механіки контролю якості.',
        notes: 'Сформуйте особистий чек-лист початку дня.',
        materials: '',
        enabled: true
      },
      {
        id: 'm1-l3',
        title: 'Візія розвитку',
        summary: 'Куди ми рухаємось у 2024-2025.',
        videoUrl: 'https://www.youtube.com/embed/UN8oLGBNXpE',
        content: 'Огляд напрямів розвитку академії та оновлень платформи.',
        notes: 'Зафіксуйте 2-3 мети для себе.',
        materials: '',
        enabled: true
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Що таке трейдинг',
    description: 'Філософія ринку без романтики.',
    lessons: [
      {
        id: 'm2-l1',
        title: 'Базова структура ринку',
        summary: 'Сесії, контексти, цикли.',
        videoUrl: 'https://www.youtube.com/embed/JGwWNGJdvx8',
        content: 'Як ми читаємо ринок та на що дивимось щодня.',
        notes: 'Позначте інструменти свого аналізу.',
        materials: '',
        enabled: true
      },
      {
        id: 'm2-l2',
        title: 'Міфи й очікування',
        summary: 'Розвінчання хибних уявлень.',
        videoUrl: 'https://www.youtube.com/embed/VYOjWnS4cMY',
        content: 'Чому ринок не місце для азарту.',
        notes: 'Опишіть свої очікування від ринку.',
        materials: '',
        enabled: true
      },
      {
        id: 'm2-l3',
        title: 'Формула адаптації',
        summary: 'Як підлаштовувати систему під себе.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        content: 'Алгоритм адаптації знань під власну реальність.',
        notes: 'Опишіть 1 поведінкову звичку, яку зміните.',
        materials: '',
        enabled: true
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Структура трейдингу',
    description: 'Кроки прийняття рішень та послідовність.',
    lessons: [
      {
        id: 'm3-l1',
        title: 'Картографія подій',
        summary: 'Як бачити ринок як систему.',
        videoUrl: 'https://www.youtube.com/embed/oavMtUWDBTM',
        content: 'Будуємо карту сигналів та реакцій.',
        notes: 'Накресліть свою схему ухвалення рішень.',
        materials: '',
        enabled: true
      },
      {
        id: 'm3-l2',
        title: 'Чек-лист трейдера',
        summary: 'Щоденні процедури.',
        videoUrl: 'https://www.youtube.com/embed/L_jWHffIx5E',
        content: 'Що перевіряти до входу в позицію.',
        notes: 'Зробіть власний трекер виконання.',
        materials: '',
        enabled: true
      },
      {
        id: 'm3-l3',
        title: 'Темп та таймінг',
        summary: 'Як не поспішати та не запізнюватися.',
        videoUrl: 'https://www.youtube.com/embed/y6120QOlsfU',
        content: 'Пояснюємо таймінг ринку та власний.',
        notes: 'Відмітьте, коли ви робите найкращі угоди.',
        materials: '',
        enabled: true
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Стратегія',
    description: 'Алгоритми, сценарії та гнучкість.',
    lessons: [
      {
        id: 'm4-l1',
        title: 'Базовий сценарій',
        summary: 'Що робимо найчастіше.',
        videoUrl: 'https://www.youtube.com/embed/rYEDA3JcQqw',
        content: 'Розбір головного сценарію нашої стратегії.',
        notes: 'Сформуйте таблицю сценаріїв.',
        materials: '',
        enabled: true
      },
      {
        id: 'm4-l2',
        title: 'Адаптивність',
        summary: 'Перемикання між режимами.',
        videoUrl: 'https://www.youtube.com/embed/uelHwf8o7_U',
        content: 'Коли і як змінювати поведінку.',
        notes: 'Запишіть свій алгоритм адаптації.',
        materials: '',
        enabled: true
      },
      {
        id: 'm4-l3',
        title: 'Фільтри якості',
        summary: 'Обмеження, які рятують капітал.',
        videoUrl: 'https://www.youtube.com/embed/lo-S5v2Iesk',
        content: 'Вміння не торгувати — також стратегія.',
        notes: 'Позначте фільтри, які застосуєте.',
        materials: '',
        enabled: true
      }
    ]
  },
  {
    id: 'module-5',
    title: 'Бектестінг',
    description: 'Докази перед запуском.',
    lessons: [
      {
        id: 'm5-l1',
        title: 'Архітектура тесту',
        summary: 'Як збираємо дані.',
        videoUrl: 'https://www.youtube.com/embed/kXYiU_JCYtU',
        content: 'Побудова тестових середовищ.',
        notes: 'Створіть таблицю для тесту.',
        materials: '',
        enabled: true
      },
      {
        id: 'm5-l2',
        title: 'Висновки та ітерації',
        summary: 'Як обробляти результати.',
        videoUrl: 'https://www.youtube.com/embed/bESGLojNYSo',
        content: 'Головні метрики й рішення.',
        notes: 'Пропишіть свої метрики контролю.',
        materials: '',
        enabled: true
      },
      {
        id: 'm5-l3',
        title: 'Перехід у live',
        summary: 'Фінальний чек-поінт.',
        videoUrl: 'https://www.youtube.com/embed/hTWKbfoikeg',
        content: 'Як не зруйнувати те, що протестували.',
        notes: 'Створіть нагадування перед запуском.',
        materials: '',
        enabled: true
      }
    ]
  },
  {
    id: 'module-6',
    title: 'Live trading',
    description: 'Дія тут і зараз.',
    lessons: [
      {
        id: 'm6-l1',
        title: 'Операційний день',
        summary: 'Підготовка і де-бриф.',
        videoUrl: 'https://www.youtube.com/embed/fJ9rUzIMcZQ',
        content: 'Як ми структуруємо торговий день.',
        notes: 'Опишіть свій ранковий процес.',
        materials: '',
        enabled: true
      },
      {
        id: 'm6-l2',
        title: 'Управління позицією',
        summary: 'Що робимо після входу.',
        videoUrl: 'https://www.youtube.com/embed/QH2-TGUlwu4',
        content: 'Механіки супроводу угоди.',
        notes: 'Складіть сценарій супроводу.',
        materials: '',
        enabled: true
      },
      {
        id: 'm6-l3',
        title: 'Аналіз результатів',
        summary: 'Щоденні підсумки.',
        videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
        content: 'Що робимо з даними після торгового дня.',
        notes: 'Фіксуйте 3 ключові метрики.',
        materials: '',
        enabled: true
      }
    ]
  },
  {
    id: 'module-7',
    title: 'Психологія трейдингу',
    description: 'Емоції під контролем.',
    lessons: [
      {
        id: 'm7-l1',
        title: 'Антихаос',
        summary: 'Як вирівнювати стан.',
        videoUrl: 'https://www.youtube.com/embed/ktvTqknDobU',
        content: 'Ритуали заспокоєння розуму.',
        notes: 'Створіть антихаос-процедуру.',
        materials: '',
        enabled: true
      },
      {
        id: 'm7-l2',
        title: 'Самодисципліна',
        summary: 'Щоденний контроль.',
        videoUrl: 'https://www.youtube.com/embed/xwtdhWltSIg',
        content: 'Вправи з самоконтролю.',
        notes: 'Поставте нагадування для мікро-дій.',
        materials: '',
        enabled: true
      },
      {
        id: 'm7-l3',
        title: 'Фокус і паузи',
        summary: 'Як не вигоріти.',
        videoUrl: 'https://www.youtube.com/embed/8UVNT4wvIGY',
        content: 'Планування відпочинку та уваги.',
        notes: 'Пропишіть графік відновлення.',
        materials: '',
        enabled: true
      }
    ]
  },
  {
    id: 'module-8',
    title: 'Наші ментори',
    description: 'Принципи SPECTERTRADER та GRAMMTRADER.',
    lessons: [
      {
        id: 'm8-l1',
        title: 'Методика SPECTERTRADER',
        summary: 'Системність і ризик.',
        videoUrl: 'https://www.youtube.com/embed/uelHwf8o7_U',
        content: 'Особисті ритуали та підходи ментора.',
        notes: 'Зафіксуйте, що адаптуєте.',
        materials: '',
        enabled: true
      },
      {
        id: 'm8-l2',
        title: 'Методика GRAMMTRADER',
        summary: 'Поведінка ціни в деталях.',
        videoUrl: 'https://www.youtube.com/embed/OPf0YbXqDm0',
        content: 'Фреймворки читання ринку.',
        notes: 'Спробуйте описати ринок словами ментора.',
        materials: '',
        enabled: true
      },
      {
        id: 'm8-l3',
        title: 'Синергія',
        summary: 'Як працює команда.',
        videoUrl: 'https://www.youtube.com/embed/rYEDA3JcQqw',
        content: 'Внутрішні процеси та взаємодія.',
        notes: 'Виділіть для себе 1-2 практики команди.',
        materials: '',
        enabled: true
      }
    ]
  },
  {
    id: 'module-9',
    title: 'Тарифи',
    description: 'Як обрати програму та масштаб.',
    lessons: [
      {
        id: 'm9-l1',
        title: 'Basic vs Premium',
        summary: 'Що включає кожен пакет.',
        videoUrl: 'https://www.youtube.com/embed/60ItHLz5WEA',
        content: 'Детальне порівняння тарифів.',
        notes: 'Визначте свій рівень старту.',
        materials: '',
        enabled: true
      },
      {
        id: 'm9-l2',
        title: 'Mentorship',
        summary: 'Як виглядає індивідуальний супровід.',
        videoUrl: 'https://www.youtube.com/embed/fLexgOxsZu0',
        content: 'Структура ментората й очікування.',
        notes: 'Складіть перелік своїх цілей.',
        materials: '',
        enabled: true
      },
      {
        id: 'm9-l3',
        title: 'Фінальні кроки',
        summary: 'Заявка, оплата, доступ.',
        videoUrl: 'https://www.youtube.com/embed/_Yhyp-_hX2s',
        content: 'Що відбувається після заявки.',
        notes: 'Перевірте готовність до навчання.',
        materials: '',
        enabled: true
      }
    ]
  }
];

const baseTariffs = [
  {
    id: 'tariff-1',
    name: 'BASIC EDUCATION',
    price: 'USD 289.00',
    description: 'Базова освіта для тих, хто хоче структуру й фундамент.',
    badge: 'Рекомендовано стартувати',
    hidden: false
  },
  {
    id: 'tariff-2',
    name: 'PREMIUM EDUCATION',
    price: 'USD 499.00',
    description: 'Поглиблена програма з додатковими розборами.',
    badge: 'Популярно серед менті',
    hidden: false
  },
  {
    id: 'tariff-3',
    name: 'MENTORSHIP EDUCATION',
    price: 'INDIVIDUAL PRICE',
    description: 'Індивідуальний супровід, гнучка програма.',
    badge: 'Особистий ментор',
    hidden: false
  }
];

const defaultState = {
  hasAccess: false,
  tariffType: null,
  accessCodeUsed: null,
  completedLessons: {},
  modules: baseModules,
  tariffs: baseTariffs,
  applications: [],
  accessCodes: [
    { code: 'BASIC2024', tariffType: 'BASIC EDUCATION', active: true },
    { code: 'PREMIUM2024', tariffType: 'PREMIUM EDUCATION', active: true },
    { code: 'MENTOR2024', tariffType: 'MENTORSHIP EDUCATION', active: true }
  ],
  users: []
};

let appState = loadState();
let currentView = 'home';
let isAdmin = false;
let lessonSelection = null;
let tapCount = 0;
let tapTimeout = null;
let currentTariffSelection = appState.tariffs.find((t) => !t.hidden)?.name || 'BASIC EDUCATION';
const userId = tg?.initDataUnsafe?.user?.id || `guest-${Date.now()}`;
const usernameLabel = tg?.initDataUnsafe?.user?.username
  ? `@${tg.initDataUnsafe.user.username}`
  : defaultUsername;

const viewIds = {
  home: 'home-view',
  application: 'application-view',
  learning: 'learning-view',
  lesson: 'lesson-view',
  profile: 'profile-view',
  support: 'support-view',
  admin: 'admin-view'
};

function init() {
  setupTelegramUI();
  cacheStaticContent();
  attachEventListeners();
  renderStaticSections();
  renderAll();
  bootstrapBackendData();
}

document.addEventListener('DOMContentLoaded', init);

function setupTelegramUI() {
  if (!tg) return;
  tg.ready();
  tg.expand();
  applyTelegramTheme();
  tg.onEvent('themeChanged', applyTelegramTheme);
  tg.onEvent('viewportChanged', () => document.body.classList.toggle('viewport-changed', true));
  if (tg.BackButton) {
    tg.BackButton.onClick(() => navigate('home'));
  }
  if (tg.MainButton) {
    tg.MainButton.setText('Подати заявку');
    tg.MainButton.show();
    tg.onEvent('mainButtonClicked', () => openApplication());
  }
}

function applyTelegramTheme() {
  if (!tg) return;
  const params = tg.themeParams || {};
  const map = {
    '--bg-primary': params.bg_color,
    '--bg-secondary': params.secondary_bg_color,
    '--bg-contrast': params.section_bg_color,
    '--text-color': params.text_color,
    '--cta': params.button_color,
    '--cta-text': params.button_text_color
  };
  Object.entries(map).forEach(([key, val]) => {
    if (!val) return;
    document.documentElement.style.setProperty(key, normalizeColor(val));
  });
}

function normalizeColor(value) {
  if (!value) return '';
  return value.startsWith('#') ? value : `#${value}`;
}

function cacheStaticContent() {
  document.getElementById('about-left').textContent = aboutContent.left;
  document.getElementById('about-right').textContent = aboutContent.right;
}

function attachEventListeners() {
  document.querySelectorAll('[data-nav]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(btn.dataset.nav));
  });

  document.querySelectorAll('[data-action="scroll"]').forEach((btn) => {
    btn.addEventListener('click', () => scrollToSection(btn.dataset.target));
  });

  document.getElementById('floatingCta').addEventListener('click', () => openApplication());
  document.getElementById('applicationForm').addEventListener('submit', handleApplicationSubmit);
  document.getElementById('accessForm').addEventListener('submit', handleAccessSubmit);
  document.getElementById('supportBtn').addEventListener('click', openSupportChat);
  document.getElementById('lessonBack').addEventListener('click', () => navigate('learning'));
  document.getElementById('logoTrigger').addEventListener('click', handleAdminTrigger);
  document.getElementById('closeAdminModal').addEventListener('click', hideAdminModal);
  document.getElementById('adminLoginForm').addEventListener('submit', handleAdminLogin);
  document.getElementById('logoutAdmin').addEventListener('click', () => {
    isAdmin = false;
    navigate('home');
    showToast('Вихід з адмінки');
  });
  document.getElementById('addModule').addEventListener('click', addModule);
  document.getElementById('addTariff').addEventListener('click', addTariff);
  document.getElementById('codeForm').addEventListener('submit', handleNewCode);

  document.getElementById('adminModules').addEventListener('input', handleAdminModulesInput);
  document.getElementById('adminModules').addEventListener('click', handleAdminModulesClick);
  document.getElementById('adminTariffs').addEventListener('input', handleAdminTariffsInput);
  document.getElementById('adminTariffs').addEventListener('click', handleAdminTariffsClick);
  document.getElementById('adminApplications').addEventListener('change', handleApplicationStatusChange);
  document.getElementById('adminCodes').addEventListener('click', handleCodeActions);
  document.getElementById('faq').addEventListener('click', handleFaqToggle);
  const faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.addEventListener('keydown', handleFaqKeydown);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.section, .hero').forEach((section) => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  window.addEventListener('scroll', handleParallax);
}

function renderStaticSections() {
  const cardGrid = document.getElementById('tradingCardGrid');
  cardGrid.innerHTML = '';
  tradingCards.forEach((card) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>${card.title}</h3><p>${card.text}</p>`;
    cardGrid.appendChild(div);
  });

  const timeline = document.getElementById('timelineTrack');
  timeline.innerHTML = '';
  timelineData.forEach((item) => {
    const block = document.createElement('div');
    block.className = 'timeline-item';
    block.innerHTML = `<h3>${item.year}</h3><p>${item.detail}</p>`;
    timeline.appendChild(block);
  });

  const mentorsWrap = document.getElementById('mentorGrid');
  mentorsWrap.innerHTML = '';
  mentors.forEach((mentor) => {
    const card = document.createElement('div');
    card.className = 'mentor-card';
    const list = mentor.bullets.map((item) => `<li>${item}</li>`).join('');
    card.innerHTML = `<h3>${mentor.name}</h3><ul>${list}</ul>`;
    mentorsWrap.appendChild(card);
  });
}

function renderFaq() {
  const container = document.getElementById('faqList');
  if (!container) return;
  container.innerHTML = '';
  faqItems.forEach((item, index) => {
    const block = document.createElement('div');
    block.className = 'faq-item';
    block.dataset.index = String(index);
    block.setAttribute('role', 'button');
    block.setAttribute('aria-expanded', 'false');
    block.tabIndex = 0;
    block.innerHTML = `
      <div class=\"faq-question\">
        <span>${item.q}</span>
        <span>↘</span>
      </div>
      <div class=\"faq-answer\"><p>${item.a}</p></div>
    `;
    container.appendChild(block);
  });
}

function handleFaqToggle(event) {
  const target = event.target.closest('.faq-item');
  if (!target) return;
  toggleFaqItem(target);
}

function handleFaqKeydown(event) {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.classList.contains('faq-item')) {
    event.preventDefault();
    toggleFaqItem(event.target);
  }
}

function toggleFaqItem(element) {
  const isActive = element.classList.toggle('active');
  element.setAttribute('aria-expanded', String(isActive));
}

function renderAll() {
  renderPricing();
  renderModulePreview();
  renderLearningModules();
  updateOverallProgress();
  updateProfileView();
  renderAdminPanel();
  updateApplicationPrefill();
  updateBackButton();
  renderFaq();
}

function renderPricing() {
  const grid = document.getElementById('pricingGrid');
  grid.innerHTML = '';
  appState.tariffs
    .filter((tariff) => !tariff.hidden)
    .forEach((tariff) => {
      const card = document.createElement('div');
      card.className = 'pricing-card';
      card.innerHTML = `
        <p class="eyebrow">${tariff.badge || 'Тариф'}</p>
        <h3>${tariff.name}</h3>
        <p>${tariff.description}</p>
        <p class="price-tag">${tariff.price}</p>
        <button class="primary-btn" data-tariff="${tariff.name}">Подати заявку</button>
      `;
      card.querySelector('button').addEventListener('click', () => openApplication(tariff.name));
      grid.appendChild(card);
    });
}

function renderModulePreview() {
  const wrap = document.getElementById('modulePreview');
  wrap.innerHTML = '';
  appState.modules.forEach((module, index) => {
    const card = document.createElement('div');
    const moduleNumber = String(index + 1).padStart(2, '0');
    card.className = 'module-card module-card--preview';
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Модуль ${moduleNumber}: ${module.title}`);
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="module-label">Модуль ${moduleNumber}</div>
      <div class="module-meta">
        <h3>${module.title}</h3>
        <p>${module.description}</p>
      </div>
      <div class="module-arrow">↗</div>
    `;
    const triggerApplication = () => openApplication();
    card.addEventListener('click', triggerApplication);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        triggerApplication();
      }
    });
    wrap.appendChild(card);
  });
}

function renderLearningModules() {
  const wrap = document.getElementById('learningModules');
  wrap.innerHTML = '';
  appState.modules.forEach((module) => {
    const card = document.createElement('div');
    card.className = 'module-card';
    const { completed, total } = getModuleProgress(module);
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    const header = document.createElement('div');
    header.innerHTML = `<h3>${module.title}</h3><p>${module.description}</p>`;
    card.appendChild(header);
    const status = document.createElement('div');
    status.className = 'status-pill';
    status.textContent = `${percentage}% виконано`;
    card.appendChild(status);

    if (!appState.hasAccess) {
      const locked = document.createElement('div');
      locked.className = 'locked-message';
      locked.innerHTML = '<p>Доступ до цього модуля відкривається після активації коду.</p>';
      const btn = document.createElement('button');
      btn.className = 'primary-btn';
      btn.textContent = 'Подати заявку';
      btn.addEventListener('click', () => openApplication());
      locked.appendChild(btn);
      card.appendChild(locked);
    } else {
      const list = document.createElement('div');
      list.className = 'lesson-list';
      module.lessons
        .filter((lesson) => lesson.enabled)
        .forEach((lesson) => {
          const item = document.createElement('div');
          item.className = 'lesson-item';
          const lessonStatus = getLessonStatus(lesson.id);
          item.innerHTML = `
            <div>
              <strong>${lesson.title}</strong>
              <p>${lesson.summary}</p>
            </div>
            <span class="status-pill">${lessonStatus}</span>
          `;
          const openBtn = document.createElement('button');
          openBtn.textContent = 'Відкрити';
          openBtn.addEventListener('click', () => openLesson(module.id, lesson.id));
          item.appendChild(openBtn);
          list.appendChild(item);
        });
      card.appendChild(list);
    }
    wrap.appendChild(card);
  });
  document.getElementById('learningLocked').classList.toggle('hidden', appState.hasAccess);
}

function updateProfileView() {
  const profileInfo = document.getElementById('profileInfo');
  const hasAccessText = appState.hasAccess ? 'Так' : 'Ні';
  const overall = getOverallProgress();
  profileInfo.innerHTML = `
    <p><strong>Ваш Telegram:</strong> ${usernameLabel}</p>
    <p><strong>Доступ до курсу:</strong> ${hasAccessText}</p>
    <p><strong>Тариф:</strong> ${appState.tariffType || 'не вибрано'}</p>
    <p><strong>Прогрес:</strong> ${overall}%</p>
  `;
}

function updateOverallProgress() {
  const badge = document.getElementById('overallProgress');
  const progress = getOverallProgress();
  badge.textContent = `${progress}% прогресу`;
}

function getModuleProgress(module) {
  const lessons = module.lessons.filter((lesson) => lesson.enabled);
  const total = lessons.length;
  const completed = lessons.filter((lesson) => appState.completedLessons[lesson.id]).length;
  return { completed, total };
}

function getOverallProgress() {
  const allLessons = appState.modules.flatMap((module) => module.lessons.filter((lesson) => lesson.enabled));
  if (!allLessons.length) return 0;
  const completed = allLessons.filter((lesson) => appState.completedLessons[lesson.id]).length;
  return Math.round((completed / allLessons.length) * 100);
}

function getLessonStatus(lessonId) {
  return appState.completedLessons[lessonId] ? 'Пройдено' : 'Не розпочато';
}

function navigate(view) {
  if (view === 'admin' && !isAdmin) {
    showAdminModal();
    return;
  }
  currentView = view;
  Object.entries(viewIds).forEach(([name, id]) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.classList.toggle('active', name === view);
  });
  if (view === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  updateBackButton();
}

function openApplication(tariffName = currentTariffSelection) {
  currentTariffSelection = tariffName || currentTariffSelection;
  document.getElementById('selectedTariff').value = currentTariffSelection;
  navigate('application');
}

function updateApplicationPrefill() {
  const usernameInput = document.getElementById('appUsername');
  usernameInput.value = usernameLabel.replace('@', '');
  document.getElementById('selectedTariff').value = currentTariffSelection;
}

async function handleApplicationSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const payload = {
    id: `app-${Date.now()}`,
    fullname: formData.get('fullname'),
    username: formData.get('username'),
    email: formData.get('email'),
    experience: formData.get('experience'),
    markets: Array.from(formData.getAll('markets')).join(', '),
    tariff: formData.get('tariff'),
    expectations: formData.get('expectations'),
    status: 'Новий',
    createdAt: new Date().toISOString(),
    userId
  };
  appState.applications.push(payload);
  persistState();
  await submitApplicationToBackend(payload);
  document.getElementById('applicationSuccess').classList.remove('hidden');
  form.reset();
  updateApplicationPrefill();
  showToast('Заявка надіслана');
  renderAdminPanel();
}

async function handleAccessSubmit(event) {
  event.preventDefault();
  const code = new FormData(event.target).get('accessCode').trim();
  const backendResult = await verifyCodeWithBackend(code);
  const match = backendResult?.valid
    ? { code, tariffType: backendResult.tariffType }
    : appState.accessCodes.find((item) => item.code === code && item.active);
  const messageBox = document.getElementById('accessMessage');
  messageBox.classList.remove('hidden');
  if (match) {
    appState.hasAccess = true;
    appState.tariffType = match.tariffType;
    appState.accessCodeUsed = code;
    registerUserAccess({ updateTimestamp: true });
    persistState();
    renderAll();
    messageBox.textContent = 'Доступ відкрито. Ласкаво просимо в академію.';
    showToast('Доступ активовано');
  } else {
    messageBox.textContent =
      backendResult?.message ||
      'Невірний код. Перевірте, будь ласка, або зверніться до ментора.';
  }
}

function registerUserAccess(options = {}) {
  const existing = appState.users.find((user) => user.id === userId);
  const progress = getOverallProgress();
  if (existing) {
    existing.tariffType = appState.tariffType || existing.tariffType;
    existing.progress = progress;
    if (options.updateTimestamp) {
      existing.activatedAt = new Date().toISOString();
    }
  } else {
    appState.users.push({
      id: userId,
      username: usernameLabel,
      tariffType: appState.tariffType,
      progress,
      activatedAt: new Date().toISOString()
    });
  }
  syncProgressToBackend();
}

function openLesson(moduleId, lessonId) {
  const module = appState.modules.find((m) => m.id === moduleId);
  if (!module) return;
  const lesson = module.lessons.find((l) => l.id === lessonId);
  if (!lesson) return;
  lessonSelection = { moduleId, lessonId };
  const container = document.getElementById('lessonContent');
  container.innerHTML = `
    <p class="eyebrow">${module.title}</p>
    <h2>${lesson.title}</h2>
    <p>${lesson.summary}</p>
    <div class="lesson-media">
      <iframe width="100%" height="315" src="${lesson.videoUrl}" title="${lesson.title}" frameborder="0" allowfullscreen></iframe>
    </div>
    <p>${lesson.content}</p>
    <div class="success">
      <p><strong>Завдання / нотатки:</strong> ${lesson.notes}</p>
      ${lesson.materials ? `<a href="${lesson.materials}" target="_blank">Матеріали</a>` : ''}
    </div>
    <button class="primary-btn" id="completeLesson">Позначити як пройдений</button>
  `;
  document.getElementById('completeLesson').addEventListener('click', () => {
    if (!lessonSelection) return;
    appState.completedLessons[lessonSelection.lessonId] = true;
    registerUserAccess();
    persistState();
    renderLearningModules();
    updateOverallProgress();
    updateProfileView();
    renderAdminUsers();
    showToast('Урок позначено як пройдений');
  });
  navigate('lesson');
}

function handleAdminTrigger() {
  tapCount += 1;
  if (tapTimeout) clearTimeout(tapTimeout);
  tapTimeout = setTimeout(() => {
    tapCount = 0;
  }, 1200);
  if (tapCount >= 5) {
    tapCount = 0;
    showAdminModal();
  }
}

function showAdminModal() {
  document.getElementById('adminModal').classList.remove('hidden');
}

function hideAdminModal() {
  document.getElementById('adminModal').classList.add('hidden');
}

function handleAdminLogin(event) {
  event.preventDefault();
  const code = new FormData(event.target).get('adminCode');
  if (code === 'ADMIN2024') {
    isAdmin = true;
    hideAdminModal();
    navigate('admin');
    renderAdminPanel();
    showToast('Вітаємо в адмінці');
  } else {
    showToast('Невірний код адміністратора');
  }
}

function renderAdminPanel() {
  if (!isAdmin) return;
  renderAdminModules();
  renderAdminTariffs();
  renderAdminApplications();
  renderAdminCodes();
  renderAdminUsers();
}

function renderAdminModules() {
  const wrap = document.getElementById('adminModules');
  wrap.innerHTML = '';
  appState.modules.forEach((module, index) => {
    const block = document.createElement('div');
    block.className = 'admin-list-item';
    block.innerHTML = `
      <label>Назва модуля<input data-module-id="${module.id}" data-field="title" value="${module.title}" /></label>
      <label>Опис<textarea rows="2" data-module-id="${module.id}" data-field="description">${module.description}</textarea></label>
      <div class="form-actions">
        <button data-action="move" data-direction="up" data-module-id="${module.id}" ${index === 0 ? 'disabled' : ''}>Вгору</button>
        <button data-action="move" data-direction="down" data-module-id="${module.id}" ${index === appState.modules.length - 1 ? 'disabled' : ''}>Вниз</button>
        <button data-action="add-lesson" data-module-id="${module.id}">Додати урок</button>
      </div>
    `;
    const lessonsWrap = document.createElement('div');
    lessonsWrap.innerHTML = '<p><strong>Уроки</strong></p>';
    module.lessons.forEach((lesson) => {
      const lessonBlock = document.createElement('div');
      lessonBlock.className = 'admin-list-item';
      lessonBlock.innerHTML = `
        <input data-module-id="${module.id}" data-lesson-id="${lesson.id}" data-field="title" value="${lesson.title}" />
        <textarea rows="2" data-module-id="${module.id}" data-lesson-id="${lesson.id}" data-field="summary">${lesson.summary}</textarea>
        <input data-module-id="${module.id}" data-lesson-id="${lesson.id}" data-field="videoUrl" value="${lesson.videoUrl}" />
        <textarea rows="2" data-module-id="${module.id}" data-lesson-id="${lesson.id}" data-field="content">${lesson.content}</textarea>
        <textarea rows="2" data-module-id="${module.id}" data-lesson-id="${lesson.id}" data-field="notes">${lesson.notes}</textarea>
        <label>
          <input type="checkbox" data-module-id="${module.id}" data-lesson-id="${lesson.id}" data-field="enabled" ${lesson.enabled ? 'checked' : ''} />
          Урок активний
        </label>
      `;
      lessonsWrap.appendChild(lessonBlock);
    });
    block.appendChild(lessonsWrap);
    wrap.appendChild(block);
  });
}

function renderAdminTariffs() {
  const wrap = document.getElementById('adminTariffs');
  wrap.innerHTML = '';
  appState.tariffs.forEach((tariff) => {
    const block = document.createElement('div');
    block.className = 'admin-list-item';
    block.innerHTML = `
      <input data-tariff-id="${tariff.id}" data-field="name" value="${tariff.name}" />
      <input data-tariff-id="${tariff.id}" data-field="price" value="${tariff.price}" />
      <textarea rows="2" data-tariff-id="${tariff.id}" data-field="description">${tariff.description}</textarea>
      <input data-tariff-id="${tariff.id}" data-field="badge" value="${tariff.badge || ''}" />
      <label>
        <input type="checkbox" data-tariff-id="${tariff.id}" data-field="hidden" ${tariff.hidden ? 'checked' : ''} /> Прихований
      </label>
      <button data-action="delete-tariff" data-tariff-id="${tariff.id}">Видалити</button>
    `;
    wrap.appendChild(block);
  });
}

function renderAdminApplications() {
  const wrap = document.getElementById('adminApplications');
  wrap.innerHTML = '';
  if (!appState.applications.length) {
    wrap.innerHTML = '<p>Заявок ще немає.</p>';
    return;
  }
  appState.applications.forEach((app) => {
    const block = document.createElement('div');
    block.className = 'admin-list-item';
    block.innerHTML = `
      <p><strong>${app.fullname}</strong> · @${app.username}</p>
      <p>Досвід: ${app.experience} · Ринки: ${app.markets || '—'}</p>
      <p>Тариф: ${app.tariff}</p>
      <p>Коментар: ${app.expectations || '—'}</p>
      <label>Статус
        <select data-application-id="${app.id}">
          <option ${app.status === 'Новий' ? 'selected' : ''}>Новий</option>
          <option ${app.status === 'Оплачено' ? 'selected' : ''}>Оплачено</option>
          <option ${app.status === 'Доступ надано' ? 'selected' : ''}>Доступ надано</option>
        </select>
      </label>
    `;
    wrap.appendChild(block);
  });
}

function renderAdminCodes() {
  const wrap = document.getElementById('adminCodes');
  wrap.innerHTML = '';
  appState.accessCodes.forEach((code) => {
    const block = document.createElement('div');
    block.className = 'admin-list-item';
    block.innerHTML = `
      <p><strong>${code.code}</strong> → ${code.tariffType}</p>
      <p>Активний: ${code.active ? 'так' : 'ні'}</p>
      <div class="form-actions">
        <button data-action="toggle-code" data-code="${code.code}">${code.active ? 'Деактивувати' : 'Активувати'}</button>
        <button data-action="delete-code" data-code="${code.code}">Видалити</button>
      </div>
    `;
    wrap.appendChild(block);
  });
}

function addModule() {
  const newModule = {
    id: `module-${Date.now()}`,
    title: 'Новий модуль',
    description: 'Опис модуля',
    lessons: [
      {
        id: `lesson-${Date.now()}`,
        title: 'Новий урок',
        summary: 'Короткий опис',
        videoUrl: '',
        content: '',
        notes: '',
        materials: '',
        enabled: true
      }
    ]
  };
  appState.modules.push(newModule);
  persistState();
  renderAll();
  showToast('Модуль додано');
}

function addTariff() {
  appState.tariffs.push({
    id: `tariff-${Date.now()}`,
    name: 'Новий тариф',
    price: 'USD 0.00',
    description: 'Опис тарифу',
    hidden: false
  });
  persistState();
  renderAll();
  showToast('Тариф додано');
}

function handleNewCode(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  appState.accessCodes.push({
    code: formData.get('code'),
    tariffType: formData.get('tariff'),
    active: true
  });
  persistState();
  renderAdminCodes();
  event.target.reset();
  showToast('Код створено');
}

function handleAdminModulesInput(event) {
  const moduleId = event.target.dataset.moduleId;
  const lessonId = event.target.dataset.lessonId;
  const field = event.target.dataset.field;
  if (!moduleId || !field) return;
  const module = appState.modules.find((item) => item.id === moduleId);
  if (!module) return;
  if (lessonId) {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    if (!lesson) return;
    if (field === 'enabled') {
      lesson.enabled = event.target.checked;
    } else {
      lesson[field] = event.target.value;
    }
  } else {
    module[field] = event.target.value;
  }
  persistState();
  renderModulePreview();
  renderLearningModules();
}

function handleAdminModulesClick(event) {
  const { action, moduleId, direction } = event.target.dataset;
  if (!action) return;
  if (action === 'move') {
    const index = appState.modules.findIndex((m) => m.id === moduleId);
    if (index < 0) return;
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= appState.modules.length) return;
    [appState.modules[index], appState.modules[swapIndex]] = [appState.modules[swapIndex], appState.modules[index]];
    persistState();
    renderAll();
  }
  if (action === 'add-lesson') {
    const module = appState.modules.find((m) => m.id === moduleId);
    if (!module) return;
    module.lessons.push({
      id: `lesson-${Date.now()}`,
      title: 'Новий урок',
      summary: 'Короткий опис',
      videoUrl: '',
      content: '',
      notes: '',
      materials: '',
      enabled: true
    });
    persistState();
    renderAll();
  }
}

function handleAdminTariffsInput(event) {
  const tariffId = event.target.dataset.tariffId;
  const field = event.target.dataset.field;
  if (!tariffId || !field) return;
  const tariff = appState.tariffs.find((item) => item.id === tariffId);
  if (!tariff) return;
  if (field === 'hidden') {
    tariff.hidden = event.target.checked;
  } else {
    tariff[field] = event.target.value;
  }
  persistState();
  renderPricing();
}

function handleAdminTariffsClick(event) {
  const { action, tariffId } = event.target.dataset;
  if (action === 'delete-tariff') {
    appState.tariffs = appState.tariffs.filter((tariff) => tariff.id !== tariffId);
    persistState();
    renderAll();
  }
}

function handleApplicationStatusChange(event) {
  const applicationId = event.target.dataset.applicationId;
  if (!applicationId) return;
  const application = appState.applications.find((app) => app.id === applicationId);
  if (!application) return;
  application.status = event.target.value;
  persistState();
  showToast('Статус заявки оновлено');
}

function handleCodeActions(event) {
  const action = event.target.dataset.action;
  if (!action) return;
  const codeId = event.target.dataset.code;
  const code = appState.accessCodes.find((item) => item.code === codeId);
  if (!code) return;
  if (action === 'toggle-code') {
    code.active = !code.active;
  }
  if (action === 'delete-code') {
    appState.accessCodes = appState.accessCodes.filter((item) => item.code !== codeId);
  }
  persistState();
  renderAdminCodes();
}

function scrollToSection(targetId) {
  if (!targetId) return;
  if (currentView !== 'home') {
    navigate('home');
    setTimeout(() => scrollTo(targetId), 400);
  } else {
    scrollTo(targetId);
  }
}

function scrollTo(targetId) {
  const element = document.getElementById(targetId);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openSupportChat() {
  if (tg) {
    tg.openTelegramLink(supportLink);
  } else {
    window.open(supportLink, '_blank');
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

async function bootstrapBackendData() {
  if (!API_BASE) return;
  const [codes, progress] = await Promise.all([
    fetchAccessCodesFromBackend(),
    fetchUserProgressFromBackend()
  ]);
  if (Array.isArray(codes) && codes.length) {
    appState.accessCodes = codes;
  }
  if (progress && progress.tariffType) {
    appState.hasAccess = Boolean(progress.accessGranted);
    appState.tariffType = progress.tariffType;
    appState.completedLessons = progress.completedLessons || appState.completedLessons;
    if (progress.accessCodeUsed) {
      appState.accessCodeUsed = progress.accessCodeUsed;
    }
    const existing = appState.users.find((user) => user.id === progress.userId);
    const userPayload = {
      id: progress.userId,
      username: progress.username || usernameLabel,
      tariffType: progress.tariffType,
      progress: progress.progress || getOverallProgress(),
      activatedAt: progress.activatedAt || new Date().toISOString()
    };
    if (existing) {
      Object.assign(existing, userPayload);
    } else {
      appState.users.push(userPayload);
    }
  }
  persistState();
  renderAll();
}

async function fetchAccessCodesFromBackend() {
  const response = await apiRequest('/access-codes');
  return Array.isArray(response) ? response : null;
}

async function fetchUserProgressFromBackend() {
  const response = await apiRequest(`/progress?userId=${encodeURIComponent(userId)}`);
  return response;
}

async function submitApplicationToBackend(payload) {
  const result = await apiRequest('/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (result && result.id) {
    showToast('Заявку збережено локальним сервером');
  }
}

async function verifyCodeWithBackend(code) {
  if (!API_BASE) return null;
  return apiRequest('/access-codes/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
}

async function syncProgressToBackend() {
  if (!API_BASE || !appState.tariffType) return;
  await apiRequest('/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      username: usernameLabel,
      tariffType: appState.tariffType,
      accessGranted: appState.hasAccess,
      accessCodeUsed: appState.accessCodeUsed,
      completedLessons: appState.completedLessons,
      progress: getOverallProgress()
    })
  });
}

async function apiRequest(path, options = {}) {
  if (!backendAvailable || !API_BASE) return null;
  try {
    const response = await fetch(`${API_BASE}${path}`, options);
    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }
    if (response.status === 204) return null;
    return await response.json();
  } catch (error) {
    console.warn('API request failed', error);
    backendAvailable = false;
    return null;
  }
}

function persistState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(appState));
  } catch (error) {
    console.warn('Cannot persist state', error);
  }
  if (tg?.CloudStorage) {
    tg.CloudStorage.setItem(storageKey, JSON.stringify(appState), () => {});
  }
}

function loadState() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...deepClone(defaultState),
        ...parsed,
        modules: parsed.modules || deepClone(defaultState.modules),
        tariffs: parsed.tariffs || deepClone(defaultState.tariffs),
        applications: parsed.applications || [],
        accessCodes: parsed.accessCodes || deepClone(defaultState.accessCodes),
        completedLessons: parsed.completedLessons || {},
        users: parsed.users || []
      };
    }
  } catch (error) {
    console.warn('Cannot load state, using defaults', error);
  }
  return deepClone(defaultState);
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function updateBackButton() {
  if (!tg) return;
  if (tg.BackButton) {
    if (currentView !== 'home') {
      tg.BackButton.show();
    } else {
      tg.BackButton.hide();
    }
  }
}

function handleParallax() {
  const offset = window.scrollY;
  document.querySelectorAll('[data-parallax]').forEach((section, index) => {
    section.style.transform = `translateY(${offset * 0.02 * (index % 2 === 0 ? 1 : -1)}px)`;
  });
}

function renderAdminUsers() {
  if (!isAdmin) return;
  const wrap = document.getElementById('adminUsers');
  wrap.innerHTML = '';
  if (!appState.users.length) {
    wrap.innerHTML = '<p>Ще немає активованих користувачів.</p>';
    return;
  }
  appState.users.forEach((user) => {
    const block = document.createElement('div');
    block.className = 'admin-list-item';
    block.innerHTML = `
      <p><strong>${user.username}</strong></p>
      <p>Тариф: ${user.tariffType}</p>
      <p>Прогрес: ${user.progress}%</p>
      <p>Активовано: ${new Date(user.activatedAt).toLocaleString()}</p>
    `;
    wrap.appendChild(block);
  });
}
