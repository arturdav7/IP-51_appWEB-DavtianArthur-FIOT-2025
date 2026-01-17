document.addEventListener('DOMContentLoaded', () => {

  // ===== Форма (демо-режим, без відправки на сервер) =====
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Дякуємо! Повідомлення надіслано (демо).');
      form.reset();
    });
  }

  // ===== Активний пункт меню (клік + прокрутка) =====
  const navLinks = Array.from(document.querySelectorAll('.menu a'));
  if (navLinks.length === 0) return;

  // Отримуємо секції, на які ведуть пункти меню
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  // Встановлює активний пункт меню за індексом
  function setActiveLink(activeIndex) {
    navLinks.forEach(link => link.classList.remove('is-active'));
    if (navLinks[activeIndex]) {
      navLinks[activeIndex].classList.add('is-active');
    }
  }

  // Оновлює активний пункт меню при прокрутці сторінки
  function updateActiveByScroll() {
    const headerOffset = 140; // відступ з урахуванням фіксованої шапки
    const y = window.scrollY + headerOffset;

    // Якщо майже внизу сторінки — активним стає останній пункт ("Контакти")
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;

    if (nearBottom) {
      setActiveLink(navLinks.length - 1);
      return;
    }

    let activeIndex = 0;
    sections.forEach((section, index) => {
      if (section.offsetTop <= y) {
        activeIndex = index;
      }
    });

    setActiveLink(activeIndex);
  }

  // Клік по меню — одразу підсвічуємо пункт
  navLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      setActiveLink(index);
    });
  });

  // Прокрутка сторінки — визначаємо активну секцію
  window.addEventListener('scroll', updateActiveByScroll, { passive: true });

  // Початковий стан при завантаженні сторінки
  updateActiveByScroll();

});

/* =========================
   Legends – typography
   ========================= */

.legend-body p{
  font-size: 1.05rem;      /* было ~1rem */
  line-height: 1.75;
}

.legend-body ul{
  margin-top: 14px;
}

.legend-body li{
  font-size: 1.02rem;
  line-height: 1.65;
}

.legend-body h3{
  font-size: 1.25rem;
  margin-bottom: 10px;
}
