export function applyWithAnimationDelay(start, callback, threshold = 750) {
  const diff = Date.now() - start;

  setTimeout(callback, diff > threshold ? 1 : threshold - diff);
}
