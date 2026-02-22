/**
 * Davening Level Progression
 *
 * Users build up to the full Shacharis davening in progressive levels.
 * Each level adds more prayers until they can follow the entire service.
 *
 * Shacharis order:
 *   Birchos HaShachar (Morning brachot)
 *   Pesukei D'Zimra (Baruch She'amar → Ashrei → Yishtabach)
 *   Barchu
 *   Birchos Krias Shema (Yotzer Or, Ahavah Rabbah)
 *   Shema
 *   Ge'ulah (Emet V'Yatziv)
 *   Shemoneh Esrei
 *   Tachanun
 *   Torah Reading (Mon/Thu)
 *   Aleinu
 */

export interface DaveningLevel {
  level: number;
  title: string;
  subtitle: string;
  description: string;
  /** Prayer IDs included at this level */
  prayerIds: string[];
  /** What the user achieves at this level */
  milestone: string;
}

export const DAVENING_LEVELS: DaveningLevel[] = [
  {
    level: 1,
    title: 'The Skeleton',
    subtitle: 'Follow along in shul',
    description:
      'The essential framework of Shacharis — the parts you absolutely need to know to follow along in any shul.',
    prayerIds: [
      'baruch-sheamar',
      'ashrei',
      'yishtabach',
      'shema',
      'shemoneh-esrei',
      'aleinu',
    ],
    milestone: 'You can follow the main structure of any Shacharis service',
  },
  {
    level: 2,
    title: 'Birchos Krias Shema',
    subtitle: 'The blessings surrounding Shema',
    description:
      'After Barchu, there are beautiful blessings before and after Shema that connect you from Pesukei D\'Zimra into the Amidah.',
    prayerIds: ['yotzer-or', 'ahavah-rabbah', 'emet-vyatziv'],
    milestone: 'You understand the full Shema section with its surrounding brachot',
  },
  {
    level: 3,
    title: 'Pesukei D\'Zimra',
    subtitle: 'The psalms and praises',
    description:
      'Everything between Baruch She\'amar and Yishtabach — the psalms that warm up your soul before the main prayer.',
    prayerIds: ['hodu', 'mizmor-ltodah', 'az-yashir'],
    milestone: 'You can daven the full Pesukei D\'Zimra section',
  },
  {
    level: 4,
    title: 'Birchos HaShachar',
    subtitle: 'Morning blessings',
    description:
      'The blessings we say when we first wake up — thanking Hashem for the basics of life: sight, clothing, freedom, strength.',
    prayerIds: [
      'modeh-ani',
      'netilat-yadayim',
      'asher-yatzar',
      'elokai-neshama',
      'birchos-hatorah',
      'birchos-hashachar',
    ],
    milestone: 'You can start your morning with the full set of brachos',
  },
  {
    level: 5,
    title: 'Completing the Service',
    subtitle: 'After Shemoneh Esrei',
    description:
      'Everything from after the Amidah until Aleinu — Tachanun, Ashrei again, U\'Va L\'Tzion, and the closing prayers.',
    prayerIds: ['tachanun', 'uva-ltzion', 'ein-kelokeinu'],
    milestone: 'You can daven the complete Shacharis from start to finish!',
  },
];

/** Get the cumulative prayer IDs up to a given level */
export function getPrayerIdsUpToLevel(level: number): string[] {
  return DAVENING_LEVELS
    .filter((l) => l.level <= level)
    .flatMap((l) => l.prayerIds);
}

/** Get the current davening level based on user progress */
export function getCurrentDaveningLevel(completedPrayerIds: string[]): number {
  for (let i = DAVENING_LEVELS.length - 1; i >= 0; i--) {
    const level = DAVENING_LEVELS[i];
    const allComplete = level.prayerIds.every((id) =>
      completedPrayerIds.includes(id)
    );
    if (allComplete) return level.level + 1; // They've completed this level
  }
  return 1;
}
