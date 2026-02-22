import { Prayer } from '@/types';

/**
 * AlephDavening Service Prayers
 *
 * Prayers needed for davening service definitions that don't yet exist
 * in the main prayers.ts file. These are prayers said by the shaliach
 * tzibbur (prayer leader), congregation, or both during communal services.
 *
 * Every section includes accurate Hebrew with nekudot, transliteration,
 * translation, and amud annotations describing who says it and what
 * physical actions accompany it.
 */

// ==========================================
// 1. HALF KADDISH (Chatzi Kaddish)
// ==========================================

const KADDISH_HALF: Prayer = {
  id: 'kaddish-half',
  slug: 'kaddish-half',
  nameHebrew: 'חֲצִי קַדִּישׁ',
  nameEnglish: 'Half Kaddish',
  category: 'tefillah',
  sortOrder: 100,
  whenSaid: 'Recited by the shaliach tzibbur between sections of the davening service to mark transitions',
  whySaid: 'The Kaddish sanctifies God\'s name publicly and marks the boundary between major sections of the service. Despite its association with mourning, the Kaddish is fundamentally a prayer of praise.',
  inspirationText: 'The Kaddish is one of the most powerful prayers in Judaism. Written mostly in Aramaic — the everyday language of the Jewish people in ancient times — it declares that God\'s name will be made great and holy throughout the world. When you answer "Amen" and "Y\'hei sh\'mei raba," you are joining a chorus that has echoed through synagogues for over two thousand years.',
  requiredLevel: 1,
  estimatedReadSeconds: 45,
  sections: [
    {
      id: 'kaddish-half-1',
      sortOrder: 1,
      hebrewText: 'יִתְגַּדַּל וְיִתְקַדַּשׁ שְׁמֵהּ רַבָּא',
      transliteration: 'Yitgadal v\'yitkadash sh\'mei raba',
      translation: 'May His great name be exalted and sanctified',
      notes: 'The shaliach tzibbur begins. The congregation answers Amen after this line.',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'The prayer leader begins the Kaddish. Stand while it is recited.',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        physicalActions: ['stand'],
        waitForCongregation: true,
        notes: 'The Kaddish requires a minyan (quorum of 10). Stand when you hear the shaliach tzibbur begin.',
      },
    },
    {
      id: 'kaddish-half-2',
      sortOrder: 2,
      hebrewText: 'בְּעָלְמָא דִּי בְרָא כִרְעוּתֵהּ וְיַמְלִיךְ מַלְכוּתֵהּ בְּחַיֵּיכוֹן וּבְיוֹמֵיכוֹן וּבְחַיֵּי דְכָל בֵּית יִשְׂרָאֵל בַּעֲגָלָא וּבִזְמַן קָרִיב וְאִמְרוּ אָמֵן',
      transliteration: 'B\'alma di v\'ra chirutei, v\'yamlich malchutei, b\'chayeichon uv\'yomeichon uv\'chayei d\'chol beit Yisrael, ba\'agala uvizman kariv, v\'imru amen',
      translation: 'In the world which He created according to His will, and may He establish His kingdom during your lifetime and during your days, and during the lifetime of all the House of Israel, speedily and soon — and say Amen',
      notes: 'This continues directly from the first line. The congregation responds Amen.',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'Continue without pause from the previous line.',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        waitForCongregation: true,
      },
    },
    {
      id: 'kaddish-half-3',
      sortOrder: 3,
      hebrewText: 'יְהֵא שְׁמֵהּ רַבָּא מְבָרַךְ לְעָלַם וּלְעָלְמֵי עָלְמַיָּא',
      transliteration: 'Y\'hei sh\'mei raba m\'varach l\'alam ul\'almei almaya',
      translation: 'May His great name be blessed forever and to all eternity',
      notes: 'This is the most important response in the Kaddish. The congregation says this line with great concentration and out loud. The Talmud says that whoever responds "Y\'hei sh\'mei raba" with all their strength has any negative decrees annulled.',
      amud: {
        role: 'congregation',
        instruction: 'The congregation responds loudly and with great intention (kavanah). This is the central response of the Kaddish.',
        physicalActions: ['stand'],
        notes: 'Say this with feeling and volume. This is considered the most important congregational response in the entire davening.',
      },
    },
    {
      id: 'kaddish-half-4',
      sortOrder: 4,
      hebrewText: 'יִתְבָּרַךְ וְיִשְׁתַּבַּח וְיִתְפָּאַר וְיִתְרוֹמַם וְיִתְנַשֵּׂא וְיִתְהַדָּר וְיִתְעַלֶּה וְיִתְהַלָּל שְׁמֵהּ דְּקֻדְשָׁא בְּרִיךְ הוּא',
      transliteration: 'Yitbarach v\'yishtabach v\'yitpa\'ar v\'yitromam v\'yitnasei, v\'yithadar v\'yit\'aleh v\'yithalal sh\'mei d\'kudsha b\'rich hu',
      translation: 'Blessed, praised, glorified, exalted, extolled, honored, elevated, and lauded be the name of the Holy One, blessed is He',
      notes: 'Eight expressions of praise. Some have the custom to say "b\'rich hu" aloud with the shaliach tzibbur.',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'Continue with the chain of praises.',
        congregationResponse: 'בְּרִיךְ הוּא',
        congregationResponseTransliteration: 'B\'rich hu',
        notes: 'Some congregations respond "b\'rich hu" (blessed is He) at this point.',
      },
    },
    {
      id: 'kaddish-half-5',
      sortOrder: 5,
      hebrewText: 'לְעֵלָּא מִן כָּל בִּרְכָתָא וְשִׁירָתָא תֻּשְׁבְּחָתָא וְנֶחֱמָתָא דַּאֲמִירָן בְּעָלְמָא וְאִמְרוּ אָמֵן',
      transliteration: 'L\'eila min kol birchata v\'shirata, tushb\'chata v\'nechemata, da\'amiran b\'alma, v\'imru amen',
      translation: 'Above all the blessings, songs, praises, and consolations that are uttered in the world — and say Amen',
      notes: 'This concludes the Half Kaddish. During the Ten Days of Repentance (between Rosh Hashana and Yom Kippur), we say "l\'eila ul\'eila" (far beyond).',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'Conclude the Half Kaddish.',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        waitForCongregation: true,
        notes: 'During the Yamim Noraim (High Holidays period), the wording changes slightly to "l\'eila ul\'eila mikol."',
      },
    },
  ],
};

// ==========================================
// 2. FULL KADDISH (Kaddish Shalem)
// ==========================================

