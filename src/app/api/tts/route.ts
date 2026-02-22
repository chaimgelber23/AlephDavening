import { NextRequest, NextResponse } from 'next/server';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

// Voice IDs by gender — chosen for warm, authentic sound for Jewish prayer learning
const VOICE_IDS = {
  male: {
    hebrew: process.env.ELEVENLABS_HEBREW_MALE_VOICE_ID || 'JBFqnCBsd6RMkjVDRZzb',   // George — warm, captivating storyteller
    english: process.env.ELEVENLABS_ENGLISH_MALE_VOICE_ID || 'W1EJxHy9vl73xgPIKgpn',  // Rabbi Shafier — actual rabbi, strong & inviting
  },
  female: {
    hebrew: process.env.ELEVENLABS_HEBREW_FEMALE_VOICE_ID || 'pFZP5JQG7iQjIQuC4Bku',   // Lily — velvety, warm
    english: process.env.ELEVENLABS_ENGLISH_FEMALE_VOICE_ID || 'hpp4J3VqNfWAUOO0d1Us', // Bella — professional, bright, warm educator
  },
} as const;

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
  if (!ELEVENLABS_API_KEY) {
    return NextResponse.json(
      { error: 'ElevenLabs API key not configured. Add ELEVENLABS_API_KEY to .env.local' },
      { status: 500 }
    );
  }

  const { text, mode, speed, voiceGender } = await req.json() as {
    text: string;
    mode: 'hebrew' | 'transliteration';
    speed?: number;
    voiceGender?: VoiceGender;
  };

  if (!text || text.length > 5000) {
    return NextResponse.json({ error: 'Text required (max 5000 chars)' }, { status: 400 });
  }

  const gender: VoiceGender = voiceGender || 'male';

  // Build cache key (includes gender so male/female get separate caches)
  const cacheKey = `${gender}:${mode}:${speed || 1}:${text}`;
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

  // Choose voice based on mode and gender
  const voices = VOICE_IDS[gender];
  const voiceId = mode === 'hebrew' ? voices.hebrew : voices.english;

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_v3',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.82,
            speed: speed || 1.0,
          },
          apply_text_normalization: 'on',
          ...(mode === 'hebrew' ? { language_code: 'he' } : { language_code: 'en' }),
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[TTS] ElevenLabs error:', response.status, errorText);
      return NextResponse.json(
        { error: 'TTS generation failed' },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

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
