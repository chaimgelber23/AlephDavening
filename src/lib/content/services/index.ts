export { WEEKDAY_SHACHARIT } from './weekday-shacharit';
export { WEEKDAY_MINCHA } from './weekday-mincha';
export { WEEKDAY_MAARIV } from './weekday-maariv';
export { SHABBAT_KABBALAT_SHABBAT } from './shabbat-kabbalat-shabbat';
export { SHABBAT_SHACHARIT } from './shabbat-shacharit';
export { SHABBAT_MINCHA } from './shabbat-mincha';
export type { DaveningService } from '@/types';

import { WEEKDAY_SHACHARIT } from './weekday-shacharit';
import { WEEKDAY_MINCHA } from './weekday-mincha';
import { WEEKDAY_MAARIV } from './weekday-maariv';
import { SHABBAT_KABBALAT_SHABBAT } from './shabbat-kabbalat-shabbat';
import { SHABBAT_SHACHARIT } from './shabbat-shacharit';
import { SHABBAT_MINCHA } from './shabbat-mincha';
import type { DaveningService } from '@/types';

export function getAllServices(): DaveningService[] {
  return [
    WEEKDAY_SHACHARIT,
    WEEKDAY_MINCHA,
    WEEKDAY_MAARIV,
    SHABBAT_KABBALAT_SHABBAT,
    SHABBAT_SHACHARIT,
    SHABBAT_MINCHA,
  ];
}

export function getService(id: string): DaveningService | undefined {
  return getAllServices().find(s => s.id === id);
}
