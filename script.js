const sections = [...document.querySelectorAll('.page-section')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const revealTargets = document.querySelectorAll(
  '.section-heading, .project-feature, .project-row, .about-topline, .about-layout, .contact-strip'
);

if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('reveal-ready');
  revealTargets.forEach((element) => element.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeLink = navLinks.find((link) => link.hash === `#${entry.target.id}`);
        navLinks.forEach((link) => {
          const isActive = link === activeLink;
          link.classList.toggle('is-active', isActive);
          if (isActive) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach((section) => sectionObserver.observe(section));
}
