// Nav bar com scroll inteligente:

  const navBar = document.getElementById("nav-bar")
  let ultimoScrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (navBar) {
    navBar.style.top = "0"

    window.addEventListener("pageshow", function () {
      navBar.style.top = "0"
      ultimoScrollTop = window.pageYOffset || document.documentElement.scrollTop
    })

    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > ultimoScrollTop && scrollTop > navBar.offsetHeight) {
        navBar.style.top = "-40px"
      } else {
        navBar.style.top = "0"
      }

      ultimoScrollTop = scrollTop <= 0 ? 0 : scrollTop
    })
  }

// Associação entre links da nav bar e seções:

  const linksNavBar = document.querySelectorAll('a.link')
  linksNavBar.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault()
      const alvo = document.querySelector(this.getAttribute('href'))
      if (alvo) {
        const alturaHeader = document.querySelector('.nav-bar').offsetHeight;
        const posicaoAlvo = alvo.offsetTop - alturaHeader - 15
        window.scrollTo({
          top: posicaoAlvo,
          behavior: 'smooth'
        })
      }
    })
  })

// Alternância entre temas claro e escuro:

  const botao = document.getElementById('botao-tema')
  const body = document.body

  const temasalvo = localStorage.getItem('tema')
  temaEscuro(temasalvo === 'tema-escuro')

  function temaEscuro(tipo) {
    if (tipo == true) {
      body.classList.add('tema-escuro')
      botao.innerHTML = '<i class="fa-solid fa-sun"></i>'
    } else {
      body.classList.remove('tema-escuro')
      botao.innerHTML = '<i class="fa-solid fa-moon"></i>'
    }
  }

  botao.addEventListener('click', () => {
    const isescuro = body.classList.toggle('tema-escuro')
    temaEscuro(isescuro)
    localStorage.setItem('tema', isescuro ? 'tema-escuro' : 'tema-claro')
  })

// Animação de aparição do conteúdo:

  const elementos = document.querySelectorAll(".revelar")

  const threshold = window.matchMedia("(min-width: 769px)").matches
    ? 0.1
    : 0.01

  const observador1 = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

      if (entrada.isIntersecting) {
        entrada.target.classList.add("mostrar")
      }

    })

  }, {
    threshold: threshold
  })

  elementos.forEach(el => {
    observador1.observe(el)
  })

// Filtragem e limpeza nos projetos:

  const filtrosProjetos = document.getElementById('filtros-projetos')
  const projetos = document.querySelectorAll('#container-projetos .projeto')
  const limparFiltros = document.getElementById('limpar-filtros')

  function obterValoresSelecionados(nome) {
    return Array.from(document.querySelectorAll(`input[name="${nome}"]:checked`))
      .map(input => input.value)
  }

  function atualizarProjetos() {
    const tiposSelecionados = obterValoresSelecionados('tipo-projeto')
    const linguagensSelecionadas = obterValoresSelecionados('linguagem-projeto')
    const anosSelecionados = obterValoresSelecionados('ano-projeto')
    let projetosVisiveis = 0

    projetos.forEach(projeto => {
      const tipo = projeto.dataset.tipo
      const linguagens = projeto.dataset.linguagens.split(',')
      const ano = projeto.dataset.ano

      const correspondeTipo = tiposSelecionados.length === 0 || tiposSelecionados.includes(tipo)
      const correspondeLinguagem = linguagensSelecionadas.length === 0 ||
        linguagensSelecionadas.some(linguagem => linguagens.includes(linguagem))
      const correspondeAno = anosSelecionados.length === 0 || anosSelecionados.includes(ano)

      const deveExibir = correspondeTipo && correspondeLinguagem && correspondeAno
      projeto.classList.toggle('filtro-oculto', !deveExibir)

      if (deveExibir) {
        projetosVisiveis++
      }
    })
  }

  if (filtrosProjetos) {
    filtrosProjetos.addEventListener('change', atualizarProjetos)

    document.addEventListener('click', evento => {
      if (!evento.target.closest('#filtros-projetos .filtro-projeto')) {
        filtrosProjetos.querySelectorAll('.filtro-projeto[open]').forEach(filtro => {
          filtro.open = false
        })
      }
    })
  }

  if (limparFiltros) {
    limparFiltros.addEventListener('click', () => {
      filtrosProjetos.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.checked = false
      })

      filtrosProjetos.querySelectorAll('details').forEach(filtro => {
        filtro.open = false
      })

      atualizarProjetos()
    })
  }

// Animação das barras e porcentagens nas skills:

  const section = document.querySelector(".skills-section")
  const skills = document.querySelectorAll(".skill")

  let animated = false

  const obervador2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animateSkills()
        animated = true
      }
    })
  })

  obervador2.observe(section)

  function animateSkills() {
    skills.forEach(skill => {
      const percent = skill.getAttribute("data-percent")
      const bar = skill.querySelector(".bar")
      const percentText = skill.querySelector(".percent")

      bar.style.width = percent + "%"

      let current = 0
      const interval = setInterval(() => {
        if (current >= percent) {
          clearInterval(interval)
        } else {
          current++
          percentText.textContent = current + "%"
        }
      }, 30)
    })
  }