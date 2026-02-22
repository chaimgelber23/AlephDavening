import type { DaveningService } from '@/types';

export const WEEKDAY_MINCHA: DaveningService = {
  id: 'weekday-mincha',
  name: 'Weekday Mincha',
  nameHebrew: 'מִנְחָה חוֹל',
  type: 'weekday',
  timeOfDay: 'mincha',
  description: 'The weekday afternoon prayer service',
  estimatedMinutes: 15,
  segments: [
    // =========================================================================
    // SEGMENT 1: Ashrei (Opening)
    // =========================================================================
    {
      id: 'ashrei-opening',
      title: 'Ashrei',
      titleHebrew: 'אַשְׁרֵי',
      description: 'The opening psalm of the afternoon service',
      color: '#5FA8D3',
      items: [
        {
          id: 'mincha-ashrei',
          prayerId: 'ashrei',
          type: 'prayer',
          label: 'Ashrei',
          labelHebrew: 'אַשְׁרֵי',
          amud: {
            role: 'both',
            instruction: 'Sit for Ashrei. The Shaliach Tzibbur begins and the congregation joins in together.',
            physicalActions: ['sit'],
            notes: 'Ashrei (Psalm 145 with introductory verses) opens the Mincha service. This is the third and final recitation of Ashrei each day. Our Sages taught that one who says Ashrei three times daily is assured a place in the World to Come. The verses follow the Hebrew alphabet.',
          },
          estimatedSeconds: 90,
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
      description: 'The central prayer — 19 blessings said standing, facing Jerusalem',
      color: '#1B4965',
      items: [
        {
          id: 'mincha-half-kaddish',
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
            notes: 'Half Kaddish marks the transition from Ashrei into the Amidah. Respond "Amen" and "Yehei shmei rabba mevarach l\'alam u\'l\'almei almaya" with enthusiasm and concentration.',
          },
          estimatedSeconds: 45,
        },
        {
          id: 'mincha-silent-amidah-instruction',
          type: 'instruction',
          label: 'Silent Amidah',
          amud: {
            role: 'silent_individual',
            instruction: 'Everyone prays the Amidah silently. Take three steps forward before beginning. Stand with feet together, facing Jerusalem.',
            physicalActions: ['three_steps_forward', 'stand'],
            notes: 'The Amidah is the heart of every prayer service. Stand with your feet together as if standing before a king. Face east (toward Jerusalem). Keep your voice to a whisper — only you should hear the words. The Mincha Amidah is identical to Shacharit (weekday Shemoneh Esrei), but without the additions specific to morning.',
          },
          estimatedSeconds: 15,
        },
        {
          id: 'mincha-shemoneh-esrei',
          prayerId: 'shemoneh-esrei',
          type: 'prayer',
          label: 'Shemoneh Esrei',
          labelHebrew: 'שְׁמוֹנֶה עֶשְׂרֵה',
          amud: {
            role: 'silent_individual',
            instruction: 'Recite all 19 blessings silently. Bow at the designated points. At the end, take three steps back, bow left, right, and center.',
            physicalActions: ['stand'],
            notes: 'The "18 blessings" (actually 19). The first three blessings praise Hashem, the middle 13 are requests, and the last three give thanks. Bow at the beginning and end of the first blessing (Avot) and at Modim. Take three steps back at the end and wait for the Shaliach Tzibbur to begin the repetition before stepping forward again.',
          },
          estimatedSeconds: 240,
        },
        {
          id: 'mincha-chazarat-hashatz-instruction',
          type: 'instruction',
          label: 'Chazarat HaShatz',
          labelHebrew: 'חֲזָרַת הַשַּׁ״ץ',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'The Shaliach Tzibbur repeats the Amidah aloud. The congregation listens and responds "Amen" after each blessing.',
            waitForCongregation: true,
            notes: 'The repetition ensures that anyone who could not pray on their own fulfills their obligation. Listen carefully and answer "Amen" to each blessing. The Kedusha is added during the repetition. At Mincha, some communities abbreviate the repetition on busy weekdays, but the standard practice is to repeat the full Amidah.',
          },
          estimatedSeconds: 15,
        },
        {
          id: 'mincha-kedusha',
          prayerId: 'kedusha-shacharit',
          type: 'responsive',
          label: 'Kedusha',
          labelHebrew: 'קְדוּשָּׁה',
          amud: {
            role: 'both',
            instruction: 'Stand with feet together. Rise on your toes three times at "Kadosh, Kadosh, Kadosh." The congregation recites the responsive portions together.',
            congregationResponse: 'קָדוֹשׁ קָדוֹשׁ קָדוֹשׁ ה׳ צְבָאוֹת מְלֹא כָל הָאָרֶץ כְּבוֹדוֹ',
            congregationResponseTransliteration: "Kadosh Kadosh Kadosh Hashem Tzva'ot, m'lo chol ha'aretz k'vodo",
            physicalActions: ['stand', 'rise_on_toes'],
            waitForCongregation: true,
            notes: 'One of the holiest moments in the service. We emulate the angels declaring Hashem\'s holiness. Rise on your toes at each "Kadosh." Must be said with a minyan (quorum of 10). The Kedusha at Mincha uses the same text as Shacharit (Nusach Ashkenaz).',
          },
          estimatedSeconds: 90,
        },
      ],
    },

    // =========================================================================
    // SEGMENT 3: Post-Amidah (Closing)
    // =========================================================================
    {
      id: 'post-amidah',
      title: 'Post-Amidah',
      titleHebrew: 'סִיּוּם הַתְּפִלָּה',
      description: 'Closing prayers after the Amidah',
      color: '#4A7C59',
      items: [
        {
          id: 'mincha-tachanun',
          prayerId: 'tachanun',
          type: 'prayer',
          label: 'Tachanun',
          labelHebrew: 'תַּחֲנוּן',
          amud: {
            role: 'silent_individual',
            instruction: 'Supplication prayer. Sit and rest your head on your RIGHT arm (at Mincha, Tachanun is always on the right arm since there are no tefillin).',
            physicalActions: ['sit'],
            notes: 'Tachanun is a humble plea for mercy. At Mincha, the head is rested on the right arm — unlike Shacharit where it depends on which arm has tefillin. The Mincha Tachanun is the shorter version (no extended "V\'hu Rachum" that appears on Mondays and Thursdays at Shacharit). Not said on Shabbat, holidays, Rosh Chodesh, and certain other joyful days. Check the calendar if unsure.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'mincha-full-kaddish',
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
            notes: 'The Full Kaddish adds the paragraph "Titkabel" — a prayer that all of our prayers be received favorably. This signifies the formal conclusion of the main Mincha service.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'mincha-aleinu',
          prayerId: 'aleinu',
          type: 'prayer',
          label: 'Aleinu',
          labelHebrew: 'עָלֵינוּ',
          amud: {
            role: 'both',
            instruction: 'Stand and bow at "Va\'anachnu kor\'im u\'mishtachavim" — we bow and prostrate before the King of Kings.',
            physicalActions: ['stand', 'bow'],
            notes: 'Aleinu declares Hashem\'s sovereignty over all creation. Bow deeply (some bend their knees and bow) at the designated phrase. This is the same Aleinu said at the end of every prayer service — affirming our faith in Hashem\'s ultimate kingship over the entire world.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'mincha-mourners-kaddish',
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
            notes: 'Recited by mourners (those within the first year after losing a parent, or during the annual yahrtzeit). Even if you are not a mourner, respond "Amen" — it is a great merit for the departed souls. This concludes the Mincha service.',
          },
          estimatedSeconds: 45,
        },
      ],
    },
  ],
};
