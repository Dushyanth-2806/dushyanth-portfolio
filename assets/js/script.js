/* =========================================================
   Dushyanth Portfolio — script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("is-hidden"), 350);
  });
  // fallback in case load event already fired
  setTimeout(() => loader && loader.classList.add("is-hidden"), 2000);

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("is-open");
    navLinks.classList.toggle("is-open");
  });

  navLinks.querySelectorAll(".nav__link").forEach(link => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("is-open");
      navLinks.classList.remove("is-open");
    });
  });

  /* ---------- Active link on scroll ---------- */
  const sections = document.querySelectorAll("main section[id], .hero[id]");
  const navLinkEls = document.querySelectorAll(".nav__link");

  const setActiveLink = () => {
    let currentId = "home";
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinkEls.forEach(link => {
      link.classList.toggle("active-link", link.getAttribute("href") === `#${currentId}`);
    });
  };
  window.addEventListener("scroll", setActiveLink);
  setActiveLink();

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Cursor glow ---------- */
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  }

  /* ---------- Typed role text ---------- */
  const roles = [
    "Software Developer",
    "Python Programmer",
    "Machine Learning Enthusiast",
    "Web Developer",
    "Problem Solver"
  ];
  const typedEl = document.getElementById("typedRole");
  let roleIndex = 0, charIndex = 0, deleting = false;

  const typeLoop = () => {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 80);
  };
  typeLoop();

  /* ---------- Skills data + render ---------- */
  const skills = [
    { name: "Python", icon: "🐍", level: 85 },
    { name: "SQL", icon: "🗄️", level: 80 },
    { name: "HTML5", icon: "🧱", level: 90 },
    { name: "CSS3", icon: "🎨", level: 85 },
    { name: "JavaScript", icon: "⚡", level: 78 },
    { name: "Machine Learning", icon: "🧠", level: 65 },
    { name: "Web Development", icon: "🌐", level: 82 },
    { name: "Git & GitHub", icon: "🔧", level: 75 },
    { name: "Problem Solving", icon: "🧩", level: 88 },
  ];

  const skillsGrid = document.getElementById("skillsGrid");
  skills.forEach(skill => {
    const card = document.createElement("div");
    card.className = "skill-card reveal";
    card.innerHTML = `
      <span class="skill-card__icon">${skill.icon}</span>
      <span class="skill-card__name">${skill.name}</span>
      <div class="skill-card__bar"><div class="skill-card__bar-fill" data-level="${skill.level}"></div></div>
    `;
    skillsGrid.appendChild(card);
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal, .about__text, .about__panel, .project-card, .timeline__item, .contact-card, .contact__form");
  revealEls.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");

        // animate skill bars when visible
        const bar = entry.target.querySelector(".skill-card__bar-fill");
        if (bar) {
          bar.style.width = bar.dataset.level + "%";
        }

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));

  /* ---------- Contact form (client-side only) ---------- */
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();

    formNote.textContent = `Thanks${name ? ", " + name : ""}! Your message is ready — please send it via email to reach me directly.`;

    const subject = encodeURIComponent(document.getElementById("subject").value || "Portfolio Contact");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${document.getElementById("email").value}\n\n${document.getElementById("message").value}`
    );
    window.location.href = `mailto:dushyanthm2806@gmail.com?subject=${subject}&body=${body}`;

    form.reset();
  });

});
