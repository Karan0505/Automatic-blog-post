export interface UIDictionary {
  featuredStory: string;
  readFullStory: string;
  minRead: string;
  allTopics: string;
  articles: string;
  backToArticles: string;
  searchArticles: string;
  tableOfContents: string;
  tags: string;
  articlesBy: string;
  previous: string;
  next: string;
  page: string;
  of: string;
  globalSearch: string;
  searchPlaceholder: string;
  noResults: string;
  exploreStories: string;
  home: string;
  about: string;
}

const dictionaries: Record<string, Partial<UIDictionary>> = {
  en: {
    featuredStory: 'Featured Story',
    readFullStory: 'Read Full Story',
    minRead: 'min read',
    allTopics: 'All Topics',
    articles: 'Articles',
    backToArticles: 'Back to Articles',
    searchArticles: 'Search Articles',
    tableOfContents: 'Table of Contents',
    tags: 'Tags',
    articlesBy: 'Articles by',
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',
    globalSearch: 'Global Search',
    searchPlaceholder: 'Type Next.js, Strapi, Micro-interactions...',
    noResults: 'No articles found',
    exploreStories: 'Explore Stories',
    home: 'Home',
    about: 'About',
  },
  'gu-IN': {
    featuredStory: 'વિશેષ વાર્તા',
    readFullStory: 'પૂર્ણ વાર્તા વાંચો',
    minRead: 'મિનિટ વાંચન',
    allTopics: 'બધા વિષયો',
    articles: 'લેખો',
    backToArticles: 'પાછા લેખો પર',
    searchArticles: 'લેખો શોધો',
    tableOfContents: 'અનુક્રમણિકા',
    tags: 'ટૅગ્સ',
    articlesBy: 'દ્વારા લેખો',
    previous: 'પાછલું',
    next: 'આગલું',
    page: 'પાનું',
    of: 'માંથી',
    globalSearch: 'ગ્લોબલ સર્ચ',
    searchPlaceholder: 'Next.js, Strapi, આર્કિટેક્ચર ટાઈપ કરો...',
    noResults: 'કોઈ લેખ મળ્યો નથી',
    exploreStories: 'વાર્તાઓ શોધો',
    home: 'મુખ્ય પૃષ્ઠ',
    about: 'અમારા વિશે',
  },
  'hi-IN': {
    featuredStory: 'विशेष कहानी',
    readFullStory: 'पूरी कहानी पढ़ें',
    minRead: 'मिनट पढ़ें',
    allTopics: 'सभी विषय',
    articles: 'लेख',
    backToArticles: 'लेखों पर वापस जाएं',
    searchArticles: 'लेख खोजें',
    tableOfContents: 'विषय - सूची',
    tags: 'टैग',
    articlesBy: 'द्वारा लेख',
    previous: 'पिछला',
    next: 'अगला',
    page: 'पृष्ठ',
    of: 'का',
    globalSearch: 'ग्लोबल सर्च',
    searchPlaceholder: 'Next.js, Strapi, आर्किटेक्चर टाइप करें...',
    noResults: 'कोई लेख नहीं मिला',
    exploreStories: 'कहानियां देखें',
    home: 'होम',
    about: 'हमारे बारे में',
  },
};

export function getDictionary(locale: string = 'en'): UIDictionary {
  // Support both 2-letter 'gu' and locale tags 'gu-IN'
  const normalized = locale.startsWith('gu') ? 'gu-IN' : locale.startsWith('hi') ? 'hi-IN' : 'en';
  return {
    ...dictionaries.en,
    ...(dictionaries[normalized] || {}),
  } as UIDictionary;
}
