
// ===================== HAMBURGER NAV =====================
(function() {
  var btn = document.getElementById('hamBtn');
  var menu = document.getElementById('hamMenu');
  var overlay = document.getElementById('hamOverlay');
  if (!btn || !menu || !overlay) return;

  function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('open');
    btn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    btn.classList.remove('open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  // Close on link click
  menu.querySelectorAll('.ham-menu-link').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });
})();
