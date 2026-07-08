// Hover-scrub carousel — a thin segmented strip below the media area.
// Hovering (or tapping, on touch) a segment switches to that slide.
// The strip lives BELOW the image, not on top of it, so native video
// controls on a video slide always stay fully clickable.
(function () {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const scrubber = carousel.querySelector('.carousel-scrubber');
  if (!scrubber) return;

  const segs = scrubber.querySelectorAll('.scrub-seg');
  let current = 0;

  function goTo(index) {
    if (index === current) return;
    // Pause any playing video on the slide we're leaving.
    const leaving = slides[current].querySelector('video');
    if (leaving) leaving.pause();

    slides[current].classList.remove('active');
    segs[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    segs[current].classList.add('active');
  }

  segs.forEach((seg, i) => {
    seg.addEventListener('mouseenter', () => goTo(i));
    seg.addEventListener('click', () => goTo(i)); // touch/tap fallback
  });
})();
