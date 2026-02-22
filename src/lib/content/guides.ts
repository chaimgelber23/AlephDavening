import type { Guide, GuideCategoryInfo, GuideCategory } from '@/types';

// ── Category Definitions ──

export const GUIDE_CATEGORIES: GuideCategoryInfo[] = [
  {
    id: 'morning_routine',
    title: 'Morning Routine',
    titleHebrew: 'סֵדֶר הַבֹּקֶר',
    icon: '🌅',
    color: '#C6973F',
    description: 'Start your day the Jewish way',
  },
  {
    id: 'brachot_food',
    title: 'Brachot on Food',
    titleHebrew: 'בִּרְכוֹת הַנֶּהֱנִין',
    icon: '🍎',
    color: '#4A7C59',
    description: 'Which bracha to say before and after eating',
  },
  {
    id: 'personal_care',
    title: 'Personal Care',
    titleHebrew: 'הַנְהָגוֹת',
    icon: '✂️',
    color: '#5FA8D3',
    description: 'Halachic guidelines for grooming and hygiene',
  },
  {
    id: 'shabbat',
    title: 'Shabbat Basics',
    titleHebrew: 'שַׁבָּת',
    icon: '🕯️',
    color: '#8B5CF6',
    description: 'Candle lighting, Kiddush, Havdalah, and more',
  },
  {
    id: 'daily_items',
    title: 'Daily Jewish Items',
    titleHebrew: 'מִצְווֹת יוֹמִיּוֹת',
    icon: '🧵',
    color: '#1B4965',
    description: 'Kippah, tzitzit, and other daily observances',
  },
  {
    id: 'home',
    title: 'The Jewish Home',
    titleHebrew: 'הַבַּיִת הַיְּהוּדִי',
    icon: '🏠',
    color: '#D4A373',
    description: 'Mezuzah, kashrut awareness, and home practices',
  },
];

// ══════════════════════════════════════════
// MORNING ROUTINE GUIDES
// ══════════════════════════════════════════

const MORNING_GUIDES: Guide[] = [
  {
    id: 'negel-vasser',
    slug: 'negel-vasser',
    title: 'Negel Vasser',
    titleHebrew: 'נְטִילַת יָדַיִם שֶׁל שַׁחֲרִית',
    category: 'morning_routine',
    sortOrder: 1,
    icon: '💧',
    summary: 'Washing your hands upon waking',
    whenRelevant: 'Immediately upon waking, before getting out of bed if possible',
    whyItMatters:
      'Jewish tradition teaches that when we sleep, a spiritual impurity rests on our hands. By washing them in a specific way, we start our day fresh and pure — ready to serve Hashem with clean hands and a clear heart. It is one of the first acts of a Jew each morning.',
    quickAnswer:
      'Keep a cup and bowl by your bed. When you wake up, pour water alternating right-left three times each hand (R-L-R-L-R-L). Then dry your hands.',
    steps: [
      {
        id: 'nv-1',
        sortOrder: 1,
        instruction:
          'Prepare a cup (negel vasser cup or any large cup) filled with water and a bowl before going to sleep. Place them near your bed.',
        tip: 'Many people keep a dedicated two-handled washing cup by their bed. Any cup works to start.',
      },
      {
        id: 'nv-2',
        sortOrder: 2,
        instruction: 'Upon waking, pick up the cup with your right hand and pass it to your left hand.',
        tip: 'Try to avoid walking more than 4 amot (about 6 feet) before washing.',
      },
      {
        id: 'nv-3',
        sortOrder: 3,
        instruction: 'Pour water over your entire right hand, up to the wrist.',
      },
      {
        id: 'nv-4',
        sortOrder: 4,
        instruction: 'Transfer the cup to your right hand and pour water over your entire left hand.',
      },
      {
        id: 'nv-5',
        sortOrder: 5,
        instruction:
          'Repeat two more times: right, left, right, left — for a total of three pours on each hand.',
        tip: 'The order is: R-L-R-L-R-L (right first each time).',
      },
      {
        id: 'nv-6',
        sortOrder: 6,
        instruction: 'Dry your hands with a towel.',
      },
      {
        id: 'nv-7',
        sortOrder: 7,
        instruction:
          'Later, when you are ready to say brachot, wash again with a bracha: "Al Netilat Yadayim."',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ עַל נְטִילַת יָדָיִם',
        transliteration:
          "Baruch Atah Adonai Eloheinu Melech ha'olam asher kid'shanu b'mitzvotav v'tzivanu al netilat yadayim",
        translation: 'Blessed are You, Lord our God, King of the universe, who has sanctified us with His commandments and commanded us regarding the washing of hands.',
        audioUrl: '/audio/prayers/netilat-yadayim/netilat-yadayim-1.mp3',
        tip: 'The bracha is said after drying your hands, not before.',
      },
    ],
    practicalTips: [
      "Any cup works — you don't need a special one to start",
      'If you forgot to prepare water, walk to the sink and wash there',
      'The water should cover your whole hand up to the wrist',
      'Pour the used water into a bowl or the sink, not on the floor',
    ],
    commonMistakes: [
      "Don't worry if you can't do it perfectly every time — the main thing is to start the practice",
      "If you forgot and walked more than 4 amot — still wash! Better late than never",
    ],
    sources: [
      'Shulchan Aruch, Orach Chaim 4:1',
      'Mishnah Berurah 4:1',
      'Kitzur Shulchan Aruch 2:1',
    ],
    quiz: [
      {
        id: 'nv-q1',
        question: 'How many times do you pour water on each hand?',
        options: ['Once', 'Twice', 'Three times', 'Four times'],
        correctIndex: 2,
        explanation: 'We wash each hand three times, alternating right and left.',
        source: 'Shulchan Aruch, Orach Chaim 4:2',
      },
      {
        id: 'nv-q2',
        question: 'Which hand do you wash first?',
        options: ['Left', 'Right', 'Either one', 'Both at the same time'],
        correctIndex: 1,
        explanation:
          'We start with the right hand. In Jewish practice, the right side generally takes precedence.',
        source: 'Mishnah Berurah 4:10',
      },
      {
        id: 'nv-q3',
        question: 'When is the bracha on washing said?',
        options: ['Before washing', 'While washing', 'After drying', 'Before drying'],
        correctIndex: 2,
        explanation:
          'The bracha is said after drying the hands, because the initial morning wash is done before one is halachically ready to say brachot.',
        source: 'Mishnah Berurah 4:4',
      },
    ],
    relatedGuideIds: ['modeh-ani-guide', 'morning-brachot-guide'],
    relatedPrayerIds: ['netilat-yadayim'],
  },
  {
    id: 'modeh-ani-guide',
    slug: 'modeh-ani-guide',
    title: 'Modeh Ani',
    titleHebrew: 'מוֹדֶה אֲנִי',
    category: 'morning_routine',
    sortOrder: 2,
    icon: '🌤️',
    summary: 'The first words you say each morning',
    whenRelevant: 'The very first moment you wake up, even before washing hands',
    whyItMatters:
      'Before you even get out of bed, you thank God for returning your soul. It is a powerful daily reminder that each new day is a gift. Modeh Ani is so fundamental that it can be said even before washing hands, because it does not contain God\'s actual name.',
    quickAnswer:
      'As soon as you wake up, while still lying in bed, say "Modeh ani l\'fanecha..." thanking God for returning your soul.',
    steps: [
      {
        id: 'ma-1',
        sortOrder: 1,
        instruction: 'As soon as you become conscious upon waking, say Modeh Ani.',
        tip: 'You can say it while still lying in bed. No need to wash hands first.',
      },
      {
        id: 'ma-2',
        sortOrder: 2,
        instruction: 'Recite the following:',
        hebrewText:
          'מוֹדֶה אֲנִי לְפָנֶיךָ מֶלֶךְ חַי וְקַיָּם שֶׁהֶחֱזַרְתָּ בִּי נִשְׁמָתִי בְחֶמְלָה רַבָּה אֱמוּנָתֶךָ',
        transliteration:
          "Modeh ani l'fanecha, Melech chai v'kayam, she'hechezarta bi nishmati b'chemlah, rabbah emunatecha",
        translation:
          'I gratefully thank You, living and enduring King, for You have returned my soul within me with compassion — great is Your faithfulness.',
        audioUrl: '/audio/prayers/modeh-ani/modeh-ani-1.mp3',
      },
      {
        id: 'ma-3',
        sortOrder: 3,
        instruction:
          'Women say "Modah ani" (מוֹדָה אֲנִי) instead of "Modeh ani" — the feminine form.',
        tip: 'The meaning is identical; only the grammar changes.',
      },
    ],
    practicalTips: [
      'Keep the text by your bed until you memorize it',
      'It takes about 5 seconds to say — make it the very first thing',
      "You don't need to wash hands or be dressed to say it",
      'Some people say it with their eyes still closed',
    ],
    commonMistakes: [
      "Don't wait until you're fully awake — say it the moment you gain consciousness",
      "There is no bracha before or after — it's just the one sentence",
    ],
    sources: [
      'Shulchan Aruch, Orach Chaim 1:1 (Rema)',
      'Kitzur Shulchan Aruch 1:2',
      'Seder HaYom',
    ],
    quiz: [
      {
        id: 'ma-q1',
        question: 'Why can Modeh Ani be said before washing hands?',
        options: [
          "It's not a real prayer",
          "It doesn't contain God's name",
          "You don't need clean hands for short prayers",
          "It's optional",
        ],
        correctIndex: 1,
        explanation:
          "Modeh Ani does not contain any of God's names, so it may be said even in a state of ritual impurity before washing.",
        source: 'Mishnah Berurah 1:8',
      },
      {
        id: 'ma-q2',
        question: 'What are we thanking God for in Modeh Ani?',
        options: [
          'A new day',
          'Good health',
          'Returning our soul',
          'Food and shelter',
        ],
        correctIndex: 2,
        explanation:
          'We thank God specifically for returning our neshamah (soul), which is considered to have been "on deposit" with Him while we slept.',
        source: 'Kitzur Shulchan Aruch 1:2',
      },
      {
        id: 'ma-q3',
        question: 'When should Modeh Ani be said?',
        options: [
          'After getting dressed',
          'The moment you wake up',
          'After washing hands',
          'During morning prayers',
        ],
        correctIndex: 1,
        explanation: 'Modeh Ani is said immediately upon waking, before any other action.',
      },
    ],
    relatedGuideIds: ['negel-vasser', 'morning-brachot-guide'],
    relatedPrayerIds: ['modeh-ani'],
  },
  {
    id: 'morning-brachot-guide',
    slug: 'morning-brachot-guide',
    title: 'Morning Brachot',
    titleHebrew: 'בִּרְכוֹת הַשַּׁחַר',
    category: 'morning_routine',
    sortOrder: 3,
    icon: '📜',
    summary: 'The series of blessings that start your morning',
    whenRelevant: 'After washing hands and getting dressed, before or during Shacharit',
    whyItMatters:
      'The morning blessings thank God for the basic gifts we take for granted: sight, clothing, the ability to stand, freedom. Saying them each morning cultivates gratitude and mindfulness about the blessings in your life.',
    quickAnswer:
      'After negel vasser and getting dressed, recite the series of morning blessings found in the siddur. They thank God for sight, clothing, strength, and more.',
    steps: [
      {
        id: 'mb-1',
        sortOrder: 1,
        instruction:
          'After washing negel vasser and getting dressed, you are ready for morning brachot.',
      },
      {
        id: 'mb-2',
        sortOrder: 2,
        instruction:
          'Say "Elokai Neshamah" — thanking God for your pure soul.',
        hebrewText: 'אֱלֹהַי נְשָׁמָה שֶׁנָּתַתָּ בִּי טְהוֹרָה הִיא',
        transliteration: "Elohai neshamah shenatata bi tehorah hi",
        translation: 'My God, the soul You placed within me is pure.',
        tip: 'This is a separate bracha from Modeh Ani — it contains God\'s name and is said after washing.',
      },
      {
        id: 'mb-3',
        sortOrder: 3,
        instruction:
          'Continue with Birchos HaShachar — the series of blessings thanking God for daily gifts.',
        tip: 'These include blessings for sight, clothing, walking, and more. See the full list in the Siddur section of AlephStart.',
      },
      {
        id: 'mb-4',
        sortOrder: 4,
        instruction:
          'Say Birchos HaTorah — the blessings over Torah study. These must be said before learning any Torah during the day.',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לַעֲסוֹק בְּדִבְרֵי תוֹרָה',
        transliteration:
          "Baruch Atah Adonai Eloheinu Melech ha'olam asher kid'shanu b'mitzvotav v'tzivanu la'asok b'divrei Torah",
        translation: 'Blessed are You... who sanctified us with His commandments and commanded us to engage in words of Torah.',
      },
    ],
    practicalTips: [
      'These brachot can be said at home before going to shul',
      'If you daven at a minyan, many siddurim include them at the start of Shacharit',
      'Try to learn one new bracha at a time until you know them all',
      'Practice them in the Siddur section of AlephStart with audio and transliteration',
    ],
    sources: [
      'Shulchan Aruch, Orach Chaim 46:1',
      'Shulchan Aruch, Orach Chaim 47:1',
      'Mishnah Berurah 46:1',
    ],
    quiz: [
      {
        id: 'mb-q1',
        question: 'What must be said before learning any Torah during the day?',
        options: ['Modeh Ani', 'Shema', 'Birchos HaTorah', 'Ashrei'],
        correctIndex: 2,
        explanation:
          'Birchos HaTorah must be recited each morning before any Torah study.',
        source: 'Shulchan Aruch, Orach Chaim 47:1',
      },
      {
        id: 'mb-q2',
        question: 'What do the morning blessings (Birchos HaShachar) primarily express?',
        options: ['Requests for the day', 'Gratitude for basic daily gifts', 'Confession of sins', 'Praise of the Temple'],
        correctIndex: 1,
        explanation:
          'The morning blessings thank God for fundamental daily gifts like sight, clothing, strength, and freedom.',
        source: 'Talmud Berachot 60b',
      },
    ],
    relatedGuideIds: ['negel-vasser', 'modeh-ani-guide'],
    relatedPrayerIds: ['elokai-neshamah', 'birchos-hatorah', 'birchos-hashachar'],
  },
];

