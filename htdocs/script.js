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
const videoOverlay = document.querySelector(".video-overlay");

videoOverlay?.addEventListener("click", () => {
  video?.play();
});

video?.addEventListener("play", () => {
  videoOverlay?.setAttribute("hidden", "");
});

video?.addEventListener("ended", () => {
  videoOverlay?.removeAttribute("hidden");
});
