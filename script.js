const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");
const progressBar = document.getElementById("progress-bar");
const sections = document.querySelectorAll(".section");
const links = document.querySelectorAll(".nav-links a");
const underline = document.querySelector(".underline");
const scrollTopBtn = document.getElementById("scrollTop");
const themeToggle = document.getElementById("themeToggle");

// Hamburger
menuIcon.onclick = () => navLinks.classList.toggle("show");

// Scroll
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 150) current = section.id;
  });

  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
      underline.style.left = link.offsetLeft + "px";
    }
  });

  navbar.classList.toggle("scrolled", scrollY > 50);

  const height = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = (scrollY / height) * 100 + "%";

  scrollTopBtn.style.display = scrollY > 300 ? "block" : "none";
});

// Scroll top
scrollTopBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Reveal animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
});
sections.forEach(section => observer.observe(section));

// Dark mode
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀️";
}

themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
};

// Keyboard navigation
let index = 0;
document.addEventListener("keydown", e => {
  if (e.key === "ArrowDown") index = Math.min(index + 1, sections.length - 1);
  if (e.key === "ArrowUp") index = Math.max(index - 1, 0);
  sections[index].scrollIntoView({ behavior: "smooth" });
});
