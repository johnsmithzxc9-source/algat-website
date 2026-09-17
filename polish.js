(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('header');
  let lastY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-compact', y > 24);
    if (y > 180 && y > lastY + 6) header?.classList.add('is-hidden');
    if (y < lastY - 6 || y < 120) header?.classList.remove('is-hidden');
    lastY = y;
    ticking = false;
  };

  addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  const targets = document.querySelectorAll('.section .head, .decision > *, .context > *, .demo-grid > *, .node, .ward > *, .future-grid > *, .final .shell');
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 2) el.classList.add('reveal-delay');
  });

  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  targets.forEach(el => io.observe(el));
})();