const KADDISH_FULL: Prayer = {
  id: 'kaddish-full',
  slug: 'kaddish-full',
  nameHebrew: 'קַדִּישׁ שָׁלֵם',
  nameEnglish: 'Full Kaddish',
  category: 'tefillah',
  sortOrder: 101,
  whenSaid: 'Recited by the shaliach tzibbur after the repetition of the Amidah and at other key points in the service',
  whySaid: 'The Full Kaddish includes a request that our prayers be accepted, making it appropriate after the Amidah — the central prayer of the service.',
  inspirationText: 'The Full Kaddish adds a beautiful request: "May the prayers and supplications of all Israel be accepted." After pouring our hearts out in the Amidah, we ask God to receive those prayers with favor. It is a moment of communal hope — we pray not just for ourselves, but for all of Israel.',
  requiredLevel: 1,
  estimatedReadSeconds: 75,
  sections: [
    // Sections 1-5 are identical to Half Kaddish
    {
      id: 'kaddish-full-1',
      sortOrder: 1,
      hebrewText: 'יִתְגַּדַּל וְיִתְקַדַּשׁ שְׁמֵהּ רַבָּא',
      transliteration: 'Yitgadal v\'yitkadash sh\'mei raba',
      translation: 'May His great name be exalted and sanctified',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'The prayer leader begins the Full Kaddish.',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        physicalActions: ['stand'],
        waitForCongregation: true,
      },
    },
    {
      id: 'kaddish-full-2',
      sortOrder: 2,
      hebrewText: 'בְּעָלְמָא דִּי בְרָא כִרְעוּתֵהּ וְיַמְלִיךְ מַלְכוּתֵהּ בְּחַיֵּיכוֹן וּבְיוֹמֵיכוֹן וּבְחַיֵּי דְכָל בֵּית יִשְׂרָאֵל בַּעֲגָלָא וּבִזְמַן קָרִיב וְאִמְרוּ אָמֵן',
      transliteration: 'B\'alma di v\'ra chirutei, v\'yamlich malchutei, b\'chayeichon uv\'yomeichon uv\'chayei d\'chol beit Yisrael, ba\'agala uvizman kariv, v\'imru amen',
      translation: 'In the world which He created according to His will, and may He establish His kingdom during your lifetime and during your days, and during the lifetime of all the House of Israel, speedily and soon — and say Amen',
      amud: {
        role: 'shaliach_tzibbur',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        waitForCongregation: true,
      },
    },
    {
      id: 'kaddish-full-3',
      sortOrder: 3,
      hebrewText: 'יְהֵא שְׁמֵהּ רַבָּא מְבָרַךְ לְעָלַם וּלְעָלְמֵי עָלְמַיָּא',
      transliteration: 'Y\'hei sh\'mei raba m\'varach l\'alam ul\'almei almaya',
      translation: 'May His great name be blessed forever and to all eternity',
      notes: 'The congregation\'s most important response — say it loudly and with great kavanah.',
      amud: {
        role: 'congregation',
        instruction: 'Respond loudly with full concentration.',
        physicalActions: ['stand'],
      },
    },
    {
      id: 'kaddish-full-4',
      sortOrder: 4,
      hebrewText: 'יִתְבָּרַךְ וְיִשְׁתַּבַּח וְיִתְפָּאַר וְיִתְרוֹמַם וְיִתְנַשֵּׂא וְיִתְהַדָּר וְיִתְעַלֶּה וְיִתְהַלָּל שְׁמֵהּ דְּקֻדְשָׁא בְּרִיךְ הוּא',
      transliteration: 'Yitbarach v\'yishtabach v\'yitpa\'ar v\'yitromam v\'yitnasei, v\'yithadar v\'yit\'aleh v\'yithalal sh\'mei d\'kudsha b\'rich hu',
      translation: 'Blessed, praised, glorified, exalted, extolled, honored, elevated, and lauded be the name of the Holy One, blessed is He',
      amud: {
        role: 'shaliach_tzibbur',
        congregationResponse: 'בְּרִיךְ הוּא',
        congregationResponseTransliteration: 'B\'rich hu',
      },
    },
    {
      id: 'kaddish-full-5',
      sortOrder: 5,
      hebrewText: 'לְעֵלָּא מִן כָּל בִּרְכָתָא וְשִׁירָתָא תֻּשְׁבְּחָתָא וְנֶחֱמָתָא דַּאֲמִירָן בְּעָלְמָא וְאִמְרוּ אָמֵן',
      transliteration: 'L\'eila min kol birchata v\'shirata, tushb\'chata v\'nechemata, da\'amiran b\'alma, v\'imru amen',
      translation: 'Above all the blessings, songs, praises, and consolations that are uttered in the world — and say Amen',
      amud: {
        role: 'shaliach_tzibbur',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        waitForCongregation: true,
      },
    },
    // This section is unique to Full Kaddish (Titkabel)
    {
      id: 'kaddish-full-6',
      sortOrder: 6,
      hebrewText: 'תִּתְקַבַּל צְלוֹתְהוֹן וּבָעוּתְהוֹן דְּכָל בֵּית יִשְׂרָאֵל קֳדָם אֲבוּהוֹן דִּי בִשְׁמַיָּא וְאִמְרוּ אָמֵן',
      transliteration: 'Titkabel tz\'lot\'hon uva\'ut\'hon d\'chol beit Yisrael, kodam avuhon di vishmaya, v\'imru amen',
      translation: 'May the prayers and supplications of all Israel be accepted before their Father in Heaven — and say Amen',
      notes: 'This line is what distinguishes the Full Kaddish from the Half Kaddish. It is a request that all our prayers be accepted.',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'This is the line unique to Full Kaddish — a prayer that our prayers be accepted.',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        waitForCongregation: true,
      },
    },
    {
      id: 'kaddish-full-7',
      sortOrder: 7,
      hebrewText: 'יְהֵא שְׁלָמָא רַבָּא מִן שְׁמַיָּא וְחַיִּים עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל וְאִמְרוּ אָמֵן',
      transliteration: 'Y\'hei sh\'lama raba min sh\'maya v\'chayim aleinu v\'al kol Yisrael, v\'imru amen',
      translation: 'May there be abundant peace from Heaven and life upon us and upon all Israel — and say Amen',
      notes: 'A prayer for peace — one of the most universal and deeply felt wishes.',
      amud: {
        role: 'shaliach_tzibbur',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        waitForCongregation: true,
      },
    },
    {
      id: 'kaddish-full-8',
      sortOrder: 8,
      hebrewText: 'עוֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל וְאִמְרוּ אָמֵן',
      transliteration: 'Oseh shalom bimromav, hu ya\'aseh shalom aleinu v\'al kol Yisrael, v\'imru amen',
      translation: 'He Who makes peace in His heavens, may He make peace upon us and upon all Israel — and say Amen',
      notes: 'Take three steps back, bow left, bow right, and bow forward — the same way we conclude the Amidah.',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'Take three steps back, bow left saying "Oseh shalom bimromav," bow right saying "hu ya\'aseh shalom aleinu," and bow forward saying "v\'al kol Yisrael."',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        physicalActions: ['three_steps_back', 'bow'],
        waitForCongregation: true,
      },
    },
  ],
};

// ==========================================
// 3. MOURNER'S KADDISH (Kaddish Yatom)
// ==========================================

const KADDISH_MOURNERS: Prayer = {
  id: 'kaddish-mourners',
  slug: 'kaddish-mourners',
  nameHebrew: 'קַדִּישׁ יָתוֹם',
  nameEnglish: 'Mourner\'s Kaddish',
  category: 'tefillah',
  sortOrder: 102,
  whenSaid: 'Recited by mourners at designated points in the service, and by those observing a yahrzeit (anniversary of a loved one\'s passing)',
  whySaid: 'By praising God even in the depths of grief, mourners affirm their faith. The merit of sanctifying God\'s name in public elevates the soul of the departed.',
  inspirationText: 'The Mourner\'s Kaddish never mentions death. Instead, it is an extraordinary declaration of faith — praising God precisely when it is hardest to do so. When a mourner stands and says these words, the entire congregation stands with them, responding "Amen" as a community united in support.',
  requiredLevel: 1,
  estimatedReadSeconds: 60,
  sections: [
    {
      id: 'kaddish-mourners-1',
      sortOrder: 1,
      hebrewText: 'יִתְגַּדַּל וְיִתְקַדַּשׁ שְׁמֵהּ רַבָּא',
      transliteration: 'Yitgadal v\'yitkadash sh\'mei raba',
      translation: 'May His great name be exalted and sanctified',
      notes: 'The mourner begins. The congregation stands as a show of support.',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'Said by the mourner(s). The congregation stands in support.',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        physicalActions: ['stand'],
        waitForCongregation: true,
        notes: 'Although technically said by the mourner, it follows the same responsive pattern as other forms of Kaddish.',
      },
    },
    {
      id: 'kaddish-mourners-2',
      sortOrder: 2,
      hebrewText: 'בְּעָלְמָא דִּי בְרָא כִרְעוּתֵהּ וְיַמְלִיךְ מַלְכוּתֵהּ בְּחַיֵּיכוֹן וּבְיוֹמֵיכוֹן וּבְחַיֵּי דְכָל בֵּית יִשְׂרָאֵל בַּעֲגָלָא וּבִזְמַן קָרִיב וְאִמְרוּ אָמֵן',
      transliteration: 'B\'alma di v\'ra chirutei, v\'yamlich malchutei, b\'chayeichon uv\'yomeichon uv\'chayei d\'chol beit Yisrael, ba\'agala uvizman kariv, v\'imru amen',
      translation: 'In the world which He created according to His will, and may He establish His kingdom during your lifetime and during your days, and during the lifetime of all the House of Israel, speedily and soon — and say Amen',
      amud: {
        role: 'shaliach_tzibbur',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        waitForCongregation: true,
      },
    },
    {
      id: 'kaddish-mourners-3',
      sortOrder: 3,
      hebrewText: 'יְהֵא שְׁמֵהּ רַבָּא מְבָרַךְ לְעָלַם וּלְעָלְמֵי עָלְמַיָּא',
      transliteration: 'Y\'hei sh\'mei raba m\'varach l\'alam ul\'almei almaya',
      translation: 'May His great name be blessed forever and to all eternity',
      notes: 'The congregation\'s central response. Say it loudly and with concentration — this response is considered especially meaningful when said in merit of the departed.',
      amud: {
        role: 'congregation',
        instruction: 'Respond loudly and with full concentration.',
        physicalActions: ['stand'],
      },
    },
    {
      id: 'kaddish-mourners-4',
      sortOrder: 4,
      hebrewText: 'יִתְבָּרַךְ וְיִשְׁתַּבַּח וְיִתְפָּאַר וְיִתְרוֹמַם וְיִתְנַשֵּׂא וְיִתְהַדָּר וְיִתְעַלֶּה וְיִתְהַלָּל שְׁמֵהּ דְּקֻדְשָׁא בְּרִיךְ הוּא',
      transliteration: 'Yitbarach v\'yishtabach v\'yitpa\'ar v\'yitromam v\'yitnasei, v\'yithadar v\'yit\'aleh v\'yithalal sh\'mei d\'kudsha b\'rich hu',
      translation: 'Blessed, praised, glorified, exalted, extolled, honored, elevated, and lauded be the name of the Holy One, blessed is He',
      amud: {
        role: 'shaliach_tzibbur',
        congregationResponse: 'בְּרִיךְ הוּא',
        congregationResponseTransliteration: 'B\'rich hu',
      },
    },
    {
      id: 'kaddish-mourners-5',
      sortOrder: 5,
      hebrewText: 'לְעֵלָּא מִן כָּל בִּרְכָתָא וְשִׁירָתָא תֻּשְׁבְּחָתָא וְנֶחֱמָתָא דַּאֲמִירָן בְּעָלְמָא וְאִמְרוּ אָמֵן',
      transliteration: 'L\'eila min kol birchata v\'shirata, tushb\'chata v\'nechemata, da\'amiran b\'alma, v\'imru amen',
      translation: 'Above all the blessings, songs, praises, and consolations that are uttered in the world — and say Amen',
      amud: {
        role: 'shaliach_tzibbur',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        waitForCongregation: true,
      },
    },
    // NOTE: Mourner's Kaddish does NOT include the Titkabel line
    {
      id: 'kaddish-mourners-6',
      sortOrder: 6,
      hebrewText: 'יְהֵא שְׁלָמָא רַבָּא מִן שְׁמַיָּא וְחַיִּים עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל וְאִמְרוּ אָמֵן',
      transliteration: 'Y\'hei sh\'lama raba min sh\'maya v\'chayim aleinu v\'al kol Yisrael, v\'imru amen',
      translation: 'May there be abundant peace from Heaven and life upon us and upon all Israel — and say Amen',
      amud: {
        role: 'shaliach_tzibbur',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        waitForCongregation: true,
      },
    },
    {
      id: 'kaddish-mourners-7',
      sortOrder: 7,
      hebrewText: 'עוֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל וְאִמְרוּ אָמֵן',
      transliteration: 'Oseh shalom bimromav, hu ya\'aseh shalom aleinu v\'al kol Yisrael, v\'imru amen',
      translation: 'He Who makes peace in His heavens, may He make peace upon us and upon all Israel — and say Amen',
      notes: 'Take three steps back, bow left, bow right, and bow forward.',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'Take three steps back, bow left, bow right, and bow forward.',
        congregationResponse: 'אָמֵן',
        congregationResponseTransliteration: 'Amen',
        physicalActions: ['three_steps_back', 'bow'],
        waitForCongregation: true,
      },
    },
  ],
};

