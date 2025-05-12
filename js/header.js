document.addEventListener('DOMContentLoaded', function () {
    const burger = document.getElementById('burger-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    burger.addEventListener('click', function () {
      mobileMenu.classList.toggle('show');
    });

    document.addEventListener('click', function (event) {
      if (!mobileMenu.contains(event.target) && !burger.contains(event.target)) {
        mobileMenu.classList.remove('show');
      }
    });
  });