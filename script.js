// Scroll-reveal for project entries — fades/slides each entry up once, on first intersection.
const entries = document.querySelectorAll('.entry');
const obs = new IntersectionObserver((items) => {
  items.forEach((it) => {
    if (it.isIntersecting) {
      it.target.classList.add('visible');
      obs.unobserve(it.target);
    }
  });
}, { threshold: 0.12 });

entries.forEach((e) => obs.observe(e));

// Projects dropdown menu — click to toggle, click outside to close.
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('.dropdown-trigger');
  if (trigger) {
    e.preventDefault();
    const menu = trigger.parentElement.querySelector('.dropdown-menu');
    const isOpen = menu.classList.contains('open');
    document.querySelectorAll('.dropdown-menu.open').forEach((m) => m.classList.remove('open'));
    if (!isOpen) menu.classList.add('open');
    return;
  }
  document.querySelectorAll('.dropdown-menu.open').forEach((m) => m.classList.remove('open'));
});

// Hero intro: "I'm Isaac Chan," fades in, then "MechE @ USC." is replaced
// by a cycling word/phrase that types, pauses, highlights, and deletes —
// looping through a fixed list — with a natural ~90WPM typing rhythm
// (randomized per-character timing, extra pauses at spaces).
(function heroIntro() {
  const line1 = document.getElementById('heroLine1');
  const wordEl = document.getElementById('dynamicWord');
  const caret = document.getElementById('typeCaret');
  if (!line1 || !wordEl || !caret) return;

  const words = [
    'mechanical engineer.',
    'student @ USC.',
    'builder.',
    'product designer.',
    'robot enthusiast.',
  ];
  let wordIndex = 0;

  // ~90 WPM (5 chars/word standard) ≈ 130ms/char average, with natural
  // variance and a longer pause after spaces, plus rare "thinking" pauses.
  function typingDelay(ch) {
    let delay = 90 + Math.random() * 70;
    if (ch === ' ') delay += 90 + Math.random() * 90;
    if (Math.random() < 0.06) delay += 180 + Math.random() * 220;
    return delay;
  }

  function typePhrase(phrase, i, cb) {
    if (i === 0) caret.classList.add('typing');
    if (i < phrase.length) {
      wordEl.textContent = phrase.slice(0, i + 1);
      setTimeout(() => typePhrase(phrase, i + 1, cb), typingDelay(phrase[i]));
    } else {
      caret.classList.remove('typing');
      cb();
    }
  }

  function cycle() {
    const phrase = words[wordIndex];
    typePhrase(phrase, 0, () => {
      setTimeout(() => {
        wordEl.classList.add('selected');
        setTimeout(() => {
          wordEl.classList.remove('selected');
          wordEl.textContent = '';
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(cycle, 280);
        }, 380);
      }, 750);
    });
  }

  setTimeout(() => {
    line1.classList.add('shown');
    // Wait for the fade-in to fully finish (1.2s, matches the CSS transition
    // duration on .hero-line1), then a shorter pause, so typing starts ~2s
    // after page load overall.
    setTimeout(cycle, 1200 + 600);
  }, 200);
})();
