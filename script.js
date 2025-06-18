// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Dropdown menu
function toggleDropdown() {
  document.getElementById("dropdownMenu").classList.toggle("show")
}

// Fecha o menu se clicares fora
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    const dropdowns = document.getElementsByClassName("dropdown-content")
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i]
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show")
      }
    }
  }
}

// Intersection Observer para fade-in
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Aplicar a grid-items e outros
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".grid-item, .bottom-item, .departure-item")

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    el.style.animationDelay = `${index * 0.1}s`
    observer.observe(el)
  })

  // Animação da onda
  const wave = document.querySelector(".wave-decoration path")
  if (wave) {
    wave.style.animation = "wave 3s ease-in-out infinite"
  }

  // Hover nas imagens
  document.querySelectorAll(".grid-item img, .bottom-item img, .final-image img").forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)"
    })

    img.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
    })
  })

  // Botões de contacto (com animação e alerta)
  document.querySelectorAll(".cta-button, .contact-button").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)

      alert("¡Gracias por tu interés! Te contactaremos pronto para planificar tu aventura.")
    })
  })

  // Otimização do carregamento de imagens
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("load", function() {
      this.style.opacity = "1"
    })
    img.style.backgroundColor = "#f0f0f0"
  })

  // Submit form con fetch al backend
  const helpForm = document.getElementById("helpForm");
  if (helpForm) {
    helpForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const nombre = this.nombre.value.trim();
      const email = this.email.value.trim();
      const consulta = this.consulta.value.trim();

      if (!nombre || !email || !consulta) {
        alert("Por favor, rellena todos los campos.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, email, consulta }),
        });

        if (!response.ok) throw new Error("Error en el servidor");

        const data = await response.json();
        alert(data.message);
        this.reset();
      } catch (error) {
        alert("Error al enviar la consulta. Intenta de nuevo más tarde.");
        console.error(error);
      }
    });
  }
})

// Efeito de fade-in para sections
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  },
  { threshold: 0.1 }
)

document.querySelectorAll("section").forEach((section) => {
  fadeInObserver.observe(section)
})

// CSS da onda gerado via JS
const style = document.createElement("style")
style.textContent = `
  @keyframes wave {
    0%, 100% { d: path("M0,10 Q50,0 100,10 T200,10"); }
    50% { d: path("M0,10 Q50,20 100,10 T200,10"); }
  }
`
document.head.appendChild(style)
