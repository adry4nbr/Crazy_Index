const audioCache = new Map<string, HTMLAudioElement>();

export function preloadSound(src: string) {
  if (audioCache.has(src)) return;

  const audio = new Audio(src);

  audio.preload = "auto";

  audio.load();

  audioCache.set(src, audio);
}

export function playSound(src: string, volume = 1, playbackRate = 1) {
  let audio = audioCache.get(src);

  if (!audio) {
    audio = new Audio(src);
    audio.preload = "auto";

    audioCache.set(src, audio);
  }

  const clone = audio.cloneNode() as HTMLAudioElement;

  clone.volume = volume;
  clone.playbackRate = playbackRate;

  clone.play().catch(() => {});
}
