import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <p className="text-5xl font-[var(--font-hebrew-serif)]" dir="rtl">אָבוּד</p>
        <h1 className="text-xl font-bold text-[#2D3142] mt-4">Page not found</h1>
        <p className="text-sm text-gray-500 mt-2">
          This page doesn&apos;t exist — but your learning journey does.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-[#1B4965] text-white rounded-xl font-medium hover:bg-[#163d55] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