// ══════════════════════════════════════════
// BRACHOT ON FOOD GUIDES
// ══════════════════════════════════════════

const BRACHOT_FOOD_GUIDES: Guide[] = [
  {
    id: 'bracha-system',
    slug: 'bracha-system',
    title: 'The Bracha System',
    titleHebrew: 'סֵדֶר הַבְּרָכוֹת',
    category: 'brachot_food',
    sortOrder: 1,
    icon: '🗂️',
    summary: 'Which bracha for which food — a complete guide',
    whenRelevant: 'Before eating or drinking anything',
    whyItMatters:
      'In Judaism, we don\'t just eat — we acknowledge that everything comes from God. Each type of food has its own specific bracha, creating a moment of mindfulness before every bite. The Talmud says that eating without a bracha is like stealing from God.',
    quickAnswer:
      'There are 6 main brachot on food: Hamotzi (bread), Mezonot (grain products), Ha\'etz (fruit from trees), Ha\'adama (vegetables/ground produce), Shehakol (everything else — meat, eggs, water, candy), and Hagafen (grape wine/juice).',
    steps: [
      {
        id: 'bs-1',
        sortOrder: 1,
        instruction:
          'HAMOTZI — For bread (challah, pita, any bread made from wheat, barley, spelt, rye, or oat flour).',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם הַמּוֹצִיא לֶחֶם מִן הָאָרֶץ',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam hamotzi lechem min ha'aretz",
        translation: 'Blessed are You... who brings forth bread from the earth.',
        tip: 'Hamotzi is the "king of brachot" — when eating a bread meal, this bracha covers everything else at the meal.',
      },
      {
        id: 'bs-2',
        sortOrder: 2,
        instruction:
          'MEZONOT — For grain/wheat products that are NOT bread (cake, cookies, pasta, cereal, crackers, pretzels).',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם בּוֹרֵא מִינֵי מְזוֹנוֹת',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam borei minei mezonot",
        translation: 'Blessed are You... who creates various kinds of sustenance.',
      },
      {
        id: 'bs-3',
        sortOrder: 3,
        instruction: "HA'ETZ — For fruit that grows on trees (apples, oranges, grapes, bananas, dates, olives).",
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם בּוֹרֵא פְּרִי הָעֵץ',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam borei p'ri ha'etz",
        translation: 'Blessed are You... who creates the fruit of the tree.',
        tip: 'Bananas are Ha\'etz even though the plant looks like a bush — halachically the banana plant is considered a tree.',
      },
      {
        id: 'bs-4',
        sortOrder: 4,
        instruction:
          "HA'ADAMA — For vegetables and produce that grows from the ground (carrots, potatoes, watermelon, strawberries, peanuts).",
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם בּוֹרֵא פְּרִי הָאֲדָמָה',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam borei p'ri ha'adamah",
        translation: 'Blessed are You... who creates the fruit of the ground.',
      },
      {
        id: 'bs-5',
        sortOrder: 5,
        instruction:
          'SHEHAKOL — The catch-all bracha for everything else: meat, fish, eggs, dairy, water, juice, candy, chocolate.',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם שֶׁהַכֹּל נִהְיָה בִּדְבָרוֹ',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam shehakol nihyah bidvaro",
        translation: 'Blessed are You... by whose word all things came to be.',
        tip: 'When in doubt, Shehakol is always valid — it covers any food.',
      },
      {
        id: 'bs-6',
        sortOrder: 6,
        instruction: 'HAGAFEN — Specifically for grape wine and grape juice.',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם בּוֹרֵא פְּרִי הַגָּפֶן',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam borei p'ri hagafen",
        translation: 'Blessed are You... who creates the fruit of the vine.',
        tip: 'This is ONLY for grape wine/juice. Other fruit juices are Shehakol.',
      },
    ],
    practicalTips: [
      'When in doubt about the correct bracha, say Shehakol — it covers everything',
      'The bracha is said BEFORE eating, not after',
      'Hold the food in your right hand while saying the bracha',
      'Say the bracha, then eat right away — no talking in between',
      'If a food is a mixture, the bracha follows the majority ingredient',
    ],
    commonMistakes: [
      "If you said the wrong bracha, don't worry — as long as you said Shehakol, you're covered",
      "Peanut butter is Ha'adama (peanuts grow in the ground), not Ha'etz",
      'Orange juice is Shehakol (processed), but a whole orange is Ha\'etz',
    ],
    sources: [
      'Shulchan Aruch, Orach Chaim 202-211',
      'Mishnah Berachot 6:1',
      'Kitzur Shulchan Aruch 48-52',
    ],
    quiz: [
      {
        id: 'bs-q1',
        question: 'What bracha do you say on a piece of cake?',
        options: ['Hamotzi', 'Mezonot', "Ha'etz", 'Shehakol'],
        correctIndex: 1,
        explanation: 'Cake is a grain product that is not bread, so it is Mezonot.',
        source: 'Shulchan Aruch, Orach Chaim 168:7',
      },
      {
        id: 'bs-q2',
        question: 'What bracha do you say on water?',
        options: ["Ha'adama", "Ha'etz", 'Shehakol', 'Hagafen'],
        correctIndex: 2,
        explanation: 'Water, and anything not in another category, is Shehakol.',
        source: 'Shulchan Aruch, Orach Chaim 204:7',
      },
      {
        id: 'bs-q3',
        question: 'If you\'re unsure which bracha to say, which is always safe?',
        options: ['Hamotzi', 'Mezonot', "Ha'etz", 'Shehakol'],
        correctIndex: 3,
        explanation:
          'Shehakol is the "universal" bracha — it\'s valid for any food or drink.',
        source: 'Mishnah Berurah 202:19',
      },
      {
        id: 'bs-q4',
        question: 'What bracha do you say on grape juice?',
        options: ['Shehakol', "Ha'etz", 'Hagafen', 'Mezonot'],
        correctIndex: 2,
        explanation: 'Grape juice, like wine, gets the special bracha of Hagafen.',
        source: 'Shulchan Aruch, Orach Chaim 202:1',
      },
    ],
    relatedGuideIds: ['washing-for-bread', 'brachot-achronot'],
  },
  {
    id: 'washing-for-bread',
    slug: 'washing-for-bread',
    title: 'Washing for Bread',
    titleHebrew: 'נְטִילַת יָדַיִם לְסְעוּדָה',
    category: 'brachot_food',
    sortOrder: 2,
    icon: '🍞',
    summary: 'The ritual hand-washing before eating bread',
    whenRelevant: 'Before eating any bread (challah, pita, sandwich, etc.)',
    whyItMatters:
      'Washing before bread elevates a meal from mere eating to a sacred act. The Kohanim (priests) would wash before eating consecrated food in the Temple. We continue this practice to bring holiness to our tables, making every meal a small echo of the Temple service.',
    quickAnswer:
      'Fill a cup, pour twice on your right hand then twice on your left hand, say the bracha "Al Netilat Yadayim," dry your hands, and say Hamotzi on the bread — no talking between the bracha and eating.',
    steps: [
      {
        id: 'wb-1',
        sortOrder: 1,
        instruction: 'Fill a large cup with water. A two-handled cup is traditional but not required.',
      },
      {
        id: 'wb-2',
        sortOrder: 2,
        instruction: 'Pour water over your entire right hand, up to the wrist. Pour a second time over the right hand.',
        tip: 'Make sure the water covers the whole hand including between the fingers.',
      },
      {
        id: 'wb-3',
        sortOrder: 3,
        instruction: 'Transfer the cup to your right hand. Pour water twice over your entire left hand.',
      },
      {
        id: 'wb-4',
        sortOrder: 4,
        instruction: 'While your hands are still wet, say the bracha:',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ עַל נְטִילַת יָדָיִם',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam asher kid'shanu b'mitzvotav v'tzivanu al netilat yadayim",
        translation: 'Blessed are You... who sanctified us with His commandments and commanded us regarding the washing of hands.',
      },
      {
        id: 'wb-5',
        sortOrder: 5,
        instruction: 'Dry your hands with a towel.',
      },
      {
        id: 'wb-6',
        sortOrder: 6,
        instruction: 'Say Hamotzi on the bread and eat immediately. Do NOT speak between the bracha and eating.',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם הַמּוֹצִיא לֶחֶם מִן הָאָרֶץ',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam hamotzi lechem min ha'aretz",
        translation: 'Blessed are You... who brings forth bread from the earth.',
        tip: 'Some have the custom to dip the bread in salt before eating.',
      },
    ],
    practicalTips: [
      'No talking between washing and eating the bread — this is very important',
      'If you accidentally spoke, you need to wash again',
      'Many restaurants with a Jewish clientele have washing cups near the sink',
      'The two pours per hand (for meals) differ from the three alternating pours of morning negel vasser',
    ],
    commonMistakes: [
      'This washing is ONLY for bread — not for cake, crackers, or other foods',
      "The bracha on washing is said AFTER pouring but BEFORE drying (while hands are wet)",
    ],
    sources: [
      'Shulchan Aruch, Orach Chaim 158-164',
      'Mishnah Berurah 158:1',
      'Kitzur Shulchan Aruch 40:1-2',
    ],
    quiz: [
      {
        id: 'wb-q1',
        question: 'How many times do you pour water on each hand when washing for bread?',
        options: ['Once', 'Twice', 'Three times', 'Four times'],
        correctIndex: 1,
        explanation: 'For a bread meal, pour water twice on each hand (not alternating like morning washing).',
        source: 'Shulchan Aruch, Orach Chaim 162:2',
      },
      {
        id: 'wb-q2',
        question: 'What should you NOT do between washing and eating bread?',
        options: ['Sit down', 'Talk', 'Touch the bread', 'Close your eyes'],
        correctIndex: 1,
        explanation:
          'Speaking between the bracha of washing and eating bread is a hefsek (interruption) and would require re-washing.',
        source: 'Shulchan Aruch, Orach Chaim 166:1',
      },
      {
        id: 'wb-q3',
        question: 'Do you need to wash for bread if you\'re eating a sandwich on a roll?',
        options: ['No, only for challah', 'Yes, any bread requires washing', 'Only on Shabbat', 'Only if it\'s a large portion'],
        correctIndex: 1,
        explanation: 'Any bread — challah, pita, roll, sandwich bread — requires washing.',
        source: 'Shulchan Aruch, Orach Chaim 158:1',
      },
    ],
    relatedGuideIds: ['bracha-system', 'brachot-achronot'],
  },
  {
    id: 'brachot-achronot',
    slug: 'brachot-achronot',
    title: 'After-Brachot',
    titleHebrew: 'בְּרָכָה אַחֲרוֹנָה',
    category: 'brachot_food',
    sortOrder: 3,
    icon: '✅',
    summary: 'Which bracha to say after eating',
    whenRelevant: 'After eating or drinking a significant amount',
    whyItMatters:
      'Just as we thank God before eating, we also thank Him after. The Torah explicitly commands Birkat Hamazon (grace after meals with bread). After-brachot close the circle of gratitude — we don\'t just take and move on.',
    quickAnswer:
      'After bread: Birkat Hamazon (full grace). After grain snacks: Al HaMichya. After everything else: Borei Nefashot. You only need an after-bracha if you ate at least a k\'zayit (olive\'s volume) within a few minutes.',
    steps: [
      {
        id: 'ba-1',
        sortOrder: 1,
        instruction:
          'BIRKAT HAMAZON — After a bread meal. This is the longest after-bracha (a multi-paragraph grace). It is a Torah-level obligation.',
        tip: 'Birkat Hamazon is found in the siddur. Many people read it from a bentcher (small booklet). It\'s also available in the Siddur section of AlephStart.',
      },
      {
        id: 'ba-2',
        sortOrder: 2,
        instruction:
          'AL HAMICHYA — After eating grain products that were Mezonot (cake, cookies, pasta). Also after eating grapes, figs, pomegranates, olives, or dates (the 7 species).',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם עַל הַמִּחְיָה וְעַל הַכַּלְכָּלָה...',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam al hamichya v'al hakalkalah...",
        translation: 'Blessed are You... for the sustenance and nourishment...',
        tip: 'The full text varies slightly depending on what you ate (grain vs. grapes vs. fruit). Check a siddur for the specific version.',
      },
      {
        id: 'ba-3',
        sortOrder: 3,
        instruction:
          'BOREI NEFASHOT — The after-bracha for everything else (meat, vegetables, water, juice, candy, etc.).',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם בּוֹרֵא נְפָשׁוֹת רַבּוֹת וְחֶסְרוֹנָן עַל כָּל מַה שֶּׁבָּרָאתָ לְהַחֲיוֹת בָּהֶם נֶפֶשׁ כָּל חָי בָּרוּךְ חֵי הָעוֹלָמִים',
        transliteration:
          "Baruch Atah Adonai Eloheinu Melech ha'olam borei nefashot rabot v'chesronan al kol mah shebarata l'hachayot bahem nefesh kol chai, Baruch Chei ha'olamim",
        translation:
          'Blessed are You... who creates many living things and their needs, for everything You created to sustain every living soul. Blessed is the Life of all worlds.',
      },
    ],
    practicalTips: [
      "You only say an after-bracha if you ate at least a k'zayit (about the size of a large olive) within 3-4 minutes",
      'After a bread meal, Birkat Hamazon covers everything you ate during the meal',
      'Keep a bentcher (grace after meals booklet) handy until you memorize it',
      'Borei Nefashot is short — try to memorize it first, then work on Al HaMichya',
    ],
    sources: [
      'Deuteronomy 8:10 (Torah source for Birkat Hamazon)',
      'Shulchan Aruch, Orach Chaim 184-200',
      'Kitzur Shulchan Aruch 44:1',
    ],
    quiz: [
      {
        id: 'ba-q1',
        question: 'What do you say after eating a bread meal?',
        options: ['Borei Nefashot', 'Al HaMichya', 'Birkat Hamazon', 'Shehakol'],
        correctIndex: 2,
        explanation: 'Birkat Hamazon (Grace After Meals) is said after any meal containing bread.',
        source: 'Deuteronomy 8:10',
      },
      {
        id: 'ba-q2',
        question: 'What is the after-bracha for a glass of water?',
        options: ['Nothing', 'Borei Nefashot', 'Al HaMichya', 'Birkat Hamazon'],
        correctIndex: 1,
        explanation: 'Water (and most beverages) requires Borei Nefashot, as long as you drank a revi\'it (about 3 oz).',
        source: 'Shulchan Aruch, Orach Chaim 190:1',
      },
    ],
    relatedGuideIds: ['bracha-system', 'washing-for-bread'],
  },
  {
    id: 'asher-yatzar-guide',
    slug: 'asher-yatzar-guide',
    title: 'Asher Yatzar',
    titleHebrew: 'אֲשֶׁר יָצַר',
    category: 'brachot_food',
    sortOrder: 4,
    icon: '🙏',
    summary: 'The bracha after using the bathroom',
    whenRelevant: 'After using the restroom (each time)',
    whyItMatters:
      'This seemingly simple bracha is actually one of the most profound in Judaism. It thanks God for the miraculous design of the human body — that all the openings and cavities function properly. When you consider that a single blockage could be life-threatening, it becomes a powerful statement of gratitude for health.',
    quickAnswer:
      'After using the bathroom and washing your hands with soap and water, recite Asher Yatzar — a bracha thanking God for the functioning of your body.',
    steps: [
      {
        id: 'ay-1',
        sortOrder: 1,
        instruction: 'After using the bathroom, wash your hands with soap and water as you normally would.',
      },
      {
        id: 'ay-2',
        sortOrder: 2,
        instruction: 'Once you have exited the bathroom (or at least stepped away from the toilet area), say Asher Yatzar:',
        hebrewText:
          'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר יָצַר אֶת הָאָדָם בְּחָכְמָה וּבָרָא בוֹ נְקָבִים נְקָבִים חֲלוּלִים חֲלוּלִים. גָּלוּי וְיָדוּעַ לִפְנֵי כִסֵּא כְבוֹדֶךָ שֶׁאִם יִפָּתֵחַ אֶחָד מֵהֶם אוֹ יִסָּתֵם אֶחָד מֵהֶם אִי אֶפְשַׁר לְהִתְקַיֵּם וְלַעֲמוֹד לְפָנֶיךָ אֲפִלּוּ שָׁעָה אֶחָת. בָּרוּךְ אַתָּה ה\' רוֹפֵא כָל בָּשָׂר וּמַפְלִיא לַעֲשׂוֹת',
        transliteration:
          "Baruch Atah Adonai Eloheinu Melech ha'olam asher yatzar et ha'adam b'chochmah uvara vo nekavim nekavim chalulim chalulim. Galui v'yadua lifnei chisei ch'vodecha she'im yipatei'ach echad mehem o yisatem echad mehem i efshar l'hitkayem v'la'amod l'fanecha afilu sha'ah echat. Baruch Atah Adonai rofei chol basar umafli la'asot.",
        translation:
          'Blessed are You, Lord our God, King of the universe, who formed man with wisdom and created within him many openings and many cavities. It is revealed and known before Your throne of glory that if one of them were to be opened or one of them were to be blocked, it would be impossible to survive and stand before You even for one hour. Blessed are You, Lord, who heals all flesh and acts wondrously.',
        audioUrl: '/audio/prayers/asher-yatzar/asher-yatzar-1.mp3',
      },
    ],
    practicalTips: [
      'Say it every time you use the bathroom, not just in the morning',
      'Keep a laminated card with the text near your bathroom mirror until you memorize it',
      'It should be said outside the bathroom itself',
      'Doctors and medical professionals often find this bracha particularly meaningful',
    ],
    sources: [
      'Shulchan Aruch, Orach Chaim 7:1',
      'Talmud Berachot 60b',
      'Mishnah Berurah 7:1',
    ],
    quiz: [
      {
        id: 'ay-q1',
        question: 'How often should Asher Yatzar be said?',
        options: ['Once in the morning', 'Once a day', 'Every time you use the bathroom', 'Only on Shabbat'],
        correctIndex: 2,
        explanation: 'Asher Yatzar is said every time you use the restroom, throughout the day.',
        source: 'Shulchan Aruch, Orach Chaim 7:1',
      },
      {
        id: 'ay-q2',
        question: 'Where should Asher Yatzar be said?',
        options: ['In the bathroom', 'Outside the bathroom', 'At the dining table', 'In the synagogue only'],
        correctIndex: 1,
        explanation: 'Like all brachot, Asher Yatzar should be said outside the bathroom, in a clean place.',
        source: 'Shulchan Aruch, Orach Chaim 76:1',
      },
    ],
    relatedGuideIds: ['negel-vasser'],
    relatedPrayerIds: ['asher-yatzar'],
  },
];

