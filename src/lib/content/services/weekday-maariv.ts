import type { DaveningService } from '@/types';

export const WEEKDAY_MAARIV: DaveningService = {
  id: 'weekday-maariv',
  name: 'Weekday Maariv',
  nameHebrew: 'מַעֲרִיב חוֹל',
  type: 'weekday',
  timeOfDay: 'maariv',
  description: 'The weekday evening prayer service',
  estimatedMinutes: 15,
  segments: [
    // =========================================================================
    // SEGMENT 1: Shema & Brachot
    // =========================================================================
    {
      id: 'shema-brachot',
      title: 'Shema & Brachot',
      titleHebrew: 'שְׁמַע וּבִרְכוֹתֶיהָ',
      description: 'The evening Shema and its surrounding blessings',
      color: '#7C3AED',
      items: [
        {
          id: 'maariv-barchu',
          prayerId: 'barchu',
          type: 'responsive',
          label: 'Barchu',
          labelHebrew: 'בָּרְכוּ',
          amud: {
            role: 'both',
            instruction: 'The Shaliach Tzibbur calls the congregation to prayer. Everyone bows at "Barchu" and stands upright at Hashem\'s name.',
            congregationResponse: 'בָּרוּךְ ה׳ הַמְבוֹרָךְ לְעוֹלָם וָעֶד',
            congregationResponseTransliteration: "Baruch Hashem ham'vorach l'olam va'ed",
            physicalActions: ['bow_and_stand'],
            waitForCongregation: true,
            notes: 'The official "call to prayer" that opens the Maariv service. Bow when saying "Barchu" and straighten up when saying Hashem\'s name. The Shaliach Tzibbur then repeats the congregation\'s response.',
          },
          estimatedSeconds: 20,
        },
        {
          id: 'maariv-maariv-aravim',
          type: 'prayer',
          label: "Ma'ariv Aravim",
          labelHebrew: 'מַעֲרִיב עֲרָבִים',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'First blessing before the evening Shema — praising Hashem who brings on evening.',
            notes: 'This blessing acknowledges Hashem who, with wisdom, opens the gates of heaven, changes the times, rotates the seasons, and arranges the stars in the sky. It parallels the morning\'s Yotzer Or but focuses on the beauty of nightfall.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'maariv-ahavat-olam',
          type: 'prayer',
          label: 'Ahavat Olam',
          labelHebrew: 'אַהֲבַת עוֹלָם',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'Second blessing before evening Shema — Hashem\'s eternal love for Israel.',
            notes: 'Expresses Hashem\'s everlasting love for the Jewish people, demonstrated through giving us the Torah and mitzvot. This is the evening counterpart to the morning\'s Ahavah Rabbah. Leads directly into the Shema.',
          },
          estimatedSeconds: 45,
        },
        {
          id: 'maariv-shema',
          prayerId: 'shema',
          type: 'prayer',
          label: 'Shema',
          labelHebrew: 'שְׁמַע',
          amud: {
            role: 'both',
            instruction: 'Cover your eyes with your right hand for the first verse. Concentrate deeply on accepting Hashem\'s sovereignty.',
            physicalActions: ['cover_eyes'],
            notes: 'The central declaration of Jewish faith: "Hear O Israel, Hashem is our God, Hashem is One." Cover your eyes to focus completely. All three paragraphs are recited — discussing love of Hashem, reward and consequence, and the mitzvah of tzitzit. The evening Shema fulfills the obligation of "when you lie down" (u\'v\'shochb\'cha).',
          },
          estimatedSeconds: 180,
        },
        {
          id: 'maariv-emet-veemunah',
          type: 'prayer',
          label: "Emet Ve'Emunah",
          labelHebrew: 'אֶמֶת וֶאֱמוּנָה',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'First blessing after evening Shema — affirming the truth of the Exodus.',
            notes: 'This blessing affirms the truth of everything declared in the Shema and recalls the miracles of the Exodus from Egypt. It is the evening counterpart to the morning\'s Emet V\'Yatziv. The theme is emunah — faith and trust in Hashem\'s redemption.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'maariv-hashkiveinu',
          type: 'prayer',
          label: 'Hashkiveinu',
          labelHebrew: 'הַשְׁכִּיבֵנוּ',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'Second blessing after evening Shema — asking Hashem to protect us through the night.',
            notes: 'A beautiful prayer asking Hashem to lay us down in peace and raise us up again to life. We ask for protection from enemies, plague, sword, famine, and sorrow through the night. This blessing is unique to the evening service — there is no morning parallel.',
          },
          estimatedSeconds: 60,
        },
      ],
    },

    // =========================================================================
    // SEGMENT 2: Amidah (Standing Prayer)
    // =========================================================================
    {
      id: 'amidah',
      title: 'Amidah',
      titleHebrew: 'עֲמִידָה',
      description: 'The central prayer — 19 blessings said standing, facing Jerusalem. At Maariv the Amidah is recited silently only — there is no repetition.',
      color: '#1B4965',
      items: [
        {
          id: 'maariv-half-kaddish',
          prayerId: 'kaddish-half',
          type: 'kaddish',
          label: 'Half Kaddish',
          labelHebrew: 'חֲצִי קַדִּישׁ',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'The Shaliach Tzibbur recites Half Kaddish. Congregation responds at the appropriate points.',
            congregationResponse: 'אָמֵן. יְהֵא שְׁמֵהּ רַבָּא...',
            congregationResponseTransliteration: 'Amen. Yehei shmei rabba...',
            physicalActions: ['stand'],
            waitForCongregation: true,
            notes: 'Half Kaddish marks the transition from the Shema section into the Amidah. Respond "Amen" and "Yehei shmei rabba mevarach l\'alam u\'l\'almei almaya" with enthusiasm and concentration.',
          },
          estimatedSeconds: 45,
        },
        {
          id: 'maariv-amidah-instruction',
          type: 'instruction',
          label: 'Silent Amidah',
          amud: {
            role: 'silent_individual',
            instruction: 'Everyone prays the Amidah silently. Take three steps forward before beginning. Stand with feet together, facing Jerusalem.',
            physicalActions: ['stand', 'three_steps_forward'],
            notes: 'The Amidah is the most important prayer of the service. Stand with your feet together as if standing before a king. Face east (toward Jerusalem). Keep your voice to a whisper — only you should hear the words. At Maariv there is no Chazarat HaShatz (repetition) — the Amidah is said silently only.',
          },
          estimatedSeconds: 15,
        },
        {
          id: 'maariv-shemoneh-esrei',
          prayerId: 'shemoneh-esrei',
          type: 'prayer',
          label: 'Shemoneh Esrei',
          labelHebrew: 'שְׁמוֹנֶה עֶשְׂרֵה',
          amud: {
            role: 'silent_individual',
            instruction: 'Recite all 19 blessings silently. Bow at the designated points. At the end, take three steps back, bow left, right, and center.',
            physicalActions: ['stand'],
            notes: 'The "18 blessings" (actually 19). The first three blessings praise Hashem, the middle 13 are requests, and the last three give thanks. Bow at the beginning and end of the first blessing and at Modim. Take three steps back at the end. Since there is no repetition at Maariv, this is your sole opportunity to recite the Amidah — concentrate with extra focus.',
          },
          estimatedSeconds: 300,
        },
      ],
    },

    // =========================================================================
    // SEGMENT 3: Closing
    // =========================================================================
    {
      id: 'closing',
      title: 'Closing',
      titleHebrew: 'סִיּוּם הַתְּפִלָּה',
      description: 'Closing prayers to conclude the evening service',
      color: '#4A7C59',
      items: [
        {
          id: 'maariv-full-kaddish',
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
            notes: 'The Full Kaddish adds the paragraph "Titkabel" — a prayer that all of our prayers be received favorably. This signifies the formal conclusion of the Maariv Amidah section.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'maariv-aleinu',
          prayerId: 'aleinu',
          type: 'prayer',
          label: 'Aleinu',
          labelHebrew: 'עָלֵינוּ',
          amud: {
            role: 'both',
            instruction: 'Stand and bow at "Va\'anachnu kor\'im u\'mishtachavim" — we bow and prostrate before the King of Kings.',
            physicalActions: ['stand', 'bow'],
            notes: 'Aleinu declares Hashem\'s sovereignty over all creation. Bow deeply (some bend their knees and bow) at the designated phrase. This prayer is recited at the close of every prayer service, affirming our hope for the day when all the world will recognize Hashem.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'maariv-mourners-kaddish',
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
            notes: 'Recited by mourners (those within the first year after losing a parent, or during the annual yahrtzeit). Even if you are not a mourner, respond "Amen" — it is a great merit for the departed souls. This is the final prayer of the Maariv service.',
          },
          estimatedSeconds: 45,
        },
      ],
    },
  ],
};
