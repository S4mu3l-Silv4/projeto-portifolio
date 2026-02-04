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