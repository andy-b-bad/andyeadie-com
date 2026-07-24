/**
 * script.js
 * Lightweight progressive enhancements for index.html.
 *
 * Sections:
 * 1. Shared navigation and footer behavior.
 * 2. Lazy SVG inlining and hero artwork timing.
 * 3. CSS-controlled full-page node network.
 */

(() => {
  "use strict";

  /* ------------------------------------------------------------------------
     1. Navigation and footer
     ------------------------------------------------------------------------ */

  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".primary-nav");
  const year = document.getElementById("year");

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav?.classList.toggle("open");
  });

  nav?.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     2. Mesh artwork

     Inline SVGs expose their stable class hooks to CSS animation. Artwork
     below the fold is fetched only when it approaches the viewport.
     ------------------------------------------------------------------------ */

  const inlineMeshArtwork = async (image) => {
    if (image.dataset.meshLoading === "true") return;
    image.dataset.meshLoading = "true";

    try {
      const sourceUrl = image.dataset.meshSrc || image.currentSrc || image.src;
      const response = await fetch(sourceUrl);
      if (!response.ok) {
        throw new Error(`SVG request failed: ${response.status}`);
      }

      const source = await response.text();
      const parsedDocument = new DOMParser().parseFromString(
        source,
        "image/svg+xml"
      );
      const svg = parsedDocument.documentElement;

      if (svg.nodeName.toLowerCase() !== "svg") {
        throw new Error("Mesh asset did not contain an SVG root");
      }

      svg.classList.add(...image.classList);

      if (svg.getAttribute("aria-label") === "Hermes wireframe illustration") {
        svg.classList.add("hermes-wireframe");
        svg.querySelectorAll("style").forEach((style) => {
          style.textContent = style.textContent.replaceAll(
            ":root",
            ".hermes-wireframe"
          );
        });
      }

      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      image.replaceWith(document.importNode(svg, true));
    } catch (error) {
      image.removeAttribute("data-mesh-loading");

      if (image.dataset.meshSrc) {
        image.src = image.dataset.meshSrc;
        image.removeAttribute("data-inline-mesh");
      }

      console.warn(
        "Unable to inline mesh artwork; keeping the image fallback.",
        error
      );
    }
  };

  const meshImages = document.querySelectorAll("img[data-inline-mesh]");
  const heroMan = document.querySelector(".hero-art-man");

  // Keep the entrance animation at its first frame until the large SVG loads.
  if (heroMan && !heroMan.complete) {
    heroMan.style.animationPlayState = "paused";

    const startHeroManAnimation = () => {
      heroMan.style.animationPlayState = "running";
    };

    heroMan.addEventListener("load", startHeroManAnimation, { once: true });
    heroMan.addEventListener("error", startHeroManAnimation, { once: true });
  }

  if ("IntersectionObserver" in window) {
    const meshObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          inlineMeshArtwork(entry.target);
        });
      },
      { rootMargin: "120px 0px" }
    );

    meshImages.forEach((image) => meshObserver.observe(image));
  } else {
    meshImages.forEach(inlineMeshArtwork);
  }
})();

/* --------------------------------------------------------------------------
   3. Full-page node network
   -------------------------------------------------------------------------- */

