export type Language = 'ru' | 'kz';

export const translations = {
  ru: {
    // Navigation
    nav: {
      home: 'Главное',
      lessons: 'Уроки',
      calendar: 'Календарь',
      rewards: 'Награды',
      help: 'Справка',
    },
    
    // Home screen
    home: {
      title: 'Привет!',
      subtitle: 'Учим корейский вместе',
      lessonsCompleted: 'Уроков пройдено',
      streakDays: 'Дней подряд',
      points: 'Баллов',
      studyMinutes: 'Минут обучения',
      recentActivity: 'Недавняя активность',
      noActivity: 'Пока нет активности',
      startLearning: 'Начать уроки корейского языка',
    },
    
    // Lessons screen
    lessons: {
      title: 'Уроки',
      categories: {
        hangul: 'Хангыль',
        grammar: 'Грамматика',
        words: 'Слова и выражения',
        writing: 'Пропись',
      },
      level: 'Уровень',
      lesson: 'Урок',
      locked: 'Заблокировано',
      startTest: 'Начать тест',
      levelTest: 'Тест уровня',
      watchVideo: 'Смотреть видео',
      continueLesson: 'Продолжить урок',
    },
    
    // Video & Quiz
    quiz: {
      question: 'Вопрос',
      of: 'из',
      checkAnswer: 'Проверить',
      nextQuestion: 'Следующий вопрос',
      finish: 'Завершить',
      result: 'Результат',
      yourScore: 'Ваш результат',
      backToLessons: 'Назад к урокам',
      correct: 'Правильно!',
      incorrect: 'Неправильно',
    },
    
    // Word cards
    words: {
      categories: {
        greetings: 'Приветствия',
        numbersKorean: 'Числа (кор.)',
        numbersChinese: 'Числа (кит.)',
        family: 'Семья',
        food: 'Еда',
        flowers: 'Цветы',
        colors: 'Цвета',
        verbs: 'Глаголы',
      },
      know: 'Знаю',
      dontKnow: 'Не знаю',
      tapToFlip: 'Нажмите, чтобы перевернуть',
      cardsLearned: 'Карточек изучено',
    },
    
    // Writing practice
    writing: {
      title: 'Пропись',
      consonants: 'Согласные',
      vowels: 'Гласные',
      practice: 'Практика',
      clear: 'Очистить',
      check: 'Проверить',
      example: 'Образец',
      tryAgain: 'Попробовать ещё',
      wellDone: 'Отлично!',
    },
    
    // Calendar
    calendar: {
      title: 'Календарь',
      today: 'Сегодня',
      noLessons: 'В этот день уроки не проводились',
      lessonsCount: 'уроков',
      minutes: 'минут',
      pointsEarned: 'баллов',
      months: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ],
      weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    },
    
    // Rewards
    rewards: {
      title: 'Награды',
      currentStreak: 'Текущая серия',
      totalPoints: 'Всего баллов',
      achievements: 'Достижения',
      progress: 'Прогресс',
      locked: 'Заблокировано',
      unlocked: 'Получено!',
      achievementsList: {
        firstLesson: 'Первый урок пройден',
        weekStreak: 'Неделю подряд',
        twoWeeksStreak: '2 недели подряд',
        monthStreak: 'Месяц подряд',
        thousandDays: '1000 дней',
        hangulMaster: 'Мастер Хангыля',
        words10: 'Выучено 10 слов',
        words50: 'Выучено 50 слов',
        words100: 'Выучено 100 слов',
      },
    },
    
    // Help
    help: {
      title: 'Справка',
      faq: 'Часто задаваемые вопросы',
      questions: {
        howToStart: {
          q: 'Как начать обучение?',
          a: 'Нажмите "Начать уроки корейского языка" на главном экране или перейдите в раздел "Уроки". Начните с изучения Хангыля — корейского алфавита.',
        },
        howCalendar: {
          q: 'Как работает календарь?',
          a: 'Календарь автоматически отслеживает вашу активность. Каждый день, когда вы проходите уроки, создаётся запись с количеством уроков, минутами обучения и заработанными баллами.',
        },
        howProgress: {
          q: 'Как сохраняется прогресс?',
          a: 'Весь ваш прогресс автоматически сохраняется на вашем устройстве. Вы можете закрыть приложение и продолжить обучение в любое время.',
        },
      },
      support: 'Поддержка',
      contactForm: {
        name: 'Имя',
        email: 'Email',
        message: 'Сообщение',
        send: 'Отправить',
        sent: 'Сообщение отправлено!',
        namePlaceholder: 'Ваше имя',
        emailPlaceholder: 'example@email.com',
        messagePlaceholder: 'Опишите вашу проблему или вопрос...',
      },
    },
    
    // Common
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      retry: 'Повторить',
      close: 'Закрыть',
      save: 'Сохранить',
      cancel: 'Отмена',
      continue: 'Продолжить',
      back: 'Назад',
      days: 'дней',
    },
  },
  
  kz: {
    // Navigation
    nav: {
      home: 'Басты',
      lessons: 'Сабақтар',
      calendar: 'Күнтізбе',
      rewards: 'Марапаттар',
      help: 'Анықтама',
    },
    
    // Home screen
    home: {
      title: 'Сәлем!',
      subtitle: 'Кореяшаны бірге үйренеміз',
      lessonsCompleted: 'Өтілген сабақтар',
      streakDays: 'Қатарынан күндер',
      points: 'Ұпайлар',
      studyMinutes: 'Оқу минуттары',
      recentActivity: 'Соңғы белсенділік',
      noActivity: 'Әзірге белсенділік жоқ',
      startLearning: 'Корей тілін оқуды бастау',
    },
    
    // Lessons screen
    lessons: {
      title: 'Сабақтар',
      categories: {
        hangul: 'Хангыль',
        grammar: 'Грамматика',
        words: 'Сөздер мен сөз тіркестері',
        writing: 'Жазу',
      },
      level: 'Деңгей',
      lesson: 'Сабақ',
      locked: 'Құлыпталған',
      startTest: 'Тестті бастау',
      levelTest: 'Деңгей тесті',
      watchVideo: 'Бейнені көру',
      continueLesson: 'Сабақты жалғастыру',
    },
    
    // Video & Quiz
    quiz: {
      question: 'Сұрақ',
      of: '/',
      checkAnswer: 'Тексеру',
      nextQuestion: 'Келесі сұрақ',
      finish: 'Аяқтау',
      result: 'Нәтиже',
      yourScore: 'Сіздің нәтижеңіз',
      backToLessons: 'Сабақтарға оралу',
      correct: 'Дұрыс!',
      incorrect: 'Қате',
    },
    
    // Word cards
    words: {
      categories: {
        greetings: 'Сәлемдесу',
        numbersKorean: 'Сандар (кор.)',
        numbersChinese: 'Сандар (қыт.)',
        family: 'Отбасы',
        food: 'Тамақ',
        flowers: 'Гүлдер',
        colors: 'Түстер',
        verbs: 'Етістіктер',
      },
      know: 'Білемін',
      dontKnow: 'Білмеймін',
      tapToFlip: 'Аудару үшін басыңыз',
      cardsLearned: 'Оқылған карточкалар',
    },
    
    // Writing practice
    writing: {
      title: 'Жазу',
      consonants: 'Дауыссыздар',
      vowels: 'Дауыстылар',
      practice: 'Жаттығу',
      clear: 'Тазалау',
      check: 'Тексеру',
      example: 'Үлгі',
      tryAgain: 'Қайта көру',
      wellDone: 'Керемет!',
    },
    
    // Calendar
    calendar: {
      title: 'Күнтізбе',
      today: 'Бүгін',
      noLessons: 'Бұл күні сабақтар өткізілген жоқ',
      lessonsCount: 'сабақ',
      minutes: 'минут',
      pointsEarned: 'ұпай',
      months: [
        'Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым',
        'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'
      ],
      weekdays: ['Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб', 'Жс'],
    },
    
    // Rewards
    rewards: {
      title: 'Марапаттар',
      currentStreak: 'Ағымдағы серия',
      totalPoints: 'Жалпы ұпайлар',
      achievements: 'Жетістіктер',
      progress: 'Прогресс',
      locked: 'Құлыпталған',
      unlocked: 'Алынды!',
      achievementsList: {
        firstLesson: 'Бірінші сабақ өтілді',
        weekStreak: 'Бір апта қатарынан',
        twoWeeksStreak: '2 апта қатарынан',
        monthStreak: 'Бір ай қатарынан',
        thousandDays: '1000 күн',
        hangulMaster: 'Хангыль шебері',
        words10: '10 сөз үйренілді',
        words50: '50 сөз үйренілді',
        words100: '100 сөз үйренілді',
      },
    },
    
    // Help
    help: {
      title: 'Анықтама',
      faq: 'Жиі қойылатын сұрақтар',
      questions: {
        howToStart: {
          q: 'Оқуды қалай бастауға болады?',
          a: 'Басты экрандағы "Корей тілін оқуды бастау" батырмасын басыңыз немесе "Сабақтар" бөліміне өтіңіз. Хангыльды — корей әліпбиін үйренуден бастаңыз.',
        },
        howCalendar: {
          q: 'Күнтізбе қалай жұмыс істейді?',
          a: 'Күнтізбе сіздің белсенділігіңізді автоматты түрде бақылайды. Сабақ өткен күндері сабақтар саны, оқу минуттары және жиналған ұпайлар туралы жазба жасалады.',
        },
        howProgress: {
          q: 'Прогресс қалай сақталады?',
          a: 'Барлық прогресс құрылғыңызда автоматты түрде сақталады. Қолданбаны жабып, кез келген уақытта оқуды жалғастыра аласыз.',
        },
      },
      support: 'Қолдау',
      contactForm: {
        name: 'Аты',
        email: 'Email',
        message: 'Хабарлама',
        send: 'Жіберу',
        sent: 'Хабарлама жіберілді!',
        namePlaceholder: 'Сіздің атыңыз',
        emailPlaceholder: 'example@email.com',
        messagePlaceholder: 'Мәселеңізді немесе сұрағыңызды сипаттаңыз...',
      },
    },
    
    // Common
    common: {
      loading: 'Жүктелуде...',
      error: 'Қате',
      retry: 'Қайталау',
      close: 'Жабу',
      save: 'Сақтау',
      cancel: 'Бас тарту',
      continue: 'Жалғастыру',
      back: 'Артқа',
      days: 'күн',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.ru;
