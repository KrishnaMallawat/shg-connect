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

## 4. UI Polish & Bug Fixes
*   **Meeting Wizard UI Enhancements**:
    *   Resolved the "overcrowding" issue by ensuring the `OfficeBearerDashboard` completely unmounts its background content when the full-screen Guided Meeting Wizard is launched.
    *   Fixed a bug in Step 3 (Resolutions & Loans) of the Wizard where the massive `ResolutionRegister` component was inappropriately embedded, causing visual overflow. Replaced it with a minimal, inline Quick-Resolution input.
    *   Fixed a TypeScript argument mismatch in `onCompleteMeetingSession` that was causing the build to fail when trying to commit a meeting session.
*   **Dynamic Mobile Navigation**:
    *   Fixed critical bugs where switching tabs (`Savings`, `More`) as an Auditor, Animator, or Office Bearer resulted in blank screens.
    *   The `MobileNav` component is now fully dynamic and context-aware based on the 4-tier `Role`.
    *   **Office Bearers** now see `Home`, `Members`, `Loans`, `Meetings`, and `More`.
    *   **Auditors** and **Animators** no longer see irrelevant `More` tabs; their navigation precisely maps to their 4/5 available views, integrating `Settings` directly into the bottom bar.

## 5. Stability
*   Ensured 100% clean TypeScript compilation (`npm run build` exits with code 0).
*   Added event-propagation stoppers and click-outside listeners to the new dropdowns to prevent touch events from bleeding through the mobile UI.
