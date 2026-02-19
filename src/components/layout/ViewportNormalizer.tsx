"use client";

import { useEffect } from "react";

/**
 * Detects browser-level zoom and counteracts it with CSS zoom.
 *
 * Problem: Browser zoom (Ctrl +/-) scales the ENTIRE rendered page AFTER CSS
 * is applied. This means CSS font-size changes can't counteract it. Only the
 * CSS `zoom` property (which scales rendering before browser zoom) can cancel
 * out the effect, resulting in a net 1.0x scale.
 *
 * Detection: For maximized/near-maximized windows, we compare screen.availWidth
 * (the OS-level screen width in CSS pixels) with window.innerWidth (the viewport
 * width, which shrinks when browser zoom increases). The ratio tells us the
 * browser's zoom level.
 *
 * For non-maximized windows, we can't reliably detect zoom, so we fall back
 * to the CSS clamp() in globals.css for proportional font-size scaling.
 */
export default function ViewportNormalizer() {
    useEffect(() => {
        const normalize = () => {
            const html = document.documentElement;
            const innerW = window.innerWidth;
            const outerW = window.outerWidth;
            const screenW = screen.availWidth || screen.width;

            // Skip on mobile
            if (innerW <= 640) {
                html.style.removeProperty("zoom");
                html.style.setProperty("font-size", "14px", "important");
                return;
            }

            // Detect if window is nearly maximized (within 60px tolerance)
            const isNearlyMaximized = outerW >= screenW - 60;

            if (isNearlyMaximized) {
                // For maximized windows: detect browser zoom
                // screen.availWidth = CSS pixels available (accounts for OS DPI only)
                // innerWidth = CSS viewport (accounts for OS DPI AND browser zoom)
                // Tolerance: subtract ~20px for scrollbar/window borders
                const expectedInner = screenW - 20;
                const zoomRatio = expectedInner / innerW;

                if (zoomRatio > 1.08 && zoomRatio < 2.5) {
                    // Browser zoom detected — apply inverse CSS zoom to counteract
                    const inverseZoom = 1 / zoomRatio;
                    html.style.zoom = inverseZoom.toFixed(4);
                    // When CSS zoom is applied, set font-size to 14px (the CSS zoom
                    // handles the scaling, so we want the "natural" base)
                    html.style.setProperty("font-size", "14px", "important");
                    return;
                }
            }

            // No browser zoom detected (or non-maximized window):
            // Remove any previously applied CSS zoom and use fluid font-size
            html.style.removeProperty("zoom");
            // Desktop: fluid base — 14px at 1920px, scales linearly
            // Formula: 8 + (6/1920)*vw = 8 + 0.003125*vw
            // Clamped between 11.5px and 14px
            if (innerW > 640) {
                const fluid = 8 + 0.003125 * innerW;
                const base = Math.min(14, Math.max(11.5, fluid));
                html.style.setProperty("font-size", `${base}px`, "important");
            }
        };

        // Run immediately
        normalize();

        // Re-run on resize and zoom change
        window.addEventListener("resize", normalize);
        return () => window.removeEventListener("resize", normalize);
    }, []);

    return null;
}
