# Project Requirements Analysis: Pavilion Square KL

Based on the document `Quick Fact for PSQ.docx`, the following requirements and technical specifications have been identified for the Next.js project.

## 1. Project Overview
- **Name:** Pavilion Square KL
- **Developer:** Armani Hartajaya Sdn Bhd (under Pavilion Group)
- **Type:** Luxury Real Estate (67-storey Residence + 25-storey Corporate Suites)
- **Concept:** "The Epicentre of Luxury Living"
- **Aesthetic:** Futuristic, Cyberpunk-inspired, Neon accents, Minimalist, High-contrast visuals.
- **Color Palette:** Modern grays, blacks, blues, greens, warm neutrals.

## 2. Key Features & Sections

### A. Hero Section
- **Visuals:** Full-screen immersive header.
- **3D Element:** Rotatable 3D model of twin towers against KL skyline.
- **Animation:** Neon glow effects, subtle particle animations, animated overlay text.
- **Interaction:** Downward scroll arrow with pulse effect.

### B. Location & Quick Facts
- **Mechanism:** Parallax background image of the site.
- **Animations:** Facts reveal one-by-one on scroll.
- **Data Visualization:** Animated counters (ticking up) for stats.
- **Map:** Interactive map pin with hover zoom.
- **Content:**
    - Developer: Pavilion Group
    - Tenure: Leasehold (2122)
    - Completion: 2030
    - Total Stories: 67 (Residence), 25 (Corporate)
    - Units: 960 (Residences), 106 (Corporate)

### C. Unit Layouts
- **Gallery:** Interactive, filterable cards for unit types (A, B, C, D).
- **Interactivity:** Hover animations, card flips.
- **Advanced Feature:** Click-to-open 3D models for virtual walkthroughs.
- **Corporate Suites:** Animated card flips to show layouts.

### D. Facilities Showcase
- **Concept:** Multi-level vertical scroll timeline.
- **Levels:**
    - **L63A (Gym):** 3D rotatable gym model.
    - **L67 (Pool):** Infinity pool with water ripple effects & 360 panorama.
    - **L66 (Garden):** Sky garden details.
    - **L12 (Courtyard):** Carousel slider with auto-transitions.

### E. Services & Concierge
- **Visuals:** Animated icon grid (fading in).
- **3D:** 3D lobby view immersion.
- **Services:** Housekeeping, Limousine, Property Management.

### F. Gallery & Contact
- **Visuals:** Auto-playing slideshow with smooth fades.
- **Engagement:** Inquiry form with animated submit button.
- **Social:** Hover-animated social media icons.

## 3. Technical Requirements & Dependencies

To support these features, the following dependencies have been installed:

### Validated Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + `clsx` + `tailwind-merge`

### Animation & Motion
- **`framer-motion`**: For scroll-triggered animations, page transitions, and complex UI motion.
- **`gsap`**: For high-performance, timeline-based animations (morphing, complex sequencing).
- **`react-countup`**: For the "ticking up" counters.

### 3D & Immersive
- **`three`**: Core 3D library.
- **`@react-three/fiber`**: React renderer for Three.js.
- **`@react-three/drei`**: Helpers for 3D (OrbitControls, loaders, etc.).

### UI Components
- **`embla-carousel-react`**: For the auto-playing slideshows and carousels.
- **`lucide-react`**: For high-quality, customizable icons.
- **`react-hook-form` + `zod`**: For the inquiry form handling and validation.

## 4. Next Steps (Implementation Strategy)
1.  **Asset Preparation:** Gather 3D models (.glb/.gltf) and high-res images. (Placeholder assets will be used initially).
2.  **Component Architecture:** Build reusable components (`Section`, `3DViewer`, `Counter`, `Card`).
3.  **Page Construction:** Assemble the single-page scroll layout.
4.  **Integration:** Connect forms and interactive elements.
