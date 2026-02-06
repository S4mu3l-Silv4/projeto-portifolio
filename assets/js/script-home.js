// Nav bar com scroll inteligente:

  let ultimoScrollTop = 0
  const navBar = document.getElementById("nav-bar")

  window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > ultimoScrollTop) {
          navBar.style.top = "-36px"
      } else {
          navBar.style.top = "0"
      }

      ultimoScrollTop = scrollTop <= 0 ? 0 : scrollTop
  })

// Associação entre links da nav bar e seções:

  const botao = document.getElementById('botao-tema');
  const body = document.body;

  const temasalvo = localStorage.getItem('tema');
  temaEscuro(temasalvo === 'escuro');

  function temaEscuro(tipo) {
    if (tipo == true) {
      body.classList.add('escuro');
      botao.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      body.classList.remove('escuro');
      botao.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  botao.addEventListener('click', () => {
    const isescuro = body.classList.toggle('escuro');
    temaEscuro(isescuro);
    localStorage.setItem('tema', isescuro ? 'escuro' : 'claro');
  });

  const navLinks = document.querySelectorAll('#nav-bar ul a.link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });