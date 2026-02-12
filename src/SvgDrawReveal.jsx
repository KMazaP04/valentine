import { useEffect, useRef } from "react";

/**
 * SvgDrawReveal
 * - Renders the SVG twice:
 *    1) Outline layer: draws ONLY the top N longest shapes (silhouette-ish)
 *    2) Color layer: fades in after the outline draw
 * - Designed for complex "filled art" SVGs (bouquets, icons, etc.)
 *
 * Usage (Vite + vite-plugin-svgr):
 *   import BouquetSvg from "./assets/flowers-bouquet-svgrepo-com.svg?react";
 *   <SvgDrawReveal Svg={BouquetSvg} play={yesPressed} size={360} />
 */
export function SvgDrawReveal({
  Svg,                 // ReactComponent SVG
  play = false,        // start when true
  size = 320,
  strokeColor = "#ff3b86",
  strokeWidth = 6,
  keep = 25,            // number of longest shapes to draw (1-3 usually best)
  fadeOutlineOut = true,
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!play) return;

    const root = rootRef.current;
    if (!root) return;

    // Reset so it can replay when re-mounted
    root.classList.remove("animate", "showColors");
    // Force reflow
    void root.offsetHeight;

    // Select outline-layer shapes that can be measured
    const all = Array.from(
      root.querySelectorAll(
        ".outlineLayer svg :is(path,line,polyline,polygon,rect,circle,ellipse)"
      )
    ).filter((el) => typeof el.getTotalLength === "function");

    // Measure lengths
    const measured = all
      .map((el) => {
        let len = 0;
        try {
          len = el.getTotalLength();
        } catch {
          len = 0;
        }
        return { el, len };
      })
      .filter((x) => Number.isFinite(x.len) && x.len > 0);

    // If nothing measurable, just fade colors in
    if (measured.length === 0) {
      root.classList.add("showColors");
      return;
    }

    // Sort biggest first (silhouette candidates)
    measured.sort((a, b) => b.len - a.len);

    const N = Math.max(1, Math.min(keep, measured.length));
    const keepEls = measured.slice(0, N);
    const keepSet = new Set(keepEls.map((x) => x.el));

    // Hide non-silhouette outlines
    measured.forEach(({ el }) => {
      el.style.opacity = keepSet.has(el) ? "1" : "0";
    });

    // Set dash + timing on kept elements
    let delay = 0;
    keepEls.forEach(({ el, len }, idx) => {
      el.style.setProperty("--len", String(len));
      el.style.setProperty("--delay", `${delay}ms`);

      // Duration scales with length (clamped)
      const dur = Math.min(2600, Math.max(800, len * 1.15));
      el.style.setProperty("--dur", `${dur}ms`);

      // Slight stagger between silhouette segments
      delay += idx === 0 ? 0 : 140;
    });

    // Start animation
    requestAnimationFrame(() => root.classList.add("animate"));

    // Total timing guess
    const totalMs = delay + 2200;
    const fadeAt = Math.max(0, totalMs - 700);

    const t1 = setTimeout(() => root.classList.add("showColors"), fadeAt);

    // Optional: if you want outline to fade away once colors show, CSS handles it.
    return () => clearTimeout(t1);
  }, [play, keep]);

  return (
    <div ref={rootRef} className={`svgReveal ${fadeOutlineOut ? "fadeOutlineOut" : ""}`}>
      {/* Outline layer (draw) */}
      <div className="layer outlineLayer" aria-hidden="true">
        <Svg width={size} height={size} className="svgBase" />
      </div>

      {/* Color layer (fade in) */}
      <div className="layer colorLayer">
        <Svg width={size} height={size} className="svgBase" />
      </div>

      <style>{`
        .svgReveal {
          position: relative;
          display: inline-block;
          width: ${size}px;
          height: ${size}px;
        }

        .svgReveal .layer {
          position: absolute;
          inset: 0;
        }

        .svgReveal .svgBase {
          display: block;
          width: 100%;
          height: 100%;
        }

        /* COLOR layer fades in */
        .svgReveal .colorLayer {
          z-index: 1;
          opacity: 0;
          transition: opacity 700ms ease;
        }
        .svgReveal.showColors .colorLayer {
          opacity: 1;
        }

        /* OUTLINE layer draws on top */
        .svgReveal .outlineLayer {
          z-index: 2;
          pointer-events: none;
          opacity: 1;
          transition: opacity 700ms ease;
        }

        /* optionally fade outline out once color is shown */
        .svgReveal.fadeOutlineOut.showColors .outlineLayer {
          opacity: 0;
        }

        /* Force outline look */
        .svgReveal .outlineLayer :is(path, line, polyline, polygon, rect, circle, ellipse) {
          fill: none !important;
          stroke: ${strokeColor};
          stroke-width: ${strokeWidth};
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 6px rgba(255, 59, 134, 0.35));

          --len: 1;
          --delay: 0ms;
          --dur: 1200ms;
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
        }

        .svgReveal.animate .outlineLayer :is(path, line, polyline, polygon, rect, circle, ellipse) {
          animation: draw var(--dur) ease forwards;
          animation-delay: var(--delay);
        }

        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
