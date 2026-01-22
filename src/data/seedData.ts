import { Lesson, WordCardSet, Achievement, KoreanLetter, QuizQuestion } from '@/types';

// Hangul lessons (11 lessons as per spec)
export const hangulLessons: Lesson[] = Array.from({ length: 11 }, (_, i) => ({
  id: `hangul-${i + 1}`,
  category: 'hangul' as const,
  title: `Урок ${i + 1}: ${getHangulLessonTitle(i + 1)}`,
  titleKz: `Сабақ ${i + 1}: ${getHangulLessonTitleKz(i + 1)}`,
  level: 1,
  module: 1,
  order: i + 1,
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder video
  isLocked: i > 0, // First lesson unlocked
  testScorePercent: null,
  questions: generateHangulQuestions(i + 1),
}));

function getHangulLessonTitle(num: number): string {
  const titles = [
    'Введение в Хангыль',
    'Базовые гласные ㅏ, ㅓ, ㅗ, ㅜ',
    'Гласные ㅡ, ㅣ, ㅐ, ㅔ',
    'Согласные ㄱ, ㄴ, ㄷ, ㄹ',
    'Согласные ㅁ, ㅂ, ㅅ, ㅇ',
    'Согласные ㅈ, ㅊ, ㅋ, ㅌ',
    'Согласные ㅍ, ㅎ',
    'Двойные согласные',
    'Составные гласные 1',
    'Составные гласные 2',
    'Финальные согласные',
  ];
  return titles[num - 1] || `Тема ${num}`;
}

function getHangulLessonTitleKz(num: number): string {
  const titles = [
    'Хангыльге кіріспе',
    'Негізгі дауыстылар ㅏ, ㅓ, ㅗ, ㅜ',
    'Дауыстылар ㅡ, ㅣ, ㅐ, ㅔ',
    'Дауыссыздар ㄱ, ㄴ, ㄷ, ㄹ',
    'Дауыссыздар ㅁ, ㅂ, ㅅ, ㅇ',
    'Дауыссыздар ㅈ, ㅊ, ㅋ, ㅌ',
    'Дауыссыздар ㅍ, ㅎ',
    'Қос дауыссыздар',
    'Құрама дауыстылар 1',
    'Құрама дауыстылар 2',
    'Соңғы дауыссыздар',
  ];
  return titles[num - 1] || `Тақырып ${num}`;
}

