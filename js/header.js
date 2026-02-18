fetch("header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;

    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.header .navbar');
    const overlay = document.querySelector(".nav-overlay");

    if (menuBtn && navbar && overlay) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }
});