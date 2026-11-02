# Application Capture and Attribution Update

## Design

Show actual application UI without private records. Pouch uses two local captures of the original Portal frontend rendered against synthetic fixtures. The isolated capture harness must not load backend source, environment files or real authentication; every non-local browser request is blocked. IVL uses three archived public promotional screens, preserving existing watermarks and identifying their provenance. Do not invent or redraw either application.

Add optional gallery metadata to the existing static catalog and render native image links without a carousel or new runtime dependency. Mobile app images must remain fully visible, not cropped into landscape frames. Preserve English/Spanish, privacy and the existing hero.

Per the user's explicit preference, present freelance work without naming intermediaries. Keep development/design scope truthful and anonymize the agency's own headless website case, including its URL and branded capture. Employer names in professional experience and the actual Nicasource website project remain unchanged.

## Checklist

- [x] Inspect original frontend UI and public app media; reject production data access.
- [x] Render Portal history/details with synthetic records; verify zero external requests and runtime errors.
- [x] Add failing coverage for application media and revised attribution.
- [x] Integrate screenshots, localized provenance and responsive galleries.
- [x] Remove obsolete branded routes/assets from generated output.
- [x] Verify static build, desktop/mobile, no-JS access and privacy before publication.

## Capture Provenance

- Portal history and package detail: original React/MUI components rendered in an isolated temporary harness. Only screenshot assets enter the portfolio; no private source code or bundles are published. All records carry DEMO identifiers and the visible banner states that the data is fictional.
- IVL: public promotional captures 2, 3 and 4 from https://studio-by-ivl.updatestar.com/ (archived listing). Original watermarks remain. Screens contain the generic promotional profile “User” and public instructor content, not customer records.

## Verification

- New catalog checks were observed failing before implementation, then all six passed. All three static output checks passed, including localized provenance and absence of the retired branded route/image.
- Astro checked 23 files with no diagnostics and built all 69 routes. The existing lazy Three.js size advisory remains informational.
- Chrome verified 1440x960, 768x1024, 390x844 and 320x740 layouts, every archive filter/count, image decoding and original image dimensions. Both app galleries, localized navigation, no-JS access, hero behavior and all 66 case URLs passed. Safari and physical devices were not tested.
- Original repositories were read-only. The temporary frontend-only renderer was stopped after capture. No backend configuration, environment files, production sessions, customer data or private code entered the portfolio.