function generateHangulQuestions(lessonNum: number): QuizQuestion[] {
  // Generate 5 questions per lesson
  const questionsPool: QuizQuestion[][] = [
    // Lesson 1 questions
    [
      {
        id: 'h1-q1',
        question: 'Как называется корейский алфавит?',
        questionKz: 'Корей әліпбиі қалай аталады?',
        options: ['Хангыль', 'Катакана', 'Хирагана', 'Пиньинь'],
        optionsKz: ['Хангыль', 'Катакана', 'Хирагана', 'Пиньинь'],
        correctIndex: 0,
      },
      {
        id: 'h1-q2',
        question: 'Сколько базовых гласных в корейском?',
        questionKz: 'Корей тілінде қанша негізгі дауысты бар?',
        options: ['5', '10', '14', '21'],
        optionsKz: ['5', '10', '14', '21'],
        correctIndex: 1,
      },
      {
        id: 'h1-q3',
        question: 'В каком году был создан Хангыль?',
        questionKz: 'Хангыль қай жылы жасалды?',
        options: ['1234', '1443', '1592', '1910'],
        optionsKz: ['1234', '1443', '1592', '1910'],
        correctIndex: 1,
      },
      {
        id: 'h1-q4',
        question: 'Кто создал Хангыль?',
        questionKz: 'Хангыльді кім жасады?',
        options: ['Король Седжон', 'Император Хань', 'Конфуций', 'Будда'],
        optionsKz: ['Седжон король', 'Хань императоры', 'Конфуций', 'Будда'],
        correctIndex: 0,
      },
      {
        id: 'h1-q5',
        question: 'Сколько базовых согласных в корейском?',
        questionKz: 'Корей тілінде қанша негізгі дауыссыз бар?',
        options: ['10', '14', '19', '24'],
        optionsKz: ['10', '14', '19', '24'],
        correctIndex: 1,
      },
    ],
    // Lesson 2 questions
    [
      {
        id: 'h2-q1',
        question: 'Какой звук обозначает буква ㅏ?',
        questionKz: 'ㅏ әрпі қандай дыбысты білдіреді?',
        options: ['а', 'о', 'у', 'э'],
        optionsKz: ['а', 'о', 'у', 'э'],
        correctIndex: 0,
      },
      {
        id: 'h2-q2',
        question: 'Какой звук обозначает буква ㅓ?',
        questionKz: 'ㅓ әрпі қандай дыбысты білдіреді?',
        options: ['а', 'о', 'э (открытый)', 'и'],
        optionsKz: ['а', 'о', 'э (ашық)', 'и'],
        correctIndex: 2,
      },
      {
        id: 'h2-q3',
        question: 'Какой звук обозначает буква ㅗ?',
        questionKz: 'ㅗ әрпі қандай дыбысты білдіреді?',
        options: ['а', 'о', 'у', 'э'],
        optionsKz: ['а', 'о', 'у', 'э'],
        correctIndex: 1,
      },
      {
        id: 'h2-q4',
        question: 'Какой звук обозначает буква ㅜ?',
        questionKz: 'ㅜ әрпі қандай дыбысты білдіреді?',
        options: ['а', 'о', 'у', 'и'],
        optionsKz: ['а', 'о', 'у', 'и'],
        correctIndex: 2,
      },
      {
        id: 'h2-q5',
        question: 'Какая из этих букв — гласная?',
        questionKz: 'Осы әріптердің қайсысы — дауысты?',
        options: ['ㄱ', 'ㅏ', 'ㄴ', 'ㅁ'],
        optionsKz: ['ㄱ', 'ㅏ', 'ㄴ', 'ㅁ'],
        correctIndex: 1,
      },
    ],
  ];

  // Return questions for the specific lesson or generate generic ones
  if (lessonNum <= questionsPool.length) {
    return questionsPool[lessonNum - 1];
  }
  
  // Generate generic questions for lessons without specific content
  return Array.from({ length: 5 }, (_, i) => ({
    id: `h${lessonNum}-q${i + 1}`,
    question: `Вопрос ${i + 1} по уроку ${lessonNum}`,
    questionKz: `Сабақ ${lessonNum} бойынша ${i + 1}-сұрақ`,
    options: ['Вариант А', 'Вариант Б', 'Вариант В', 'Вариант Г'],
    optionsKz: ['А нұсқасы', 'Б нұсқасы', 'В нұсқасы', 'Г нұсқасы'],
    correctIndex: Math.floor(Math.random() * 4),
  }));
}

// Grammar lessons (6 levels, ~25 lessons each)
export const grammarLessons: Lesson[] = [];
for (let level = 1; level <= 6; level++) {
  const lessonsInLevel = level <= 2 ? 25 : 20;
  for (let lesson = 1; lesson <= lessonsInLevel; lesson++) {
    grammarLessons.push({
      id: `grammar-${level}-${lesson}`,
      category: 'grammar',
      title: `Уровень ${level}, Урок ${lesson}`,
      titleKz: `Деңгей ${level}, Сабақ ${lesson}`,
      level,
      module: lesson,
      order: lesson,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      isLocked: level > 1 || lesson > 1,
      testScorePercent: null,
      questions: generateGrammarQuestions(level, lesson),
    });
  }
}

function generateGrammarQuestions(level: number, lesson: number): QuizQuestion[] {
  return Array.from({ length: 5 }, (_, i) => ({
    id: `g${level}-${lesson}-q${i + 1}`,
    question: `Вопрос ${i + 1} по грамматике (Уровень ${level})`,
    questionKz: `Грамматика бойынша ${i + 1}-сұрақ (Деңгей ${level})`,
    options: ['Вариант А', 'Вариант Б', 'Вариант В', 'Вариант Г'],
    optionsKz: ['А нұсқасы', 'Б нұсқасы', 'В нұсқасы', 'Г нұсқасы'],
    correctIndex: Math.floor(Math.random() * 4),
  }));
}