// ══════════════════════════════════════════
// PERSONAL CARE GUIDES
// ══════════════════════════════════════════

const PERSONAL_CARE_GUIDES: Guide[] = [
  {
    id: 'hair-and-nails',
    slug: 'hair-and-nails',
    title: 'Hair & Nails',
    titleHebrew: 'שֵׂעָר וְצִפָּרְנַיִם',
    category: 'personal_care',
    sortOrder: 1,
    icon: '✂️',
    summary: 'Halachic guidelines for grooming',
    whenRelevant: 'When cutting hair or trimming nails',
    whyItMatters:
      'Even simple acts like cutting nails have spiritual significance in Judaism. These customs connect us to a chain of tradition and remind us that every aspect of our lives — even grooming — can be done with intention and holiness.',
    quickAnswer:
      'Don\'t cut hair and nails on the same day. For nails, don\'t cut them in order — alternate hands. Don\'t cut nails on Thursday (some say) or Shabbat/Yom Tov. Many cut nails on Friday in honor of Shabbat.',
    steps: [
      {
        id: 'hn-1',
        sortOrder: 1,
        instruction: 'NAILS — The traditional order for cutting fingernails is to alternate fingers, not go in sequence.',
        tip: 'A common order for the left hand: 4-2-5-3-1 (ring, index, pinky, middle, thumb). Right hand: 2-4-1-3-5.',
      },
      {
        id: 'hn-2',
        sortOrder: 2,
        instruction: 'Do NOT cut fingernails and toenails on the same day.',
        tip: 'Many people cut fingernails on Friday (erev Shabbat) and toenails on a different day.',
      },
      {
        id: 'hn-3',
        sortOrder: 3,
        instruction: 'Hair and nails should not be cut on the same day.',
      },
      {
        id: 'hn-4',
        sortOrder: 4,
        instruction: 'Many have the custom not to cut nails on Thursday.',
        tip: 'The reason: nails begin to regrow on the third day, which would be Shabbat. Cutting on Friday avoids this.',
      },
      {
        id: 'hn-5',
        sortOrder: 5,
        instruction: 'Do NOT cut hair or nails on Shabbat or Yom Tov.',
      },
      {
        id: 'hn-6',
        sortOrder: 6,
        instruction:
          'Dispose of nail clippings properly — they should not be left on the floor where people walk.',
        tip: 'The Talmud says to burn or flush nail clippings. Throwing them in the trash is also acceptable.',
      },
      {
        id: 'hn-7',
        sortOrder: 7,
        instruction: 'HAIR — Men should not cut the peyot (sideburns) completely with a razor. Using scissors is fine.',
        tip: 'The Torah prohibition is specifically against destroying the corners of the beard with a razor (Leviticus 19:27). Electric shavers are generally permitted.',
      },
    ],
    practicalTips: [
      'Friday is the ideal day for a haircut and fingernail trimming — in honor of Shabbat',
      'If you forget the alternating nail order, just do the best you can',
      "These are customs (minhagim) with deep roots — don't stress about getting every detail perfect",
      'During Sefirat HaOmer and the Three Weeks, there are additional restrictions on haircuts',
    ],
    commonMistakes: [
      "Don't worry if you've been cutting nails in order your whole life — just start alternating from now on",
      'These are gradual practices — adopt them at your own pace',
    ],
    sources: [
      'Shulchan Aruch, Orach Chaim 260:1 (cutting nails for Shabbat)',
      'Mishnah Berurah 260:6 (alternating order)',
      'Shulchan Aruch, Yoreh Deah 181:10 (peyot)',
      'Talmud Moed Katan 18a (not on the same day)',
      'Kitzur Shulchan Aruch 72:14',
    ],
    quiz: [
      {
        id: 'hn-q1',
        question: 'Should you cut fingernails and toenails on the same day?',
        options: ['Yes, save time', 'No, different days', 'Only on Friday', 'It doesn\'t matter'],
        correctIndex: 1,
        explanation: 'The minhag is to cut fingernails and toenails on different days.',
        source: 'Mishnah Berurah 260:6',
      },
      {
        id: 'hn-q2',
        question: 'What is the best day to cut nails?',
        options: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
        correctIndex: 2,
        explanation: 'Friday (Erev Shabbat) is the preferred day — grooming in honor of Shabbat.',
        source: 'Shulchan Aruch, Orach Chaim 260:1',
      },
    ],
  },
];

