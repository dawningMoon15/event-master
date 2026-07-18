// Content-based recommendation engine.
// Scores events by overlap with the user's favorite types and browse history.

import { MOCK_EVENTS, Event } from '../data/events';

const HISTORY_KEY = 'eventBrowseHistory'; // stores string[] of event types

export function recordBrowseHistory(eventType: string): void {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const history: string[] = raw ? JSON.parse(raw) : [];
    // Keep latest 20 views, with the newest type prepended
    const updated = [eventType, ...history.filter((t) => t !== eventType)].slice(0, 20);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

export function getBrowseHistory(): string[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Returns up to `limit` recommended events for the current user.
 *
 * Scoring (higher = better match):
 *  +3  event type matches a favorited event type
 *  +2  event type appears in recent browse history
 *  +1  event location matches a favorited event location
 *
 * Already-favorited events are excluded from results.
 * Falls back to highest available-ticket count if the user has no signals.
 */
export function getRecommendedEvents(
  favoriteIds: string[],
  limit = 4
): Event[] {
  const favorited = MOCK_EVENTS.filter((e) => favoriteIds.includes(e.id));
  const history = getBrowseHistory();

  const favTypes = new Set(favorited.map((e) => e.type));
  const favLocations = new Set(favorited.map((e) => e.location));
  const historyTypes = new Set(history);

  const candidates = MOCK_EVENTS.filter((e) => !favoriteIds.includes(e.id));

  // If no signals at all, fall back to most available tickets
  if (favTypes.size === 0 && historyTypes.size === 0) {
    return [...candidates]
      .sort((a, b) => b.availableTickets - a.availableTickets)
      .slice(0, limit);
  }

  const scored = candidates.map((event) => {
    let score = 0;
    if (favTypes.has(event.type)) score += 3;
    if (historyTypes.has(event.type)) score += 2;
    if (favLocations.has(event.location)) score += 1;
    return { event, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ event }) => event);
}
