import type { DaveningService } from '@/types';

export const SHABBAT_MINCHA: DaveningService = {
  id: 'shabbat-mincha',
  name: 'Shabbat Mincha',
  nameHebrew: 'מִנְחָה שַׁבָּת',
  type: 'shabbat',
  timeOfDay: 'mincha',
  description: 'Shabbat afternoon prayer service with Torah reading',
  estimatedMinutes: 30,
  segments: [
    // =========================================================================
    // SEGMENT 1: Ashrei and Torah Reading
    // =========================================================================
    {
      id: 'ashrei-torah-reading',
      title: 'Ashrei and Torah Reading',
      titleHebrew: 'אַשְׁרֵי וּקְרִיאַת הַתּוֹרָה',
      description: 'Ashrei followed by the Shabbat afternoon Torah reading',
      color: '#C6973F',
      items: [
        {
          id: 'mincha-ashrei',
          prayerId: 'ashrei',
          type: 'prayer',
          label: 'Ashrei',
          labelHebrew: 'אַשְׁרֵי',
          amud: {
            role: 'both',
            instruction: 'Sit for Ashrei. Psalm 145 with introductory verses opens the Shabbat Mincha service.',
            physicalActions: ['sit'],
            notes: 'Ashrei (Psalm 145) is recited here as the third of its three daily recitations. The verses follow the Hebrew alphabet. On Shabbat afternoon, Ashrei sets a tone of calm reflection before the Torah reading.',
          },
          estimatedSeconds: 90,
        },
        {
          id: 'mincha-torah-service-opening',
          type: 'instruction',
          label: 'Torah Service Opening',
          labelHebrew: 'פְּתִיחַת הָאָרוֹן',
          amud: {
            role: 'both',
            instruction: 'The Aron Kodesh is opened. A short Torah reading — the beginning of next week\'s portion — is read.',
            physicalActions: ['stand'],
            notes: 'The congregation stands when the Aron Kodesh (Holy Ark) is opened. The Torah is removed and carried to the bimah. On Shabbat Mincha, we read the opening section of next week\'s parashah, giving the congregation a preview of the coming week\'s Torah portion.',
          },
          estimatedSeconds: 60,
        },
        {
          id: 'mincha-torah-reading',
          type: 'torah_reading',
          label: 'Torah Reading',
          labelHebrew: 'קְרִיאַת הַתּוֹרָה',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: '3 people are called for aliyot on Shabbat Mincha.',
            notes: 'Three aliyot are read from the beginning of the following week\'s Torah portion. The first aliyah is given to a Kohen, the second to a Levi, and the third to a Yisrael. Each person called up recites the blessings before and after the reading. The congregation responds "Amen" and "Baruch Hashem ham\'vorach l\'olam va\'ed" after the blessings.',
          },
          estimatedSeconds: 300,
        },
        {
          id: 'mincha-torah-service-closing',
          type: 'instruction',
          label: 'Torah Service Closing',
          labelHebrew: 'הַכְנָסַת סֵפֶר תּוֹרָה',
          amud: {
            role: 'both',
            instruction: 'The Torah is lifted (Hagbah), wrapped (Gelilah), and returned to the Aron Kodesh.',
            physicalActions: ['stand'],
            notes: 'Stand as the Torah is raised for all to see (Hagbah). The congregation recites "V\'zot HaTorah..." when the Torah is lifted. After it is wrapped, the Torah is carried back and placed in the Aron Kodesh. The Ark is closed.',
          },
          estimatedSeconds: 90,
        },
      ],
    },

    // =========================================================================
    // SEGMENT 2: Shabbat Amidah
    // =========================================================================
    {
      id: 'shabbat-amidah',
      title: 'Shabbat Amidah',
      titleHebrew: 'עֲמִידָה לְשַׁבָּת',
      description: 'The Shabbat afternoon Amidah — 7 blessings with the theme of rest and tranquility',
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
            instruction: 'The Shaliach Tzibbur recites Half Kaddish to mark the transition from the Torah reading to the Amidah.',
            congregationResponse: 'אָמֵן. יְהֵא שְׁמֵהּ רַבָּא...',
            congregationResponseTransliteration: 'Amen. Yehei shmei rabba...',
            physicalActions: ['stand'],
            waitForCongregation: true,
            notes: 'Half Kaddish bridges the Torah reading and the Amidah. Respond "Amen" and "Yehei shmei rabba mevarach l\'alam u\'l\'almei almaya" with concentration and enthusiasm.',
          },
          estimatedSeconds: 45,
        },
        {
          id: 'mincha-amidah-instruction',
          type: 'instruction',
          label: 'Silent Amidah',
          labelHebrew: 'עֲמִידָה בְּלַחַשׁ',
          amud: {
            role: 'silent_individual',
            instruction: 'Everyone prays the Shabbat Mincha Amidah silently. Take three steps forward before beginning. Stand with feet together, facing Jerusalem.',
            physicalActions: ['stand', 'three_steps_forward'],
            notes: 'Shabbat Mincha Amidah has 7 blessings with the Shabbat afternoon theme of rest and tranquility. The middle blessing, "Attah Echad," speaks of Hashem\'s oneness and the gift of Shabbat rest. Unlike the weekday Amidah which has 19 blessings, the Shabbat version has only 7 — the first three and last three are the same, with a single Shabbat-themed middle blessing.',
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
            instruction: 'Recite the 7 Shabbat blessings silently. Bow at the designated points. At the end, take three steps back, bow left, right, and center.',
            physicalActions: ['stand'],
            notes: 'The Shabbat Mincha Amidah contains 7 blessings. The first three blessings praise Hashem, the middle blessing ("Attah Echad") celebrates the oneness of Hashem and the tranquility of Shabbat afternoon, and the last three give thanks. Bow at the beginning and end of the first blessing and at Modim. Take three steps back at the end.',
          },
          estimatedSeconds: 240,
        },
        {
          id: 'mincha-chazarat-hashatz',
          type: 'instruction',
          label: 'Chazarat HaShatz',
          labelHebrew: 'חֲזָרַת הַשַּׁ״ץ',
          amud: {
            role: 'shaliach_tzibbur',
            instruction: 'The Shaliach Tzibbur repeats the Amidah aloud. The congregation listens and responds "Amen" after each blessing.',
            waitForCongregation: true,
            notes: 'The repetition ensures that anyone who could not pray on their own fulfills their obligation. Listen carefully and answer "Amen" to each blessing. The Kedusha is included during the repetition. On Shabbat Mincha, the repetition follows the same 7-blessing structure as the silent Amidah.',
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
            notes: 'The Shabbat Mincha Kedusha includes "U\'v\'divrei kodsh\'cha katuv leimor" — a verse unique to the Mincha Kedusha text. We emulate the angels declaring Hashem\'s holiness. Rise on your toes at each "Kadosh." Must be said with a minyan (quorum of 10). This is one of the holiest moments in the service.',
          },
          estimatedSeconds: 90,
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
      description: 'Closing prayers to conclude the Shabbat afternoon service',
      color: '#4A7C59',
      items: [
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
            notes: 'The Full Kaddish adds the paragraph "Titkabel" — a prayer that all of our prayers be received favorably. This signifies the formal conclusion of the Shabbat Mincha Amidah section.',
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
            notes: 'Aleinu declares Hashem\'s sovereignty over all creation. Bow deeply (some bend their knees and bow) at the designated phrase. On Shabbat afternoon, as the day of rest draws toward its close, Aleinu affirms our eternal hope that all the world will recognize Hashem.',
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
            notes: 'Recited by mourners (those within the first year after losing a parent, or during the annual yahrtzeit). Even if you are not a mourner, respond "Amen" — it is a great merit for the departed souls. This is the final prayer of the Shabbat Mincha service.',
          },
          estimatedSeconds: 45,
        },
      ],
    },
  ],
};