// ══════════════════════════════════════════
// SHABBAT GUIDES
// ══════════════════════════════════════════

const SHABBAT_GUIDES: Guide[] = [
  {
    id: 'shabbat-candles',
    slug: 'shabbat-candles',
    title: 'Candle Lighting',
    titleHebrew: 'הַדְלָקַת נֵרוֹת',
    category: 'shabbat',
    sortOrder: 1,
    icon: '🕯️',
    summary: 'Welcoming Shabbat with candle lighting',
    whenRelevant: '18 minutes before sunset on Friday evening',
    whyItMatters:
      'Lighting Shabbat candles brings light, peace, and holiness into your home. It is one of the most beautiful and meaningful mitzvot, traditionally performed by women. The moment the candles are lit, Shabbat enters your home — transforming ordinary time into sacred time.',
    quickAnswer:
      'Light at least 2 candles 18 minutes before sunset on Friday. After lighting, cover your eyes, say the bracha, then uncover and enjoy the light. Once you light, Shabbat has begun for you.',
    steps: [
      {
        id: 'sc-1',
        sortOrder: 1,
        instruction: 'Set up at least 2 candles on a stable surface. Many families use special Shabbat candlesticks.',
        tip: 'Some women light an additional candle for each child. The minimum is 2.',
      },
      {
        id: 'sc-2',
        sortOrder: 2,
        instruction: 'Light the candles. Then wave your hands over the flames three times, drawing the light toward you.',
      },
      {
        id: 'sc-3',
        sortOrder: 3,
        instruction: 'Cover your eyes with your hands and say the bracha:',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל שַׁבָּת',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam asher kid'shanu b'mitzvotav v'tzivanu l'hadlik ner shel Shabbat",
        translation: 'Blessed are You... who sanctified us with His commandments and commanded us to kindle the Shabbat light.',
        tip: 'We cover our eyes so that we say the bracha before "seeing" the candles — preserving the order of bracha first, then enjoyment.',
      },
      {
        id: 'sc-4',
        sortOrder: 4,
        instruction: 'While your eyes are covered, take a moment for personal prayer. Many women pray for their family at this special moment.',
      },
      {
        id: 'sc-5',
        sortOrder: 5,
        instruction: 'Open your eyes and enjoy the candlelight. Shabbat Shalom!',
        tip: 'Once you light and say the bracha, Shabbat has begun for you. You may no longer do melacha (creative work).',
      },
    ],
    practicalTips: [
      'Check your local candle lighting time — it changes weekly',
      'If you miss the 18-minute mark, you can still light up until sunset',
      'Tea lights work if you don\'t have Shabbat candles',
      'Men should light if no woman is present in the household',
      'On Yom Tov, the bracha ends with "...l\'hadlik ner shel Yom Tov"',
    ],
    sources: [
      'Shulchan Aruch, Orach Chaim 263:1-5',
      'Mishnah Berurah 263:1',
      'Talmud Shabbat 25b',
    ],
    quiz: [
      {
        id: 'sc-q1',
        question: 'When should Shabbat candles be lit?',
        options: ['At sunset', '18 minutes before sunset', 'After sunset', 'Whenever you want on Friday'],
        correctIndex: 1,
        explanation: 'Candles are lit 18 minutes before sunset to ensure we accept Shabbat on time.',
        source: 'Shulchan Aruch, Orach Chaim 263:4',
      },
      {
        id: 'sc-q2',
        question: 'Why do we cover our eyes when saying the bracha?',
        options: ['It\'s a custom with no reason', 'To say bracha before benefiting from the light', 'To concentrate better', 'To hide from the candles'],
        correctIndex: 1,
        explanation: 'Normally brachot are said before the action. Since lighting creates Shabbat (after which we can\'t light), we light first but "delay" benefiting by covering our eyes.',
        source: 'Mishnah Berurah 263:27',
      },
    ],
    relatedGuideIds: ['kiddush-guide', 'havdalah-guide'],
  },
  {
    id: 'kiddush-guide',
    slug: 'kiddush-guide',
    title: 'Kiddush',
    titleHebrew: 'קִדּוּשׁ',
    category: 'shabbat',
    sortOrder: 2,
    icon: '🍷',
    summary: 'Sanctifying Shabbat over wine',
    whenRelevant: 'Friday night and Shabbat day, before the meal',
    whyItMatters:
      'Kiddush ("sanctification") fulfills the Torah commandment to "remember the Sabbath day to keep it holy" (Exodus 20:8). By reciting Kiddush over wine, we verbally declare that Shabbat is set apart — holy and different from the rest of the week.',
    quickAnswer:
      'Hold a cup of wine or grape juice, stand (some sit), recite the Kiddush text (found in the siddur), drink, and share with everyone at the table.',
    steps: [
      {
        id: 'ki-1',
        sortOrder: 1,
        instruction: 'Fill a kiddush cup with wine or grape juice. The cup should be full.',
        tip: 'A kiddush cup holds at least a revi\'it (about 3.3 fl oz / 98ml). Any cup works.',
      },
      {
        id: 'ki-2',
        sortOrder: 2,
        instruction: 'Hold the cup in your right hand, slightly elevated.',
      },
      {
        id: 'ki-3',
        sortOrder: 3,
        instruction: 'Recite the Friday night Kiddush. It begins with "Vayechulu" (the Torah\'s account of God resting on the seventh day) followed by the bracha over wine and the bracha of Kiddush.',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם בּוֹרֵא פְּרִי הַגָּפֶן',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam borei p'ri hagafen",
        translation: 'Blessed are You... who creates the fruit of the vine.',
        tip: 'The full Kiddush text is in the siddur and available in AlephStart\'s Siddur section.',
      },
      {
        id: 'ki-4',
        sortOrder: 4,
        instruction: 'Drink at least a cheek-full (melo lugmav) of wine — more than half the cup is ideal.',
      },
      {
        id: 'ki-5',
        sortOrder: 5,
        instruction: 'Share the remaining wine with everyone at the table. They should each drink a little.',
        tip: 'If there\'s not enough wine to share, pour from the kiddush cup into small cups for everyone.',
      },
    ],
    practicalTips: [
      'Grape juice works just as well as wine for Kiddush',
      'Everyone at the table fulfills their obligation by listening — they just need to answer "Amen"',
      'Shabbat day Kiddush is shorter — just the bracha over wine plus a short paragraph',
      'Practice the Kiddush text in AlephStart\'s Siddur section',
    ],
    sources: [
      'Exodus 20:8 — "Remember the Sabbath day to sanctify it"',
      'Shulchan Aruch, Orach Chaim 271:1-10',
      'Talmud Pesachim 106a',
    ],
    quiz: [
      {
        id: 'ki-q1',
        question: 'Can you make Kiddush on grape juice instead of wine?',
        options: ['No, only wine', 'Yes, grape juice is fine', 'Only for children', 'Only if no wine is available'],
        correctIndex: 1,
        explanation: 'Grape juice is fully acceptable for Kiddush since it is also "p\'ri hagafen."',
        source: 'Shulchan Aruch, Orach Chaim 272:2',
      },
      {
        id: 'ki-q2',
        question: 'What Torah commandment does Kiddush fulfill?',
        options: ['Love your neighbor', 'Remember the Sabbath', 'Honor your parents', 'Do not steal'],
        correctIndex: 1,
        explanation: '"Remember the Sabbath day to sanctify it" (Exodus 20:8) — the Sages taught this means to sanctify it verbally over wine.',
        source: 'Talmud Pesachim 106a',
      },
    ],
    relatedGuideIds: ['shabbat-candles', 'havdalah-guide'],
  },
  {
    id: 'havdalah-guide',
    slug: 'havdalah-guide',
    title: 'Havdalah',
    titleHebrew: 'הַבְדָּלָה',
    category: 'shabbat',
    sortOrder: 3,
    icon: '🌙',
    summary: 'Saying goodbye to Shabbat',
    whenRelevant: 'Saturday night after three stars appear (about 45-72 minutes after sunset)',
    whyItMatters:
      'Havdalah ("separation") marks the transition from the holy Shabbat back to the weekday. It involves all the senses: seeing the flame, smelling the spices, tasting the wine, and hearing the brachot. It is a beautiful, multi-sensory way to hold onto the sweetness of Shabbat for one last moment.',
    quickAnswer:
      'After Shabbat ends (3 stars visible), say 4 brachot over wine, spices, and a multi-wicked candle. Then extinguish the candle in the wine.',
    steps: [
      {
        id: 'hv-1',
        sortOrder: 1,
        instruction: 'Prepare: a full cup of wine/grape juice, a spice box (besamim), and a multi-wicked havdalah candle.',
        tip: 'If you don\'t have a havdalah candle, hold two regular candles together so the flames merge.',
      },
      {
        id: 'hv-2',
        sortOrder: 2,
        instruction: 'Hold the cup of wine and say the bracha over wine.',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם בּוֹרֵא פְּרִי הַגָּפֶן',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam borei p'ri hagafen",
        translation: 'Blessed are You... who creates the fruit of the vine.',
      },
      {
        id: 'hv-3',
        sortOrder: 3,
        instruction: 'Pick up the spice box and say the bracha. Then smell the spices.',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם בּוֹרֵא מִינֵי בְשָׂמִים',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam borei minei v'samim",
        translation: 'Blessed are You... who creates various kinds of spices.',
        tip: 'The spices comfort us for the loss of the "extra soul" (neshamah yeteirah) that departs when Shabbat ends.',
      },
      {
        id: 'hv-4',
        sortOrder: 4,
        instruction: 'Hold your hands up to the havdalah candle and say the bracha. Look at the light reflected on your fingernails.',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם בּוֹרֵא מְאוֹרֵי הָאֵשׁ',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam borei m'orei ha'eish",
        translation: 'Blessed are You... who creates the lights of fire.',
        tip: 'Curl your fingers inward to see the light reflected on your nails — this is the traditional way to "use" the fire light.',
      },
      {
        id: 'hv-5',
        sortOrder: 5,
        instruction: 'Say the final bracha of Havdalah — the bracha of separation.',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם הַמַּבְדִּיל בֵּין קֹדֶשׁ לְחוֹל בֵּין אוֹר לְחוֹשֶׁךְ בֵּין יִשְׂרָאֵל לָעַמִּים בֵּין יוֹם הַשְּׁבִיעִי לְשֵׁשֶׁת יְמֵי הַמַּעֲשֶׂה. בָּרוּךְ אַתָּה ה\' הַמַּבְדִּיל בֵּין קֹדֶשׁ לְחוֹל',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam hamavdil bein kodesh l'chol, bein or l'choshech, bein Yisrael la'amim, bein yom hashvi'i l'sheishet y'mei hama'aseh. Baruch Atah Adonai hamavdil bein kodesh l'chol.",
        translation: 'Blessed are You... who distinguishes between sacred and mundane, between light and darkness, between Israel and the nations, between the seventh day and the six days of work. Blessed are You, Lord, who distinguishes between sacred and mundane.',
      },
      {
        id: 'hv-6',
        sortOrder: 6,
        instruction: 'Drink the wine. Then extinguish the candle in the remaining wine.',
        tip: 'It is customary to sing "Shavua Tov" (A Good Week) after Havdalah.',
      },
    ],
    practicalTips: [
      'Havdalah should be done as soon as possible after Shabbat ends',
      'Everyone in the family should listen and answer "Amen" to each bracha',
      'If you don\'t have spices, you can skip that bracha',
      'If you don\'t have a multi-wicked candle, two candles held together work',
      'Many people sing "Eliyahu HaNavi" before Havdalah',
    ],
    sources: [
      'Shulchan Aruch, Orach Chaim 296-299',
      'Talmud Pesachim 103b-104a',
      'Talmud Berachot 33a',
    ],
    quiz: [
      {
        id: 'hv-q1',
        question: 'Why do we smell spices during Havdalah?',
        options: ['To wake us up', 'To comfort us as the extra Shabbat soul departs', 'For good luck', 'To smell nice'],
        correctIndex: 1,
        explanation: 'The Talmud teaches that we receive a neshamah yeteirah (extra soul) on Shabbat. The spices comfort us as it departs.',
        source: 'Talmud Beitzah 16a',
      },
      {
        id: 'hv-q2',
        question: 'What kind of candle is used for Havdalah?',
        options: ['Single wick', 'Multi-wicked (braided)', 'Any candle', 'A yahrzeit candle'],
        correctIndex: 1,
        explanation: 'A multi-wicked candle is used because the bracha says "m\'orei ha\'eish" (lights of fire — plural).',
        source: 'Shulchan Aruch, Orach Chaim 298:2',
      },
    ],
    relatedGuideIds: ['shabbat-candles', 'kiddush-guide'],
  },
];

