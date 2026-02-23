/**
 * Google Cloud Text-to-Speech client for Hebrew audio generation.
 *
 * Hebrew voices available (he-IL):
 *   WaveNet (highest quality):
 *     he-IL-Wavenet-A  (female)
 *     he-IL-Wavenet-B  (male)
 *     he-IL-Wavenet-C  (female)
 *     he-IL-Wavenet-D  (male)
 *   Standard:
 *     he-IL-Standard-A (female)
 *     he-IL-Standard-B (male)
 *     he-IL-Standard-C (female)
 *     he-IL-Standard-D (male)
 *
 * Setup:
 *   1. Create a Google Cloud project
 *   2. Enable the Text-to-Speech API
 *   3. Create a service account key (JSON)
 *   4. Set GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json in .env.local
 *      OR set GOOGLE_TTS_API_KEY for API key auth (simpler but less secure)
 */

import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export type GoogleVoiceGender = 'male' | 'female';

export interface GoogleTTSOptions {
  /** Playback speed (0.25 to 4.0, default 1.0) */
  speed?: number;
  /** Pitch adjustment in semitones (-20.0 to 20.0, default 0) */
  pitch?: number;
  /** Voice gender */
  gender?: GoogleVoiceGender;
}

// Voice selection — WaveNet voices sound most natural
const HEBREW_VOICES = {
  male: 'he-IL-Wavenet-B',
  female: 'he-IL-Wavenet-A',
} as const;

let _client: TextToSpeechClient | null = null;

function getClient(): TextToSpeechClient {
  if (!_client) {
    const apiKey = process.env.GOOGLE_TTS_API_KEY;
    if (apiKey) {
      _client = new TextToSpeechClient({ apiKey });
    } else {
      _client = new TextToSpeechClient();
    }
  }
  return _client;
}

/**
 * Fix ה׳ → אֲדֹנָי so TTS says "Adonai" instead of "heh".
 * Also handles the ASCII apostrophe variant ה'.
 */
export function fixHashemForTTS(text: string): string {
  return text.replace(/ה[׳']/g, 'אֲדֹנָי');
}

/**
 * Generate Hebrew speech audio using Google Cloud TTS.
 * Returns MP3 audio as a Buffer.
 */
export async function synthesizeHebrew(
  text: string,
  opts: GoogleTTSOptions = {}
): Promise<Buffer> {
  const client = getClient();
  const gender = opts.gender || 'male';
  const voiceName = HEBREW_VOICES[gender];

  // Fix Hashem references for proper pronunciation
  const processedText = fixHashemForTTS(text);

  const [response] = await client.synthesizeSpeech({
    input: { text: processedText },
    voice: {
      languageCode: 'he-IL',
      name: voiceName,
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: opts.speed || 1.0,
      pitch: opts.pitch || 0,
      effectsProfileId: ['headphone-class-device'],
    },
  });

  if (!response.audioContent) {
    throw new Error('Google Cloud TTS returned empty audio');
  }

  if (typeof response.audioContent === 'string') {
    return Buffer.from(response.audioContent, 'base64');
  }
  return Buffer.from(response.audioContent);
}
