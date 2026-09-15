"use strict";

// El contenido permanece visible y los enlaces funcionan sin JavaScript.
(() => {
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motionPreference.matches || !Element.prototype.animate) return;

  const animations = [];
  document.querySelectorAll("[data-reveal]").forEach((element, index) => {
    const animation = element.animate(
      [
        { opacity: 0, transform: "translateY(12px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 550,
        delay: Math.min(index * 65, 520),
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "backwards"
      }
    );
    animations.push(animation);
    // La navegación por teclado nunca debe enfocar un enlace invisible.
    element.addEventListener("focus", () => animation.cancel(), { once: true });
  });

  motionPreference.addEventListener("change", (event) => {
    if (event.matches) animations.forEach((animation) => animation.cancel());
  });
})();