// Word card sets
export const wordCardSets: WordCardSet[] = [
  {
    id: 'greetings',
    category: 'greetings',
    title: 'Приветствия',
    titleKz: 'Сәлемдесу',
    cards: [
      { id: 'g1', front: 'Привет', frontKz: 'Сәлем', back: '안녕', transcription: 'annyeong' },
      { id: 'g2', front: 'Здравствуйте', frontKz: 'Сәлеметсіз бе', back: '안녕하세요', transcription: 'annyeonghaseyo' },
      { id: 'g3', front: 'До свидания', frontKz: 'Сау болыңыз', back: '안녕히 가세요', transcription: 'annyeonghi gaseyo' },
      { id: 'g4', front: 'Спасибо', frontKz: 'Рахмет', back: '감사합니다', transcription: 'gamsahamnida' },
      { id: 'g5', front: 'Пожалуйста', frontKz: 'Өтінемін', back: '천만에요', transcription: 'cheonmaneyo' },
      { id: 'g6', front: 'Извините', frontKz: 'Кешіріңіз', back: '죄송합니다', transcription: 'joesonghamnida' },
      { id: 'g7', front: 'Да', frontKz: 'Иә', back: '네', transcription: 'ne' },
      { id: 'g8', front: 'Нет', frontKz: 'Жоқ', back: '아니요', transcription: 'aniyo' },
    ],
  },
  {
    id: 'numbersKorean',
    category: 'numbersKorean',
    title: 'Числа (кор.)',
    titleKz: 'Сандар (кор.)',
    cards: [
      { id: 'nk1', front: 'Один', frontKz: 'Бір', back: '하나', transcription: 'hana' },
      { id: 'nk2', front: 'Два', frontKz: 'Екі', back: '둘', transcription: 'dul' },
      { id: 'nk3', front: 'Три', frontKz: 'Үш', back: '셋', transcription: 'set' },
      { id: 'nk4', front: 'Четыре', frontKz: 'Төрт', back: '넷', transcription: 'net' },
      { id: 'nk5', front: 'Пять', frontKz: 'Бес', back: '다섯', transcription: 'daseot' },
      { id: 'nk6', front: 'Шесть', frontKz: 'Алты', back: '여섯', transcription: 'yeoseot' },
      { id: 'nk7', front: 'Семь', frontKz: 'Жеті', back: '일곱', transcription: 'ilgop' },
      { id: 'nk8', front: 'Восемь', frontKz: 'Сегіз', back: '여덟', transcription: 'yeodeol' },
      { id: 'nk9', front: 'Девять', frontKz: 'Тоғыз', back: '아홉', transcription: 'ahop' },
      { id: 'nk10', front: 'Десять', frontKz: 'Он', back: '열', transcription: 'yeol' },
    ],
  },
  {
    id: 'numbersChinese',
    category: 'numbersChinese',
    title: 'Числа (кит.)',
    titleKz: 'Сандар (қыт.)',
    cards: [
      { id: 'nc1', front: 'Один', frontKz: 'Бір', back: '일', transcription: 'il' },
      { id: 'nc2', front: 'Два', frontKz: 'Екі', back: '이', transcription: 'i' },
      { id: 'nc3', front: 'Три', frontKz: 'Үш', back: '삼', transcription: 'sam' },
      { id: 'nc4', front: 'Четыре', frontKz: 'Төрт', back: '사', transcription: 'sa' },
      { id: 'nc5', front: 'Пять', frontKz: 'Бес', back: '오', transcription: 'o' },
      { id: 'nc6', front: 'Шесть', frontKz: 'Алты', back: '육', transcription: 'yuk' },
      { id: 'nc7', front: 'Семь', frontKz: 'Жеті', back: '칠', transcription: 'chil' },
      { id: 'nc8', front: 'Восемь', frontKz: 'Сегіз', back: '팔', transcription: 'pal' },
      { id: 'nc9', front: 'Девять', frontKz: 'Тоғыз', back: '구', transcription: 'gu' },
      { id: 'nc10', front: 'Десять', frontKz: 'Он', back: '십', transcription: 'sip' },
    ],
  },
  {
    id: 'family',
    category: 'family',
    title: 'Семья',
    titleKz: 'Отбасы',
    cards: [
      { id: 'f1', front: 'Мама', frontKz: 'Ана', back: '엄마', transcription: 'eomma' },
      { id: 'f2', front: 'Папа', frontKz: 'Әке', back: '아빠', transcription: 'appa' },
      { id: 'f3', front: 'Старший брат (для девушки)', frontKz: 'Аға (қыз үшін)', back: '오빠', transcription: 'oppa' },
      { id: 'f4', front: 'Старшая сестра (для девушки)', frontKz: 'Апа (қыз үшін)', back: '언니', transcription: 'eonni' },
      { id: 'f5', front: 'Старший брат (для парня)', frontKz: 'Аға (жігіт үшін)', back: '형', transcription: 'hyeong' },
      { id: 'f6', front: 'Старшая сестра (для парня)', frontKz: 'Апа (жігіт үшін)', back: '누나', transcription: 'nuna' },
      { id: 'f7', front: 'Младший брат/сестра', frontKz: 'Кіші бауыр/қарындас', back: '동생', transcription: 'dongsaeng' },
      { id: 'f8', front: 'Бабушка', frontKz: 'Әже', back: '할머니', transcription: 'halmeoni' },
      { id: 'f9', front: 'Дедушка', frontKz: 'Ата', back: '할아버지', transcription: 'harabeoji' },
    ],
  },
  {
    id: 'food',
    category: 'food',
    title: 'Еда',
    titleKz: 'Тамақ',
    cards: [
      { id: 'fd1', front: 'Рис', frontKz: 'Күріш', back: '밥', transcription: 'bap' },
      { id: 'fd2', front: 'Кимчи', frontKz: 'Кимчи', back: '김치', transcription: 'gimchi' },
      { id: 'fd3', front: 'Мясо', frontKz: 'Ет', back: '고기', transcription: 'gogi' },
      { id: 'fd4', front: 'Вода', frontKz: 'Су', back: '물', transcription: 'mul' },
      { id: 'fd5', front: 'Хлеб', frontKz: 'Нан', back: '빵', transcription: 'ppang' },
      { id: 'fd6', front: 'Яйцо', frontKz: 'Жұмыртқа', back: '계란', transcription: 'gyeran' },
      { id: 'fd7', front: 'Рыба', frontKz: 'Балық', back: '생선', transcription: 'saengseon' },
      { id: 'fd8', front: 'Овощи', frontKz: 'Көкөністер', back: '야채', transcription: 'yachae' },
    ],
  },
  {
    id: 'flowers',
    category: 'flowers',
    title: 'Цветы',
    titleKz: 'Гүлдер',
    cards: [
      { id: 'fl1', front: 'Цветок', frontKz: 'Гүл', back: '꽃', transcription: 'kkot' },
      { id: 'fl2', front: 'Роза', frontKz: 'Раушан', back: '장미', transcription: 'jangmi' },
      { id: 'fl3', front: 'Тюльпан', frontKz: 'Қызғалдақ', back: '튤립', transcription: 'tyullip' },
      { id: 'fl4', front: 'Лотос', frontKz: 'Лотос', back: '연꽃', transcription: 'yeonkkot' },
      { id: 'fl5', front: 'Хризантема', frontKz: 'Хризантема', back: '국화', transcription: 'gukhwa' },
      { id: 'fl6', front: 'Подсолнух', frontKz: 'Күнбағыс', back: '해바라기', transcription: 'haebaragi' },
    ],
  },
  {
    id: 'colors',
    category: 'colors',
    title: 'Цвета',
    titleKz: 'Түстер',
    cards: [
      { id: 'c1', front: 'Красный', frontKz: 'Қызыл', back: '빨간색', transcription: 'ppalgansaek' },
      { id: 'c2', front: 'Синий', frontKz: 'Көк', back: '파란색', transcription: 'paransaek' },
      { id: 'c3', front: 'Жёлтый', frontKz: 'Сары', back: '노란색', transcription: 'noransaek' },
      { id: 'c4', front: 'Зелёный', frontKz: 'Жасыл', back: '초록색', transcription: 'choroksaek' },
      { id: 'c5', front: 'Белый', frontKz: 'Ақ', back: '하얀색', transcription: 'hayansaek' },
      { id: 'c6', front: 'Чёрный', frontKz: 'Қара', back: '검은색', transcription: 'geomeunsaek' },
      { id: 'c7', front: 'Фиолетовый', frontKz: 'Күлгін', back: '보라색', transcription: 'borasaek' },
      { id: 'c8', front: 'Оранжевый', frontKz: 'Қызғылт сары', back: '주황색', transcription: 'juhwangsaek' },
    ],
  },
  {
    id: 'verbs',
    category: 'verbs',
    title: 'Глаголы',
    titleKz: 'Етістіктер',
    cards: [
      { id: 'v1', front: 'Делать', frontKz: 'Істеу', back: '하다', transcription: 'hada' },
      { id: 'v2', front: 'Идти', frontKz: 'Бару', back: '가다', transcription: 'gada' },
      { id: 'v3', front: 'Приходить', frontKz: 'Келу', back: '오다', transcription: 'oda' },
      { id: 'v4', front: 'Есть (кушать)', frontKz: 'Жеу', back: '먹다', transcription: 'meokda' },
      { id: 'v5', front: 'Пить', frontKz: 'Ішу', back: '마시다', transcription: 'masida' },
      { id: 'v6', front: 'Видеть', frontKz: 'Көру', back: '보다', transcription: 'boda' },
      { id: 'v7', front: 'Слышать', frontKz: 'Есту', back: '듣다', transcription: 'deutda' },
      { id: 'v8', front: 'Говорить', frontKz: 'Сөйлеу', back: '말하다', transcription: 'malhada' },
      { id: 'v9', front: 'Читать', frontKz: 'Оқу', back: '읽다', transcription: 'ikda' },
      { id: 'v10', front: 'Писать', frontKz: 'Жазу', back: '쓰다', transcription: 'sseuda' },
    ],
  },
];

