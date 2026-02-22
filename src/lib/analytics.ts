/**
 * Lightweight analytics event tracking.
 * Uses Vercel Analytics custom events when available,
 * falls back to console in development.
 */
export function track(event: string, properties?: Record<string, string | number | boolean>) {
  try {
    // Vercel Analytics track() is injected globally
    if (typeof window !== 'undefined' && 'va' in window) {
      (window as unknown as Record<string, CallableFunction>).va?.('event', { name: event, ...properties });
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('[analytics]', event, properties);
    }
  } catch {
    // silently ignore analytics errors
  }
}