// ==========================================
// 4. BARCHU
// ==========================================

const BARCHU: Prayer = {
  id: 'barchu',
  slug: 'barchu',
  nameHebrew: 'בָּרְכוּ',
  nameEnglish: 'Barchu',
  category: 'tefillah',
  sortOrder: 103,
  whenSaid: 'The call to prayer before the blessings of Shema, both at Shacharit and Maariv',
  whySaid: 'Barchu is the formal call to communal prayer. The shaliach tzibbur invites the congregation to bless God, and they respond in kind. It marks the transition into the core of the service.',
  inspirationText: 'Barchu is a call and response — one person calls out to bless God, and the entire community answers together. It is a beautiful reminder that prayer is not meant to be done alone. When you hear "Bar\'chu," you are being personally invited to join in blessing the Creator.',
  requiredLevel: 1,
  estimatedReadSeconds: 15,
  sections: [
    {
      id: 'barchu-1',
      sortOrder: 1,
      hebrewText: 'בָּרְכוּ אֶת יְהוָה הַמְבֹרָךְ',
      transliteration: 'Bar\'chu et Adonai ham\'vorach',
      translation: 'Bless the Lord, the blessed One',
      notes: 'The shaliach tzibbur bows while saying this. Straighten up after saying "Adonai."',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'Bow at "Bar\'chu" and straighten at "Adonai." Call this out to the congregation.',
        physicalActions: ['bow_and_stand'],
        waitForCongregation: true,
        notes: 'This requires a minyan. Bow at the waist when you begin and straighten up when you say God\'s name.',
      },
    },
    {
      id: 'barchu-2',
      sortOrder: 2,
      hebrewText: 'בָּרוּךְ יְהוָה הַמְבֹרָךְ לְעוֹלָם וָעֶד',
      transliteration: 'Baruch Adonai ham\'vorach l\'olam va\'ed',
      translation: 'Blessed is the Lord, the blessed One, forever and ever',
      notes: 'The congregation responds while bowing. This response adds "l\'olam va\'ed" — forever and ever.',
      amud: {
        role: 'congregation',
        instruction: 'Bow at "Baruch" and straighten at "Adonai." Respond to the shaliach tzibbur\'s call.',
        physicalActions: ['bow_and_stand'],
      },
    },
    {
      id: 'barchu-3',
      sortOrder: 3,
      hebrewText: 'בָּרוּךְ יְהוָה הַמְבֹרָךְ לְעוֹלָם וָעֶד',
      transliteration: 'Baruch Adonai ham\'vorach l\'olam va\'ed',
      translation: 'Blessed is the Lord, the blessed One, forever and ever',
      notes: 'The shaliach tzibbur repeats the congregation\'s response.',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'Repeat the congregation\'s response.',
        physicalActions: ['bow_and_stand'],
      },
    },
  ],
};

// ==========================================
// 5. KEDUSHA — SHACHARIT (Ashkenaz Nusach)
// ==========================================

const KEDUSHA_SHACHARIT: Prayer = {
  id: 'kedusha-shacharit',
  slug: 'kedusha-shacharit',
  nameHebrew: 'קְדֻשָּׁה',
  nameEnglish: 'Kedusha (Shacharit)',
  category: 'tefillah',
  sortOrder: 104,
  whenSaid: 'During the repetition of the Amidah (Chazarat HaShatz) at Shacharit, within the third blessing',
  whySaid: 'The Kedusha is the moment when we join the angels in declaring God\'s holiness. Just as the angels call out "Kadosh, kadosh, kadosh," we echo their words in unison.',
  inspirationText: 'The Kedusha is one of the most exalted moments in the prayer service. The prophet Isaiah saw angels calling out to each other "Holy, holy, holy!" and the prophet Ezekiel heard them say "Blessed is God\'s glory from His place." In the Kedusha, we reenact that heavenly scene right here on earth — standing with our feet together like angels, rising on our toes as if reaching toward Heaven.',
  requiredLevel: 1,
  estimatedReadSeconds: 60,
  sections: [
    {
      id: 'kedusha-shacharit-1',
      sortOrder: 1,
      hebrewText: 'נְקַדֵּשׁ אֶת שִׁמְךָ בָּעוֹלָם כְּשֵׁם שֶׁמַּקְדִּישִׁים אוֹתוֹ בִּשְׁמֵי מָרוֹם כַּכָּתוּב עַל יַד נְבִיאֶךָ וְקָרָא זֶה אֶל זֶה וְאָמַר',
      transliteration: 'N\'kadesh et shimcha ba\'olam, k\'shem shemakdishim oto bishmei marom, kakatuv al yad n\'vi\'echa, v\'kara zeh el zeh v\'amar',
      translation: 'We will sanctify Your name in the world, just as they sanctify it in the highest heavens, as it is written by Your prophet: "And one called to the other and said..."',
      notes: 'The shaliach tzibbur introduces the Kedusha. Stand with feet together throughout, like the angels. In Nusach Sefard, the opening is "Nakdishah\'cha v\'na\'aritz\'cha" instead.',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'Stand with feet together. Begin the introduction to Kedusha.',
        physicalActions: ['stand'],
        notes: 'Keep feet together throughout the Kedusha, imitating the angels who are described as having "straight legs" (Ezekiel 1:7).',
      },
    },
    {
      id: 'kedusha-shacharit-2',
      sortOrder: 2,
      hebrewText: 'קָדוֹשׁ קָדוֹשׁ קָדוֹשׁ יְהוָה צְבָאוֹת מְלֹא כָל הָאָרֶץ כְּבוֹדוֹ',
      transliteration: 'Kadosh kadosh kadosh Adonai Tz\'vaot, m\'lo chol ha\'aretz k\'vodo',
      translation: 'Holy, holy, holy is the Lord of Hosts; the whole earth is full of His glory',
      notes: 'From Isaiah 6:3. Rise on your toes three times — once for each "Kadosh." This is the verse the angels call to each other in Isaiah\'s vision of the heavenly throne.',
      amud: {
        role: 'congregation',
        instruction: 'Rise on your toes three times, once for each "Kadosh." Say this with the intensity of the angels.',
        physicalActions: ['stand', 'rise_on_toes'],
        notes: 'Rise on your toes at each of the three "Kadosh" — reaching upward toward Heaven.',
      },
    },
    {
      id: 'kedusha-shacharit-3',
      sortOrder: 3,
      hebrewText: 'לְעֻמָּתָם בָּרוּךְ יֹאמֵרוּ',
      transliteration: 'L\'umatam baruch yomeru',
      translation: 'Those facing them say "Blessed..."',
      notes: 'The shaliach tzibbur introduces the next congregational response — from Ezekiel\'s vision.',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'Transition to the next verse.',
      },
    },
    {
      id: 'kedusha-shacharit-4',
      sortOrder: 4,
      hebrewText: 'בָּרוּךְ כְּבוֹד יְהוָה מִמְּקוֹמוֹ',
      transliteration: 'Baruch k\'vod Adonai mimkomo',
      translation: 'Blessed is the glory of the Lord from His place',
      notes: 'From Ezekiel 3:12. The angels praise God without knowing His exact location — "from His place" — a beautiful expression of awe and mystery.',
      amud: {
        role: 'congregation',
        instruction: 'Respond together.',
        physicalActions: ['stand'],
      },
    },
    {
      id: 'kedusha-shacharit-5',
      sortOrder: 5,
      hebrewText: 'וּבְדִבְרֵי קָדְשְׁךָ כָּתוּב לֵאמֹר',
      transliteration: 'Uv\'divrei kodsh\'cha katuv leimor',
      translation: 'And in Your holy Writings it is written, saying:',
      notes: 'The shaliach tzibbur introduces the final verse — from Psalms.',
      amud: {
        role: 'shaliach_tzibbur',
        instruction: 'Introduce the final congregational response.',
      },
    },
    {
      id: 'kedusha-shacharit-6',
      sortOrder: 6,
      hebrewText: 'יִמְלֹךְ יְהוָה לְעוֹלָם אֱלֹהַיִךְ צִיּוֹן לְדֹר וָדֹר הַלְלוּיָהּ',
      transliteration: 'Yimloch Adonai l\'olam, Elohayich Tziyon, l\'dor vador, hal\'luyah',
      translation: 'The Lord shall reign forever, your God, O Zion, from generation to generation — Halleluyah!',
      notes: 'From Psalm 146:10. This verse declares God\'s eternal kingship and concludes the three scriptural declarations of the Kedusha.',
      amud: {
        role: 'congregation',
        instruction: 'Respond together with this final declaration.',
        physicalActions: ['stand'],
      },
    },
  ],
};

// ==========================================
// 6. MODIM D'RABBANAN
// ==========================================

