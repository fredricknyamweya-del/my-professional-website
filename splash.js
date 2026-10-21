const introSplash = document.getElementById('introSplash');

if (introSplash) {
  const splashName = document.getElementById('introSplashName');
  let letterIndex = 0;

  splashName.querySelectorAll('.intro-splash-word').forEach(word => {
    const letterFragment = document.createDocumentFragment();
    Array.from(word.textContent).forEach(character => {
      const letter = document.createElement('span');
      letter.className = 'intro-splash-letter';
      letter.style.setProperty('--letter-delay', `${letterIndex * 60}ms`);
      letter.textContent = character;
      letterFragment.append(letter);
      letterIndex += 1;
    });
    word.replaceChildren(letterFragment);
  });

  document.body.classList.add('intro-splash-open');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const exitDelay = reducedMotion ? 700 : 2800;
  const exitDuration = reducedMotion ? 250 : 800;

  window.setTimeout(() => {
    introSplash.classList.add('is-exiting');
    window.setTimeout(() => {
      introSplash.remove();
      document.body.classList.remove('intro-splash-open');
      document.documentElement.classList.remove('intro-splash-pending');
      document.documentElement.classList.add('intro-splash-complete');
      document.dispatchEvent(new CustomEvent('intro-splash:complete'));
    }, exitDuration);
  }, exitDelay);
}