(() => {
  "use strict";

  const canvas = document.getElementById("net");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  let width;
  let height;
  let devicePixelRatio;
  let animationFrame;
  let nodes = [];
  let config = {};
  const mouse = { x: -9999, y: -9999 };

  const readConfig = () => {
    const styles = getComputedStyle(document.documentElement);
    const number = (name, fallback) => {
      const value = Number.parseFloat(styles.getPropertyValue(name));
      return Number.isNaN(value) ? fallback : value;
    };
    const colorTriplet = (name, fallback) => {
      const value = styles.getPropertyValue(name).trim();
      if (!value) return fallback;

      return value
        .split(",")
        .map((channel) => Number.parseInt(channel.trim(), 10));
    };

    config = {
      colorA: colorTriplet("--net-color-a", [94, 234, 212]),
      colorB: colorTriplet("--net-color-b", [249, 115, 85]),
      density: number("--net-density", 6000),
      maxNodes: number("--net-max-nodes", 220),
      linkDistance: number("--net-link-distance", 150),
      linkStrength: number("--net-link-strength", 0.35),
      nodeSpeed: number("--net-node-speed", 1),
      glow: number("--net-glow", 1),
      hubChance: number("--net-hub-chance", 0.08),
    };
  };

  const randomBetween = (minimum, maximum) =>
    minimum + Math.random() * (maximum - minimum);

  const initialiseNodes = () => {
    const count = Math.min(
      config.maxNodes,
      Math.floor((width * height) / config.density)
    );

    nodes = Array.from({ length: count }, () => {
      const x = randomBetween(0, width);
      const isOrange = Math.random() < x / width;
      const isHub = Math.random() < config.hubChance;

      return {
        x,
        y: randomBetween(0, height),
        vx: randomBetween(-0.15, 0.15) * config.nodeSpeed,
        vy: randomBetween(-0.1, 0.1) * config.nodeSpeed,
        radius: isHub ? randomBetween(2.6, 4.2) : randomBetween(1, 2.2),
        glow:
          (isHub ? randomBetween(18, 28) : randomBetween(6, 10)) *
          config.glow,
        color: isOrange ? config.colorB : config.colorA,
        haloAlpha: isHub ? randomBetween(0.12, 0.22) : 0,
      };
    });
  };

  const resize = () => {
    devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    readConfig();
    initialiseNodes();
  };

  const rgba = (color, alpha) =>
    `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;

  const draw = () => {
    context.clearRect(0, 0, width, height);

    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < -20) node.x = width + 20;
      if (node.x > width + 20) node.x = -20;
      if (node.y < -20) node.y = height + 20;
      if (node.y > height + 20) node.y = -20;
    }

    for (const node of nodes) {
      if (node.haloAlpha <= 0) continue;

      const gradient = context.createRadialGradient(
        node.x,
        node.y,
        0,
        node.x,
        node.y,
        60
      );
      gradient.addColorStop(0, rgba(node.color, node.haloAlpha));
      gradient.addColorStop(1, rgba(node.color, 0));
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(node.x, node.y, 60, 0, Math.PI * 2);
      context.fill();
    }

    for (let firstIndex = 0; firstIndex < nodes.length; firstIndex += 1) {
      for (
        let secondIndex = firstIndex + 1;
        secondIndex < nodes.length;
        secondIndex += 1
      ) {
        const first = nodes[firstIndex];
        const second = nodes[secondIndex];
        const deltaX = first.x - second.x;
        const deltaY = first.y - second.y;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance >= config.linkDistance) continue;

        const alpha =
          (1 - distance / config.linkDistance) * config.linkStrength;
        context.strokeStyle = rgba(first.color, alpha);
        context.lineWidth = 0.7;
        context.beginPath();
        context.moveTo(first.x, first.y);
        context.lineTo(second.x, second.y);
        context.stroke();
      }
    }

    for (const node of nodes) {
      const mouseDistance = Math.hypot(node.x - mouse.x, node.y - mouse.y);
      const boost = mouseDistance < 200 ? 1 - mouseDistance / 200 : 0;

      context.beginPath();
      context.arc(node.x, node.y, node.radius + boost * 2, 0, Math.PI * 2);
      context.fillStyle = rgba(node.color, 0.75 + boost * 0.25);
      context.shadowBlur = node.glow + boost * 14;
      context.shadowColor = rgba(node.color, 0.9);
      context.fill();
      context.shadowBlur = 0;
    }

    if (config.nodeSpeed !== 0) {
      animationFrame = requestAnimationFrame(draw);
    }
  };

  window.addEventListener("resize", () => {
    resize();

    if (config.nodeSpeed === 0) {
      draw();
    }
  });
  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });
  window.addEventListener("mouseleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });
  window.addEventListener("pagehide", () => {
    cancelAnimationFrame(animationFrame);
  });

  resize();
  draw();
})();
