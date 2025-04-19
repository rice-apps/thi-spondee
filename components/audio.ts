// audio.ts
import * as Device from 'expo-device';

type AudioType = typeof import('expo-av').Audio;

// A stub that won’t actually load any native modules
const StubAudio = {
  Sound: {
    createAsync: async (_: any) => ({
      sound: { playAsync: async () => {} },
      status: {},
    }),
  },
  setAudioModeAsync: async (_: any) => {},
};

let Audio: AudioType | typeof StubAudio;

// Only require expo-av when running on a real iOS/Android device
if (Device.isDevice) {
  // Using require so Metro won’t try to bundle it for simulators
  // (you could also use: const { Audio } = await import('expo-av'))
  Audio = require('expo-av').Audio;
} else {
  Audio = StubAudio as any;
}

export { Audio };