// ══════════════════════════════════════════
// DAILY ITEMS GUIDES
// ══════════════════════════════════════════

const DAILY_ITEMS_GUIDES: Guide[] = [
  {
    id: 'kippah-guide',
    slug: 'kippah-guide',
    title: 'Kippah',
    titleHebrew: 'כִּפָּה',
    category: 'daily_items',
    sortOrder: 1,
    icon: '🧢',
    summary: 'Covering your head as a sign of reverence',
    whenRelevant: 'Jewish men: all day (or at minimum during prayer and eating). In a synagogue: everyone.',
    whyItMatters:
      'Wearing a kippah (also called a yarmulke) is a constant reminder that God is above us. It cultivates humility and Jewish identity. While not a biblical commandment, it has become one of the most recognized signs of Jewish observance.',
    quickAnswer:
      'Jewish men traditionally cover their head at all times with a kippah. At minimum, cover your head during prayer, blessings, Torah study, and when eating.',
    steps: [
      {
        id: 'kp-1',
        sortOrder: 1,
        instruction: 'Place a kippah on the crown of your head. It should sit securely.',
        tip: 'Kippot come in many styles: knitted (srugah), velvet, suede, leather. Choose one that feels comfortable and reflects your style.',
      },
      {
        id: 'kp-2',
        sortOrder: 2,
        instruction: 'Wear it during all prayers, brachot, Torah study, and when eating.',
      },
      {
        id: 'kp-3',
        sortOrder: 3,
        instruction: 'Many observant Jewish men wear a kippah all day as a constant sign of awareness of God.',
        tip: 'If you\'re just starting, wearing it during prayer and meals is a great first step.',
      },
    ],
    practicalTips: [
      'Bobby pins or clips can help keep it in place on windy days',
      'Keep a spare in your pocket, car, or bag',
      'When visiting a synagogue, there are usually kippot available at the entrance',
      'There is no bracha said when putting on a kippah',
    ],
    commonMistakes: [
      'There is no "right" type of kippah — knitted, black velvet, any style is valid',
      'It doesn\'t have to cover your entire head — just resting on the crown is sufficient',
    ],
    sources: [
      'Talmud Shabbat 156b — "Cover your head so that the fear of Heaven will be upon you"',
      'Shulchan Aruch, Orach Chaim 2:6',
      'Mishnah Berurah 2:11',
    ],
    quiz: [
      {
        id: 'kp-q1',
        question: 'When is the minimum time to wear a kippah?',
        options: ['Only in synagogue', 'During prayer, brachot, and eating', 'Only on Shabbat', 'Never required'],
        correctIndex: 1,
        explanation: 'At minimum, a kippah should be worn during prayer, brachot, Torah study, and eating.',
        source: 'Shulchan Aruch, Orach Chaim 91:3',
      },
    ],
  },
  {
    id: 'tzitzit-guide',
    slug: 'tzitzit-guide',
    title: 'Tzitzit',
    titleHebrew: 'צִיצִית',
    category: 'daily_items',
    sortOrder: 2,
    icon: '🧵',
    summary: 'The fringed garment worn daily',
    whenRelevant: 'During the daytime (after sunrise), every day except Shabbat night',
    whyItMatters:
      'The Torah commands us to wear tzitzit (fringes) on four-cornered garments as a reminder of all God\'s commandments. Wearing a tallit katan (small tzitzit garment) under your shirt keeps you connected to this mitzvah all day — a wearable reminder to live with intention.',
    quickAnswer:
      'Wear a tallit katan (a garment with 4 corners and fringes) under your shirt during the day. Say the bracha when putting it on each morning.',
    steps: [
      {
        id: 'tz-1',
        sortOrder: 1,
        instruction: 'Get a tallit katan (also called tzitzit or arba kanfot). It\'s a poncho-like garment with strings tied to each corner.',
        tip: 'They come in cotton, wool, or mesh. Mesh is popular in warm weather.',
      },
      {
        id: 'tz-2',
        sortOrder: 2,
        instruction: 'Each morning, check that the tzitzit strings are not tangled or torn. Hold the garment ready to put on.',
      },
      {
        id: 'tz-3',
        sortOrder: 3,
        instruction: 'Say the bracha before putting it on:',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ עַל מִצְוַת צִיצִית',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam asher kid'shanu b'mitzvotav v'tzivanu al mitzvat tzitzit",
        translation: 'Blessed are You... who sanctified us with His commandments and commanded us regarding the mitzvah of tzitzit.',
      },
      {
        id: 'tz-4',
        sortOrder: 4,
        instruction: 'Put it on and wear it under (or over) your shirt throughout the day.',
        tip: 'Many people tuck the strings in, while others leave them hanging out. Both are valid.',
      },
    ],
    practicalTips: [
      'Tzitzit are only worn during the day (when you can distinguish between the blue and white threads)',
      'If a string breaks, the tzitzit may still be kosher — check with a rabbi',
      'You can find tallit katan at any Judaica store or online',
      'Wash them regularly like any undergarment',
    ],
    sources: [
      'Numbers 15:38-40 — "They shall make tzitzit on the corners of their garments"',
      'Shulchan Aruch, Orach Chaim 8:1',
      'Mishnah Berurah 8:1',
    ],
    quiz: [
      {
        id: 'tz-q1',
        question: 'What is the purpose of tzitzit according to the Torah?',
        options: ['Fashion', 'To remember all of God\'s commandments', 'Protection from evil', 'A sign of priesthood'],
        correctIndex: 1,
        explanation: '"You shall see them and remember all the commandments of the Lord" (Numbers 15:39).',
        source: 'Numbers 15:39',
      },
      {
        id: 'tz-q2',
        question: 'When should tzitzit be worn?',
        options: ['All day and night', 'Only during prayer', 'During daytime hours', 'Only on Shabbat'],
        correctIndex: 2,
        explanation: 'Tzitzit are a daytime mitzvah — the Torah says "you shall see them," which implies daylight.',
        source: 'Shulchan Aruch, Orach Chaim 18:1',
      },
    ],
  },
];

