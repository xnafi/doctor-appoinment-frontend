// src/lib/voice.ts

function pickPreferredVoice(
  voices: SpeechSynthesisVoice[],
  preferredLangs: string[],
  preferFemale = false,
  strictLanguage = false
): SpeechSynthesisVoice | undefined {
  if (!voices.length) return undefined;

  const normalizedLangs = preferredLangs.map((lang) => lang.toLowerCase());

  const byLanguage = voices.filter((voice) =>
    normalizedLangs.some((lang) => voice.lang.toLowerCase().startsWith(lang))
  );

  const candidates = byLanguage.length
    ? byLanguage
    : strictLanguage
      ? []
      : voices;

  if (!candidates.length) return undefined;

  // Prefer voices that usually sound more natural on major browsers/platforms
  const qualityHints = [
    "neural",
    "natural",
    "wavenet",
    "siri",
    "google",
    "microsoft",
  ];

  const scored = candidates
    .map((voice) => {
      const name = voice.name.toLowerCase();
      const femaleHints = [
        "female",
        "woman",
        "zira",
        "jenny",
        "samantha",
        "aria",
        "natasha",
      ];
      const qualityScore = qualityHints.reduce(
        (score, hint, idx) => (name.includes(hint) ? score + (qualityHints.length - idx) : score),
        0
      );
      const femaleScore = preferFemale
        ? femaleHints.reduce((score, hint) => (name.includes(hint) ? score + 2 : score), 0)
        : 0;

      return {
        voice,
        qualityScore,
        femaleScore,
        localBonus: voice.localService ? 2 : 0,
        defaultBonus: voice.default ? 1 : 0,
      };
    })
    .sort(
      (a, b) =>
        b.qualityScore + b.femaleScore + b.localBonus + b.defaultBonus -
        (a.qualityScore + a.femaleScore + a.localBonus + a.defaultBonus)
    );

  return scored[0]?.voice;
}

function speakText(
  text: string,
  options: {
    preferredLangs: string[];
    fallbackLang: string;
    preferFemale?: boolean;
    strictLanguage?: boolean;
    rate?: number;
    pitch?: number;
    volume?: number;
  }
): void {
  // Some browsers load voices asynchronously.
  // We still speak immediately (so it never becomes silent), then retry once with loaded voices.
  const availableVoices = window.speechSynthesis.getVoices();
  if (!availableVoices.length) {
    setTimeout(() => speakText(text, options), 250);
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = availableVoices;
  const preferred = pickPreferredVoice(
    voices,
    options.preferredLangs,
    options.preferFemale ?? false,
    options.strictLanguage ?? false
  );

  utterance.voice = preferred ?? null;
  utterance.lang = preferred?.lang ?? options.fallbackLang;
  utterance.rate = options.rate ?? 0.95;
  utterance.pitch = options.pitch ?? 1;
  utterance.volume = options.volume ?? 1;

  window.speechSynthesis.speak(utterance);
}

function stopBrowserSpeech() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}
function speakWithBrowser(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  speakText(text, {
    preferredLangs: ["en-US", "en-GB", "en"],
    strictLanguage: false,
    fallbackLang: "en-US",
    preferFemale: true,
    rate: 0.93,
    pitch: 1,
    volume: 0.95,
  });
}

function speakAnnouncement(text: string) {
  stopBrowserSpeech();
  speakWithBrowser(text);
}

export function announcePatient(serialNumber: number, name: string): void {
  const cleanName = name?.trim() || "Patient";
  const message = `Serial number ${serialNumber}. Patient name ${cleanName}. Please come in.`;
  speakAnnouncement(message);
}

export function announceNextPatient(serialNumber: number, name: string): void {
  const cleanName = name?.trim() || "Patient";
  const message = `Patient name ${cleanName}. Next patient please be ready.`;

  speakAnnouncement(message);
}
