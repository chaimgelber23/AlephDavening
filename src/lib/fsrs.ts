import { fsrs, createEmptyCard, Rating, type Card, type Grade } from 'ts-fsrs';

export { Rating };
export type { Card, Grade };

const f = fsrs();

/** Create a new FSRS card for a skill that hasn't been reviewed yet */
export function newCard(): Card {
  return createEmptyCard(new Date());
}

/**
 * Rate a card and get the updated card state.
 * Pass Rating.Again (wrong), Rating.Good (correct), or Rating.Easy (instant).
 */
export function rateCard(card: Card, rating: Grade): Card {
  const result = f.next(card, new Date(), rating);
  return result.card;
}

/** Check if a card is due for review now */
export function isDue(card: Card): boolean {
  return new Date(card.due) <= new Date();
}

/**
 * Given a map of skillId → Card, return skill IDs that are due for review,
 * sorted by most overdue first.
 */
export function getDueCards(cards: Record<string, Card>): string[] {
  const now = new Date();
  return Object.entries(cards)
    .filter(([, card]) => new Date(card.due) <= now)
    .sort(([, a], [, b]) => new Date(a.due).getTime() - new Date(b.due).getTime())
    .map(([id]) => id);
}
