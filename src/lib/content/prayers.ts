import { Prayer } from '@/types';

/**
 * AlephDavening Prayer & Bracha Content
 *
 * Organized into two categories:
 *   - 'tefillah' — Core parts of davening (prayer service)
 *   - 'brachot' — Blessings over food, drink, etc.
 *
 * Each entry includes Hebrew with nekudot, transliteration, English translation,
 * contextual notes, and spiritual meaning.
 */

// ==========================================
// TEFILLAH — Main Parts of Prayer
// ==========================================

const TEFILLAH_PRAYERS: Prayer[] = [
  // ---- Modeh Ani ----
  {
    id: 'modeh-ani',
    slug: 'modeh-ani',
    nameHebrew: 'מוֹדֶה אֲנִי',
    nameEnglish: 'Modeh Ani',
    category: 'tefillah',
    sortOrder: 1,
    whenSaid: 'First thing upon waking, before getting out of bed',
    whySaid: 'We thank Hashem for returning our soul — for the gift of another day of life.',
    inspirationText: 'Every morning is a gift. Before your feet touch the ground, before you check your phone, before anything — you say "thank you." This prayer is your first conversation with God each day.',
    requiredLevel: 1,
    estimatedReadSeconds: 15,
    sections: [
      {
        id: 'modeh-ani-1',
        sortOrder: 1,
        hebrewText: 'מוֹדֶה אֲנִי לְפָנֶיךָ',
        transliteration: 'Modeh ani l\'fanecha',
        translation: 'I give thanks before You',
        notes: 'מוֹדֶה = I give thanks. אֲנִי = I. לְפָנֶיךָ = before You.',
        amud: {
          role: 'silent_individual',
          instruction: 'Said immediately upon waking, while still in bed',
        },
      },
      {
        id: 'modeh-ani-2',
        sortOrder: 2,
        hebrewText: 'מֶלֶךְ חַי וְקַיָּם',
        transliteration: 'Melech chai v\'kayam',
        translation: 'Living and eternal King',
        notes: 'מֶלֶךְ = King. חַי = living. וְקַיָּם = and enduring/eternal.',
        amud: {
          role: 'silent_individual',
          instruction: 'Said immediately upon waking, while still in bed',
        },
      },
      {
        id: 'modeh-ani-3',
        sortOrder: 3,
        hebrewText: 'שֶׁהֶחֱזַרְתָּ בִּי נִשְׁמָתִי',
        transliteration: 'She\'hechezarta bi nishmati',
        translation: 'For You have returned my soul within me',
        notes: 'שֶׁהֶחֱזַרְתָּ = that You returned. בִּי = within me. נִשְׁמָתִי = my soul.',
        amud: {
          role: 'silent_individual',
          instruction: 'Said immediately upon waking, while still in bed',
        },
      },
      {
        id: 'modeh-ani-4',
        sortOrder: 4,
        hebrewText: 'בְּחֶמְלָה רַבָּה אֱמוּנָתֶךָ',
        transliteration: 'B\'chemla raba emunatecha',
        translation: 'With compassion — great is Your faithfulness',
        notes: 'בְּחֶמְלָה = with compassion. רַבָּה = great/abundant. אֱמוּנָתֶךָ = Your faithfulness.',
        amud: {
          role: 'silent_individual',
          instruction: 'Said immediately upon waking, while still in bed',
        },
      },
    ],
  },

  // ---- Baruch She'amar ----
  {
    id: 'baruch-sheamar',
    slug: 'baruch-sheamar',
    nameHebrew: 'בָּרוּךְ שֶׁאָמַר',
    nameEnglish: 'Baruch She\'amar',
    category: 'tefillah',
    sortOrder: 2,
    whenSaid: 'At the start of Pesukei D\'Zimra (Verses of Praise), before Ashrei',
    whySaid: 'This bracha opens the Pesukei D\'Zimra section — the psalms and praises that prepare our hearts for the main prayer.',
    inspirationText: 'Before we ask God for anything, we spend time just praising Him. Baruch She\'amar is the doorway into that space of pure gratitude.',
    requiredLevel: 3,
    estimatedReadSeconds: 45,
    sections: [
      {
        id: 'baruch-sheamar-1',
        sortOrder: 1,
        hebrewText: 'בָּרוּךְ שֶׁאָמַר וְהָיָה הָעוֹלָם בָּרוּךְ הוּא',
        transliteration: 'Baruch she\'amar v\'hayah ha\'olam, Baruch Hu',
        translation: 'Blessed is He Who spoke and the world came into being, blessed is He',
        notes: 'God created the world through speech — "Let there be light." His word IS reality.',
        amud: {
          role: 'both',
          physicalActions: ['stand'],
          instruction: 'Stand for this prayer. Hold tzitzit in your hands.',
        },
      },
      {
        id: 'baruch-sheamar-2',
        sortOrder: 2,
        hebrewText: 'בָּרוּךְ עוֹשֶׂה בְרֵאשִׁית. בָּרוּךְ אוֹמֵר וְעוֹשֶׂה. בָּרוּךְ גּוֹזֵר וּמְקַיֵּם',
        transliteration: 'Baruch oseh v\'reishit. Baruch omeir v\'oseh. Baruch gozeir um\'kayeim',
        translation: 'Blessed is He Who makes creation. Blessed is He Who says and does. Blessed is He Who decrees and fulfills',
        notes: 'A series of praises acknowledging different aspects of God\'s creative and sustaining power.',
        amud: {
          role: 'both',
          physicalActions: ['stand'],
          instruction: 'Stand for this prayer. Hold tzitzit in your hands.',
        },
      },
      {
        id: 'baruch-sheamar-3',
        sortOrder: 3,
        hebrewText: 'בָּרוּךְ מְרַחֵם עַל הָאָרֶץ. בָּרוּךְ מְרַחֵם עַל הַבְּרִיּוֹת. בָּרוּךְ מְשַׁלֵּם שָׂכָר טוֹב לִירֵאָיו. בָּרוּךְ חַי לָעַד וְקַיָּם לָנֶצַח',
        transliteration: 'Baruch m\'racheim al ha\'aretz. Baruch m\'racheim al hab\'riyot. Baruch m\'shaleim sachar tov lirei\'av. Baruch chai la\'ad v\'kayam lanetzach',
        translation: 'Blessed is He Who has compassion on the earth. Blessed is He Who has compassion on the creatures. Blessed is He Who pays good reward to those who fear Him. Blessed is He Who lives forever and endures eternally',
        amud: {
          role: 'both',
          physicalActions: ['stand'],
          instruction: 'Stand for this prayer. Hold tzitzit in your hands.',
        },
      },
      {
        id: 'baruch-sheamar-4',
        sortOrder: 4,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם הָאֵל אָב הָרַחֲמָן הַמְהֻלָּל בְּפֵה עַמּוֹ מְשֻׁבָּח וּמְפֹאָר בִּלְשׁוֹן חֲסִידָיו וַעֲבָדָיו. בָּרוּךְ אַתָּה ה׳ מֶלֶךְ מְהֻלָּל בַּתִּשְׁבָּחוֹת',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam, ha\'Eil Av haRachaman, ham\'hulal b\'feh amo, m\'shubach um\'fo\'ar bilshon chasidav va\'avadav. Baruch Atah Adonai, Melech m\'hulal batishbachot',
        translation: 'Blessed are You, Lord our God, King of the universe, the God, merciful Father, praised by the mouth of His people, lauded and glorified by the tongue of His pious ones and servants. Blessed are You, Lord, King Who is praised with songs of praise',
        notes: 'The closing bracha — stand while saying this. Hold your tzitzit together if wearing a tallit.',
        amud: {
          role: 'both',
          physicalActions: ['stand'],
          instruction: 'Stand for this prayer. Hold tzitzit in your hands.',
        },
      },
    ],
  },

  // ---- Ashrei ----
  {
    id: 'ashrei',
    slug: 'ashrei',
    nameHebrew: 'אַשְׁרֵי',
    nameEnglish: 'Ashrei',
    category: 'tefillah',
    sortOrder: 2,
    whenSaid: 'Recited three times daily — twice in Shacharis (morning) and once in Mincha (afternoon)',
    whySaid: 'Ashrei is Psalm 145, an alphabetical praise of Hashem. The Talmud says that one who says Ashrei three times a day is assured a place in the World to Come.',
    inspirationText: 'This psalm covers every letter of the Hebrew aleph-bet (except Nun) — a complete, all-encompassing praise of God. It\'s a spiritual warmup before the Amidah.',
    requiredLevel: 3,
    estimatedReadSeconds: 120,
    sections: [
      {
        id: 'ashrei-intro-1',
        sortOrder: 1,
        hebrewText: 'אַשְׁרֵי יוֹשְׁבֵי בֵיתֶךָ עוֹד יְהַלְלוּךָ סֶּלָה',
        transliteration: 'Ashrei yosh\'vei veitecha, od y\'hal\'lucha selah',
        translation: 'Praiseworthy are those who dwell in Your house; they will yet praise You, Selah',
        notes: 'This opening verse (Psalm 84:5) sets the scene — those who are always in God\'s presence are the truly happy ones.',
        amud: {
          role: 'both',
          physicalActions: ['sit'],
          instruction: 'Sit for Ashrei',
        },
      },
      {
        id: 'ashrei-intro-2',
        sortOrder: 2,
        hebrewText: 'אַשְׁרֵי הָעָם שֶׁכָּכָה לּוֹ אַשְׁרֵי הָעָם שֶׁה׳ אֱלֹקָיו',
        transliteration: 'Ashrei ha\'am shekachah lo, ashrei ha\'am she\'Adonai Elokav',
        translation: 'Praiseworthy is the people for whom this is so; praiseworthy is the people whose God is the Lord',
        notes: 'From Psalm 144:15. We are fortunate that Hashem is our God.',
        amud: {
          role: 'both',
          physicalActions: ['sit'],
          instruction: 'Sit for Ashrei',
        },
      },
      {
        id: 'ashrei-aleph',
        sortOrder: 3,
        hebrewText: 'תְּהִלָּה לְדָוִד אֲרוֹמִמְךָ אֱלוֹקַי הַמֶּלֶךְ וַאֲבָרְכָה שִׁמְךָ לְעוֹלָם וָעֶד',
        transliteration: 'T\'hilah l\'David. Aromimcha Elokai haMelech, va\'avar\'chah shimcha l\'olam va\'ed',
        translation: 'A psalm of David. I will exalt You, my God the King, and I will bless Your Name forever and ever',
        notes: 'Psalm 145 begins. Each verse starts with a successive letter of the aleph-bet.',
        amud: {
          role: 'both',
          physicalActions: ['sit'],
          instruction: 'Sit for Ashrei',
        },
      },
      {
        id: 'ashrei-bet-gimel',
        sortOrder: 4,
        hebrewText: 'בְּכָל יוֹם אֲבָרְכֶךָּ וַאֲהַלְלָה שִׁמְךָ לְעוֹלָם וָעֶד. גָּדוֹל ה׳ וּמְהֻלָּל מְאֹד וְלִגְדֻלָּתוֹ אֵין חֵקֶר',
        transliteration: 'B\'chol yom avar\'cheka, va\'ahal\'lah shimcha l\'olam va\'ed. Gadol Adonai um\'hulal m\'od, v\'ligdulato ein cheiker',
        translation: 'Every day I will bless You, and I will praise Your Name forever. Great is the Lord and much praised, and His greatness is beyond investigation',
        notes: 'ב (Bet) and ג (Gimel) verses — daily praise and acknowledging God\'s infinite greatness.',
        amud: {
          role: 'both',
          physicalActions: ['sit'],
          instruction: 'Sit for Ashrei',
        },
      },
      {
        id: 'ashrei-dalet-hei',
        sortOrder: 5,
        hebrewText: 'דּוֹר לְדוֹר יְשַׁבַּח מַעֲשֶׂיךָ וּגְבוּרֹתֶיךָ יַגִּידוּ. הֲדַר כְּבוֹד הוֹדֶךָ וְדִבְרֵי נִפְלְאוֹתֶיךָ אָשִׂיחָה',
        transliteration: 'Dor l\'dor y\'shabach ma\'asecha, ug\'vurotecha yagidu. Hadar k\'vod hodecha, v\'divrei nifl\'otecha asichah',
        translation: 'Each generation will praise Your deeds to the next, and tell of Your mighty acts. The splendor of Your glorious majesty and Your wondrous deeds I will speak of',
        notes: 'ד (Dalet) and ה (Hei) verses — the chain of praise from generation to generation.',
        amud: {
          role: 'both',
          physicalActions: ['sit'],
          instruction: 'Sit for Ashrei',
        },
      },
      {
        id: 'ashrei-poteach',
        sortOrder: 6,
        hebrewText: 'פּוֹתֵחַ אֶת יָדֶךָ וּמַשְׂבִּיעַ לְכָל חַי רָצוֹן',
        transliteration: 'Pote\'ach et yadecha, umasbi\'a l\'chol chai ratzon',
        translation: 'You open Your hand and satisfy the desire of every living thing',
        notes: 'This is the key verse of Ashrei — God sustains all life. We say it with extra concentration (kavanah).',
        amud: {
          role: 'both',
          physicalActions: ['sit'],
          instruction: 'Sit for Ashrei',
        },
      },
      {
        id: 'ashrei-closing',
        sortOrder: 7,
        hebrewText: 'תְּהִלַּת ה׳ יְדַבֶּר פִּי וִיבָרֵךְ כָּל בָּשָׂר שֵׁם קָדְשׁוֹ לְעוֹלָם וָעֶד. וַאֲנַחְנוּ נְבָרֵךְ יָהּ מֵעַתָּה וְעַד עוֹלָם הַלְלוּיָהּ',
        transliteration: 'T\'hilat Adonai y\'daber pi, vivareich kol basar shem kodsho l\'olam va\'ed. Va\'anachnu n\'vareich Kah me\'atah v\'ad olam, Hal\'luyah',
        translation: 'My mouth will speak the praise of the Lord, and all flesh will bless His holy Name forever. And we will bless God from now until forever, Halleluyah',
        notes: 'The final verse of Psalm 145, followed by Psalm 115:18 as the closing.',
        amud: {
          role: 'both',
          physicalActions: ['sit'],
          instruction: 'Sit for Ashrei',
        },
      },
    ],
  },

  // ---- Yishtabach ----
  {
    id: 'yishtabach',
    slug: 'yishtabach',
    nameHebrew: 'יִשְׁתַּבַּח',
    nameEnglish: 'Yishtabach',
    category: 'tefillah',
    sortOrder: 4,
    whenSaid: 'At the end of Pesukei D\'Zimra, just before Barchu',
    whySaid: 'Yishtabach closes the Pesukei D\'Zimra section with 15 expressions of praise, sealing our preparation before the main service begins.',
    inspirationText: 'Think of Yishtabach as the closing bracket of praise. Baruch She\'amar opened it, and now you seal it — your heart is ready for the Shema and Amidah.',
    requiredLevel: 3,
    estimatedReadSeconds: 30,
    sections: [
      {
        id: 'yishtabach-1',
        sortOrder: 1,
        hebrewText: 'יִשְׁתַּבַּח שִׁמְךָ לָעַד מַלְכֵּנוּ הָאֵל הַמֶּלֶךְ הַגָּדוֹל וְהַקָּדוֹשׁ בַּשָּׁמַיִם וּבָאָרֶץ',
        transliteration: 'Yishtabach shimcha la\'ad Malkeinu, ha\'Eil haMelech hagadol v\'hakadosh bashamayim uva\'aretz',
        translation: 'May Your Name be praised forever, our King, the God, the great and holy King in heaven and on earth',
        notes: 'Stand for Yishtabach. 15 expressions of praise follow — matching the 15 "Songs of Ascent" (Shir HaMa\'alot) in Tehillim.',
      },
      {
        id: 'yishtabach-2',
        sortOrder: 2,
        hebrewText: 'כִּי לְךָ נָאֶה ה׳ אֱלֹקֵינוּ שִׁיר וּשְׁבָחָה הַלֵּל וְזִמְרָה עֹז וּמֶמְשָׁלָה נֶצַח גְּדֻלָּה וּגְבוּרָה תְּהִלָּה וְתִפְאֶרֶת קְדֻשָּׁה וּמַלְכוּת',
        transliteration: 'Ki l\'cha na\'eh Adonai Elokeinu shir ush\'vachah, hallel v\'zimrah, oz u\'memshalah, netzach g\'dulah ug\'vurah, t\'hilah v\'tiferet, k\'dushah u\'malchut',
        translation: 'For to You it is fitting, Lord our God: song and praise, hymn and melody, strength and dominion, eternity, greatness and power, praise and glory, holiness and sovereignty',
        notes: 'These 15 expressions of praise encapsulate everything we\'ve said in Pesukei D\'Zimra.',
      },
      {
        id: 'yishtabach-3',
        sortOrder: 3,
        hebrewText: 'בְּרָכוֹת וְהוֹדָאוֹת מֵעַתָּה וְעַד עוֹלָם. בָּרוּךְ אַתָּה ה׳ אֵל מֶלֶךְ גָּדוֹל בַּתִּשְׁבָּחוֹת אֵל הַהוֹדָאוֹת אֲדוֹן הַנִּפְלָאוֹת הַבּוֹחֵר בְּשִׁירֵי זִמְרָה מֶלֶךְ אֵל חֵי הָעוֹלָמִים',
        transliteration: 'B\'rachot v\'hoda\'ot me\'atah v\'ad olam. Baruch Atah Adonai, Eil Melech gadol batishbachot, Eil hahoda\'ot, Adon hanifla\'ot, haBocher b\'shirei zimrah, Melech Eil Chei ha\'olamim',
        translation: 'Blessings and thanksgivings from now and forever. Blessed are You, Lord, God, King exalted in praises, God of thanksgivings, Master of wonders, Who chooses musical songs of praise, King, God, Life of the worlds',
        notes: 'After Yishtabach, the chazzan says Kaddish (half-Kaddish), then Barchu — the formal call to prayer.',
      },
    ],
  },

  // ---- Yotzer Or (Bracha before Shema #1) ----
  {
    id: 'yotzer-or',
    slug: 'yotzer-or',
    nameHebrew: 'יוֹצֵר אוֹר',
    nameEnglish: 'Yotzer Or',
    category: 'tefillah',
    sortOrder: 5,
    whenSaid: 'First blessing before Shema, after Barchu',
    whySaid: 'We praise God as Creator of light and darkness — and acknowledge the angels who constantly praise Him.',
    inspirationText: 'After the call of Barchu, you enter the holiest part of the service. This first bracha thanks God for creating light — both physical and spiritual.',
    requiredLevel: 4,
    estimatedReadSeconds: 60,
    sections: [
      {
        id: 'yotzer-or-1',
        sortOrder: 1,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם יוֹצֵר אוֹר וּבוֹרֵא חֹשֶׁךְ עֹשֶׂה שָׁלוֹם וּבוֹרֵא אֶת הַכֹּל',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam, yotzer or u\'vorei choshech, oseh shalom u\'vorei et hakol',
        translation: 'Blessed are You, Lord our God, King of the universe, Who forms light and creates darkness, makes peace and creates all',
        notes: 'Based on Isaiah 45:7. God is the source of both light and dark — everything comes from Him.',
      },
      {
        id: 'yotzer-or-2',
        sortOrder: 2,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ יוֹצֵר הַמְּאוֹרוֹת',
        transliteration: 'Baruch Atah Adonai, yotzer ham\'orot',
        translation: 'Blessed are You, Lord, Who forms the luminaries',
        notes: 'The closing bracha — "Who forms the luminaries" (the sun, moon, and stars).',
      },
    ],
  },

  // ---- Ahavah Rabbah (Bracha before Shema #2) ----
  {
    id: 'ahavah-rabbah',
    slug: 'ahavah-rabbah',
    nameHebrew: 'אַהֲבָה רַבָּה',
    nameEnglish: 'Ahavah Rabbah',
    category: 'tefillah',
    sortOrder: 6,
    whenSaid: 'Second blessing before Shema, immediately before "Shema Yisrael"',
    whySaid: 'We ask God to help us understand and fulfill the Torah, because that\'s the ultimate expression of His love for us.',
    inspirationText: '"With a great love You have loved us." Right before declaring God\'s unity, we acknowledge that giving us the Torah was the greatest act of love.',
    requiredLevel: 4,
    estimatedReadSeconds: 45,
    sections: [
      {
        id: 'ahavah-rabbah-1',
        sortOrder: 1,
        hebrewText: 'אַהֲבָה רַבָּה אֲהַבְתָּנוּ ה׳ אֱלֹקֵינוּ חֶמְלָה גְדוֹלָה וִיתֵרָה חָמַלְתָּ עָלֵינוּ',
        transliteration: 'Ahavah rabbah ahavtanu Adonai Elokeinu, chemlah g\'dolah viteirah chamalta aleinu',
        translation: 'With a great love You have loved us, Lord our God; with great and abundant compassion have You pitied us',
        notes: 'אַהֲבָה רַבָּה = with a great love. This sets the tone — everything that follows flows from God\'s love.',
      },
      {
        id: 'ahavah-rabbah-2',
        sortOrder: 2,
        hebrewText: 'וְהָאֵר עֵינֵינוּ בְּתוֹרָתֶךָ וְדַבֵּק לִבֵּנוּ בְּמִצְוֹתֶיךָ וְיַחֵד לְבָבֵנוּ לְאַהֲבָה וּלְיִרְאָה אֶת שְׁמֶךָ',
        transliteration: 'V\'ha\'eir eineinu b\'Toratecha, v\'dabeik libeinu b\'mitzvotecha, v\'yacheid l\'vaveinu l\'ahavah ul\'yirah et sh\'mecha',
        translation: 'Enlighten our eyes in Your Torah, attach our hearts to Your commandments, and unify our hearts to love and revere Your Name',
        notes: 'We ask for understanding (eyes), commitment (heart), and wholeness (unity) in serving God.',
      },
      {
        id: 'ahavah-rabbah-3',
        sortOrder: 3,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ הַבּוֹחֵר בְּעַמּוֹ יִשְׂרָאֵל בְּאַהֲבָה',
        transliteration: 'Baruch Atah Adonai, haBocher b\'amo Yisrael b\'ahavah',
        translation: 'Blessed are You, Lord, Who chooses His people Israel with love',
        notes: 'The closing — God chose us out of love. Now we respond with the Shema, declaring our love back.',
      },
    ],
  },

  // ---- Emet V'Yatziv (Bracha after Shema) ----
  {
    id: 'emet-vyatziv',
    slug: 'emet-vyatziv',
    nameHebrew: 'אֱמֶת וְיַצִּיב',
    nameEnglish: 'Emet V\'Yatziv',
    category: 'tefillah',
    sortOrder: 8,
    whenSaid: 'Immediately after the Shema, connecting Shema to Shemoneh Esrei',
    whySaid: 'We affirm that what we just declared in the Shema is TRUE, and recall the Exodus — God\'s redemption. This bracha connects the Shema to the Amidah without interruption.',
    inspirationText: 'After declaring God is One, we say "It\'s TRUE!" — and we recall the greatest proof: the Exodus from Egypt. From truth comes redemption.',
    requiredLevel: 4,
    estimatedReadSeconds: 40,
    sections: [
      {
        id: 'emet-vyatziv-1',
        sortOrder: 1,
        hebrewText: 'אֱמֶת וְיַצִּיב וְנָכוֹן וְקַיָּם וְיָשָׁר וְנֶאֱמָן וְאָהוּב וְחָבִיב וְנֶחְמָד וְנָעִים',
        transliteration: 'Emet v\'yatziv v\'nachon v\'kayam v\'yashar v\'ne\'eman v\'ahuv v\'chaviv v\'nechmad v\'na\'im',
        translation: 'True and certain and correct and enduring and right and faithful and beloved and cherished and delightful and pleasant',
        notes: 'Ten expressions of truth — corresponding to the Ten Commandments and the ten sayings of Creation.',
      },
      {
        id: 'emet-vyatziv-2',
        sortOrder: 2,
        hebrewText: 'מִי כָמוֹכָה בָּאֵלִם ה׳ מִי כָּמֹכָה נֶאְדָּר בַּקֹּדֶשׁ נוֹרָא תְהִלֹּת עֹשֵׂה פֶלֶא',
        transliteration: 'Mi chamocha ba\'eilim Adonai, mi kamocha ne\'edar bakodesh, nora t\'hilot oseh feleh',
        translation: 'Who is like You among the mighty, Lord? Who is like You, majestic in holiness, awesome in praises, doing wonders?',
        notes: 'From the Song at the Sea (Exodus 15:11) — the climactic moment of the Exodus.',
      },
      {
        id: 'emet-vyatziv-3',
        sortOrder: 3,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ גָּאַל יִשְׂרָאֵל',
        transliteration: 'Baruch Atah Adonai, ga\'al Yisrael',
        translation: 'Blessed are You, Lord, Who redeemed Israel',
        notes: 'Past tense — "Who redeemed" — recalling the Exodus. Then immediately begin Shemoneh Esrei without pause (s\'michat ge\'ulah l\'tefillah).',
      },
    ],
  },

  // ---- Shema ----
  {
    id: 'shema',
    slug: 'shema',
    nameHebrew: 'שְׁמַע יִשְׂרָאֵל',
    nameEnglish: 'Shema',
    category: 'tefillah',
    sortOrder: 3,
    whenSaid: 'Morning and evening prayers, and before going to sleep',
    whySaid: 'The declaration of God\'s unity — the most fundamental statement of Jewish faith. Jews have said these words for over 3,000 years.',
    inspirationText: 'These six words are the heart of Judaism. They\'re the first words a Jewish child learns, the last words said before death, and every morning and evening in between. When you say Shema, you join a chain going back to Abraham.',
    requiredLevel: 3,
    estimatedReadSeconds: 60,
    sections: [
      {
        id: 'shema-1',
        sortOrder: 1,
        hebrewText: 'שְׁמַע יִשְׂרָאֵל ה׳ אֱלֹקֵינוּ ה׳ אֶחָד',
        transliteration: 'Shma Yisrael, Adonai Elokeinu, Adonai Echad',
        translation: 'Hear O Israel, the Lord is our God, the Lord is One',
        notes: 'שְׁמַע = Hear/Listen. יִשְׂרָאֵל = Israel (all of us). אֶחָד = One.',
        amud: {
          role: 'both',
          physicalActions: ['cover_eyes'],
          instruction: 'Cover your eyes with your right hand. Everyone says this line together.',
        },
      },
      {
        id: 'shema-2',
        sortOrder: 2,
        hebrewText: 'בָּרוּךְ שֵׁם כְּבוֹד מַלְכוּתוֹ לְעוֹלָם וָעֶד',
        transliteration: 'Baruch shem k\'vod malchuto l\'olam va\'ed',
        translation: 'Blessed is the Name of His glorious kingdom forever and ever',
        notes: 'This line is said quietly (except on Yom Kippur). It\'s a response to the declaration of God\'s unity.',
        amud: {
          role: 'silent_individual',
          instruction: 'Said quietly, in a whisper',
        },
      },
      {
        id: 'shema-3',
        sortOrder: 3,
        hebrewText: 'וְאָהַבְתָּ אֵת ה׳ אֱלֹקֶיךָ',
        transliteration: 'V\'ahavta et Adonai Elokecha',
        translation: 'And you shall love the Lord your God',
        notes: 'וְאָהַבְתָּ = And you shall love. This begins the first paragraph of the Shema.',
        amud: {
          role: 'silent_individual',
          instruction: 'Read along silently at your own pace',
        },
      },
      {
        id: 'shema-4',
        sortOrder: 4,
        hebrewText: 'בְּכָל לְבָבְךָ וּבְכָל נַפְשְׁךָ וּבְכָל מְאֹדֶךָ',
        transliteration: 'B\'chol l\'vav\'cha uv\'chol nafsh\'cha uv\'chol m\'odecha',
        translation: 'With all your heart, with all your soul, and with all your might',
        notes: 'לְבָבְךָ = your heart. נַפְשְׁךָ = your soul. מְאֹדֶךָ = your might/resources.',
        amud: {
          role: 'silent_individual',
          instruction: 'Read along silently at your own pace',
        },
      },
      {
        id: 'shema-5',
        sortOrder: 5,
        hebrewText: 'וְהָיוּ הַדְּבָרִים הָאֵלֶּה אֲשֶׁר אָנֹכִי מְצַוְּךָ הַיּוֹם עַל לְבָבֶךָ',
        transliteration: 'V\'hayu had\'varim ha\'eileh asher anochi m\'tzav\'cha hayom al l\'vavecha',
        translation: 'And these words which I command you today shall be upon your heart',
        notes: 'הַדְּבָרִים = the words/things. הַיּוֹם = today (every day feels like the first time).',
        amud: {
          role: 'silent_individual',
          instruction: 'Read along silently at your own pace',
        },
      },
      {
        id: 'shema-6',
        sortOrder: 6,
        hebrewText: 'וְשִׁנַּנְתָּם לְבָנֶיךָ וְדִבַּרְתָּ בָּם',
        transliteration: 'V\'shinantam l\'vanecha v\'dibarta bam',
        translation: 'And you shall teach them to your children, and speak of them',
        notes: 'וְשִׁנַּנְתָּם = and you shall teach (sharpen). לְבָנֶיךָ = to your children.',
        amud: {
          role: 'silent_individual',
          instruction: 'Read along silently at your own pace',
        },
      },
      {
        id: 'shema-7',
        sortOrder: 7,
        hebrewText: 'בְּשִׁבְתְּךָ בְּבֵיתֶךָ וּבְלֶכְתְּךָ בַדֶּרֶךְ',
        transliteration: 'B\'shiv\'t\'cha b\'veitecha uv\'lecht\'cha vaderech',
        translation: 'When you sit in your house, and when you walk on the way',
        notes: 'בְּבֵיתֶךָ = in your house. בַדֶּרֶךְ = on the road/way.',
        amud: {
          role: 'silent_individual',
          instruction: 'Read along silently at your own pace',
        },
      },
      {
        id: 'shema-8',
        sortOrder: 8,
        hebrewText: 'וּבְשָׁכְבְּךָ וּבְקוּמֶךָ',
        transliteration: 'Uv\'shoch\'b\'cha uv\'kumecha',
        translation: 'When you lie down and when you rise up',
        notes: 'This is why we say Shema morning and evening — "when you lie down and when you rise up."',
        amud: {
          role: 'silent_individual',
          instruction: 'Read along silently at your own pace',
        },
      },
    ],
  },

  // ---- Shemoneh Esrei (Amidah) — Full 19 Brachot ----
  {
    id: 'shemoneh-esrei',
    slug: 'shemoneh-esrei',
    nameHebrew: 'שְׁמוֹנֶה עֶשְׂרֵה',
    nameEnglish: 'Shemoneh Esrei (Amidah)',
    category: 'tefillah',
    sortOrder: 4,
    whenSaid: 'Three times daily — Shacharis (morning), Mincha (afternoon), and Maariv (evening). Said standing, with feet together, facing Jerusalem.',
    whySaid: 'The Shemoneh Esrei ("Eighteen," though it actually has 19 blessings) is the central prayer of every Jewish service. It is our direct, personal conversation with Hashem — we praise Him, ask for our needs, and give thanks.',
    inspirationText: 'This is the moment you stand before the King of Kings. Take three steps forward as if approaching a throne, whisper each word, and pour out your heart. The Sages structured these 19 blessings to cover every human need — from wisdom to health to peace.',
    requiredLevel: 4,
    estimatedReadSeconds: 600,
    sections: [
      // -- Opening --
      {
        id: 'se-opening',
        sortOrder: 1,
        hebrewText: 'אֲדֹנָי שְׂפָתַי תִּפְתָּח וּפִי יַגִּיד תְּהִלָּתֶךָ',
        transliteration: 'Adonai s\'fatai tiftach, ufi yagid t\'hilatecha',
        translation: 'Lord, open my lips, that my mouth may declare Your praise',
        notes: 'Before beginning the Amidah, we ask Hashem to help us pray. Take three steps forward with feet together.',
        amud: {
          role: 'silent_individual',
          physicalActions: ['stand', 'face_west'],
          instruction: 'Stand with feet together, facing Jerusalem. Take three steps forward before beginning.',
        },
      },

      // -- 1. Avot (Patriarchs) --
      {
        id: 'se-01-avot',
        sortOrder: 2,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ וֵאלֹקֵי אֲבוֹתֵינוּ אֱלֹקֵי אַבְרָהָם אֱלֹקֵי יִצְחָק וֵאלֹקֵי יַעֲקֹב הָאֵל הַגָּדוֹל הַגִּבּוֹר וְהַנּוֹרָא אֵל עֶלְיוֹן גּוֹמֵל חֲסָדִים טוֹבִים וְקוֹנֵה הַכֹּל וְזוֹכֵר חַסְדֵי אָבוֹת וּמֵבִיא גוֹאֵל לִבְנֵי בְנֵיהֶם לְמַעַן שְׁמוֹ בְּאַהֲבָה. מֶלֶךְ עוֹזֵר וּמוֹשִׁיעַ וּמָגֵן. בָּרוּךְ אַתָּה ה׳ מָגֵן אַבְרָהָם',
        transliteration: 'Baruch Atah Adonai, Elokeinu v\'Elokei avoteinu, Elokei Avraham, Elokei Yitzchak, v\'Elokei Ya\'akov. Ha\'Eil hagadol, hagibor v\'hanora, Eil elyon, gomeil chasadim tovim, v\'koneh hakol, v\'zocheir chasdei avot, u\'meivi go\'eil livnei v\'neihem, l\'ma\'an sh\'mo b\'ahavah. Melech ozeir u\'moshi\'a u\'magein. Baruch Atah Adonai, magein Avraham',
        translation: 'Blessed are You, Lord our God and God of our fathers, God of Abraham, God of Isaac, and God of Jacob. The great, mighty, and awesome God, God Most High, Who bestows beneficial kindnesses, Who is Master of all, Who remembers the piety of the Patriarchs, and brings a redeemer to their children\'s children for His Name\'s sake, with love. King, Helper, Savior, and Shield. Blessed are You, Lord, Shield of Abraham.',
        notes: 'Bracha 1 — Avot (Patriarchs). We invoke our forefathers to connect our prayers to their merit. Each patriarch is mentioned separately because each had a unique relationship with God.',
        amud: {
          role: 'silent_individual',
          physicalActions: ['bow_and_stand'],
          instruction: 'Bow at "Baruch Atah" and stand straight at "Adonai"',
        },
      },

      // -- 2. Gevurot (God's Might) --
      {
        id: 'se-02-gevurot',
        sortOrder: 3,
        hebrewText: 'אַתָּה גִּבּוֹר לְעוֹלָם אֲדֹנָי מְחַיֵּה מֵתִים אַתָּה רַב לְהוֹשִׁיעַ. מְכַלְכֵּל חַיִּים בְּחֶסֶד מְחַיֵּה מֵתִים בְּרַחֲמִים רַבִּים סוֹמֵךְ נוֹפְלִים וְרוֹפֵא חוֹלִים וּמַתִּיר אֲסוּרִים וּמְקַיֵּם אֱמוּנָתוֹ לִישֵׁנֵי עָפָר. מִי כָמוֹךָ בַּעַל גְּבוּרוֹת וּמִי דּוֹמֶה לָּךְ מֶלֶךְ מֵמִית וּמְחַיֶּה וּמַצְמִיחַ יְשׁוּעָה. וְנֶאֱמָן אַתָּה לְהַחֲיוֹת מֵתִים. בָּרוּךְ אַתָּה ה׳ מְחַיֵּה הַמֵּתִים',
        transliteration: 'Atah gibor l\'olam Adonai, m\'chayeh meitim Atah, rav l\'hoshi\'a. M\'chalkeil chayim b\'chesed, m\'chayeh meitim b\'rachamim rabim, someich noflim, v\'rofei cholim, u\'matir asurim, um\'kayeim emunato lisheinei afar. Mi chamocha ba\'al g\'vurot, umi domeh lach, Melech meimit um\'chayeh u\'matzmi\'ach y\'shuah. V\'ne\'eman Atah l\'hachayot meitim. Baruch Atah Adonai, m\'chayeh hameitim',
        translation: 'You are eternally mighty, Lord; You resurrect the dead, You are powerful to save. He sustains the living with kindness, resurrects the dead with great mercy, supports the fallen, heals the sick, releases the imprisoned, and maintains His faith to those who sleep in the dust. Who is like You, Master of mighty deeds, and who can compare to You, King Who causes death and restores life and causes salvation to sprout. And You are faithful to resurrect the dead. Blessed are You, Lord, Who resurrects the dead.',
        notes: 'Bracha 2 — Gevurot (God\'s Might). Praises God\'s power over life and death. In winter add "mashiv haruach u\'morid hageshem" (Who causes the wind to blow and rain to fall).',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 3. Kedushat Hashem (Holiness of God) --
      {
        id: 'se-03-kedushah',
        sortOrder: 4,
        hebrewText: 'אַתָּה קָדוֹשׁ וְשִׁמְךָ קָדוֹשׁ וּקְדוֹשִׁים בְּכָל יוֹם יְהַלְלוּךָ סֶּלָה. בָּרוּךְ אַתָּה ה׳ הָאֵל הַקָּדוֹשׁ',
        transliteration: 'Atah kadosh v\'shimcha kadosh, uk\'doshim b\'chol yom y\'hal\'lucha selah. Baruch Atah Adonai, ha\'Eil hakadosh',
        translation: 'You are holy and Your Name is holy, and the holy ones praise You every day, Selah. Blessed are You, Lord, the holy God.',
        notes: 'Bracha 3 — Kedushat Hashem (God\'s Holiness). When davening with a minyan, the chazzan\'s repetition includes the full Kedushah here (Kadosh, kadosh, kadosh...).',
        amud: {
          role: 'both',
          physicalActions: ['rise_on_toes'],
          instruction: 'Rise on toes three times at "Kadosh, Kadosh, Kadosh"',
        },
      },

      // -- 4. Binah / Da'at (Knowledge) --
      {
        id: 'se-04-daat',
        sortOrder: 5,
        hebrewText: 'אַתָּה חוֹנֵן לְאָדָם דַּעַת וּמְלַמֵּד לֶאֱנוֹשׁ בִּינָה. חָנֵּנוּ מֵאִתְּךָ דֵּעָה בִּינָה וְהַשְׂכֵּל. בָּרוּךְ אַתָּה ה׳ חוֹנֵן הַדָּעַת',
        transliteration: 'Atah chonein l\'adam da\'at, um\'lameid le\'enosh binah. Choneinu me\'it\'cha dei\'ah, binah v\'haskeil. Baruch Atah Adonai, chonein hada\'at',
        translation: 'You graciously grant man knowledge and teach mortals understanding. Grant us from You knowledge, understanding, and wisdom. Blessed are You, Lord, gracious Giver of knowledge.',
        notes: 'Bracha 4 — Da\'at (Knowledge). First of the 13 middle blessings (requests). We begin by asking for wisdom, because without understanding we cannot even know what to ask for.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 5. Teshuvah (Repentance) --
      {
        id: 'se-05-teshuvah',
        sortOrder: 6,
        hebrewText: 'הֲשִׁיבֵנוּ אָבִינוּ לְתוֹרָתֶךָ וְקָרְבֵנוּ מַלְכֵּנוּ לַעֲבוֹדָתֶךָ וְהַחֲזִירֵנוּ בִּתְשׁוּבָה שְׁלֵמָה לְפָנֶיךָ. בָּרוּךְ אַתָּה ה׳ הָרוֹצֶה בִּתְשׁוּבָה',
        transliteration: 'Hashiveinu Avinu l\'Toratecha, v\'karveinu Malkeinu la\'avodatecha, v\'hachazireinu bi\'tshuvah sh\'leimah l\'fanecha. Baruch Atah Adonai, harotzeh bi\'tshuvah',
        translation: 'Return us, our Father, to Your Torah, and draw us near, our King, to Your service, and bring us back in complete repentance before You. Blessed are You, Lord, Who desires repentance.',
        notes: 'Bracha 5 — Teshuvah (Repentance). After asking for wisdom, we ask for the ability to return to God. Note we call God both "Father" (closeness) and "King" (majesty).',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 6. Selichah (Forgiveness) --
      {
        id: 'se-06-selichah',
        sortOrder: 7,
        hebrewText: 'סְלַח לָנוּ אָבִינוּ כִּי חָטָאנוּ מְחַל לָנוּ מַלְכֵּנוּ כִּי פָשָׁעְנוּ כִּי מוֹחֵל וְסוֹלֵחַ אָתָּה. בָּרוּךְ אַתָּה ה׳ חַנּוּן הַמַּרְבֶּה לִסְלוֹחַ',
        transliteration: 'S\'lach lanu Avinu ki chatanu, m\'chal lanu Malkeinu ki fashanu, ki mocheil v\'solei\'ach Atah. Baruch Atah Adonai, chanun hamarbeh lislo\'ach',
        translation: 'Forgive us, our Father, for we have sinned; pardon us, our King, for we have transgressed; for You are a pardoner and forgiver. Blessed are You, Lord, the gracious One Who pardons abundantly.',
        notes: 'Bracha 6 — Selichah (Forgiveness). חָטָאנוּ (sinned) = unintentional; פָשָׁעְנוּ (transgressed) = intentional. God forgives both.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 7. Ge'ulah (Redemption) --
      {
        id: 'se-07-geulah',
        sortOrder: 8,
        hebrewText: 'רְאֵה נָא בְעָנְיֵנוּ וְרִיבָה רִיבֵנוּ וּגְאָלֵנוּ מְהֵרָה לְמַעַן שְׁמֶךָ כִּי גּוֹאֵל חָזָק אָתָּה. בָּרוּךְ אַתָּה ה׳ גּוֹאֵל יִשְׂרָאֵל',
        transliteration: 'R\'eih na v\'on\'yeinu, v\'rivah riveinu, ug\'aleinu m\'heirah l\'ma\'an sh\'mecha, ki go\'eil chazak Atah. Baruch Atah Adonai, go\'eil Yisrael',
        translation: 'Look upon our affliction and fight our fight, and redeem us speedily for Your Name\'s sake, for You are a powerful Redeemer. Blessed are You, Lord, Redeemer of Israel.',
        notes: 'Bracha 7 — Ge\'ulah (Redemption). We ask God to see our troubles and rescue us — both individually and as a nation.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 8. Refu'ah (Healing) --
      {
        id: 'se-08-refuah',
        sortOrder: 9,
        hebrewText: 'רְפָאֵנוּ ה׳ וְנֵרָפֵא הוֹשִׁיעֵנוּ וְנִוָּשֵׁעָה כִּי תְהִלָּתֵנוּ אָתָּה וְהַעֲלֵה רְפוּאָה שְׁלֵמָה לְכָל מַכּוֹתֵינוּ כִּי אֵל מֶלֶךְ רוֹפֵא נֶאֱמָן וְרַחֲמָן אָתָּה. בָּרוּךְ אַתָּה ה׳ רוֹפֵא חוֹלֵי עַמּוֹ יִשְׂרָאֵל',
        transliteration: 'R\'fa\'einu Adonai v\'neirafei, hoshi\'einu v\'nivashei\'ah, ki t\'hilateinu Atah, v\'ha\'aleh r\'fuah sh\'leimah l\'chol makoteinu, ki Eil Melech rofei ne\'eman v\'rachaman Atah. Baruch Atah Adonai, rofei cholei amo Yisrael',
        translation: 'Heal us, Lord, and we will be healed; save us and we will be saved, for You are our praise. Bring complete healing to all our ailments, for You, God, King, are a faithful and compassionate Healer. Blessed are You, Lord, Who heals the sick of His people Israel.',
        notes: 'Bracha 8 — Refu\'ah (Healing). You can add personal prayers for sick individuals here by name. "Heal us and we will be healed" is from Jeremiah 17:14.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 9. Birkat Hashanim (Year's Blessing) --
      {
        id: 'se-09-shanim',
        sortOrder: 10,
        hebrewText: 'בָּרֵךְ עָלֵינוּ ה׳ אֱלֹקֵינוּ אֶת הַשָּׁנָה הַזֹּאת וְאֶת כָּל מִינֵי תְבוּאָתָהּ לְטוֹבָה וְתֵן בְּרָכָה עַל פְּנֵי הָאֲדָמָה וְשַׂבְּעֵנוּ מִטּוּבָהּ וּבָרֵךְ שְׁנָתֵנוּ כַּשָּׁנִים הַטּוֹבוֹת. בָּרוּךְ אַתָּה ה׳ מְבָרֵךְ הַשָּׁנִים',
        transliteration: 'Bareich aleinu Adonai Elokeinu et hashanah hazot v\'et kol minei t\'vuatah l\'tovah, v\'tein b\'rachah al p\'nei ha\'adamah, v\'sab\'einu mituvah, u\'vareich sh\'nateinu kashanim hatovot. Baruch Atah Adonai, m\'vareich hashanim',
        translation: 'Bless this year for us, Lord our God, and all its kinds of produce for good; grant blessing upon the face of the earth, satisfy us from Your goodness, and bless our year like the good years. Blessed are You, Lord, Who blesses the years.',
        notes: 'Bracha 9 — Birkat Hashanim (Prosperity). In winter (Dec 4 – Pesach), we add "v\'tein tal u\'matar livrachah" (grant dew and rain for blessing).',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 10. Kibbutz Galuyot (Ingathering of Exiles) --
      {
        id: 'se-10-galuyot',
        sortOrder: 11,
        hebrewText: 'תְּקַע בְּשׁוֹפָר גָּדוֹל לְחֵרוּתֵנוּ וְשָׂא נֵס לְקַבֵּץ גָּלֻיּוֹתֵינוּ וְקַבְּצֵנוּ יַחַד מֵאַרְבַּע כַּנְפוֹת הָאָרֶץ. בָּרוּךְ אַתָּה ה׳ מְקַבֵּץ נִדְחֵי עַמּוֹ יִשְׂרָאֵל',
        transliteration: 'T\'ka b\'shofar gadol l\'cheiruteinu, v\'sa neis l\'kabeitz galuyoteinu, v\'kab\'tzeinu yachad mei\'arba kanfot ha\'aretz. Baruch Atah Adonai, m\'kabeitz nidchei amo Yisrael',
        translation: 'Sound the great shofar for our freedom, raise a banner to gather our exiles, and gather us together from the four corners of the earth. Blessed are You, Lord, Who gathers the dispersed of His people Israel.',
        notes: 'Bracha 10 — Kibbutz Galuyot (Ingathering of Exiles). We pray for all Jews scattered around the world to be gathered back to the Land of Israel.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 11. Din / Mishpat (Justice) --
      {
        id: 'se-11-mishpat',
        sortOrder: 12,
        hebrewText: 'הָשִׁיבָה שׁוֹפְטֵינוּ כְּבָרִאשׁוֹנָה וְיוֹעֲצֵינוּ כְּבַתְּחִלָּה וְהָסֵר מִמֶּנּוּ יָגוֹן וַאֲנָחָה וּמְלוֹךְ עָלֵינוּ אַתָּה ה׳ לְבַדְּךָ בְּחֶסֶד וּבְרַחֲמִים וְצַדְּקֵנוּ בַּמִּשְׁפָּט. בָּרוּךְ אַתָּה ה׳ מֶלֶךְ אוֹהֵב צְדָקָה וּמִשְׁפָּט',
        transliteration: 'Hashivah shof\'teinu k\'varishonah, v\'yo\'atzeinu k\'vat\'chilah, v\'haseir mimenu yagon va\'anachah, u\'m\'loch aleinu Atah Adonai l\'vad\'cha, b\'chesed uv\'rachamim, v\'tzad\'keinu bamishpat. Baruch Atah Adonai, Melech oheiv tz\'dakah u\'mishpat',
        translation: 'Restore our judges as of old and our counselors as at the beginning; remove from us sorrow and groaning; and reign over us, You alone, Lord, with kindness and compassion, and vindicate us in judgment. Blessed are You, Lord, King Who loves righteousness and justice.',
        notes: 'Bracha 11 — Mishpat (Justice). We pray for righteous leadership and true justice. During the Ten Days of Repentance, say "HaMelech hamishpat" instead.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 12. Birkat Haminim (Against Slanderers) --
      {
        id: 'se-12-minim',
        sortOrder: 13,
        hebrewText: 'וְלַמַּלְשִׁינִים אַל תְּהִי תִקְוָה וְכָל הָרִשְׁעָה כְּרֶגַע תֹּאבֵד וְכָל אוֹיְבֶיךָ מְהֵרָה יִכָּרֵתוּ וְהַזֵּדִים מְהֵרָה תְעַקֵּר וּתְשַׁבֵּר וּתְמַגֵּר וְתַכְנִיעַ בִּמְהֵרָה בְיָמֵינוּ. בָּרוּךְ אַתָּה ה׳ שׁוֹבֵר אוֹיְבִים וּמַכְנִיעַ זֵדִים',
        transliteration: 'V\'lamal\'shinim al t\'hi tikvah, v\'chol harishah k\'rega toveid, v\'chol oy\'vecha m\'heirah yikaritu, v\'hazeidim m\'heirah t\'aker ut\'shabeir ut\'mageir v\'tachni\'a bimheirah v\'yameinu. Baruch Atah Adonai, shoveir oy\'vim u\'machni\'a zeidim',
        translation: 'And for slanderers let there be no hope; and may all wickedness perish in an instant; and may all Your enemies be speedily cut down. And the insolent, speedily uproot, break, cast down and humble speedily in our days. Blessed are You, Lord, Who breaks enemies and humbles the insolent.',
        notes: 'Bracha 12 — Birkat Haminim. This was the 19th bracha added by Shmuel HaKatan at the request of Rabban Gamliel, making the total 19.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 13. Tzaddikim (The Righteous) --
      {
        id: 'se-13-tzaddikim',
        sortOrder: 14,
        hebrewText: 'עַל הַצַּדִּיקִים וְעַל הַחֲסִידִים וְעַל זִקְנֵי עַמְּךָ בֵּית יִשְׂרָאֵל וְעַל פְּלֵיטַת סוֹפְרֵיהֶם וְעַל גֵּרֵי הַצֶּדֶק וְעָלֵינוּ יֶהֱמוּ נָא רַחֲמֶיךָ ה׳ אֱלֹקֵינוּ וְתֵן שָׂכָר טוֹב לְכָל הַבּוֹטְחִים בְּשִׁמְךָ בֶּאֱמֶת וְשִׂים חֶלְקֵנוּ עִמָּהֶם לְעוֹלָם וְלֹא נֵבוֹשׁ כִּי בְךָ בָטָחְנוּ. בָּרוּךְ אַתָּה ה׳ מִשְׁעָן וּמִבְטָח לַצַּדִּיקִים',
        transliteration: 'Al hatzadikim v\'al hachasidim, v\'al ziknei am\'cha beit Yisrael, v\'al pleitat sof\'reihem, v\'al geirei hatzedek v\'aleinu, yehemu na rachamecha Adonai Elokeinu, v\'tein sachar tov l\'chol habot\'chim b\'shimcha be\'emet, v\'sim chelkeinu imahem l\'olam, v\'lo neivosh ki v\'cha vatachnu. Baruch Atah Adonai, mish\'an u\'mivtach latzadikim',
        translation: 'On the righteous, on the pious, on the elders of Your people the House of Israel, on the remnant of their scholars, on the righteous converts, and on us — may Your compassion be aroused, Lord our God. Grant a good reward to all who truly trust in Your Name, and place our lot among them forever, and we will not be ashamed, for in You we trust. Blessed are You, Lord, Support and Trust of the righteous.',
        notes: 'Bracha 13 — Tzaddikim (The Righteous). We pray for all who keep the faith — including righteous converts (geirei tzedek) — and ask to be counted among them.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 14. Yerushalayim (Jerusalem) --
      {
        id: 'se-14-yerushalayim',
        sortOrder: 15,
        hebrewText: 'וְלִירוּשָׁלַיִם עִירְךָ בְּרַחֲמִים תָּשׁוּב וְתִשְׁכּוֹן בְּתוֹכָהּ כַּאֲשֶׁר דִּבַּרְתָּ וּבְנֵה אוֹתָהּ בְּקָרוֹב בְּיָמֵינוּ בִּנְיַן עוֹלָם וְכִסֵּא דָוִד מְהֵרָה לְתוֹכָהּ תָּכִין. בָּרוּךְ אַתָּה ה׳ בּוֹנֵה יְרוּשָׁלָיִם',
        transliteration: 'V\'liYerushalayim ir\'cha b\'rachamim tashuv, v\'tishkon b\'tochah ka\'asher dibarta, uv\'neh otah b\'karov b\'yameinu binyan olam, v\'kisei David m\'heirah l\'tochah tachin. Baruch Atah Adonai, boneh Yerushalayim',
        translation: 'And to Jerusalem, Your city, return in mercy, and dwell within it as You have spoken; rebuild it soon in our days as an everlasting structure, and the throne of David speedily establish within it. Blessed are You, Lord, Builder of Jerusalem.',
        notes: 'Bracha 14 — Yerushalayim (Jerusalem). We pray for the rebuilding of Jerusalem and the Holy Temple — the heart of the Jewish people.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 15. Mashiach / David --
      {
        id: 'se-15-david',
        sortOrder: 16,
        hebrewText: 'אֶת צֶמַח דָּוִד עַבְדְּךָ מְהֵרָה תַצְמִיחַ וְקַרְנוֹ תָּרוּם בִּישׁוּעָתֶךָ כִּי לִישׁוּעָתְךָ קִוִּינוּ כָּל הַיּוֹם. בָּרוּךְ אַתָּה ה׳ מַצְמִיחַ קֶרֶן יְשׁוּעָה',
        transliteration: 'Et tzemach David avd\'cha m\'heirah tatzmi\'ach, v\'karno tarum bishuatecha, ki lishuatcha kivinu kol hayom. Baruch Atah Adonai, matzmi\'ach keren y\'shuah',
        translation: 'The offspring of Your servant David, speedily cause to flourish, and raise his pride through Your salvation, for we hope for Your salvation all day. Blessed are You, Lord, Who causes the pride of salvation to flourish.',
        notes: 'Bracha 15 — Malchut David (Davidic Kingdom). We pray for the coming of Mashiach (Messiah) from the line of King David.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 16. Shema Koleinu (Hear Our Prayer) --
      {
        id: 'se-16-shema-koleinu',
        sortOrder: 17,
        hebrewText: 'שְׁמַע קוֹלֵנוּ ה׳ אֱלֹקֵינוּ חוּס וְרַחֵם עָלֵינוּ וְקַבֵּל בְּרַחֲמִים וּבְרָצוֹן אֶת תְּפִלָּתֵנוּ כִּי אֵל שׁוֹמֵעַ תְּפִלּוֹת וְתַחֲנוּנִים אָתָּה וּמִלְּפָנֶיךָ מַלְכֵּנוּ רֵיקָם אַל תְּשִׁיבֵנוּ כִּי אַתָּה שׁוֹמֵעַ תְּפִלַּת כָּל פֶּה. בָּרוּךְ אַתָּה ה׳ שׁוֹמֵעַ תְּפִלָּה',
        transliteration: 'Sh\'ma koleinu Adonai Elokeinu, chus v\'racheim aleinu, v\'kabeil b\'rachamim uv\'ratzon et t\'filateinu, ki Eil shomei\'a t\'filot v\'tachanumim Atah, u\'mil\'fanecha Malkeinu reikam al t\'shiveinu, ki Atah shomei\'a t\'filat kol peh. Baruch Atah Adonai, shomei\'a t\'filah',
        translation: 'Hear our voice, Lord our God, have pity and compassion upon us, and accept our prayer with mercy and favor, for You are God Who hears prayers and supplications; and from before You, our King, do not turn us away empty-handed, for You hear the prayer of every mouth. Blessed are You, Lord, Who hears prayer.',
        notes: 'Bracha 16 — Shema Koleinu (Hear Our Voice). The last of the 13 middle requests. This is a good place to add any personal prayers in your own words.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 17. Avodah (Temple Service) --
      {
        id: 'se-17-avodah',
        sortOrder: 18,
        hebrewText: 'רְצֵה ה׳ אֱלֹקֵינוּ בְּעַמְּךָ יִשְׂרָאֵל וּבִתְפִלָּתָם וְהָשֵׁב אֶת הָעֲבוֹדָה לִדְבִיר בֵּיתֶךָ וְאִשֵּׁי יִשְׂרָאֵל וּתְפִלָּתָם בְּאַהֲבָה תְקַבֵּל בְּרָצוֹן וּתְהִי לְרָצוֹן תָּמִיד עֲבוֹדַת יִשְׂרָאֵל עַמֶּךָ. בָּרוּךְ אַתָּה ה׳ הַמַּחֲזִיר שְׁכִינָתוֹ לְצִיּוֹן',
        transliteration: 'R\'tzei Adonai Elokeinu b\'am\'cha Yisrael uvi\'t\'filatam, v\'hasheiv et ha\'avodah lidvir beitecha, v\'ishei Yisrael ut\'filatam b\'ahavah t\'kabeil b\'ratzon, us\'hi l\'ratzon tamid avodat Yisrael amecha. Baruch Atah Adonai, hamachazir sh\'chinato l\'Tzion',
        translation: 'Be favorable, Lord our God, toward Your people Israel and their prayer, and restore the service to the Holy of Holies in Your Temple; and the fire-offerings of Israel and their prayer accept with love and favor, and may the service of Your people Israel always be favorable. Blessed are You, Lord, Who restores His Presence to Zion.',
        notes: 'Bracha 17 — Avodah (Temple Service). First of the final three blessings (thanksgiving). We pray for the return of the Temple service.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 18. Hoda'ah (Thanksgiving) --
      {
        id: 'se-18-modim',
        sortOrder: 19,
        hebrewText: 'מוֹדִים אֲנַחְנוּ לָךְ שָׁאַתָּה הוּא ה׳ אֱלֹקֵינוּ וֵאלֹקֵי אֲבוֹתֵינוּ לְעוֹלָם וָעֶד צוּר חַיֵּינוּ מָגֵן יִשְׁעֵנוּ אַתָּה הוּא לְדוֹר וָדוֹר. נוֹדֶה לְּךָ וּנְסַפֵּר תְּהִלָּתֶךָ עַל חַיֵּינוּ הַמְּסוּרִים בְּיָדֶךָ וְעַל נִשְׁמוֹתֵינוּ הַפְּקוּדוֹת לָךְ וְעַל נִסֶּיךָ שֶׁבְּכָל יוֹם עִמָּנוּ וְעַל נִפְלְאוֹתֶיךָ וְטוֹבוֹתֶיךָ שֶׁבְּכָל עֵת עֶרֶב וָבֹקֶר וְצָהֳרָיִם. הַטּוֹב כִּי לֹא כָלוּ רַחֲמֶיךָ וְהַמְרַחֵם כִּי לֹא תַמּוּ חֲסָדֶיךָ מֵעוֹלָם קִוִּינוּ לָךְ',
        transliteration: 'Modim anachnu lach, sha\'Atah Hu Adonai Elokeinu v\'Elokei avoteinu l\'olam va\'ed, Tzur chayeinu, Magein yish\'einu, Atah Hu l\'dor vador. Nodeh l\'cha un\'sapeir t\'hilatecha, al chayeinu ham\'surim b\'yadecha, v\'al nishmoteinu hap\'kudot lach, v\'al nisecha sheb\'chol yom imanu, v\'al nifl\'otecha v\'tovotecha sheb\'chol eit, erev vavoker v\'tzohorayim. Hatov ki lo chalu rachamecha, v\'ham\'racheim ki lo tamu chasadecha, mei\'olam kivinu lach',
        translation: 'We give thanks to You, for You are the Lord our God and God of our fathers forever and ever. Rock of our lives, Shield of our salvation, You are He in every generation. We will thank You and tell Your praise — for our lives which are entrusted in Your hand, for our souls which are in Your charge, for Your miracles that are with us daily, and for Your wonders and goodness at all times — evening, morning, and afternoon. The Beneficent One, for Your mercies have not ended; the Compassionate One, for Your kindnesses have not ceased — we have always put our hope in You.',
        notes: 'Bracha 18 — Modim (Thanksgiving). We bow at the beginning. This is the moment to feel genuine gratitude for everything — every breath, every miracle we don\'t even notice.',
        amud: {
          role: 'silent_individual',
          physicalActions: ['bow'],
          instruction: 'Bow at Modim',
        },
      },
      {
        id: 'se-18-modim-closing',
        sortOrder: 20,
        hebrewText: 'וְעַל כֻּלָּם יִתְבָּרַךְ וְיִתְרוֹמַם שִׁמְךָ מַלְכֵּנוּ תָּמִיד לְעוֹלָם וָעֶד. וְכֹל הַחַיִּים יוֹדוּךָ סֶּלָה וִיהַלְלוּ אֶת שִׁמְךָ בֶּאֱמֶת הָאֵל יְשׁוּעָתֵנוּ וְעֶזְרָתֵנוּ סֶלָה. בָּרוּךְ אַתָּה ה׳ הַטּוֹב שִׁמְךָ וּלְךָ נָאֶה לְהוֹדוֹת',
        transliteration: 'V\'al kulam yitbarach v\'yitromam shimcha Malkeinu tamid l\'olam va\'ed. V\'chol hachayim yoducha selah, vihal\'lu et shimcha be\'emet, ha\'Eil y\'shuateinu v\'ezrateinu selah. Baruch Atah Adonai, hatov shimcha ul\'cha na\'eh l\'hodot',
        translation: 'And for all these things may Your Name be blessed and exalted, our King, constantly, forever and ever. And all the living will thank You, Selah, and praise Your Name in truth, God of our salvation and help, Selah. Blessed are You, Lord, Whose Name is "The Beneficent One" and to Whom it is fitting to give thanks.',
        notes: 'Continuation of Modim — the closing of the thanksgiving bracha.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- 19. Sim Shalom (Peace) --
      {
        id: 'se-19-shalom',
        sortOrder: 21,
        hebrewText: 'שִׂים שָׁלוֹם טוֹבָה וּבְרָכָה חֵן וָחֶסֶד וְרַחֲמִים עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל עַמֶּךָ. בָּרְכֵנוּ אָבִינוּ כֻּלָּנוּ כְּאֶחָד בְּאוֹר פָּנֶיךָ כִּי בְאוֹר פָּנֶיךָ נָתַתָּ לָּנוּ ה׳ אֱלֹקֵינוּ תּוֹרַת חַיִּים וְאַהֲבַת חֶסֶד וּצְדָקָה וּבְרָכָה וְרַחֲמִים וְחַיִּים וְשָׁלוֹם. וְטוֹב בְּעֵינֶיךָ לְבָרֵךְ אֶת עַמְּךָ יִשְׂרָאֵל בְּכָל עֵת וּבְכָל שָׁעָה בִּשְׁלוֹמֶךָ. בָּרוּךְ אַתָּה ה׳ הַמְבָרֵךְ אֶת עַמּוֹ יִשְׂרָאֵל בַּשָּׁלוֹם',
        transliteration: 'Sim shalom tovah uv\'rachah, chein vachesed v\'rachamim aleinu v\'al kol Yisrael amecha. Bar\'cheinu Avinu kulanu k\'echad b\'or panecha, ki v\'or panecha natata lanu Adonai Elokeinu Torat chayim v\'ahavat chesed, utz\'dakah uv\'rachah v\'rachamim v\'chayim v\'shalom. V\'tov b\'einecha l\'vareich et am\'cha Yisrael b\'chol eit uv\'chol sha\'ah bishlomecha. Baruch Atah Adonai, ham\'vareich et amo Yisrael bashalom',
        translation: 'Grant peace, goodness, and blessing, grace, kindness, and compassion upon us and upon all Israel Your people. Bless us, our Father, all of us as one, with the light of Your countenance, for by the light of Your countenance You gave us, Lord our God, the Torah of life and a love of kindness, righteousness, blessing, compassion, life, and peace. And may it be good in Your eyes to bless Your people Israel at every time and every hour with Your peace. Blessed are You, Lord, Who blesses His people Israel with peace.',
        notes: 'Bracha 19 — Sim Shalom (Peace). The final bracha. Peace is the vessel that holds all other blessings. At Mincha/Maariv some say "Shalom Rav" instead.',
        amud: {
          role: 'silent_individual',
        },
      },

      // -- Closing --
      {
        id: 'se-closing',
        sortOrder: 22,
        hebrewText: 'אֱלֹקַי נְצוֹר לְשׁוֹנִי מֵרָע וּשְׂפָתַי מִדַּבֵּר מִרְמָה וְלִמְקַלְלַי נַפְשִׁי תִדֹּם וְנַפְשִׁי כֶּעָפָר לַכֹּל תִּהְיֶה. פְּתַח לִבִּי בְּתוֹרָתֶךָ וּבְמִצְוֹתֶיךָ תִּרְדּוֹף נַפְשִׁי',
        transliteration: 'Elokai, n\'tzor l\'shoni meira, us\'fatai midabeir mirmah, v\'limkal\'lai nafshi tidom, v\'nafshi ke\'afar lakol tih\'yeh. P\'tach libi b\'Toratecha, uv\'mitzvotecha tirdof nafshi',
        translation: 'My God, guard my tongue from evil and my lips from speaking deceitfully. To those who curse me, let my soul be silent; and let my soul be like dust to everyone. Open my heart to Your Torah, and let my soul pursue Your commandments.',
        notes: 'Personal prayer of Mar bar Ravina (Talmud Berachot 17a). A beautiful moment of personal reflection before stepping back.',
        amud: {
          role: 'silent_individual',
        },
      },
      {
        id: 'se-yihyu',
        sortOrder: 23,
        hebrewText: 'יִהְיוּ לְרָצוֹן אִמְרֵי פִי וְהֶגְיוֹן לִבִּי לְפָנֶיךָ ה׳ צוּרִי וְגוֹאֲלִי',
        transliteration: 'Yih\'yu l\'ratzon imrei fi v\'hegyon libi l\'fanecha, Adonai Tzuri v\'Go\'ali',
        translation: 'May the words of my mouth and the meditation of my heart be acceptable before You, Lord, my Rock and my Redeemer',
        notes: 'From Psalm 19:15. After this, take three steps backward (left, right, left) as if departing from the King\'s presence.',
        amud: {
          role: 'silent_individual',
        },
      },
      {
        id: 'se-oseh-shalom',
        sortOrder: 24,
        hebrewText: 'עֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל וְאִמְרוּ אָמֵן',
        transliteration: 'Oseh shalom bimromav, Hu ya\'aseh shalom aleinu, v\'al kol Yisrael, v\'imru Amein',
        translation: 'He Who makes peace in His heavens, may He make peace upon us and upon all Israel, and say Amen',
        notes: 'The final words of the Amidah. Bow left, right, then forward. Take three steps back, then return to your place.',
        amud: {
          role: 'silent_individual',
          physicalActions: ['three_steps_back'],
          instruction: 'Take three steps back, bow left, right, and center',
        },
      },
    ],
  },

  // ---- Aleinu ----
  {
    id: 'aleinu',
    slug: 'aleinu',
    nameHebrew: 'עָלֵינוּ',
    nameEnglish: 'Aleinu',
    category: 'tefillah',
    sortOrder: 5,
    whenSaid: 'At the conclusion of every prayer service (Shacharis, Mincha, and Maariv)',
    whySaid: 'Aleinu is our declaration of God\'s sovereignty over the entire world. It was originally composed by Joshua when entering the Land of Israel.',
    inspirationText: 'As you finish davening, Aleinu reminds you of the big picture — God is King over everything, and we have a unique role to play in that story.',
    requiredLevel: 4,
    estimatedReadSeconds: 60,
    sections: [
      {
        id: 'aleinu-1',
        sortOrder: 1,
        hebrewText: 'עָלֵינוּ לְשַׁבֵּחַ לַאֲדוֹן הַכֹּל לָתֵת גְּדֻלָּה לְיוֹצֵר בְּרֵאשִׁית שֶׁלֹּא עָשָׂנוּ כְּגוֹיֵי הָאֲרָצוֹת וְלֹא שָׂמָנוּ כְּמִשְׁפְּחוֹת הָאֲדָמָה שֶׁלֹּא שָׂם חֶלְקֵנוּ כָּהֶם וְגֹרָלֵנוּ כְּכָל הֲמוֹנָם',
        transliteration: 'Aleinu l\'shabei\'ach la\'Adon hakol, lateit g\'dulah l\'Yotzeir b\'reishit, shelo asanu k\'goyei ha\'aratzot, v\'lo samanu k\'mishp\'chot ha\'adamah, shelo sam chelkeinu kahem v\'goraleinu k\'chol hamonam',
        translation: 'It is upon us to praise the Master of all, to ascribe greatness to the Creator of the world, Who has not made us like the nations of the lands, and has not placed us like the families of the earth; Who has not assigned our portion like theirs, nor our lot like all their multitudes',
        notes: 'The first paragraph declares our unique relationship with Hashem.',
        amud: {
          role: 'both',
          physicalActions: ['stand'],
        },
      },
      {
        id: 'aleinu-2',
        sortOrder: 2,
        hebrewText: 'וַאֲנַחְנוּ כּוֹרְעִים וּמִשְׁתַּחֲוִים וּמוֹדִים לִפְנֵי מֶלֶךְ מַלְכֵי הַמְּלָכִים הַקָּדוֹשׁ בָּרוּךְ הוּא',
        transliteration: 'Va\'anachnu kor\'im u\'mishtachavim u\'modim lifnei Melech Malchei Ham\'lachim, HaKadosh Baruch Hu',
        translation: 'And we bow and prostrate and give thanks before the King of Kings of Kings, the Holy One, blessed is He',
        notes: 'We bow during these words. Some communities fully bow (kneel), others bow from the waist.',
        amud: {
          role: 'both',
          physicalActions: ['stand', 'bow_and_stand'],
          instruction: 'Bow at "va\'anachnu kor\'im u\'mishtachavim" then stand back up at "lifnei Melech"',
        },
      },
      {
        id: 'aleinu-3',
        sortOrder: 3,
        hebrewText: 'שֶׁהוּא נוֹטֶה שָׁמַיִם וְיוֹסֵד אָרֶץ וּמוֹשַׁב יְקָרוֹ בַּשָּׁמַיִם מִמַּעַל וּשְׁכִינַת עֻזּוֹ בְּגָבְהֵי מְרוֹמִים. הוּא אֱלֹקֵינוּ אֵין עוֹד. אֱמֶת מַלְכֵּנוּ אֶפֶס זוּלָתוֹ',
        transliteration: 'Shehu noteh shamayim v\'yoseid aretz, u\'moshav y\'karo bashamayim mima\'al, ush\'chinat uzo b\'govhei m\'romim. Hu Elokeinu ein od. Emet Malkeinu efes zulato',
        translation: 'Who stretches out the heavens and establishes the earth, Whose seat of glory is in the heavens above, and Whose powerful Presence is in the loftiest heights. He is our God, there is no other. True is our King, there is nothing besides Him.',
        notes: 'A powerful affirmation that Hashem alone is God.',
        amud: {
          role: 'both',
          physicalActions: ['stand'],
        },
      },
      {
        id: 'aleinu-4',
        sortOrder: 4,
        hebrewText: 'עַל כֵּן נְקַוֶּה לְּךָ ה׳ אֱלֹקֵינוּ לִרְאוֹת מְהֵרָה בְּתִפְאֶרֶת עֻזֶּךָ לְהַעֲבִיר גִּלּוּלִים מִן הָאָרֶץ וְהָאֱלִילִים כָּרוֹת יִכָּרֵתוּן לְתַקֵּן עוֹלָם בְּמַלְכוּת שַׁדַּי וְכָל בְּנֵי בָשָׂר יִקְרְאוּ בִשְׁמֶךָ',
        transliteration: 'Al kein n\'kaveh l\'cha Adonai Elokeinu lirot m\'heirah b\'tiferet uzecha, l\'ha\'avir gilulim min ha\'aretz, v\'ha\'elilim karot yikareitun, l\'takein olam b\'malchut Shakai, v\'chol b\'nei vasar yikr\'u vishmecha',
        translation: 'Therefore we put our hope in You, Lord our God, to soon see the glory of Your strength, to remove idols from the earth and false gods will be utterly cut off; to perfect the world through the Almighty\'s kingdom, and all humanity will call upon Your Name',
        notes: 'The second paragraph — our hope for the future. "L\'takein olam" (to perfect the world) is the source of the concept of "Tikkun Olam."',
        amud: {
          role: 'both',
          physicalActions: ['stand'],
        },
      },
      {
        id: 'aleinu-5',
        sortOrder: 5,
        hebrewText: 'כִּי לְךָ תִּכְרַע כָּל בֶּרֶךְ תִּשָּׁבַע כָּל לָשׁוֹן. לְפָנֶיךָ ה׳ אֱלֹקֵינוּ יִכְרְעוּ וְיִפֹּלוּ וְלִכְבוֹד שִׁמְךָ יְקָר יִתֵּנוּ. וִיקַבְּלוּ כֻלָּם אֶת עֹל מַלְכוּתֶךָ וְתִמְלוֹךְ עֲלֵיהֶם מְהֵרָה לְעוֹלָם וָעֶד. כִּי הַמַּלְכוּת שֶׁלְּךָ הִיא וּלְעוֹלְמֵי עַד תִּמְלוֹךְ בְּכָבוֹד',
        transliteration: 'Ki l\'cha tichra kol berech, tishava kol lashon. L\'fanecha Adonai Elokeinu yichr\'u v\'yipolu, v\'lichvod shimcha y\'kar yiteinu. Vikab\'lu chulam et ol malchutecha, v\'timloch aleihem m\'heirah l\'olam va\'ed. Ki hamalchut shel\'cha hi, ul\'olmei ad timloch b\'chavod',
        translation: 'For to You every knee will bow, every tongue will swear. Before You, Lord our God, they will bow and fall, and to the glory of Your Name give honor. And they will all accept the yoke of Your kingdom, and You will reign over them speedily forever. For the kingdom is Yours, and for eternity You will reign in glory.',
        notes: 'The conclusion of Aleinu — a vision of universal recognition of God\'s sovereignty.',
        amud: {
          role: 'both',
          physicalActions: ['stand'],
        },
      },
    ],
  },

  // ---- Netilat Yadayim (Morning hand washing) ----
  {
    id: 'netilat-yadayim',
    slug: 'netilat-yadayim',
    nameHebrew: 'נְטִילַת יָדַיִם',
    nameEnglish: 'Netilat Yadayim',
    category: 'tefillah',
    sortOrder: 11,
    whenSaid: 'Upon waking up, after washing hands with a cup, alternating three times',
    whySaid: 'We start each day by consecrating our hands — the tools we use to interact with the world — to holy purposes.',
    inspirationText: 'Before you do anything with your hands today, you make them holy. Just like a kohen washing before serving in the Temple.',
    requiredLevel: 5,
    estimatedReadSeconds: 10,
    sections: [
      {
        id: 'netilat-yadayim-1',
        sortOrder: 1,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ עַל נְטִילַת יָדַיִם',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam, asher kid\'shanu b\'mitzvotav v\'tzivanu al n\'tilat yadayim',
        translation: 'Blessed are You, Lord our God, King of the universe, Who has sanctified us with His commandments and commanded us concerning the washing of hands',
        notes: 'Pour water from a cup three times alternating: right, left, right, left, right, left. Then say this bracha.',
      },
    ],
  },

  // ---- Asher Yatzar ----
  {
    id: 'asher-yatzar',
    slug: 'asher-yatzar',
    nameHebrew: 'אֲשֶׁר יָצַר',
    nameEnglish: 'Asher Yatzar',
    category: 'tefillah',
    sortOrder: 12,
    whenSaid: 'After using the bathroom, and as part of the morning brachot',
    whySaid: 'We thank God for the incredible design of the human body — if even one opening or tube were blocked, we couldn\'t survive.',
    inspirationText: 'This is one of the most profound brachot — thanking God for the miracle of your own body working. Every doctor should know this prayer.',
    requiredLevel: 5,
    estimatedReadSeconds: 20,
    sections: [
      {
        id: 'asher-yatzar-1',
        sortOrder: 1,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר יָצַר אֶת הָאָדָם בְּחָכְמָה וּבָרָא בוֹ נְקָבִים נְקָבִים חֲלוּלִים חֲלוּלִים',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam, asher yatzar et ha\'adam b\'chochmah, uvara vo n\'kavim n\'kavim chalulim chalulim',
        translation: 'Blessed are You, Lord our God, King of the universe, Who formed man with wisdom, and created within him many openings and many cavities',
        notes: 'אֲשֶׁר יָצַר = Who formed. בְּחָכְמָה = with wisdom. The body is an engineering miracle.',
      },
      {
        id: 'asher-yatzar-2',
        sortOrder: 2,
        hebrewText: 'גָּלוּי וְיָדוּעַ לִפְנֵי כִסֵּא כְבוֹדֶךָ שֶׁאִם יִפָּתֵחַ אֶחָד מֵהֶם אוֹ יִסָּתֵם אֶחָד מֵהֶם אִי אֶפְשַׁר לְהִתְקַיֵּם וְלַעֲמוֹד לְפָנֶיךָ אֲפִילוּ שָׁעָה אֶחָת',
        transliteration: 'Galui v\'yadua lifnei chisei ch\'vodecha, she\'im yipatei\'ach echad meihem o yisateim echad meihem, i efshar l\'hitkayeim v\'la\'amod l\'fanecha afilu sha\'ah echat',
        translation: 'It is revealed and known before Your throne of glory that if even one of them were to be opened, or one of them blocked, it would be impossible to survive and stand before You even for one hour',
        notes: 'A profound medical truth stated thousands of years before modern medicine.',
      },
      {
        id: 'asher-yatzar-3',
        sortOrder: 3,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ רוֹפֵא כָל בָּשָׂר וּמַפְלִיא לַעֲשׂוֹת',
        transliteration: 'Baruch Atah Adonai, rofei chol basar u\'mafli la\'asot',
        translation: 'Blessed are You, Lord, Who heals all flesh and acts wondrously',
        notes: 'רוֹפֵא כָל בָּשָׂר = Who heals all flesh. God is the ultimate Doctor.',
      },
    ],
  },

  // ---- Elokai Neshama ----
  {
    id: 'elokai-neshama',
    slug: 'elokai-neshama',
    nameHebrew: 'אֱלֹקַי נְשָׁמָה',
    nameEnglish: 'Elokai Neshama',
    category: 'tefillah',
    sortOrder: 13,
    whenSaid: 'Part of the morning brachot, after Asher Yatzar',
    whySaid: 'We acknowledge that our soul is pure — God breathed it into us, and He will one day take it back. Meanwhile, every moment is a gift.',
    inspirationText: 'After thanking God for the body (Asher Yatzar), we thank Him for the soul. Body + Soul = the complete person, ready to serve.',
    requiredLevel: 5,
    estimatedReadSeconds: 20,
    sections: [
      {
        id: 'elokai-neshama-1',
        sortOrder: 1,
        hebrewText: 'אֱלֹקַי נְשָׁמָה שֶׁנָּתַתָּ בִּי טְהוֹרָה הִיא. אַתָּה בְרָאתָהּ אַתָּה יְצַרְתָּהּ אַתָּה נְפַחְתָּהּ בִּי',
        transliteration: 'Elokai, n\'shamah shenatata bi t\'horah hi. Atah v\'ratah, Atah y\'tzartah, Atah n\'fachtah bi',
        translation: 'My God, the soul You placed within me is pure. You created it, You formed it, You breathed it into me',
        notes: 'נְשָׁמָה = soul. טְהוֹרָה = pure. Three stages of creation: created, formed, breathed in.',
      },
      {
        id: 'elokai-neshama-2',
        sortOrder: 2,
        hebrewText: 'וְאַתָּה מְשַׁמְּרָהּ בְּקִרְבִּי וְאַתָּה עָתִיד לִטְּלָהּ מִמֶּנִּי וּלְהַחֲזִירָהּ בִּי לֶעָתִיד לָבוֹא',
        transliteration: 'V\'Atah m\'sham\'rah b\'kirbi, v\'Atah atid lit\'lah mimeni, ul\'hachazira bi le\'atid lavo',
        translation: 'You safeguard it within me, You will eventually take it from me, and restore it to me in the future',
        notes: 'Our soul is on loan — God guards it while we have it, takes it at night (sleep), and returns it each morning.',
      },
      {
        id: 'elokai-neshama-3',
        sortOrder: 3,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ הַמַּחֲזִיר נְשָׁמוֹת לִפְגָרִים מֵתִים',
        transliteration: 'Baruch Atah Adonai, hamachazir n\'shamot lifgarim meitim',
        translation: 'Blessed are You, Lord, Who restores souls to lifeless bodies',
        notes: 'Every morning is a mini-resurrection — a brand new chance at life.',
      },
    ],
  },

  // ---- Birchos HaTorah ----
  {
    id: 'birchos-hatorah',
    slug: 'birchos-hatorah',
    nameHebrew: 'בִּרְכוֹת הַתּוֹרָה',
    nameEnglish: 'Birchos HaTorah',
    category: 'tefillah',
    sortOrder: 14,
    whenSaid: 'Part of the morning brachot, before learning or reading any Torah',
    whySaid: 'Just as we say a bracha before eating, we say a bracha before "consuming" Torah. The Talmud says the Temple was destroyed because people didn\'t say this bracha — meaning they treated Torah as ordinary.',
    inspirationText: 'The Torah is the greatest gift ever given to any nation. These brachot remind us to never take it for granted.',
    requiredLevel: 5,
    estimatedReadSeconds: 25,
    sections: [
      {
        id: 'birchos-hatorah-1',
        sortOrder: 1,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לַעֲסוֹק בְּדִבְרֵי תוֹרָה',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam, asher kid\'shanu b\'mitzvotav v\'tzivanu la\'asok b\'divrei Torah',
        translation: 'Blessed are You, Lord our God, King of the universe, Who has sanctified us with His commandments and commanded us to engage in the words of Torah',
        notes: 'לַעֲסוֹק = to engage/be occupied with. Not just to "read" — to be fully immersed.',
      },
      {
        id: 'birchos-hatorah-2',
        sortOrder: 2,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר בָּחַר בָּנוּ מִכָּל הָעַמִּים וְנָתַן לָנוּ אֶת תּוֹרָתוֹ. בָּרוּךְ אַתָּה ה׳ נוֹתֵן הַתּוֹרָה',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam, asher bachar banu mikol ha\'amim, v\'natan lanu et Torato. Baruch Atah Adonai, notein haTorah',
        translation: 'Blessed are You, Lord our God, King of the universe, Who chose us from all the peoples and gave us His Torah. Blessed are You, Lord, Who gives the Torah',
        notes: 'Present tense: "Who GIVES the Torah" — not past tense. The Torah is given fresh every day.',
      },
    ],
  },

  // ---- Birchos HaShachar (15 Morning Blessings) ----
  {
    id: 'birchos-hashachar',
    slug: 'birchos-hashachar',
    nameHebrew: 'בִּרְכוֹת הַשַּׁחַר',
    nameEnglish: 'Birchos HaShachar',
    category: 'tefillah',
    sortOrder: 15,
    whenSaid: 'Morning brachot — thanking God for the basics of daily life',
    whySaid: 'Each bracha thanks God for something we take for granted: opening our eyes, being able to stand, having clothes, being free.',
    inspirationText: 'These 15 blessings walk you through waking up — opening your eyes, sitting up, getting dressed, standing, walking. Nothing is ordinary.',
    requiredLevel: 5,
    estimatedReadSeconds: 60,
    sections: [
      {
        id: 'birchos-hashachar-1',
        sortOrder: 1,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם הַנּוֹתֵן לַשֶּׂכְוִי בִינָה לְהַבְחִין בֵּין יוֹם וּבֵין לָיְלָה',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam, hanotein lasechvi vinah l\'havchin bein yom uvein lailah',
        translation: 'Blessed are You... Who gives the rooster understanding to distinguish between day and night',
        notes: 'The rooster crows at dawn — God gave even animals the wisdom to know when a new day begins.',
        amud: {
          role: 'both',
          instruction: 'The shaliach tzibbur says each bracha aloud and the congregation answers Amen',
          congregationResponse: 'אָמֵן',
          congregationResponseTransliteration: 'Amen',
        },
      },
      {
        id: 'birchos-hashachar-2',
        sortOrder: 2,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם פּוֹקֵחַ עִוְרִים',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam, pokei\'ach ivrim',
        translation: 'Blessed are You... Who opens the eyes of the blind',
        notes: 'When you open your eyes each morning — that\'s a miracle. Thank God for the gift of sight.',
        amud: {
          role: 'both',
          instruction: 'The shaliach tzibbur says each bracha aloud and the congregation answers Amen',
          congregationResponse: 'אָמֵן',
          congregationResponseTransliteration: 'Amen',
        },
      },
      {
        id: 'birchos-hashachar-3',
        sortOrder: 3,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם מַלְבִּישׁ עֲרֻמִּים',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam, malbish arumim',
        translation: 'Blessed are You... Who clothes the naked',
        notes: 'When you get dressed — thank God that you have clothes to wear.',
        amud: {
          role: 'both',
          instruction: 'The shaliach tzibbur says each bracha aloud and the congregation answers Amen',
          congregationResponse: 'אָמֵן',
          congregationResponseTransliteration: 'Amen',
        },
      },
      {
        id: 'birchos-hashachar-4',
        sortOrder: 4,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם מַתִּיר אֲסוּרִים',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam, matir asurim',
        translation: 'Blessed are You... Who releases the bound',
        notes: 'When you can move your limbs and stretch — thank God for freedom of movement.',
        amud: {
          role: 'both',
          instruction: 'The shaliach tzibbur says each bracha aloud and the congregation answers Amen',
          congregationResponse: 'אָמֵן',
          congregationResponseTransliteration: 'Amen',
        },
      },
      {
        id: 'birchos-hashachar-5',
        sortOrder: 5,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם זוֹקֵף כְּפוּפִים',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam, zokeif k\'fufim',
        translation: 'Blessed are You... Who straightens the bent',
        notes: 'When you can stand upright — another miracle. Not everyone can do this.',
        amud: {
          role: 'both',
          instruction: 'The shaliach tzibbur says each bracha aloud and the congregation answers Amen',
          congregationResponse: 'אָמֵן',
          congregationResponseTransliteration: 'Amen',
        },
      },
      {
        id: 'birchos-hashachar-6',
        sortOrder: 6,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם הַמֵּכִין מִצְעֲדֵי גָבֶר',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam, hameichin mitz\'adei gaver',
        translation: 'Blessed are You... Who firms man\'s footsteps',
        notes: 'When you take your first steps — God makes it possible for you to walk.',
        amud: {
          role: 'both',
          instruction: 'The shaliach tzibbur says each bracha aloud and the congregation answers Amen',
          congregationResponse: 'אָמֵן',
          congregationResponseTransliteration: 'Amen',
        },
      },
      {
        id: 'birchos-hashachar-7',
        sortOrder: 7,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם שֶׁעָשָׂנִי יִשְׂרָאֵל',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam, she\'asani Yisrael',
        translation: 'Blessed are You... Who has made me a Jew',
        notes: 'We thank God for the privilege of being part of the Jewish people and having the Torah.',
        amud: {
          role: 'both',
          instruction: 'The shaliach tzibbur says each bracha aloud and the congregation answers Amen',
          congregationResponse: 'אָמֵן',
          congregationResponseTransliteration: 'Amen',
        },
      },
    ],
  },

  // ---- Tachanun ----
  {
    id: 'tachanun',
    slug: 'tachanun',
    nameHebrew: 'תַּחֲנוּן',
    nameEnglish: 'Tachanun',
    category: 'tefillah',
    sortOrder: 16,
    whenSaid: 'After the Amidah on weekdays (not Shabbat, Yom Tov, or certain other days)',
    whySaid: 'After the formal prayer of the Amidah, we pour out our hearts in personal supplication, acknowledging our shortcomings.',
    inspirationText: 'Tachanun is raw honesty before God. We lean our heads on our arms and just... talk to Him. No formality, just vulnerability.',
    requiredLevel: 6,
    estimatedReadSeconds: 60,
    sections: [
      {
        id: 'tachanun-1',
        sortOrder: 1,
        hebrewText: 'רַחוּם וְחַנּוּן חָטָאתִי לְפָנֶיךָ ה׳ אֱלֹקַי מָלֵא רַחֲמִים רַחֵם עָלַי וְקַבֵּל תַּחֲנוּנָי',
        transliteration: 'Rachum v\'chanun, chatati l\'fanecha Adonai Elokai, malei rachamim racheim alai v\'kabeil tachanunai',
        translation: 'Compassionate and gracious One, I have sinned before You, Lord my God. Full of mercy, have mercy on me and accept my supplications',
        notes: 'We rest our head on our left arm (or right if not wearing tefillin) during the first part — a posture of vulnerability.',
        amud: {
          role: 'silent_individual',
          physicalActions: ['sit'],
          instruction: 'Rest your head on your arm (right arm during Shacharit, left during Mincha)',
        },
      },
      {
        id: 'tachanun-2',
        sortOrder: 2,
        hebrewText: 'שׁוֹמֵר יִשְׂרָאֵל שְׁמוֹר שְׁאֵרִית יִשְׂרָאֵל וְאַל יֹאבַד יִשְׂרָאֵל הָאוֹמְרִים שְׁמַע יִשְׂרָאֵל',
        transliteration: 'Shomeir Yisrael, sh\'mor sh\'eirit Yisrael, v\'al yovad Yisrael ha\'om\'rim Sh\'ma Yisrael',
        translation: 'Guardian of Israel, guard the remnant of Israel; let not Israel perish — those who declare "Hear, O Israel"',
        notes: 'On Mondays and Thursdays, a longer Tachanun (V\'Hu Rachum) is said.',
        amud: {
          role: 'silent_individual',
          physicalActions: ['sit'],
          instruction: 'Rest your head on your arm (right arm during Shacharit, left during Mincha)',
        },
      },
    ],
  },

  // ---- U'Va L'Tzion ----
  {
    id: 'uva-ltzion',
    slug: 'uva-ltzion',
    nameHebrew: 'וּבָא לְצִיּוֹן',
    nameEnglish: 'U\'Va L\'Tzion',
    category: 'tefillah',
    sortOrder: 17,
    whenSaid: 'After Tachanun and Ashrei (said again), before Aleinu',
    whySaid: 'A prayer for redemption that includes the Kedushah d\'Sidra — ensuring every Jew says the Kedushah at least once daily.',
    inspirationText: 'This prayer looks forward to the ultimate redemption while including one of the holiest passages — Kadosh, Kadosh, Kadosh.',
    requiredLevel: 6,
    estimatedReadSeconds: 45,
    sections: [
      {
        id: 'uva-ltzion-1',
        sortOrder: 1,
        hebrewText: 'וּבָא לְצִיּוֹן גּוֹאֵל וּלְשָׁבֵי פֶשַׁע בְּיַעֲקֹב נְאֻם ה׳',
        transliteration: 'U\'va l\'Tziyon go\'eil, ul\'shavei fesha b\'Ya\'akov, n\'um Adonai',
        translation: 'A redeemer will come to Zion and to those in Jacob who repent from sin, says the Lord',
        notes: 'From Isaiah 59:20 — the promise that redemption will come.',
      },
      {
        id: 'uva-ltzion-2',
        sortOrder: 2,
        hebrewText: 'קָדוֹשׁ קָדוֹשׁ קָדוֹשׁ ה׳ צְבָאוֹת מְלֹא כָל הָאָרֶץ כְּבוֹדוֹ',
        transliteration: 'Kadosh, kadosh, kadosh Adonai Tz\'vaot, m\'lo chol ha\'aretz k\'vodo',
        translation: 'Holy, holy, holy is the Lord of Hosts; the whole earth is full of His glory',
        notes: 'From Isaiah 6:3 — the angels\' song. This is the Kedushah d\'Sidra, said here with translation.',
      },
    ],
  },

  // ---- Ein Kelokeinu ----
  {
    id: 'ein-kelokeinu',
    slug: 'ein-kelokeinu',
    nameHebrew: 'אֵין כֵּאלֹקֵינוּ',
    nameEnglish: 'Ein Kelokeinu',
    category: 'tefillah',
    sortOrder: 18,
    whenSaid: 'Near the end of the service, before or after Aleinu (varies by nusach)',
    whySaid: 'A beloved hymn declaring that there is no one like our God. Its structure (Ein/Mi/Nodeh/Baruch/Atah) spells out AMEN.',
    inspirationText: 'One of the most singable, joyful prayers — everyone in shul joins in. The Hebrew initials spell out "Amen" — our final affirmation.',
    requiredLevel: 6,
    estimatedReadSeconds: 30,
    sections: [
      {
        id: 'ein-kelokeinu-1',
        sortOrder: 1,
        hebrewText: 'אֵין כֵּאלֹקֵינוּ אֵין כַּאדוֹנֵנוּ אֵין כְּמַלְכֵּנוּ אֵין כְּמוֹשִׁיעֵנוּ',
        transliteration: 'Ein Kelokeinu, ein Ka\'doneinu, ein k\'Malkeinu, ein k\'Moshi\'einu',
        translation: 'There is none like our God, none like our Lord, none like our King, none like our Savior',
        notes: 'אֵין = there is none like. Four names for God: our God, our Lord, our King, our Savior.',
      },
      {
        id: 'ein-kelokeinu-2',
        sortOrder: 2,
        hebrewText: 'מִי כֵאלֹקֵינוּ מִי כַאדוֹנֵנוּ מִי כְמַלְכֵּנוּ מִי כְמוֹשִׁיעֵנוּ',
        transliteration: 'Mi Chelokeinu, mi Cha\'doneinu, mi ch\'Malkeinu, mi ch\'Moshi\'einu',
        translation: 'Who is like our God? Who is like our Lord? Who is like our King? Who is like our Savior?',
      },
      {
        id: 'ein-kelokeinu-3',
        sortOrder: 3,
        hebrewText: 'נוֹדֶה לֵאלֹקֵינוּ נוֹדֶה לַאדוֹנֵנוּ נוֹדֶה לְמַלְכֵּנוּ נוֹדֶה לְמוֹשִׁיעֵנוּ',
        transliteration: 'Nodeh Lelokeinu, nodeh La\'doneinu, nodeh l\'Malkeinu, nodeh l\'Moshi\'einu',
        translation: 'We thank our God, we thank our Lord, we thank our King, we thank our Savior',
      },
      {
        id: 'ein-kelokeinu-4',
        sortOrder: 4,
        hebrewText: 'בָּרוּךְ אֱלֹקֵינוּ בָּרוּךְ אֲדוֹנֵנוּ בָּרוּךְ מַלְכֵּנוּ בָּרוּךְ מוֹשִׁיעֵנוּ',
        transliteration: 'Baruch Elokeinu, baruch Adoneinu, baruch Malkeinu, baruch Moshi\'einu',
        translation: 'Blessed is our God, blessed is our Lord, blessed is our King, blessed is our Savior',
        notes: 'The initial letters of each stanza: א (Ein), מ (Mi), נ (Nodeh), ב (Baruch) = אמן (Amen)!',
      },
    ],
  },

  // ---- Hodu (Pesukei D'Zimra psalm) ----
  {
    id: 'hodu',
    slug: 'hodu',
    nameHebrew: 'הוֹדוּ',
    nameEnglish: 'Hodu',
    category: 'tefillah',
    sortOrder: 19,
    whenSaid: 'Part of Pesukei D\'Zimra, after Baruch She\'amar',
    whySaid: 'A collection of psalms praising God for His wonders and salvation, based on 1 Chronicles 16.',
    inspirationText: 'Hodu means "Give thanks!" — this psalm reminds us to remember God\'s miracles and tell others about them.',
    requiredLevel: 5,
    estimatedReadSeconds: 60,
    sections: [
      {
        id: 'hodu-1',
        sortOrder: 1,
        hebrewText: 'הוֹדוּ לַה׳ קִרְאוּ בִשְׁמוֹ הוֹדִיעוּ בָעַמִּים עֲלִילוֹתָיו',
        transliteration: 'Hodu l\'Adonai kir\'u vishmo, hodi\'u va\'amim alilotav',
        translation: 'Give thanks to the Lord, call upon His Name, make known His deeds among the nations',
        notes: 'From 1 Chronicles 16:8. David composed this when the Ark was brought to Jerusalem.',
      },
      {
        id: 'hodu-2',
        sortOrder: 2,
        hebrewText: 'שִׁירוּ לוֹ זַמְּרוּ לוֹ שִׂיחוּ בְּכָל נִפְלְאוֹתָיו',
        transliteration: 'Shiru lo zam\'ru lo, sichu b\'chol nifl\'otav',
        translation: 'Sing to Him, make music to Him, speak of all His wonders',
      },
    ],
  },

  // ---- Mizmor L'Todah ----
  {
    id: 'mizmor-ltodah',
    slug: 'mizmor-ltodah',
    nameHebrew: 'מִזְמוֹר לְתוֹדָה',
    nameEnglish: 'Mizmor L\'Todah',
    category: 'tefillah',
    sortOrder: 20,
    whenSaid: 'Part of Pesukei D\'Zimra — Psalm 100',
    whySaid: 'The "Psalm of Thanksgiving" — the Talmud says that in the Messianic era, all prayers will be abolished except this one, because gratitude is eternal.',
    inspirationText: 'Psalm 100 is only 5 verses but carries infinite weight. It will outlast every other prayer because thankfulness never expires.',
    requiredLevel: 5,
    estimatedReadSeconds: 20,
    sections: [
      {
        id: 'mizmor-ltodah-1',
        sortOrder: 1,
        hebrewText: 'מִזְמוֹר לְתוֹדָה הָרִיעוּ לַה׳ כָּל הָאָרֶץ. עִבְדוּ אֶת ה׳ בְּשִׂמְחָה בֹּאוּ לְפָנָיו בִּרְנָנָה',
        transliteration: 'Mizmor l\'todah. Hari\'u l\'Adonai kol ha\'aretz. Ivdu et Adonai b\'simchah, bo\'u l\'fanav birnanah',
        translation: 'A psalm of thanksgiving. Shout joyfully to the Lord, all the earth. Serve the Lord with joy, come before Him with song',
        notes: 'הָרִיעוּ = shout joyfully. בְּשִׂמְחָה = with joy. The emphasis is on joyous service.',
      },
      {
        id: 'mizmor-ltodah-2',
        sortOrder: 2,
        hebrewText: 'דְּעוּ כִּי ה׳ הוּא אֱלֹקִים הוּא עָשָׂנוּ וְלוֹ אֲנַחְנוּ עַמּוֹ וְצֹאן מַרְעִיתוֹ',
        transliteration: 'D\'u ki Adonai Hu Elokim, Hu asanu v\'lo anachnu, amo v\'tzon mar\'ito',
        translation: 'Know that the Lord is God; He made us and we are His, His people and the flock of His pasture',
      },
      {
        id: 'mizmor-ltodah-3',
        sortOrder: 3,
        hebrewText: 'בֹּאוּ שְׁעָרָיו בְּתוֹדָה חֲצֵרוֹתָיו בִּתְהִלָּה הוֹדוּ לוֹ בָּרְכוּ שְׁמוֹ. כִּי טוֹב ה׳ לְעוֹלָם חַסְדּוֹ וְעַד דֹּר וָדֹר אֱמוּנָתוֹ',
        transliteration: 'Bo\'u sh\'arav b\'todah, chatzerotav bit\'hilah, hodu lo bar\'chu sh\'mo. Ki tov Adonai, l\'olam chasdo, v\'ad dor vador emunato',
        translation: 'Enter His gates with thanksgiving, His courtyards with praise; thank Him, bless His Name. For the Lord is good; His kindness is forever, and His faithfulness is from generation to generation',
        notes: 'The final verse: God\'s kindness (chesed) is eternal, His faithfulness spans all generations.',
      },
    ],
  },

  // ---- Az Yashir (Song of the Sea) ----
  {
    id: 'az-yashir',
    slug: 'az-yashir',
    nameHebrew: 'אָז יָשִׁיר',
    nameEnglish: 'Az Yashir (Shirat HaYam)',
    category: 'tefillah',
    sortOrder: 21,
    whenSaid: 'Part of Pesukei D\'Zimra — the Song at the Sea from Exodus 15',
    whySaid: 'The song Moshe and Israel sang after crossing the Red Sea. We relive the Exodus every day in our prayers.',
    inspirationText: 'This is the song of ultimate liberation. When you say it, imagine standing on the far shore of the sea, looking back at your former prison — free at last.',
    requiredLevel: 5,
    estimatedReadSeconds: 90,
    sections: [
      {
        id: 'az-yashir-1',
        sortOrder: 1,
        hebrewText: 'אָז יָשִׁיר מֹשֶׁה וּבְנֵי יִשְׂרָאֵל אֶת הַשִּׁירָה הַזֹּאת לַה׳ וַיֹּאמְרוּ לֵאמֹר',
        transliteration: 'Az yashir Moshe uv\'nei Yisrael et hashirah hazot l\'Adonai vayom\'ru leimor',
        translation: 'Then Moses and the Children of Israel sang this song to the Lord, and they said:',
        notes: 'אָז יָשִׁיר = "Then he WILL sing" — future tense. The Sages see this as a hint to the future resurrection.',
      },
      {
        id: 'az-yashir-2',
        sortOrder: 2,
        hebrewText: 'אָשִׁירָה לַה׳ כִּי גָאֹה גָּאָה סוּס וְרֹכְבוֹ רָמָה בַיָּם. עָזִּי וְזִמְרָת יָהּ וַיְהִי לִי לִישׁוּעָה',
        transliteration: 'Ashirah l\'Adonai ki ga\'oh ga\'ah, sus v\'rochvo ramah vayam. Azi v\'zimrat Kah, vay\'hi li lishuah',
        translation: 'I will sing to the Lord, for He is exalted above the exalted; horse and its rider He hurled into the sea. My strength and song is God, and He has been my salvation',
        notes: 'The opening declaration of the Song — God\'s power over the mightiest army on earth.',
      },
      {
        id: 'az-yashir-3',
        sortOrder: 3,
        hebrewText: 'ה׳ יִמְלֹךְ לְעוֹלָם וָעֶד',
        transliteration: 'Adonai yimloch l\'olam va\'ed',
        translation: 'The Lord will reign forever and ever',
        notes: 'The closing declaration — God\'s sovereignty is eternal. This is said standing.',
      },
    ],
  },
];

// ==========================================
// BRACHOS — Blessings Over Food & Drink
// ==========================================

const BRACHOS: Prayer[] = [
  {
    id: 'hamotzi',
    slug: 'hamotzi',
    nameHebrew: 'הַמּוֹצִיא',
    nameEnglish: 'Hamotzi',
    category: 'brachot',
    sortOrder: 1,
    whenSaid: 'Before eating bread',
    whySaid: 'We acknowledge that everything we have — even our daily bread — comes from Hashem.',
    inspirationText: 'Before you take that first bite, pause. Recognize that this food traveled an incredible journey to reach your table — and behind it all is God\'s kindness.',
    requiredLevel: 2,
    estimatedReadSeconds: 8,
    sections: [
      {
        id: 'hamotzi-1',
        sortOrder: 1,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam',
        translation: 'Blessed are You, Lord our God, King of the universe',
        notes: 'This is the standard bracha formula. You\'ll see it in almost every blessing!',
      },
      {
        id: 'hamotzi-2',
        sortOrder: 2,
        hebrewText: 'הַמּוֹצִיא לֶחֶם מִן הָאָרֶץ',
        transliteration: 'Hamotzi lechem min ha\'aretz',
        translation: 'Who brings forth bread from the earth',
        notes: 'הַמּוֹצִיא = Who brings forth. לֶחֶם = bread. מִן הָאָרֶץ = from the earth.',
      },
    ],
  },
  {
    id: 'mezonot',
    slug: 'mezonot',
    nameHebrew: 'בּוֹרֵא מִינֵי מְזוֹנוֹת',
    nameEnglish: 'Mezonot',
    category: 'brachot',
    sortOrder: 2,
    whenSaid: 'Before eating baked goods, cake, cookies, pasta, cereal, and other grain products that are not bread',
    whySaid: 'We thank Hashem for creating various types of nourishing food from grain.',
    inspirationText: 'Cake, cookies, crackers, pretzels, pasta — anything made from grain that isn\'t bread gets this bracha. Grain is one of the most basic forms of sustenance.',
    requiredLevel: 2,
    estimatedReadSeconds: 8,
    sections: [
      {
        id: 'mezonot-1',
        sortOrder: 1,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam',
        translation: 'Blessed are You, Lord our God, King of the universe',
      },
      {
        id: 'mezonot-2',
        sortOrder: 2,
        hebrewText: 'בּוֹרֵא מִינֵי מְזוֹנוֹת',
        transliteration: 'Borei minei m\'zonot',
        translation: 'Who creates various kinds of nourishment',
        notes: 'בּוֹרֵא = Who creates. מִינֵי = kinds/types of. מְזוֹנוֹת = nourishment/sustenance.',
      },
    ],
  },
  {
    id: 'hagafen',
    slug: 'hagafen',
    nameHebrew: 'בּוֹרֵא פְּרִי הַגָּפֶן',
    nameEnglish: 'Hagafen',
    category: 'brachot',
    sortOrder: 3,
    whenSaid: 'Before drinking wine or grape juice — including Kiddush on Shabbat and holidays',
    whySaid: 'Wine holds a special status in Judaism. It is used for Kiddush, Havdalah, weddings, and the Pesach Seder. We give it its own bracha.',
    inspirationText: 'Wine gladdens the heart (Psalm 104:15). From Kiddush to the Seder\'s four cups, wine marks our most sacred moments.',
    requiredLevel: 2,
    estimatedReadSeconds: 8,
    sections: [
      {
        id: 'hagafen-1',
        sortOrder: 1,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam',
        translation: 'Blessed are You, Lord our God, King of the universe',
      },
      {
        id: 'hagafen-2',
        sortOrder: 2,
        hebrewText: 'בּוֹרֵא פְּרִי הַגָּפֶן',
        transliteration: 'Borei pri hagafen',
        translation: 'Who creates the fruit of the vine',
        notes: 'הַגָּפֶן = the vine (grapevine). This bracha covers wine and grape juice.',
      },
    ],
  },
  {
    id: 'ha-eitz',
    slug: 'ha-eitz',
    nameHebrew: 'בּוֹרֵא פְּרִי הָעֵץ',
    nameEnglish: 'Borei Pri Ha\'Eitz',
    category: 'brachot',
    sortOrder: 4,
    whenSaid: 'Before eating fruit that grows on trees (apples, oranges, grapes, etc.)',
    whySaid: 'We thank Hashem for creating the fruit of the tree.',
    inspirationText: 'Next time you bite into an apple, pause and say these words. You\'re acknowledging the incredible process — from seed to tree to fruit to your hand.',
    requiredLevel: 2,
    estimatedReadSeconds: 8,
    sections: [
      {
        id: 'ha-eitz-1',
        sortOrder: 1,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam',
        translation: 'Blessed are You, Lord our God, King of the universe',
      },
      {
        id: 'ha-eitz-2',
        sortOrder: 2,
        hebrewText: 'בּוֹרֵא פְּרִי הָעֵץ',
        transliteration: 'Borei pri ha\'eitz',
        translation: 'Who creates the fruit of the tree',
        notes: 'בּוֹרֵא = Who creates. פְּרִי = fruit. הָעֵץ = the tree.',
      },
    ],
  },
  {
    id: 'ha-adamah',
    slug: 'ha-adamah',
    nameHebrew: 'בּוֹרֵא פְּרִי הָאֲדָמָה',
    nameEnglish: 'Borei Pri Ha\'Adamah',
    category: 'brachot',
    sortOrder: 5,
    whenSaid: 'Before eating vegetables and produce that grows from the ground',
    whySaid: 'We thank Hashem for creating the fruit of the earth.',
    inspirationText: 'Carrots, potatoes, tomatoes, lettuce — everything that grows from the ground gets this bracha.',
    requiredLevel: 2,
    estimatedReadSeconds: 8,
    sections: [
      {
        id: 'ha-adamah-1',
        sortOrder: 1,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam',
        translation: 'Blessed are You, Lord our God, King of the universe',
      },
      {
        id: 'ha-adamah-2',
        sortOrder: 2,
        hebrewText: 'בּוֹרֵא פְּרִי הָאֲדָמָה',
        transliteration: 'Borei pri ha\'adamah',
        translation: 'Who creates the fruit of the earth',
        notes: 'הָאֲדָמָה = the earth/ground. Same formula as Ha\'Eitz but for ground-growing produce.',
      },
    ],
  },
  {
    id: 'shehakol',
    slug: 'shehakol',
    nameHebrew: 'שֶׁהַכֹּל',
    nameEnglish: 'Shehakol',
    category: 'brachot',
    sortOrder: 6,
    whenSaid: 'Before eating/drinking items like water, meat, eggs, candy, juice',
    whySaid: 'We recognize that everything in the world came into being through God\'s word.',
    inspirationText: 'This blessing covers almost everything — water, juice, meat, candy, eggs. When in doubt about which bracha to say, Shehakol has you covered.',
    requiredLevel: 2,
    estimatedReadSeconds: 8,
    sections: [
      {
        id: 'shehakol-1',
        sortOrder: 1,
        hebrewText: 'בָּרוּךְ אַתָּה ה׳ אֱלֹקֵינוּ מֶלֶךְ הָעוֹלָם',
        transliteration: 'Baruch Atah Adonai Elokeinu Melech ha\'olam',
        translation: 'Blessed are You, Lord our God, King of the universe',
      },
      {
        id: 'shehakol-2',
        sortOrder: 2,
        hebrewText: 'שֶׁהַכֹּל נִהְיָה בִּדְבָרוֹ',
        transliteration: 'Shehakol nihyah bidvaro',
        translation: 'That everything came to be through His word',
        notes: 'שֶׁהַכֹּל = that everything. נִהְיָה = came to be. בִּדְבָרוֹ = through His word.',
      },
    ],
  },
];

// ==========================================
// Combined Export
// ==========================================

export const PRAYERS: Prayer[] = [...TEFILLAH_PRAYERS, ...BRACHOS];

export function getPrayerBySlug(slug: string): Prayer | undefined {
  return PRAYERS.find(p => p.slug === slug);
}

export function getPrayersByCategory(category: string): Prayer[] {
  return PRAYERS.filter(p => p.category === category).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getTefillahPrayers(): Prayer[] {
  return getPrayersByCategory('tefillah');
}

export function getBrachotPrayers(): Prayer[] {
  return getPrayersByCategory('brachot');
}

export function getAllPrayers(): Prayer[] {
  return PRAYERS;
}

export function getPrayerById(id: string): Prayer | undefined {
  return PRAYERS.find(p => p.id === id);
}