// Korean alphabet letters for writing practice
export const koreanLetters: KoreanLetter[] = [
  // Consonants (14)
  { id: 'c1', character: 'ㄱ', romanization: 'g/k', type: 'consonant', name: 'Гиык', nameKz: 'Гиык' },
  { id: 'c2', character: 'ㄴ', romanization: 'n', type: 'consonant', name: 'Ниын', nameKz: 'Ниын' },
  { id: 'c3', character: 'ㄷ', romanization: 'd/t', type: 'consonant', name: 'Тигыт', nameKz: 'Тигыт' },
  { id: 'c4', character: 'ㄹ', romanization: 'r/l', type: 'consonant', name: 'Риыль', nameKz: 'Риыль' },
  { id: 'c5', character: 'ㅁ', romanization: 'm', type: 'consonant', name: 'Миым', nameKz: 'Миым' },
  { id: 'c6', character: 'ㅂ', romanization: 'b/p', type: 'consonant', name: 'Биып', nameKz: 'Биып' },
  { id: 'c7', character: 'ㅅ', romanization: 's', type: 'consonant', name: 'Сиот', nameKz: 'Сиот' },
  { id: 'c8', character: 'ㅇ', romanization: 'ng/-', type: 'consonant', name: 'Иын', nameKz: 'Иын' },
  { id: 'c9', character: 'ㅈ', romanization: 'j', type: 'consonant', name: 'Джиыт', nameKz: 'Джиыт' },
  { id: 'c10', character: 'ㅊ', romanization: 'ch', type: 'consonant', name: 'Чиыт', nameKz: 'Чиыт' },
  { id: 'c11', character: 'ㅋ', romanization: 'k', type: 'consonant', name: 'Кхиык', nameKz: 'Кхиык' },
  { id: 'c12', character: 'ㅌ', romanization: 't', type: 'consonant', name: 'Тхиыт', nameKz: 'Тхиыт' },
  { id: 'c13', character: 'ㅍ', romanization: 'p', type: 'consonant', name: 'Пхиып', nameKz: 'Пхиып' },
  { id: 'c14', character: 'ㅎ', romanization: 'h', type: 'consonant', name: 'Хиыт', nameKz: 'Хиыт' },
  // Vowels (10)
  { id: 'v1', character: 'ㅏ', romanization: 'a', type: 'vowel', name: 'А', nameKz: 'А' },
  { id: 'v2', character: 'ㅓ', romanization: 'eo', type: 'vowel', name: 'О (откр.)', nameKz: 'О (ашық)' },
  { id: 'v3', character: 'ㅗ', romanization: 'o', type: 'vowel', name: 'О', nameKz: 'О' },
  { id: 'v4', character: 'ㅜ', romanization: 'u', type: 'vowel', name: 'У', nameKz: 'У' },
  { id: 'v5', character: 'ㅡ', romanization: 'eu', type: 'vowel', name: 'Ы', nameKz: 'Ы' },
  { id: 'v6', character: 'ㅣ', romanization: 'i', type: 'vowel', name: 'И', nameKz: 'И' },
  { id: 'v7', character: 'ㅐ', romanization: 'ae', type: 'vowel', name: 'Э', nameKz: 'Э' },
  { id: 'v8', character: 'ㅔ', romanization: 'e', type: 'vowel', name: 'Е', nameKz: 'Е' },
  { id: 'v9', character: 'ㅑ', romanization: 'ya', type: 'vowel', name: 'Я', nameKz: 'Я' },
  { id: 'v10', character: 'ㅕ', romanization: 'yeo', type: 'vowel', name: 'Ё', nameKz: 'Ё' },
];

