class RiseText extends HTMLElement {
  connectedCallback() {
    const text = this.getAttribute('text') ?? this.textContent.trim();
    const requestedTag = this.getAttribute('as') || 'h2';
    const tagName = /^h[1-6]$/i.test(requestedTag) ? requestedTag.toLowerCase() : 'h2';
    const delay = Number(this.getAttribute('delay') || 0);
    const stagger = Number(this.getAttribute('stagger') || 60);
    const heading = document.createElement(tagName);

    heading.className = this.className;
    if (this.id) heading.id = this.id;
    heading.classList.add('rise-text');
    heading.setAttribute('aria-label', text);

    let letterIndex = 0;
    text.split(/(\s+)/u).forEach(part => {
      if (/^\s+$/u.test(part)) {
        heading.append(document.createTextNode(part));
        return;
      }

      const word = document.createElement('span');
      word.className = 'rise-word';
      Array.from(part).forEach(character => {
        const letter = document.createElement('span');
        letter.className = 'rise-letter';
        letter.setAttribute('aria-hidden', 'true');
        letter.style.setProperty('--rise-delay', `${delay + letterIndex * stagger}ms`);
        letter.textContent = character;
        word.append(letter);
        letterIndex += 1;
      });
      heading.append(word);
    });

    this.replaceWith(heading);

    if (!('IntersectionObserver' in window)) {
      heading.classList.add('rise-text-active');
      return;
    }

    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      heading.classList.add('rise-text-active');
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(heading);
  }
}

customElements.define('rise-text', RiseText);
