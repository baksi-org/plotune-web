export function isMobileDevice() {
  return /android|iphone|ipad|ipod/i.test(navigator.userAgent);
}