const MODIM_DERABANAN: Prayer = {
  id: 'modim-derabanan',
  slug: 'modim-derabanan',
  nameHebrew: 'מוֹדִים דְּרַבָּנָן',
  nameEnglish: 'Modim D\'Rabbanan',
  category: 'tefillah',
  sortOrder: 105,
  whenSaid: 'Said quietly by the congregation during the repetition of the Amidah when the shaliach tzibbur says Modim',
  whySaid: 'When it comes to giving thanks, we cannot delegate to a representative — each person must express their own gratitude. So the Rabbis composed a special version of Modim for the congregation to say alongside the shaliach tzibbur.',
  inspirationText: 'There are things a representative can say on your behalf — but thank you is not one of them. When the shaliach tzibbur reaches the blessing of thanksgiving, the congregation says their own version. Gratitude must be personal. No one can thank God for you.',
  requiredLevel: 1,
  estimatedReadSeconds: 30,
  sections: [
    {
      id: 'modim-derabanan-1',
      sortOrder: 1,
      hebrewText: 'מוֹדִים אֲנַחְנוּ לָךְ',
      transliteration: 'Modim anachnu lach',
      translation: 'We give thanks to You',
      notes: 'Bow at "Modim." This mirrors what the shaliach tzibbur is saying — but here YOU are saying your own thanks.',
      amud: {
        role: 'congregation',
        instruction: 'Bow at the word "Modim" and say this quietly while the shaliach tzibbur says the regular Modim.',
        physicalActions: ['bow'],
        notes: 'Begin bowing as you say "Modim" and straighten up gradually.',
      },
    },
    {
      id: 'modim-derabanan-2',
      sortOrder: 2,
      hebrewText: 'שָׁאַתָּה הוּא יְהוָה אֱלֹהֵינוּ וֵאלֹהֵי אֲבוֹתֵינוּ אֱלֹהֵי כָל בָּשָׂר יוֹצְרֵנוּ יוֹצֵר בְּרֵאשִׁית',
      transliteration: 'Sha\'ata hu Adonai Eloheinu v\'Elohei avoteinu, Elohei chol basar, yotz\'reinu, yotzer b\'reishit',
      translation: 'For You are the Lord our God and God of our fathers, God of all flesh, our Creator, Creator of the beginning',
      amud: {
        role: 'congregation',
        instruction: 'Continue saying quietly.',
      },
    },
    {
      id: 'modim-derabanan-3',
      sortOrder: 3,
      hebrewText: 'בְּרָכוֹת וְהוֹדָאוֹת לְשִׁמְךָ הַגָּדוֹל וְהַקָּדוֹשׁ עַל שֶׁהֶחֱיִיתָנוּ וְקִיַּמְתָּנוּ',
      transliteration: 'B\'rachot v\'hoda\'ot l\'shimcha hagadol v\'hakadosh, al shehecheyitanu v\'kiy\'amtanu',
      translation: 'Blessings and thanks to Your great and holy name for keeping us alive and sustaining us',
      amud: {
        role: 'congregation',
      },
    },
    {
      id: 'modim-derabanan-4',
      sortOrder: 4,
      hebrewText: 'כֵּן תְּחַיֵּנוּ וּתְחָנֵּנוּ וְתֶאֱסוֹף גָּלֻיּוֹתֵינוּ לְחַצְרוֹת קָדְשֶׁךָ לִשְׁמוֹר חֻקֶּיךָ וְלַעֲשׂוֹת רְצוֹנֶךָ וּלְעָבְדְּךָ בְּלֵבָב שָׁלֵם עַל שֶׁאֲנַחְנוּ מוֹדִים לָךְ',
      transliteration: 'Ken t\'chayeinu ut\'chaneinu v\'te\'esof galuyoteinu l\'chatzrot kodshecha, lishmor chukecha v\'la\'asot r\'tzonecha ul\'ovd\'cha b\'levav shalem, al she\'anachnu modim lach',
      translation: 'So may You continue to keep us alive, and be gracious to us, and gather our exiles to the courtyards of Your sanctuary, to observe Your statutes and do Your will and serve You wholeheartedly — for we give thanks to You',
      amud: {
        role: 'congregation',
      },
    },
    {
      id: 'modim-derabanan-5',
      sortOrder: 5,
      hebrewText: 'בָּרוּךְ אֵל הַהוֹדָאוֹת',
      transliteration: 'Baruch El hahoda\'ot',
      translation: 'Blessed is the God of thanksgivings',
      notes: 'This is the closing line. Straighten up from your bow. This unique closing — "God of thanksgivings" — appears only here.',
      amud: {
        role: 'congregation',
        instruction: 'Straighten up from the bow at this closing line.',
        physicalActions: ['stand'],
      },
    },
  ],
};

// ==========================================
// 7. LECHA DODI
// ==========================================

const LECHA_DODI: Prayer = {
  id: 'lecha-dodi',
  slug: 'lecha-dodi',
  nameHebrew: 'לְכָה דוֹדִי',
  nameEnglish: 'Lecha Dodi',
  category: 'tefillah',
  sortOrder: 106,
  whenSaid: 'During Kabbalat Shabbat, the Friday evening service welcoming Shabbat',
  whySaid: 'Composed by the great kabbalist Rabbi Shlomo Alkabetz in 16th-century Tzfat, this hymn personifies Shabbat as a bride and queen. We go out to greet her with joy and song.',
  inspirationText: 'Imagine a groom going out to greet his bride. That is what we do every Friday evening — we welcome Shabbat as a beloved bride. The mystics of Tzfat would literally walk out to the fields as the sun set, singing this song to welcome the Shabbat Queen. The first letters of the first eight stanzas spell out the author\'s name: Shlomo HaLevi.',
  requiredLevel: 1,
  estimatedReadSeconds: 180,
  sections: [
    // Refrain
    {
      id: 'lecha-dodi-refrain',
      sortOrder: 1,
      hebrewText: 'לְכָה דוֹדִי לִקְרַאת כַּלָּה פְּנֵי שַׁבָּת נְקַבְּלָה',
      transliteration: 'Lecha dodi likrat kala, p\'nei Shabbat n\'kab\'lah',
      translation: 'Come, my beloved, to greet the bride; let us welcome the Shabbat',
      notes: 'This refrain is repeated after each stanza. Everyone sings together — it is one of the most well-known melodies in Jewish life.',
      amud: {
        role: 'both',
        instruction: 'Everyone sings together. This refrain is repeated after every stanza.',
        physicalActions: ['stand'],
      },
    },
    // Stanza 1
    {
      id: 'lecha-dodi-1',
      sortOrder: 2,
      hebrewText: 'שָׁמוֹר וְזָכוֹר בְּדִבּוּר אֶחָד הִשְׁמִיעָנוּ אֵל הַמְיֻחָד יְהוָה אֶחָד וּשְׁמוֹ אֶחָד לְשֵׁם וּלְתִפְאֶרֶת וְלִתְהִלָּה',
      transliteration: 'Shamor v\'zachor b\'dibur echad, hishmi\'anu El ham\'yuchad, Adonai echad ush\'mo echad, l\'shem ul\'tiferet v\'lit\'hila',
      translation: '"Keep" and "Remember" in a single utterance, the One God made us hear; the Lord is One and His name is One, for glory, splendor, and praise',
      notes: 'Refers to the two versions of the Shabbat commandment — "Remember" (Exodus 20:8) and "Keep" (Deuteronomy 5:12) — which tradition says were spoken simultaneously.',
      amud: {
        role: 'both',
        instruction: 'Sing together, then repeat the refrain.',
      },
    },
    // Stanza 2
    {
      id: 'lecha-dodi-2',
      sortOrder: 3,
      hebrewText: 'לִקְרַאת שַׁבָּת לְכוּ וְנֵלְכָה כִּי הִיא מְקוֹר הַבְּרָכָה מֵרֹאשׁ מִקֶּדֶם נְסוּכָה סוֹף מַעֲשֶׂה בְּמַחֲשָׁבָה תְּחִלָּה',
      transliteration: 'Likrat Shabbat l\'chu v\'nelcha, ki hi m\'kor hab\'racha, merosh mikedem n\'sucha, sof ma\'aseh b\'machashava t\'chila',
      translation: 'Come, let us go to greet Shabbat, for it is the source of blessing; from the very beginning it was ordained — last in creation, first in God\'s thought',
      notes: 'Shabbat was the last thing created but the first thing God planned — it was the purpose of all creation.',
      amud: {
        role: 'both',
      },
    },
    // Stanza 3
    {
      id: 'lecha-dodi-3',
      sortOrder: 4,
      hebrewText: 'מִקְדַּשׁ מֶלֶךְ עִיר מְלוּכָה קוּמִי צְאִי מִתּוֹךְ הַהֲפֵכָה רַב לָךְ שֶׁבֶת בְּעֵמֶק הַבָּכָא וְהוּא יַחֲמוֹל עָלַיִךְ חֶמְלָה',
      transliteration: 'Mikdash melech ir m\'lucha, kumi tz\'i mitoch hahafecha, rav lach shevet b\'emek habacha, v\'hu yachamol alayich chemla',
      translation: 'Sanctuary of the King, royal city, arise and leave from amid the upheaval; too long have you dwelt in the valley of weeping — He will shower compassion upon you',
      notes: 'Addressing Jerusalem — calling her to rise from exile and suffering.',
      amud: {
        role: 'both',
      },
    },
    // Stanza 4
    {
      id: 'lecha-dodi-4',
      sortOrder: 5,
      hebrewText: 'הִתְנַעֲרִי מֵעָפָר קוּמִי לִבְשִׁי בִּגְדֵי תִפְאַרְתֵּךְ עַמִּי עַל יַד בֶּן יִשַׁי בֵּית הַלַּחְמִי קָרְבָה אֶל נַפְשִׁי גְאָלָהּ',
      transliteration: 'Hitna\'ari me\'afar kumi, livshi bigdei tifart\'ech ami, al yad ben Yishai beit haLachmi, korva el nafshi g\'alah',
      translation: 'Shake off the dust, arise! Don your garments of glory, my people; through the son of Yishai of Bethlehem, draw near to my soul — redeem it!',
      notes: 'A reference to the Messiah, descendant of King David (son of Yishai from Bethlehem).',
      amud: {
        role: 'both',
      },
    },
    // Stanza 5
    {
      id: 'lecha-dodi-5',
      sortOrder: 6,
      hebrewText: 'הִתְעוֹרְרִי הִתְעוֹרְרִי כִּי בָא אוֹרֵךְ קוּמִי אוֹרִי עוּרִי עוּרִי שִׁיר דַּבֵּרִי כְּבוֹד יְהוָה עָלַיִךְ נִגְלָה',
      transliteration: 'Hit\'or\'ri hit\'or\'ri, ki va orech kumi ori, uri uri shir daberi, k\'vod Adonai alayich nigla',
      translation: 'Awaken, awaken, for your light has come, arise and shine! Awake, awake, sing a song — the glory of the Lord is revealed upon you',
      notes: 'Based on Isaiah 60:1 — a vision of the future redemption and glory of Jerusalem.',
      amud: {
        role: 'both',
      },
    },
    // Stanza 6
    {
      id: 'lecha-dodi-6',
      sortOrder: 7,
      hebrewText: 'לֹא תֵבוֹשִׁי וְלֹא תִכָּלְמִי מַה תִּשְׁתּוֹחֲחִי וּמַה תֶּהֱמִי בָּךְ יֶחֱסוּ עֲנִיֵּי עַמִּי וְנִבְנְתָה עִיר עַל תִּלָּהּ',
      transliteration: 'Lo tevoshi v\'lo tikalmi, mah tishtochachi umah tehemi, bach yechesu aniyei ami, v\'nivn\'tah ir al tilah',
      translation: 'Do not be ashamed and do not be humiliated; why are you downcast, why do you moan? In you the afflicted of my people will find shelter, and the city shall be rebuilt on its hill',
      amud: {
        role: 'both',
      },
    },
    // Stanza 7
    {
      id: 'lecha-dodi-7',
      sortOrder: 8,
      hebrewText: 'וְהָיוּ לִמְשִׁסָּה שׁוֹאָסָיִךְ וְרָחֲקוּ כָּל מְבַלְּעָיִךְ יָשִׂישׂ עָלַיִךְ אֱלֹהָיִךְ כִּמְשׂוֹשׂ חָתָן עַל כַּלָּה',
      transliteration: 'V\'hayu limshisa sho\'asayich, v\'rachaku kol m\'val\'ayich, yasis alayich Elohayich, kimsos chatan al kala',
      translation: 'Those who plundered you shall become plunder, and all who devoured you shall be far away; your God will rejoice over you like a groom rejoices over his bride',
      notes: 'The metaphor of groom and bride returns — God Himself rejoices over the restored Jerusalem like a groom at his wedding.',
      amud: {
        role: 'both',
      },
    },
    // Stanza 8
    {
      id: 'lecha-dodi-8',
      sortOrder: 9,
      hebrewText: 'יָמִין וּשְׂמֹאל תִּפְרוֹצִי וְאֶת יְהוָה תַּעֲרִיצִי עַל יַד אִישׁ בֶּן פַּרְצִי וְנִשְׂמְחָה וְנָגִילָה',
      transliteration: 'Yamin us\'mol tifrotzi, v\'et Adonai ta\'aritzi, al yad ish ben Partzi, v\'nism\'cha v\'nagila',
      translation: 'To the right and to the left you shall spread out, and the Lord you shall revere; through the descendant of Peretz, we shall rejoice and be glad',
      notes: 'Peretz was an ancestor of King David — another messianic reference.',
      amud: {
        role: 'both',
      },
    },
    // Stanza 9 (Final — Turn to face west / entrance)
    {
      id: 'lecha-dodi-9',
      sortOrder: 10,
      hebrewText: 'בּוֹאִי בְשָׁלוֹם עֲטֶרֶת בַּעְלָהּ גַּם בְּשִׂמְחָה וּבְצָהֳלָה תּוֹךְ אֱמוּנֵי עַם סְגֻלָּה בּוֹאִי כַלָּה בּוֹאִי כַלָּה',
      transliteration: 'Bo\'i v\'shalom ateret ba\'alah, gam b\'simcha uv\'tzohola, toch emunei am s\'gula, bo\'i chala, bo\'i chala',
      translation: 'Come in peace, crown of her husband, come with joy and jubilation, among the faithful of the treasured people — come, O bride! Come, O bride!',
      notes: 'For the last stanza, the congregation turns to face the entrance of the synagogue (toward the west) to welcome the Shabbat Queen. Some bow at "bo\'i chala." Many repeat "bo\'i chala" an additional time.',
      amud: {
        role: 'both',
        instruction: 'Turn toward the entrance of the synagogue (west) for this final stanza, as if greeting the Shabbat bride. Bow slightly at "bo\'i chala."',
        physicalActions: ['face_west', 'bow'],
        notes: 'This is the dramatic climax of Kabbalat Shabbat. Turn toward the door as if the Shabbat Queen is walking in.',
      },
    },
  ],
};

