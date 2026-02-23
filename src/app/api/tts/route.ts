import { NextRequest, NextResponse } from 'next/server';
import { synthesizeHebrew } from '@/lib/google-tts';

type VoiceGender = 'male' | 'female';

// In-memory cache to avoid re-generating same audio
const audioCache = new Map<string, { data: ArrayBuffer; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

function cleanCache() {
  const now = Date.now();
  for (const [key, entry] of audioCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL) {
      audioCache.delete(key);
    }
  }
}

export async function POST(req: NextRequest) {
  const { text, speed, voiceGender } = await req.json() as {
    text: string;
    speed?: number;
    voiceGender?: VoiceGender;
  };

  if (!text || text.length > 5000) {
    return NextResponse.json({ error: 'Text required (max 5000 chars)' }, { status: 400 });
  }

  const gender: VoiceGender = voiceGender || 'male';

  // Build cache key
  const cacheKey = `${gender}:${speed || 1}:${text}`;
  cleanCache();

  const cached = audioCache.get(cacheKey);
  if (cached) {
    return new NextResponse(cached.data, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

  try {
    // Google Cloud TTS for Hebrew — proper pronunciation with nekudot
    const buffer = await synthesizeHebrew(text, {
      speed: speed || 1.0,
      gender,
    });
    const audioBuffer = new Uint8Array(buffer).buffer as ArrayBuffer;

    // Cache it
    audioCache.set(cacheKey, { data: audioBuffer, timestamp: Date.now() });

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('[TTS] Error:', error);
    return NextResponse.json({ error: 'TTS service unavailable' }, { status: 503 });
  }
}
