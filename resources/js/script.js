const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    navbar.classList.add('scrolled-header');
  } else {
    navbar.classList.remove('scrolled-header');
  }
});

const scroll_up = document.querySelector('.scroll-up');
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    scroll_up.classList.add('show');
  } else {
    scroll_up.classList.remove('show');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      const header = document.querySelector('.header');
      if (!target || !header) return;

      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
});

if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname);
}