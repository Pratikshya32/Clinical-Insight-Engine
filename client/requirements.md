## Packages
recharts | For visualizing risk factors in the clinician view
date-fns | For formatting assessment history dates
react-hook-form | Form state management
@hookform/resolvers | Zod resolver for form validation
clsx | Class name merging
tailwind-merge | Class name merging
framer-motion | For smooth entry animations of the result cards

## Notes
The backend will automatically calculate riskScore, riskCategory, and factors upon POST to /api/assessments.
Clinician view uses Recharts to display a diverging bar chart of risk factor impacts.

## Frontend Security Header Policy

Helmet is a server-side Express middleware, so the React client cannot install or
enforce Helmet directly. The client still needs a documented header contract so
the frontend host, reverse proxy, or static asset platform serves the clinical UI
with predictable browser protections.

Required production headers for the client host:

| Header | Required value | Purpose |
| --- | --- | --- |
| `X-Content-Type-Options` | `nosniff` | Prevents browsers from MIME-sniffing JavaScript, CSS, and uploaded assets. |
| `X-Frame-Options` | `DENY` or equivalent CSP `frame-ancestors 'none'` | Blocks clickjacking against login, dashboard, and assessment pages. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Avoids leaking detailed assessment URLs to third-party origins. |
| `Permissions-Policy` | Disable unused browser features by default | Keeps camera, microphone, geolocation, and payment APIs unavailable unless a feature explicitly needs them. |
| `Content-Security-Policy` | Restrict scripts, styles, images, fonts, and API origins | Limits XSS blast radius and documents approved external services. |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` on HTTPS deployments | Ensures browsers keep using HTTPS after the first secure visit. |

Recommended CSP baseline for the deployed client:

```http
Content-Security-Policy: default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://api-host.example.com;
```

Update `connect-src` to include the real API, analytics, or model-service origins
used by the deployment. Do not add wildcard origins such as `*` for clinical
data flows, and do not document temporary development URLs as production-safe
values.

Verification checklist:

- Open the deployed client in browser developer tools and inspect the first HTML
  response under the Network tab.
- Confirm every required header appears on HTML routes, not only on API JSON
  responses.
- Run `curl -I https://<client-host>` during release checks and compare the
  result with the table above.
- Re-check headers after changing hosting providers, preview deployments,
  reverse proxies, CDN rules, or static asset rewrites.
