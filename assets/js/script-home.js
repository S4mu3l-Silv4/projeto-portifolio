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

// Animação das barras e porcentagens nas skills

  const section = document.querySelector(".skills-section")
  const skills = document.querySelectorAll(".skill")

  let animated = false

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animateSkills()
        animated = true
      }
    })
  }, { threshold: 0.4 })

  observer.observe(section)

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
      }, 20)
    })
  }