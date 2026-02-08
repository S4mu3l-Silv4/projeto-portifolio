// Nav bar com scroll inteligente:

  let ultimoScrollTop = 0
  const navBar = document.getElementById("nav-bar")

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > ultimoScrollTop) {
        navBar.style.top = "-40px"
      } else {
        navBar.style.top = "0"
      }

      ultimoScrollTop = scrollTop <= 0 ? 0 : scrollTop
  })

// Associação entre links da nav bar e seções:

  const navLinks = document.querySelectorAll('#nav-bar ul a.link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.nav-bar').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });