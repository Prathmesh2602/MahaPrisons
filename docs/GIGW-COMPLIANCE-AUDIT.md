# GIGW 3.0 Compliance Audit

**Project:** MahaPrisons React Website
**Date:** 14 August 2026

This audit evaluates the existing React codebase against the Guidelines for Indian Government Websites and Apps (GIGW 3.0).

| Area | Requirement | Existing Status | Gap | Required Action | Implementation Status |
|---|---|---|---|---|---|
| Quality | Government identity | PARTIAL | Header contains logos but lacks some official structure/semantics. Logo alt text is present. | Enhance semantic `<header>`, verify emblem proportions, add ownership info to header where applicable. | Pending |
| Quality | Ownership | PARTIAL | Footer mentions NIC and ownership, but not semantically structured. | Ensure ownership text is clearly presented and semantic. | Pending |
| Quality | Last updated date | PARTIAL | Hardcoded in footer. | Update to use dynamic/contextual date or proper content structure. | Pending |
| Quality | About Us | PARTIAL | Exists as a section on homepage. No dedicated route. | Create `/about` route and full About Us page. | Pending |
| Quality | Contact Us | FAIL | Missing dedicated contact page. | Create `/contact` route with verified info. | Pending |
| Quality | Feedback | FAIL | Missing feedback mechanism. | Create `/feedback` form with validation. | Pending |
| Quality | Help | FAIL | Missing help section. | Create `/help` route. | Pending |
| Quality | Search | PARTIAL | Toolbar redirects to external WP search. | Implement accessible internal search form structure. | Pending |
| Quality | Sitemap | PARTIAL | Toolbar links to external sitemap. | Create internal `/sitemap` route and page. | Pending |
| Quality | Download metadata | FAIL | Documents in tabs don't show full metadata (size, format). | Add metadata details (PDF, Size, Lang, Date) to document links. | Pending |
| Accessibility | Alt text | PARTIAL | Some images have alt text, decorative images need `aria-hidden="true"`. | Systematic review of all `<img>` tags. | Pending |
| Accessibility | Keyboard navigation | PARTIAL | Missing some focus indicators, outline sometimes overridden. | Implement visible focus rings for all interactive elements. | Pending |
| Accessibility | Focus indicator | PARTIAL | Not systematically applied across all custom components (e.g. MegaMenu). | Standardize `:focus-visible` across design system. | Pending |
| Accessibility | Contrast | PARTIAL | High contrast mode exists, but default contrast needs review against WCAG AA. | Audit and fix text/background contrast ratios. | Pending |
| Accessibility | Text resize | PARTIAL | Toolbar has A-, A, A+, but layout may break on 200%. | Test text enlargement and ensure responsive flow. | Pending |
| Accessibility | Screen reader support | PARTIAL | Missing ARIA landmarks, `aria-expanded`, `aria-controls` on menus. | Add semantic HTML5 landmarks and correct ARIA roles. | Pending |
| Accessibility | Forms | FAIL | No forms exist yet to audit. | Ensure future forms have labels, validation, and error states. | Pending |
| Accessibility | Language attributes | PARTIAL | `lang` hardcoded to `mr-IN` in index.html, not dynamic. | Dynamically update `<html lang="...">` on language switch. | Pending |
| Accessibility | Captions/transcripts | N/A | No video/audio found yet. | N/A | Pending |
| Security | HTTPS readiness | REQUIRES HOSTING ACTION | Frontend can't enforce this locally. | Document in deployment instructions. | Pending |
| Security | Input validation | FAIL | No client-side validation on search. | Add React hook form validation. | Pending |
| Security | XSS protection | REQUIRES REVIEW | Need to ensure no `dangerouslySetInnerHTML` is used insecurely. | Audit codebase for unsafe HTML injection. | Pending |
| Security | External scripts | PARTIAL | Loading external images/fonts. | Document CSP requirements. | Pending |
| Lifecycle | Content review | REQUIRES DEPARTMENT ACTION | CMS integration needed. | Build data-driven frontend architecture. | Pending |
| Lifecycle | Archival | FAIL | No archive section. | Create `/archive` route architecture. | Pending |
| Lifecycle | Monitoring | REQUIRES HOSTING ACTION | Centralized monitoring needed. | Document architecture readiness. | Pending |
| Lifecycle | Backup/DR | REQUIRES HOSTING ACTION | Server-side responsibility. | Document requirements. | Pending |

## Architectural Gaps
* **Routing:** The app currently lacks a router (`react-router-dom`), preventing unique URLs for pages like `/about`, `/contact`, `/privacy-policy`.
* **Design System:** Tailwind is used, but needs a more systematic token structure for accessibility states (e.g. focus rings).
* **Semantic HTML:** Needs better use of `<main>`, `<article>`, `<nav>` with appropriate ARIA labels.