// ══════════════════════════════════════════
// HOME GUIDES
// ══════════════════════════════════════════

const HOME_GUIDES: Guide[] = [
  {
    id: 'mezuzah-guide',
    slug: 'mezuzah-guide',
    title: 'Mezuzah',
    titleHebrew: 'מְזוּזָה',
    category: 'home',
    sortOrder: 1,
    icon: '🚪',
    summary: 'The scroll on your doorpost',
    whenRelevant: 'When moving into a new home or room',
    whyItMatters:
      'The mezuzah contains a hand-written parchment with the Shema — the declaration of God\'s unity. Placing it on your doorposts transforms your home into a sacred space. Every time you pass through a doorway and touch the mezuzah, you reconnect with God\'s presence in your daily life.',
    quickAnswer:
      'Affix a kosher mezuzah scroll (in a case) to the right doorpost of every room (except bathrooms). It goes on the upper third of the doorpost, tilted inward. Say a bracha when putting up the first one.',
    steps: [
      {
        id: 'mz-1',
        sortOrder: 1,
        instruction: 'Purchase kosher mezuzah scrolls (klafim). These must be hand-written by a sofer (scribe) on parchment.',
        tip: 'The scroll is what matters halachically, not the case. Buy from a reputable Judaica store. A basic kosher scroll starts around $30-40.',
      },
      {
        id: 'mz-2',
        sortOrder: 2,
        instruction: 'Determine which doorways need a mezuzah: every room that is at least 4x4 amot (about 6.5x6.5 feet), has a doorframe with two doorposts and a lintel.',
        tip: 'Bathrooms and very small closets are exempt. A garage used only for cars is generally exempt.',
      },
      {
        id: 'mz-3',
        sortOrder: 3,
        instruction: 'Place the mezuzah on the right doorpost as you enter the room, in the upper third of the doorpost.',
        tip: 'The Ashkenazi custom is to tilt it inward (top pointing into the room). Sefardim place it vertically.',
      },
      {
        id: 'mz-4',
        sortOrder: 4,
        instruction: 'Affix it with nails, screws, or strong double-sided tape. Then say the bracha (for the first one you put up):',
        hebrewText: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לִקְבֹּעַ מְזוּזָה',
        transliteration: "Baruch Atah Adonai Eloheinu Melech ha'olam asher kid'shanu b'mitzvotav v'tzivanu likboa mezuzah",
        translation: 'Blessed are You... who sanctified us with His commandments and commanded us to affix a mezuzah.',
        tip: 'Say one bracha and have in mind all the mezuzot you will put up. Then hang the rest without repeating the bracha.',
      },
      {
        id: 'mz-5',
        sortOrder: 5,
        instruction: 'Many people touch or kiss the mezuzah (touching it and then kissing their fingers) when passing through a doorway.',
      },
    ],
    practicalTips: [
      'Mezuzot should be checked by a sofer twice every 7 years to make sure the writing is still intact',
      'When moving, take your mezuzot with you (unless the next tenant is Jewish)',
      'Renters: you can use double-sided tape instead of nails if needed',
      'The scroll rolls up with the word "Shaddai" (שדי) visible at the top',
    ],
    sources: [
      'Deuteronomy 6:9 — "And you shall write them on the doorposts of your house"',
      'Shulchan Aruch, Yoreh Deah 285-291',
      'Kitzur Shulchan Aruch 11:1-7',
    ],
    quiz: [
      {
        id: 'mz-q1',
        question: 'On which side of the doorpost is the mezuzah placed?',
        options: ['Left as you enter', 'Right as you enter', 'Above the door', 'Either side'],
        correctIndex: 1,
        explanation: 'The mezuzah goes on the right side as you enter the room.',
        source: 'Shulchan Aruch, Yoreh Deah 289:2',
      },
      {
        id: 'mz-q2',
        question: 'What is inside a mezuzah case?',
        options: ['A printed prayer', 'A hand-written parchment scroll', 'A small Torah', 'A blessing card'],
        correctIndex: 1,
        explanation: 'A mezuzah contains a hand-written parchment (klaf) with two paragraphs of the Shema, written by a sofer (scribe).',
        source: 'Shulchan Aruch, Yoreh Deah 288:1',
      },
    ],
  },
  {
    id: 'kashrut-basics',
    slug: 'kashrut-basics',
    title: 'Kashrut Basics',
    titleHebrew: 'כַּשְׁרוּת',
    category: 'home',
    sortOrder: 2,
    icon: '🍽️',
    summary: 'The basics of keeping kosher',
    whenRelevant: 'When shopping, cooking, and eating',
    whyItMatters:
      'Kashrut (keeping kosher) is one of the most distinctive Jewish practices. It transforms every meal into an act of spiritual discipline and identity. By being mindful of what we eat, we sanctify the physical act of eating and connect to thousands of years of Jewish tradition.',
    quickAnswer:
      'The basics: Don\'t mix meat and dairy. Only eat animals that have split hooves and chew their cud (cow, lamb, deer — not pig). Only fish with fins and scales. Look for a hechsher (kosher symbol) on packaged foods.',
    steps: [
      {
        id: 'kb-1',
        sortOrder: 1,
        instruction: 'MEAT & DAIRY — Never eat meat and dairy together. Wait between them (customs vary: 1-6 hours after meat before dairy).',
        tip: 'Common wait times: Dutch/German custom: 1 hour. Standard: 3 hours. Strict/common Ashkenazi: 6 hours.',
      },
      {
        id: 'kb-2',
        sortOrder: 2,
        instruction: 'KOSHER ANIMALS — Only mammals with split hooves AND that chew their cud: cow, sheep, goat, deer. Pig has split hooves but doesn\'t chew cud — not kosher.',
      },
      {
        id: 'kb-3',
        sortOrder: 3,
        instruction: 'KOSHER FISH — Only fish with fins AND scales: salmon, tuna, cod, tilapia. Shellfish (shrimp, lobster, crab) are not kosher.',
      },
      {
        id: 'kb-4',
        sortOrder: 4,
        instruction: 'KOSHER POULTRY — Chicken, turkey, duck, and goose are kosher. Birds of prey are not.',
      },
      {
        id: 'kb-5',
        sortOrder: 5,
        instruction: 'HECHSHER — Look for a kosher symbol on packaged food. Common symbols include: OU (ⓤ), OK, Star-K, Kof-K, CRC.',
        tip: 'A "D" next to the symbol means dairy. A "P" means Pareve (neither meat nor dairy). "M" or "Glatt" means meat.',
      },
      {
        id: 'kb-6',
        sortOrder: 6,
        instruction: 'SEPARATE DISHES — Use separate dishes, pots, and utensils for meat and dairy. Many families have color-coded systems (e.g., blue for dairy, red for meat).',
        tip: 'Start with what you can: even having separate cutting boards is a meaningful first step.',
      },
    ],
    practicalTips: [
      'Fruits, vegetables, grains, and eggs are all pareve (neutral) — they can go with either meat or dairy',
      'When eating out, look for restaurants with kosher certification',
      'Start gradually — many people begin by avoiding mixing meat and dairy, then expand from there',
      'A rabbi can help you "kasher" (make kosher) your kitchen when you\'re ready',
      'Many common snacks are already kosher — check for the symbol',
    ],
    commonMistakes: [
      'Kosher is not the same as "blessed by a rabbi" — it\'s about the food itself and how it\'s prepared',
      "You don't need to go all-or-nothing — every step toward keeping kosher is meaningful",
    ],
    sources: [
      'Leviticus 11:1-47 (kosher animals)',
      'Deuteronomy 14:3-21 (kosher species)',
      'Exodus 23:19 — "Do not cook a kid in its mother\'s milk" (meat and dairy)',
      'Shulchan Aruch, Yoreh Deah 87-111',
    ],
    quiz: [
      {
        id: 'kb-q1',
        question: 'Why is a pig not kosher even though it has split hooves?',
        options: ['It\'s dirty', 'It doesn\'t chew its cud', 'It\'s too fatty', 'It lives in mud'],
        correctIndex: 1,
        explanation: 'A kosher mammal needs BOTH split hooves AND to chew its cud. Pig has split hooves but does not chew its cud.',
        source: 'Leviticus 11:7',
      },
      {
        id: 'kb-q2',
        question: 'What is a hechsher?',
        options: ['A type of kosher food', 'A kosher certification symbol on packaging', 'A rabbi who blesses food', 'A special cooking method'],
        correctIndex: 1,
        explanation: 'A hechsher is a symbol on food packaging indicating it has been certified as kosher by a supervising organization.',
      },
      {
        id: 'kb-q3',
        question: 'Can you eat a cheeseburger according to kashrut?',
        options: ['Yes, if the meat is kosher', 'No, you cannot mix meat and dairy', 'Only on weekdays', 'Only with kosher cheese'],
        correctIndex: 1,
        explanation: 'Mixing meat and dairy is one of the fundamental prohibitions of kashrut, derived from the Torah.',
        source: 'Exodus 23:19',
      },
    ],
  },
];

// ══════════════════════════════════════════
// COMBINED EXPORTS
// ══════════════════════════════════════════

export const GUIDES: Guide[] = [
  ...MORNING_GUIDES,
  ...BRACHOT_FOOD_GUIDES,
  ...PERSONAL_CARE_GUIDES,
  ...SHABBAT_GUIDES,
  ...DAILY_ITEMS_GUIDES,
  ...HOME_GUIDES,
];

// Helpers

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: GuideCategory): Guide[] {
  return GUIDES.filter((g) => g.category === category).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getGuideCategoryInfo(id: GuideCategory): GuideCategoryInfo | undefined {
  return GUIDE_CATEGORIES.find((c) => c.id === id);
}
