# SHGConnect Changelog

## 1. 4-Tier RBAC Architecture 
Implemented the strict operational boundary model defined by the NGO guidelines:
*   **Tier 1: Member** (`MEMBER`): Read-only self-auditing view, cryptographic receipt verification.
*   **Tier 2: Office Bearer** (`OFFICE_BEARER`): Write-heavy view inherited from the previous animator scope. Manages meetings, savings, and loan lifecycle.
*   **Tier 3: Animator / CRP** (`ANIMATOR`): Multi-SHG portfolio view. Focuses on sync conflict resolution and village-level oversight. Built a brand new `AnimatorDashboard`.
*   **Tier 4: Auditor / Bank Linkage** (`AUDITOR`): Read-only compliance view. Focuses on Panchasutra scoring and ledger hash-chain integrity forensics. Built a brand new `AuditorDashboard`.

## 2. Navigation & Layout
*   **Role Switcher Dropdown**: Upgraded the mobile role switcher from a cycling button to a full dropdown menu (mirroring the language switcher) for explicit role selection.
*   **Mobile Scrolling Fix**: Removed aggressive `overscroll-behavior-y: none` and `overflow-x-hidden` constraints that were trapping the flexbox layout and preventing vertical scrolling on Android devices.
*   **Sidebar Routing**: Updated the desktop Sidebar to securely route navigation tabs based on the active 4-tier role.

## 3. PWA & Developer Experience
*   **Disabled Dev Service Worker**: Turned off `devOptions.enabled` in `vite.config.ts` so the PWA service worker no longer aggressively caches old code during local development, ensuring instant hot-reloads.
*   **Strict Type Auditing**: Resolved multiple TypeScript compilation errors related to strict UI component variants (`Badge`, `Card`, `Progress`), replacing legacy strings like `emerald` and `parchment` with the strictly typed `green` and `saffron`.
*   **Legacy Data Migration**: Mapped legacy `TREASURER` dummy data roles in `db.ts` to the new unified `OFFICE_BEARER` tier to prevent runtime errors.

## 4. Stability
*   Ensured 100% clean TypeScript compilation (`npm run build` exits with code 0).
*   Added event-propagation stoppers and click-outside listeners to the new dropdowns to prevent touch events from bleeding through the mobile UI.
