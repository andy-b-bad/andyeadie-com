const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".primary-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("open");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const video = document.querySelector(".video-shell video");
const placeholder = document.querySelector(".video-placeholder");

video?.addEventListener("loadeddata", () => {
  placeholder?.setAttribute("hidden", "");
});
