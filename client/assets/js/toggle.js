function classToggle() {
    const navs = document.querySelectorAll('.nav__items');
    navs.forEach((nav) => {
      nav.classList.toggle('navbar__toggleShow');
    });
  }
 document.querySelector('.navbar__nav-toggle').addEventListener('click', classToggle);