// ==========================================
// 8. KABBALAT SHABBAT PSALMS
// ==========================================

const KABBALAT_SHABBAT_PSALMS: Prayer = {
  id: 'kabbalat-shabbat-psalms',
  slug: 'kabbalat-shabbat-psalms',
  nameHebrew: 'מִזְמוֹרֵי קַבָּלַת שַׁבָּת',
  nameEnglish: 'Kabbalat Shabbat Psalms',
  category: 'tefillah',
  sortOrder: 107,
  whenSaid: 'Friday evening, before Lecha Dodi — the opening of the Kabbalat Shabbat service',
  whySaid: 'The kabbalists of Tzfat instituted six psalms (95-99 and 29) to correspond to the six days of the week, welcoming the seventh day. These psalms celebrate God\'s majesty and kingship over creation.',
  inspirationText: 'Six psalms for six days of the week — and then we greet the seventh. The mystics of Tzfat would dress in white and walk out to the fields as the sun began to set, singing these psalms to usher in the Shabbat. Each psalm builds the sense of joy and anticipation until we burst into Lecha Dodi.',
  requiredLevel: 1,
  estimatedReadSeconds: 300,
  sections: [
    // --- Psalm 95 ---
    {
      id: 'kab-shab-ps95-1',
      sortOrder: 1,
      hebrewText: 'לְכוּ נְרַנְּנָה לַיהוָה נָרִיעָה לְצוּר יִשְׁעֵנוּ',
      transliteration: 'L\'chu n\'ran\'na lAdonai, nari\'a l\'tzur yish\'enu',
      translation: 'Come, let us sing joyfully to the Lord; let us shout to the Rock of our salvation',
      notes: 'Psalm 95 opens Kabbalat Shabbat. This is a call to communal joy and song.',
      amud: {
        role: 'both',
        instruction: 'Everyone says/sings together. Stand for the psalms of Kabbalat Shabbat.',
        physicalActions: ['stand'],
        notes: 'Psalm 95 — the first of six psalms that usher in Shabbat.',
      },
    },
    {
      id: 'kab-shab-ps95-2',
      sortOrder: 2,
      hebrewText: 'נְקַדְּמָה פָנָיו בְּתוֹדָה בִּזְמִרוֹת נָרִיעַ לוֹ',
      transliteration: 'N\'kad\'ma fanav b\'toda, bizmirot nari\'a lo',
      translation: 'Let us greet His presence with thanksgiving, with songs let us shout to Him',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps95-3',
      sortOrder: 3,
      hebrewText: 'כִּי אֵל גָּדוֹל יְהוָה וּמֶלֶךְ גָּדוֹל עַל כָּל אֱלֹהִים',
      transliteration: 'Ki El gadol Adonai, u\'melech gadol al kol elohim',
      translation: 'For the Lord is a great God, and a great King above all powers',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps95-4',
      sortOrder: 4,
      hebrewText: 'אֲשֶׁר בְּיָדוֹ מֶחְקְרֵי אָרֶץ וְתוֹעֲפוֹת הָרִים לוֹ. אֲשֶׁר לוֹ הַיָּם וְהוּא עָשָׂהוּ וְיַבֶּשֶׁת יָדָיו יָצָרוּ',
      transliteration: 'Asher b\'yado mechk\'rei aretz, v\'to\'afot harim lo. Asher lo hayam v\'hu asahu, v\'yabeshet yadav yatzaru',
      translation: 'In His hands are the depths of the earth, and the heights of the mountains are His. The sea is His — He made it, and His hands formed the dry land',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps95-5',
      sortOrder: 5,
      hebrewText: 'בֹּאוּ נִשְׁתַּחֲוֶה וְנִכְרָעָה נִבְרְכָה לִפְנֵי יְהוָה עֹשֵׂנוּ. כִּי הוּא אֱלֹהֵינוּ וַאֲנַחְנוּ עַם מַרְעִיתוֹ וְצֹאן יָדוֹ הַיּוֹם אִם בְּקוֹלוֹ תִשְׁמָעוּ',
      transliteration: 'Bo\'u nishtachaveh v\'nichr\'ah, nivr\'cha lifnei Adonai oseinu. Ki hu Eloheinu va\'anachnu am mar\'ito v\'tzon yado, hayom im b\'kolo tishma\'u',
      translation: 'Come, let us prostrate ourselves and bow, let us kneel before the Lord our Maker. For He is our God and we are the people of His pasture and the flock of His hand — today, if you would but listen to His voice',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps95-6',
      sortOrder: 6,
      hebrewText: 'אַל תַּקְשׁוּ לְבַבְכֶם כִּמְרִיבָה כְּיוֹם מַסָּה בַּמִּדְבָּר. אֲשֶׁר נִסּוּנִי אֲבוֹתֵיכֶם בְּחָנוּנִי גַּם רָאוּ פָעֳלִי',
      transliteration: 'Al takshu l\'vavchem kimriva, k\'yom masa bamidbar. Asher nisuni avoteichem, b\'chanuni gam ra\'u fo\'oli',
      translation: 'Do not harden your hearts as at Merivah, as on the day of Massah in the wilderness, when your fathers tested Me — they tried Me even though they saw My deeds',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps95-7',
      sortOrder: 7,
      hebrewText: 'אַרְבָּעִים שָׁנָה אָקוּט בְּדוֹר וָאֹמַר עַם תֹּעֵי לֵבָב הֵם וְהֵם לֹא יָדְעוּ דְרָכָי. אֲשֶׁר נִשְׁבַּעְתִּי בְאַפִּי אִם יְבֹאוּן אֶל מְנוּחָתִי',
      transliteration: 'Arba\'im shana akut b\'dor, va\'omar am to\'ei levav hem, v\'hem lo yad\'u d\'rachai. Asher nishba\'ti v\'api im y\'vo\'un el m\'nuchati',
      translation: 'For forty years I quarreled with that generation and said: "They are a people of erring hearts and they do not know My ways." So I swore in My anger that they would not come to My resting place',
      notes: 'End of Psalm 95. God speaks of the generation of the wilderness — a warning not to take His gifts for granted.',
      amud: { role: 'both' },
    },
    // --- Psalm 96 ---
    {
      id: 'kab-shab-ps96-1',
      sortOrder: 8,
      hebrewText: 'שִׁירוּ לַיהוָה שִׁיר חָדָשׁ שִׁירוּ לַיהוָה כָּל הָאָרֶץ. שִׁירוּ לַיהוָה בָּרְכוּ שְׁמוֹ בַּשְּׂרוּ מִיּוֹם לְיוֹם יְשׁוּעָתוֹ',
      transliteration: 'Shiru lAdonai shir chadash, shiru lAdonai kol ha\'aretz. Shiru lAdonai bar\'chu sh\'mo, bas\'ru miyom l\'yom y\'shu\'ato',
      translation: 'Sing to the Lord a new song, sing to the Lord, all the earth. Sing to the Lord, bless His name, proclaim His salvation day after day',
      notes: 'Psalm 96 — a call for the entire earth to sing a new song to God.',
      amud: {
        role: 'both',
        notes: 'Psalm 96 — the second psalm of Kabbalat Shabbat.',
      },
    },
    {
      id: 'kab-shab-ps96-2',
      sortOrder: 9,
      hebrewText: 'סַפְּרוּ בַגּוֹיִם כְּבוֹדוֹ בְּכָל הָעַמִּים נִפְלְאוֹתָיו. כִּי גָדוֹל יְהוָה וּמְהֻלָּל מְאֹד נוֹרָא הוּא עַל כָּל אֱלֹהִים. כִּי כָּל אֱלֹהֵי הָעַמִּים אֱלִילִים וַיהוָה שָׁמַיִם עָשָׂה',
      transliteration: 'Sap\'ru vagoyim k\'vodo, b\'chol ha\'amim nifl\'otav. Ki gadol Adonai um\'hulal m\'od, nora hu al kol elohim. Ki kol elohei ha\'amim elilim, vAdonai shamayim asa',
      translation: 'Declare His glory among the nations, His wonders among all peoples. For the Lord is great and most praiseworthy, awesome above all powers. For all the gods of the peoples are idols, but the Lord made the heavens',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps96-3',
      sortOrder: 10,
      hebrewText: 'הוֹד וְהָדָר לְפָנָיו עֹז וְתִפְאֶרֶת בְּמִקְדָּשׁוֹ. הָבוּ לַיהוָה מִשְׁפְּחוֹת עַמִּים הָבוּ לַיהוָה כָּבוֹד וָעֹז. הָבוּ לַיהוָה כְּבוֹד שְׁמוֹ שְׂאוּ מִנְחָה וּבֹאוּ לְחַצְרוֹתָיו',
      transliteration: 'Hod v\'hadar l\'fanav, oz v\'tiferet b\'mikdasho. Havu lAdonai mishp\'chot amim, havu lAdonai kavod va\'oz. Havu lAdonai k\'vod sh\'mo, s\'u mincha uvo\'u l\'chatzrotav',
      translation: 'Majesty and splendor are before Him, strength and beauty are in His sanctuary. Give to the Lord, families of peoples, give to the Lord honor and might. Give to the Lord the honor due His name, bring an offering and come to His courtyards',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps96-4',
      sortOrder: 11,
      hebrewText: 'הִשְׁתַּחֲווּ לַיהוָה בְּהַדְרַת קֹדֶשׁ חִילוּ מִפָּנָיו כָּל הָאָרֶץ. אִמְרוּ בַגּוֹיִם יְהוָה מָלָךְ אַף תִּכּוֹן תֵּבֵל בַּל תִּמּוֹט יָדִין עַמִּים בְּמֵישָׁרִים',
      transliteration: 'Hishtachavu lAdonai b\'hadrat kodesh, chilu mipanav kol ha\'aretz. Imru vagoyim Adonai malach, af tikon tevel bal timot, yadin amim b\'meisharim',
      translation: 'Bow to the Lord in the splendor of holiness, tremble before Him, all the earth. Say among the nations: "The Lord reigns!" He has established the world so it will not falter; He will judge the peoples with equity',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps96-5',
      sortOrder: 12,
      hebrewText: 'יִשְׂמְחוּ הַשָּׁמַיִם וְתָגֵל הָאָרֶץ יִרְעַם הַיָּם וּמְלֹאוֹ. יַעֲלֹז שָׂדַי וְכָל אֲשֶׁר בּוֹ אָז יְרַנְּנוּ כָּל עֲצֵי יָעַר. לִפְנֵי יְהוָה כִּי בָא כִּי בָא לִשְׁפֹּט הָאָרֶץ יִשְׁפֹּט תֵּבֵל בְּצֶדֶק וְעַמִּים בֶּאֱמוּנָתוֹ',
      transliteration: 'Yism\'chu hashamayim v\'tagel ha\'aretz, yir\'am hayam um\'lo\'o. Ya\'aloz sadai v\'chol asher bo, az y\'ran\'nu kol atzei ya\'ar. Lifnei Adonai ki va, ki va lishpot ha\'aretz, yishpot tevel b\'tzedek v\'amim be\'emunato',
      translation: 'The heavens will rejoice and the earth will be glad, the sea and its fullness will roar. The field and all that is in it will exult, then all the trees of the forest will sing for joy — before the Lord, for He comes, He comes to judge the earth; He will judge the world with righteousness and peoples with His faithfulness',
      notes: 'End of Psalm 96.',
      amud: { role: 'both' },
    },
    // --- Psalm 97 ---
    {
      id: 'kab-shab-ps97-1',
      sortOrder: 13,
      hebrewText: 'יְהוָה מָלָךְ תָּגֵל הָאָרֶץ יִשְׂמְחוּ אִיִּים רַבִּים. עָנָן וַעֲרָפֶל סְבִיבָיו צֶדֶק וּמִשְׁפָּט מְכוֹן כִּסְאוֹ',
      transliteration: 'Adonai malach tagel ha\'aretz, yism\'chu iyim rabim. Anan va\'arafel s\'vivav, tzedek umishpat m\'chon kis\'o',
      translation: 'The Lord reigns — let the earth rejoice, let the many islands be glad. Cloud and thick darkness surround Him; righteousness and justice are the foundation of His throne',
      notes: 'Psalm 97 — the third psalm of Kabbalat Shabbat.',
      amud: {
        role: 'both',
        notes: 'Psalm 97.',
      },
    },
    {
      id: 'kab-shab-ps97-2',
      sortOrder: 14,
      hebrewText: 'אֵשׁ לְפָנָיו תֵּלֵךְ וּתְלַהֵט סָבִיב צָרָיו. הֵאִירוּ בְרָקָיו תֵּבֵל רָאֲתָה וַתָּחֵל הָאָרֶץ. הָרִים כַּדּוֹנַג נָמַסּוּ מִלִּפְנֵי יְהוָה מִלִּפְנֵי אֲדוֹן כָּל הָאָרֶץ',
      transliteration: 'Esh l\'fanav telech ut\'lahet saviv tzarav. He\'iru v\'rakav tevel, ra\'ata vatachel ha\'aretz. Harim kadonag namasu milifnei Adonai, milifnei Adon kol ha\'aretz',
      translation: 'Fire goes before Him and burns His foes all around. His lightning illuminated the world; the earth saw and trembled. Mountains melted like wax before the Lord, before the Master of all the earth',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps97-3',
      sortOrder: 15,
      hebrewText: 'הִגִּידוּ הַשָּׁמַיִם צִדְקוֹ וְרָאוּ כָל הָעַמִּים כְּבוֹדוֹ. יֵבשׁוּ כָּל עוֹבְדֵי פֶסֶל הַמִּתְהַלְלִים בָּאֱלִילִים הִשְׁתַּחֲווּ לוֹ כָּל אֱלֹהִים',
      transliteration: 'Higidu hashamayim tzidko, v\'ra\'u chol ha\'amim k\'vodo. Yevoshu kol ov\'dei fesel, hamithal\'lim ba\'elilim, hishtachavu lo kol elohim',
      translation: 'The heavens declared His righteousness, and all the peoples saw His glory. All who serve graven images are ashamed, who glory in idols — bow before Him, all powers',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps97-4',
      sortOrder: 16,
      hebrewText: 'שָׁמְעָה וַתִּשְׂמַח צִיּוֹן וַתָּגֵלְנָה בְּנוֹת יְהוּדָה לְמַעַן מִשְׁפָּטֶיךָ יְהוָה. כִּי אַתָּה יְהוָה עֶלְיוֹן עַל כָּל הָאָרֶץ מְאֹד נַעֲלֵיתָ עַל כָּל אֱלֹהִים',
      transliteration: 'Sham\'a vatismach Tziyon, vatagelnah b\'not Y\'huda, l\'ma\'an mishpatecha Adonai. Ki ata Adonai elyon al kol ha\'aretz, m\'od na\'aleita al kol elohim',
      translation: 'Zion heard and rejoiced, the daughters of Judah were glad because of Your judgments, Lord. For You, Lord, are most high above all the earth; You are greatly exalted above all powers',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps97-5',
      sortOrder: 17,
      hebrewText: 'אֹהֲבֵי יְהוָה שִׂנְאוּ רָע שֹׁמֵר נַפְשׁוֹת חֲסִידָיו מִיַּד רְשָׁעִים יַצִּילֵם. אוֹר זָרֻעַ לַצַּדִּיק וּלְיִשְׁרֵי לֵב שִׂמְחָה. שִׂמְחוּ צַדִּיקִים בַּיהוָה וְהוֹדוּ לְזֵכֶר קָדְשׁוֹ',
      transliteration: 'Ohavei Adonai sin\'u ra, shomer nafshot chasidav, miyad r\'sha\'im yatzilem. Or zaru\'a latzadik, ul\'yishrei lev simcha. Simchu tzadikim bAdonai, v\'hodu l\'zecher kodsho',
      translation: 'You who love the Lord — hate evil! He guards the souls of His pious ones, from the hand of the wicked He saves them. Light is sown for the righteous, and joy for the upright in heart. Rejoice, righteous ones, in the Lord, and give thanks to His holy name',
      notes: 'End of Psalm 97. "Light is sown for the righteous" — light is planted like a seed that will blossom in the future.',
      amud: { role: 'both' },
    },
    // --- Psalm 98 ---
    {
      id: 'kab-shab-ps98-1',
      sortOrder: 18,
      hebrewText: 'מִזְמוֹר שִׁירוּ לַיהוָה שִׁיר חָדָשׁ כִּי נִפְלָאוֹת עָשָׂה הוֹשִׁיעָה לּוֹ יְמִינוֹ וּזְרוֹעַ קָדְשׁוֹ',
      transliteration: 'Mizmor, shiru lAdonai shir chadash, ki nifla\'ot asa, hoshi\'a lo y\'mino uz\'ro\'a kodsho',
      translation: 'A psalm. Sing to the Lord a new song, for He has done wonders; His right hand and His holy arm have brought Him salvation',
      notes: 'Psalm 98 — the fourth psalm of Kabbalat Shabbat.',
      amud: {
        role: 'both',
        notes: 'Psalm 98.',
      },
    },
    {
      id: 'kab-shab-ps98-2',
      sortOrder: 19,
      hebrewText: 'הוֹדִיעַ יְהוָה יְשׁוּעָתוֹ לְעֵינֵי הַגּוֹיִם גִּלָּה צִדְקָתוֹ. זָכַר חַסְדּוֹ וֶאֱמוּנָתוֹ לְבֵית יִשְׂרָאֵל רָאוּ כָל אַפְסֵי אָרֶץ אֵת יְשׁוּעַת אֱלֹהֵינוּ',
      transliteration: 'Hodia Adonai y\'shu\'ato, l\'einei hagoyim gila tzidkato. Zachar chasdo ve\'emunato l\'veit Yisrael, ra\'u chol afsei aretz et y\'shu\'at Eloheinu',
      translation: 'The Lord has made known His salvation, revealed His righteousness before the nations. He remembered His kindness and faithfulness to the House of Israel; all the ends of the earth have seen the salvation of our God',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps98-3',
      sortOrder: 20,
      hebrewText: 'הָרִיעוּ לַיהוָה כָּל הָאָרֶץ פִּצְחוּ וְרַנְּנוּ וְזַמֵּרוּ. זַמְּרוּ לַיהוָה בְּכִנּוֹר בְּכִנּוֹר וְקוֹל זִמְרָה. בַּחֲצֹצְרוֹת וְקוֹל שׁוֹפָר הָרִיעוּ לִפְנֵי הַמֶּלֶךְ יְהוָה',
      transliteration: 'Hari\'u lAdonai kol ha\'aretz, pitz\'chu v\'ran\'nu v\'zameru. Zam\'ru lAdonai b\'chinor, b\'chinor v\'kol zimra. Bachatzotz\'rot v\'kol shofar, hari\'u lifnei haMelech Adonai',
      translation: 'Shout for joy to the Lord, all the earth; break forth in song and sing praises! Sing praises to the Lord with the harp, with the harp and the voice of melody. With trumpets and the sound of the shofar, shout before the King, the Lord',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps98-4',
      sortOrder: 21,
      hebrewText: 'יִרְעַם הַיָּם וּמְלֹאוֹ תֵּבֵל וְיוֹשְׁבֵי בָהּ. נְהָרוֹת יִמְחֲאוּ כָף יַחַד הָרִים יְרַנֵּנוּ. לִפְנֵי יְהוָה כִּי בָא לִשְׁפֹּט הָאָרֶץ יִשְׁפֹּט תֵּבֵל בְּצֶדֶק וְעַמִּים בְּמֵישָׁרִים',
      transliteration: 'Yir\'am hayam um\'lo\'o, tevel v\'yosh\'vei vah. N\'harot yimcha\'u chaf, yachad harim y\'ranenu. Lifnei Adonai ki va lishpot ha\'aretz, yishpot tevel b\'tzedek v\'amim b\'meisharim',
      translation: 'Let the sea roar and all that fills it, the world and those who dwell in it. Let the rivers clap their hands, let the mountains sing together for joy — before the Lord, for He comes to judge the earth; He will judge the world with righteousness and peoples with equity',
      notes: 'End of Psalm 98.',
      amud: { role: 'both' },
    },
    // --- Psalm 99 ---
    {
      id: 'kab-shab-ps99-1',
      sortOrder: 22,
      hebrewText: 'יְהוָה מָלָךְ יִרְגְּזוּ עַמִּים יֹשֵׁב כְּרוּבִים תָּנוּט הָאָרֶץ. יְהוָה בְּצִיּוֹן גָּדוֹל וְרָם הוּא עַל כָּל הָעַמִּים',
      transliteration: 'Adonai malach yirg\'zu amim, yoshev k\'ruvim tanut ha\'aretz. Adonai b\'Tziyon gadol, v\'ram hu al kol ha\'amim',
      translation: 'The Lord reigns — let the peoples tremble; He sits upon the Cherubim — let the earth shake. The Lord is great in Zion, exalted above all peoples',
      notes: 'Psalm 99 — the fifth psalm of Kabbalat Shabbat.',
      amud: {
        role: 'both',
        notes: 'Psalm 99.',
      },
    },
    {
      id: 'kab-shab-ps99-2',
      sortOrder: 23,
      hebrewText: 'יוֹדוּ שִׁמְךָ גָּדוֹל וְנוֹרָא קָדוֹשׁ הוּא. וְעֹז מֶלֶךְ מִשְׁפָּט אָהֵב אַתָּה כּוֹנַנְתָּ מֵישָׁרִים מִשְׁפָּט וּצְדָקָה בְּיַעֲקֹב אַתָּה עָשִׂיתָ',
      transliteration: 'Yodu shimcha gadol v\'nora, kadosh hu. V\'oz melech mishpat ahev, ata konanta meisharim, mishpat utz\'daka b\'Ya\'akov ata asita',
      translation: 'Let them praise Your name — great and awesome, holy is He. The King\'s might loves justice; You established equity; justice and righteousness in Jacob You have made',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps99-3',
      sortOrder: 24,
      hebrewText: 'רוֹמְמוּ יְהוָה אֱלֹהֵינוּ וְהִשְׁתַּחֲווּ לַהֲדֹם רַגְלָיו קָדוֹשׁ הוּא',
      transliteration: 'Rom\'mu Adonai Eloheinu v\'hishtachavu lahadom raglav, kadosh hu',
      translation: 'Exalt the Lord our God and bow at His footstool — holy is He',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps99-4',
      sortOrder: 25,
      hebrewText: 'מֹשֶׁה וְאַהֲרֹן בְּכֹהֲנָיו וּשְׁמוּאֵל בְּקוֹרְאֵי שְׁמוֹ קֹרִאים אֶל יְהוָה וְהוּא יַעֲנֵם. בְּעַמּוּד עָנָן יְדַבֵּר אֲלֵיהֶם שָׁמְרוּ עֵדוֹתָיו וְחֹק נָתַן לָמוֹ',
      transliteration: 'Moshe v\'Aharon b\'chohanav, ush\'mu\'el b\'kor\'ei sh\'mo, kor\'im el Adonai v\'hu ya\'anem. B\'amud anan y\'daber aleihem, sham\'ru edotav v\'chok natan lamo',
      translation: 'Moses and Aaron among His priests, and Samuel among those who call upon His name — they called to the Lord and He answered them. In a pillar of cloud He spoke to them; they kept His testimonies and the statute He gave them',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps99-5',
      sortOrder: 26,
      hebrewText: 'יְהוָה אֱלֹהֵינוּ אַתָּה עֲנִיתָם אֵל נֹשֵׂא הָיִיתָ לָהֶם וְנֹקֵם עַל עֲלִילוֹתָם. רוֹמְמוּ יְהוָה אֱלֹהֵינוּ וְהִשְׁתַּחֲווּ לְהַר קָדְשׁוֹ כִּי קָדוֹשׁ יְהוָה אֱלֹהֵינוּ',
      transliteration: 'Adonai Eloheinu ata anitam, El nosei hayita lahem, v\'nokem al alilotam. Rom\'mu Adonai Eloheinu v\'hishtachavu l\'har kodsho, ki kadosh Adonai Eloheinu',
      translation: 'Lord our God, You answered them; a forgiving God You were to them, yet an avenger of their misdeeds. Exalt the Lord our God and bow at His holy mountain, for holy is the Lord our God',
      notes: 'End of Psalm 99.',
      amud: { role: 'both' },
    },
    // --- Psalm 29 (Mizmor l'David) ---
    {
      id: 'kab-shab-ps29-1',
      sortOrder: 27,
      hebrewText: 'מִזְמוֹר לְדָוִד הָבוּ לַיהוָה בְּנֵי אֵלִים הָבוּ לַיהוָה כָּבוֹד וָעֹז. הָבוּ לַיהוָה כְּבוֹד שְׁמוֹ הִשְׁתַּחֲווּ לַיהוָה בְּהַדְרַת קֹדֶשׁ',
      transliteration: 'Mizmor l\'David, havu lAdonai b\'nei elim, havu lAdonai kavod va\'oz. Havu lAdonai k\'vod sh\'mo, hishtachavu lAdonai b\'hadrat kodesh',
      translation: 'A psalm of David. Give to the Lord, O mighty ones, give to the Lord glory and strength. Give to the Lord the glory due His name; bow to the Lord in the splendor of holiness',
      notes: 'Psalm 29 — the sixth and final psalm of Kabbalat Shabbat before Lecha Dodi. This psalm mentions God\'s voice (kol Adonai) seven times.',
      amud: {
        role: 'both',
        notes: 'Psalm 29 (Mizmor l\'David) — the climactic psalm before Lecha Dodi.',
      },
    },
    {
      id: 'kab-shab-ps29-2',
      sortOrder: 28,
      hebrewText: 'קוֹל יְהוָה עַל הַמָּיִם אֵל הַכָּבוֹד הִרְעִים יְהוָה עַל מַיִם רַבִּים. קוֹל יְהוָה בַּכֹּחַ קוֹל יְהוָה בֶּהָדָר',
      transliteration: 'Kol Adonai al hamayim, El hakavod hir\'im, Adonai al mayim rabim. Kol Adonai bakoach, kol Adonai behadar',
      translation: 'The voice of the Lord is upon the waters; the God of glory thunders — the Lord upon many waters. The voice of the Lord is in power, the voice of the Lord is in majesty',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps29-3',
      sortOrder: 29,
      hebrewText: 'קוֹל יְהוָה שֹׁבֵר אֲרָזִים וַיְשַׁבֵּר יְהוָה אֶת אַרְזֵי הַלְּבָנוֹן. וַיַּרְקִידֵם כְּמוֹ עֵגֶל לְבָנוֹן וְשִׂרְיוֹן כְּמוֹ בֶן רְאֵמִים',
      transliteration: 'Kol Adonai shover arazim, vay\'shaber Adonai et arzei haL\'vanon. Vayarkidem k\'mo egel, L\'vanon v\'Siryon k\'mo ven r\'emim',
      translation: 'The voice of the Lord breaks cedars; the Lord shatters the cedars of Lebanon. He makes them skip like a calf — Lebanon and Sirion like a young wild ox',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps29-4',
      sortOrder: 30,
      hebrewText: 'קוֹל יְהוָה חֹצֵב לַהֲבוֹת אֵשׁ. קוֹל יְהוָה יָחִיל מִדְבָּר יָחִיל יְהוָה מִדְבַּר קָדֵשׁ',
      transliteration: 'Kol Adonai chotzev lahavot esh. Kol Adonai yachil midbar, yachil Adonai midbar Kadesh',
      translation: 'The voice of the Lord hews out flames of fire. The voice of the Lord shakes the wilderness; the Lord shakes the wilderness of Kadesh',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps29-5',
      sortOrder: 31,
      hebrewText: 'קוֹל יְהוָה יְחוֹלֵל אַיָּלוֹת וַיֶּחֱשֹׂף יְעָרוֹת וּבְהֵיכָלוֹ כֻּלּוֹ אֹמֵר כָּבוֹד',
      transliteration: 'Kol Adonai y\'cholel ayalot, vayechesof y\'arot, uv\'heichalo kulo omer kavod',
      translation: 'The voice of the Lord causes deer to calve and strips the forests bare — and in His palace, all say: "Glory!"',
      amud: { role: 'both' },
    },
    {
      id: 'kab-shab-ps29-6',
      sortOrder: 32,
      hebrewText: 'יְהוָה לַמַּבּוּל יָשָׁב וַיֵּשֶׁב יְהוָה מֶלֶךְ לְעוֹלָם. יְהוָה עֹז לְעַמּוֹ יִתֵּן יְהוָה יְבָרֵךְ אֶת עַמּוֹ בַשָּׁלוֹם',
      transliteration: 'Adonai lamabul yashav, vayeshev Adonai melech l\'olam. Adonai oz l\'amo yiten, Adonai y\'varech et amo vashalom',
      translation: 'The Lord sat enthroned at the Flood; the Lord sits enthroned as King forever. The Lord will give strength to His people; the Lord will bless His people with peace',
      notes: 'End of Psalm 29. The psalm that began with thunder and power ends with peace. God gives His people strength — and blesses them with shalom.',
      amud: { role: 'both' },
    },
  ],
};

