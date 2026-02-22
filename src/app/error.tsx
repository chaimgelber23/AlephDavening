'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <p className="text-5xl font-[var(--font-hebrew-serif)]" dir="rtl">אוי</p>
        <h1 className="text-xl font-bold text-[#2D3142] mt-4">Something went wrong</h1>
        <p className="text-sm text-gray-500 mt-2">
          Don&apos;t worry — your progress is saved. Let&apos;s get you back on track.
        </p>
        <button
          onClick={reset}
          className="mt-6 px-6 py-3 bg-[#1B4965] text-white rounded-xl font-medium hover:bg-[#163d55] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
