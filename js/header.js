fetch("header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;

    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.header .navbar');
    const overlay = document.querySelector(".nav-overlay");

    if (menuBtn && navbar && overlay) {

        // Toggle menu
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        // Close when clicking outside navbar, but not inside
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                navbar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });

        // Optional: close when clicking a menu link
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                overlay.classList.remove('active');
            });
        });
    }
});