// ==========================================
// 9. VAYECHULU
// ==========================================

const VAYECHULU: Prayer = {
  id: 'vayechulu',
  slug: 'vayechulu',
  nameHebrew: 'וַיְכֻלּוּ',
  nameEnglish: 'Vayechulu',
  category: 'tefillah',
  sortOrder: 108,
  whenSaid: 'Friday night after the Shabbat Amidah, said standing by the entire congregation together',
  whySaid: 'By reciting these verses together, the congregation bears witness that God created the world in six days and rested on the seventh. Two witnesses are needed for testimony in Jewish law, which is why we say it together.',
  inspirationText: 'Every Friday night, we stand together and testify: God created the world, and He rested on Shabbat. These three verses from the Torah are not just a story — they are testimony. In Jewish law, testimony must be given standing. So we rise, and together we declare: Creation has purpose, and rest is holy.',
  requiredLevel: 1,
  estimatedReadSeconds: 30,
  sections: [
    {
      id: 'vayechulu-1',
      sortOrder: 1,
      hebrewText: 'וַיְכֻלּוּ הַשָּׁמַיִם וְהָאָרֶץ וְכָל צְבָאָם',
      transliteration: 'Vay\'chulu hashamayim v\'ha\'aretz v\'chol tz\'va\'am',
      translation: 'And the heavens and the earth were completed, and all their hosts',
      notes: 'Genesis 2:1. Stand for Vayechulu, as we are giving testimony.',
      amud: {
        role: 'both',
        instruction: 'Stand together. This is said as communal testimony — everyone says it in unison.',
        physicalActions: ['stand'],
        notes: 'Stand with feet together. We are acting as witnesses testifying that God created the world.',
      },
    },
    {
      id: 'vayechulu-2',
      sortOrder: 2,
      hebrewText: 'וַיְכַל אֱלֹהִים בַּיּוֹם הַשְּׁבִיעִי מְלַאכְתּוֹ אֲשֶׁר עָשָׂה וַיִּשְׁבֹּת בַּיּוֹם הַשְּׁבִיעִי מִכָּל מְלַאכְתּוֹ אֲשֶׁר עָשָׂה',
      transliteration: 'Vay\'chal Elohim bayom hash\'vi\'i m\'lachto asher asa, vayishbot bayom hash\'vi\'i mikol m\'lachto asher asa',
      translation: 'And God finished on the seventh day His work which He had done, and He rested on the seventh day from all His work which He had done',
      notes: 'Genesis 2:2. God "rested" — not because He was tired, but to create the concept of rest as something holy.',
      amud: {
        role: 'both',
        physicalActions: ['stand'],
      },
    },
    {
      id: 'vayechulu-3',
      sortOrder: 3,
      hebrewText: 'וַיְבָרֶךְ אֱלֹהִים אֶת יוֹם הַשְּׁבִיעִי וַיְקַדֵּשׁ אוֹתוֹ כִּי בוֹ שָׁבַת מִכָּל מְלַאכְתּוֹ אֲשֶׁר בָּרָא אֱלֹהִים לַעֲשׂוֹת',
      transliteration: 'Vay\'varech Elohim et yom hash\'vi\'i vay\'kadesh oto, ki vo shavat mikol m\'lachto asher bara Elohim la\'asot',
      translation: 'And God blessed the seventh day and made it holy, because on it He rested from all His work which God had created to do',
      notes: 'Genesis 2:3. The seventh day is blessed and sanctified — set apart from all other days. This is the foundation of Shabbat.',
      amud: {
        role: 'both',
        physicalActions: ['stand'],
      },
    },
  ],
};

// ==========================================
// COMBINED EXPORT
// ==========================================

export const SERVICE_PRAYERS: Prayer[] = [
  KADDISH_HALF,
  KADDISH_FULL,
  KADDISH_MOURNERS,
  BARCHU,
  KEDUSHA_SHACHARIT,
  MODIM_DERABANAN,
  LECHA_DODI,
  KABBALAT_SHABBAT_PSALMS,
  VAYECHULU,
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get a service prayer by its ID.
 */
export function getServicePrayer(id: string): Prayer | undefined {
  return SERVICE_PRAYERS.find((p) => p.id === id);
}

/**
 * Get all service prayers.
 */
export function getAllServicePrayers(): Prayer[] {
  return SERVICE_PRAYERS;
}
