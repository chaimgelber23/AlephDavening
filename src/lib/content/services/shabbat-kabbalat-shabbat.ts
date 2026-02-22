import type { DaveningService } from '@/types';

export const SHABBAT_KABBALAT_SHABBAT: DaveningService = {
  id: 'shabbat-kabbalat-shabbat',
  name: 'Kabbalat Shabbat & Maariv',
  nameHebrew: 'קַבָּלַת שַׁבָּת וּמַעֲרִיב',
  type: 'shabbat',
  timeOfDay: 'kabbalat_shabbat',
  description: 'Friday night service — welcoming the Shabbat and evening prayers',
  estimatedMinutes: 40,
  segments: [
    // =========================================================================
    // SEGMENT 1: Kabbalat Shabbat (Welcoming the Shabbat)
    // =========================================================================
    {
      id: 'kabbalat-shabbat',
      title: 'Kabbalat Shabbat',
      titleHebrew: 'קַבָּלַת שַׁבָּת',
      description: 'Welcoming the Shabbat with psalms and song',
      color: '#C6973F',
      items: [
        {
          id: 'kshabbat-psalms',
          prayerId: 'kabbalat-shabbat-psalms',
          type: 'prayer',
          label: "Mizmor L'David / Psalms",
          labelHebrew: 'מִזְמוֹר לְדָוִד',
          amud: {
            role: 'both',
            instruction: 'Stand for some of the psalms as is your community\'s custom.',
            physicalActions: ['stand'],
            notes: 'A series of psalms (Psalms 95–99, 29) recited to welcome the Shabbat. Some communities stand for certain psalms.',
          },
          estimatedSeconds: 300,
        },
        {
          id: 'kshabbat-lecha-dodi',
          prayerId: 'lecha-dodi',
          type: 'prayer',
          label: 'Lecha Dodi',
          labelHebrew: 'לְכָה דוֹדִי',
          amud: {
            role: 'both',
            instruction: 'Turn to face the entrance of the shul for the last stanza. Bow when saying "Bo\'i Kallah"',
            physicalActions: ['stand'],
            notes: 'The beloved hymn welcoming the Shabbat Queen, composed by R\' Shlomo Alkabetz. The congregation stands and turns toward the entrance for the final stanza "Bo\'i v\'shalom."',
          },
          estimatedSeconds: 240,
        },
        {
          id: 'kshabbat-mizmor-shir',
          type: 'prayer',
          label: "Mizmor Shir L'Yom HaShabbat",
          labelHebrew: 'מִזְמוֹר שִׁיר לְיוֹם הַשַּׁבָּת',
          amud: {
            role: 'both',
            instruction: 'Psalm 92 — the psalm for the Shabbat day.',
            notes: 'This psalm was sung by the Levites in the Temple on Shabbat. It speaks of the joy of praising Hashem.',
          },
          estimatedSeconds: 90,
        },
      ],
    },

    // =========================================================================
    // SEGMENT 2: Friday Night Maariv
    // =========================================================================
    {
      id: 'friday-maariv',
      title: 'Friday Night Maariv',
      titleHebrew: 'מַעֲרִיב לְשַׁבָּת',
      description: 'The evening prayer service for Shabbat',
      color: '#7C3AED',
      items: [
        {
          id: 'fmaariv-barchu',
          prayerId: 'barchu',
          type: 'responsive',
          label: 'Barchu',
          labelHebrew: 'בָּרְכוּ',
          amud: {
            role: 'both',
            instruction: 'The Shaliach Tzibbur calls the congregation to prayer. Bow at "Barchu" and stand upright at Hashem\'s name.',
            congregationResponse: 'בָּרוּךְ ה׳ הַמְבוֹרָךְ לְעוֹלָם וָעֶד',
            congregationResponseTransliteration: "Baruch Hashem ham'vorach l'olam va'ed",
            physicalActions: ['bow_and_stand'],
            waitForCongregation: true,
            notes: 'The official call to prayer, marking the formal start of Maariv.',
          },
          estimatedSeconds: 20,
        },
        {
          id: 'fmaariv-maariv-aravim',
          type: 'prayer',
          label: "Ma'ariv Aravim",
          labelHebrew: 'מַעֲרִיב עֲרָבִים',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'The first blessing before Shema — praising Hashem who brings on the evening.',
            notes: 'This blessing thanks Hashem who, with wisdom, opens the gates of evening and orders the cycles of day and night.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'fmaariv-ahavat-olam',
          type: 'prayer',
          label: 'Ahavat Olam',
          labelHebrew: 'אַהֲבַת עוֹלָם',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'The second blessing before Shema — thanking Hashem for His eternal love and the gift of Torah.',
            notes: 'The evening version of the blessing before Shema, expressing Hashem\'s everlasting love for the Jewish people through the Torah.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'fmaariv-shema',
          prayerId: 'shema',
          type: 'prayer',
          label: 'Shema',
          labelHebrew: 'שְׁמַע',
          amud: {
            role: 'both',
            instruction: 'Cover your eyes with your right hand for the first verse. Concentrate deeply on accepting Hashem\'s sovereignty.',
            physicalActions: ['cover_eyes'],
            notes: 'The central declaration of Jewish faith. Cover your eyes to focus completely on the words "Hear O Israel, Hashem is our God, Hashem is One."',
          },
          estimatedSeconds: 180,
        },
        {
          id: 'fmaariv-emet-veemunah',
          type: 'prayer',
          label: "Emet Ve'Emunah",
          labelHebrew: 'אֶמֶת וֶאֱמוּנָה',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'The blessing after Shema in the evening — affirming the truth of the Shema.',
            notes: 'The evening counterpart of Emet V\'Yatziv. Affirms the truth of Hashem\'s redemption and sovereignty.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'fmaariv-hashkiveinu',
          type: 'prayer',
          label: 'Hashkiveinu',
          labelHebrew: 'הַשְׁכִּיבֵנוּ',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'A prayer asking Hashem to grant us peaceful rest and protection through the night.',
            notes: 'Unique to the evening service — asks Hashem to spread over us a shelter of peace. On Shabbat, this blessing concludes with "HaPoreis sukkat shalom."',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'fmaariv-vayechulu',
          prayerId: 'vayechulu',
          type: 'prayer',
          label: 'Vayechulu',
          labelHebrew: 'וַיְכֻלּוּ',
          amud: {
            role: 'both',
            instruction: 'Everyone stands and recites Vayechulu together',
            physicalActions: ['stand'],
            notes: 'The Torah passage describing Hashem\'s completion of creation and the sanctification of Shabbat (Bereishit 2:1-3). Recited standing as testimony — like witnesses standing in court.',
          },
          estimatedSeconds: 45,
        },
      ],
    },

    // =========================================================================
    // SEGMENT 3: Shabbat Amidah
    // =========================================================================
    {
      id: 'shabbat-amidah',
      title: 'Shabbat Amidah',
      titleHebrew: 'עֲמִידָה לְשַׁבָּת',
      description: 'The Shabbat standing prayer — 7 blessings',
      color: '#1B4965',
      items: [
        {
          id: 'shabbat-amidah-half-kaddish',
          prayerId: 'kaddish-half',
          type: 'kaddish',
          label: 'Half Kaddish',
          labelHebrew: 'חֲצִי קַדִּישׁ',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'The Shaliach Tzibbur recites Half Kaddish before the Amidah.',
            congregationResponse: 'אָמֵן. יְהֵא שְׁמֵהּ רַבָּא...',
            congregationResponseTransliteration: 'Amen. Yehei shmei rabba...',
            physicalActions: ['stand'],
            waitForCongregation: true,
            notes: 'Half Kaddish marks the transition into the Amidah. Respond with "Amen" and "Yehei shmei rabba mevarach" with concentration.',
          },
          estimatedSeconds: 45,
        },
        {
          id: 'shabbat-amidah-silent-instruction',
          type: 'instruction',
          label: 'Silent Amidah',
          amud: {
            role: 'silent_individual',
            instruction: 'Everyone prays the Amidah silently. Take three steps forward before beginning. Stand with feet together, facing Jerusalem.',
            physicalActions: ['stand', 'three_steps_forward'],
            notes: 'The Friday night Amidah has only 7 blessings — the 3 opening, 1 for Shabbat, and 3 closing',
          },
          estimatedSeconds: 15,
        },
        {
          id: 'shabbat-amidah-shemoneh-esrei',
          prayerId: 'shemoneh-esrei',
          type: 'prayer',
          label: 'Shemoneh Esrei',
          labelHebrew: 'שְׁמוֹנֶה עֶשְׂרֵה',
          amud: {
            role: 'silent_individual',
            instruction: 'Recite the 7 Shabbat blessings silently. Bow at the designated points. At the end, take three steps back, bow left, right, and center.',
            physicalActions: ['stand'],
            notes: 'On Shabbat, the Amidah contains only 7 blessings instead of the weekday 19. The middle blessing speaks of the sanctity of Shabbat. No personal requests are made on Shabbat.',
          },
          estimatedSeconds: 240,
        },
        {
          id: 'shabbat-amidah-magen-avot',
          type: 'prayer',
          label: 'Magen Avot',
          labelHebrew: 'מָגֵן אָבוֹת',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'Instead of full Chazarat HaShatz, the Shaliach Tzibbur recites this abbreviated summary of the 7 blessings',
            notes: 'On Friday night, the full repetition of the Amidah is not recited. Instead, the Shaliach Tzibbur says this brief summary, known as "Me\'ein Sheva" (a taste of the seven blessings).',
          },
          estimatedSeconds: 60,
        },
      ],
    },

    // =========================================================================
    // SEGMENT 4: Closing
    // =========================================================================
    {
      id: 'closing',
      title: 'Closing',
      titleHebrew: 'סִיּוּם',
      description: 'Closing prayers and Kiddush',
      color: '#4A7C59',
      items: [
        {
          id: 'closing-vayechulu',
          prayerId: 'vayechulu',
          type: 'prayer',
          label: 'Vayechulu (Repetition)',
          labelHebrew: 'וַיְכֻלּוּ',
          amud: {
            role: 'both',
            instruction: 'The congregation stands and repeats Vayechulu together after the Amidah.',
            physicalActions: ['stand'],
            notes: 'Vayechulu is repeated here so that those who may have come late and missed it earlier can fulfill this Shabbat declaration.',
          },
          estimatedSeconds: 45,
        },
        {
          id: 'closing-kiddush',
          type: 'prayer',
          label: 'Kiddush in Shul',
          labelHebrew: 'קִדּוּשׁ',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'On Friday night, the Shaliach Tzibbur recites Kiddush for the benefit of those who will not make Kiddush at home',
            notes: 'The communal Kiddush over wine. Originally instituted for travelers who would eat and sleep in the synagogue. Today it is maintained as a cherished custom.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'closing-full-kaddish',
          prayerId: 'kaddish-full',
          type: 'kaddish',
          label: 'Full Kaddish',
          labelHebrew: 'קַדִּישׁ שָׁלֵם',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'The Shaliach Tzibbur recites the Full Kaddish (Kaddish Titkabel), which includes the prayer that our prayers be accepted.',
            congregationResponse: 'אָמֵן',
            congregationResponseTransliteration: 'Amen',
            physicalActions: ['stand'],
            waitForCongregation: true,
            notes: 'The Full Kaddish signals the formal conclusion of the Maariv service. Respond "Amen" at the appropriate points.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'closing-aleinu',
          prayerId: 'aleinu',
          type: 'prayer',
          label: 'Aleinu',
          labelHebrew: 'עָלֵינוּ',
          amud: {
            role: 'both',
            instruction: 'Stand and bow at "Va\'anachnu kor\'im u\'mishtachavim" — we bow and prostrate before the King of Kings.',
            physicalActions: ['stand', 'bow'],
            notes: 'Aleinu declares Hashem\'s sovereignty over all creation. Bow deeply at the designated phrase.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'closing-mourners-kaddish',
          prayerId: 'kaddish-mourners',
          type: 'kaddish',
          label: "Mourner's Kaddish",
          labelHebrew: 'קַדִּישׁ יָתוֹם',
          amud: {
            role: 'both',
            instruction: 'Mourners recite the Kaddish. The congregation responds "Amen" and "Yehei shmei rabba..." at the appropriate points.',
            congregationResponse: 'אָמֵן. יְהֵא שְׁמֵהּ רַבָּא...',
            congregationResponseTransliteration: 'Amen. Yehei shmei rabba...',
            physicalActions: ['stand'],
            waitForCongregation: true,
            notes: 'Recited by mourners. Even if you are not a mourner, respond "Amen" — it is a great merit for the departed souls.',
          },
          estimatedSeconds: 45,
        },
      ],
    },
  ],
};
