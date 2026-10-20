const introSplash = document.getElementById('introSplash');

if (introSplash && !document.documentElement.classList.contains('intro-splash-seen')) {
  const splashName = document.getElementById('introSplashName');
  const nameText = splashName.firstChild.textContent;
  const letterFragment = document.createDocumentFragment();

  Array.from(nameText).forEach((character, index) => {
    const letter = document.createElement('span');
    letter.className = 'intro-splash-letter';
    if (character === ' ') {
      letter.classList.add('intro-splash-space');
    }
    letter.style.setProperty('--letter-delay', `${index * 60}ms`);
    letter.textContent = character;
    letterFragment.append(letter);
  });

  splashName.replaceChild(letterFragment, splashName.firstChild);
  document.body.classList.add('intro-splash-open');

  try {
    sessionStorage.setItem('introSplashSeen', 'true');
  } catch {
    // The splash still runs for this page view when storage is unavailable.
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const exitDelay = reducedMotion ? 700 : 2800;
  const exitDuration = reducedMotion ? 250 : 800;

  window.setTimeout(() => {
    introSplash.classList.add('is-exiting');
    window.setTimeout(() => {
      introSplash.remove();
      document.body.classList.remove('intro-splash-open');
    }, exitDuration);
  }, exitDelay);
}