// Initial achievements
export const initialAchievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'Первый урок пройден',
    titleKz: 'Бірінші сабақ өтілді',
    description: 'Завершите свой первый урок',
    descriptionKz: 'Бірінші сабағыңызды аяқтаңыз',
    isUnlocked: false,
    progressValue: 0,
    goalValue: 1,
  },
  {
    id: 'week-streak',
    title: 'Неделю подряд',
    titleKz: 'Бір апта қатарынан',
    description: 'Занимайтесь 7 дней подряд',
    descriptionKz: '7 күн қатарынан оқыңыз',
    isUnlocked: false,
    progressValue: 0,
    goalValue: 7,
  },
  {
    id: 'two-weeks-streak',
    title: '2 недели подряд',
    titleKz: '2 апта қатарынан',
    description: 'Занимайтесь 14 дней подряд',
    descriptionKz: '14 күн қатарынан оқыңыз',
    isUnlocked: false,
    progressValue: 0,
    goalValue: 14,
  },
  {
    id: 'month-streak',
    title: 'Месяц подряд',
    titleKz: 'Бір ай қатарынан',
    description: 'Занимайтесь 30 дней подряд',
    descriptionKz: '30 күн қатарынан оқыңыз',
    isUnlocked: false,
    progressValue: 0,
    goalValue: 30,
  },
  {
    id: 'thousand-days',
    title: '1000 дней',
    titleKz: '1000 күн',
    description: 'Достигните серии в 1000 дней',
    descriptionKz: '1000 күндік серияға жетіңіз',
    isUnlocked: false,
    progressValue: 0,
    goalValue: 1000,
  },
  {
    id: 'hangul-master',
    title: 'Мастер Хангыля',
    titleKz: 'Хангыль шебері',
    description: 'Завершите все уроки Хангыля',
    descriptionKz: 'Барлық Хангыль сабақтарын аяқтаңыз',
    isUnlocked: false,
    progressValue: 0,
    goalValue: 11,
  },
  {
    id: 'words-10',
    title: 'Выучено 10 слов',
    titleKz: '10 сөз үйренілді',
    description: 'Выучите 10 слов',
    descriptionKz: '10 сөз үйреніңіз',
    isUnlocked: false,
    progressValue: 0,
    goalValue: 10,
  },
  {
    id: 'words-50',
    title: 'Выучено 50 слов',
    titleKz: '50 сөз үйренілді',
    description: 'Выучите 50 слов',
    descriptionKz: '50 сөз үйреніңіз',
    isUnlocked: false,
    progressValue: 0,
    goalValue: 50,
  },
  {
    id: 'words-100',
    title: 'Выучено 100 слов',
    titleKz: '100 сөз үйренілді',
    description: 'Выучите 100 слов',
    descriptionKz: '100 сөз үйреніңіз',
    isUnlocked: false,
    progressValue: 0,
    goalValue: 100,
  },
];

// Initial user stats
export const initialUserStats = {
  lessonsCompleted: 0,
  streakDays: 0,
  points: 0,
  totalStudyMinutes: 0,
  recentActivity: [],
  lastActiveDate: '',
  wordsLearned: 0,
};
