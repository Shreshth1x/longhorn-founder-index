# The Longhorn Founder Index — research brief

**Review date:** September 24, 2026  
**Institutional scope:** The University of Texas at Austin  
**Research standard:** public-source, claim-level verification

## What this project is

This is a public-source census of founders and co-founders who attended UT Austin, including graduates, former students, and documented dropouts. It also captures verified companies that raised institutional capital even when no defensible valuation is public. A separate lane may identify faculty-originated UT spinouts, but those records are not presented as alumni.

The index is intentionally more conservative than an alumni-company database. A company is included only after three distinct claims have been checked:

1. **UT relationship:** the person attended UT Austin in a student capacity, with degree and year stated only when a reliable source supports them.
2. **Founder relationship:** the person founded or co-founded the named company. Being an employee, later CEO, investor, donor, mentor, accelerator participant, or Austin-based executive is insufficient.
3. **Economic metric:** the displayed company value, transaction price, personal wealth estimate, or disclosed funding total has an identifiable source, date, and metric type.

“Triple checked” therefore means the three claim classes above were independently tested; it does not mean every record happens to have exactly three hyperlinks. When possible, the index uses an official UT source for education, a company or regulatory source for founder/deal facts, and a dated financial source for the number.

At the September 24, 2026 review snapshot, the published site contains 106 value-ranked companies, 189 funding-only companies, 4 separate founder-wealth proxies, 25 unpriced or unresolved records, 135 explicit exclusions, and 69 confirmed YC companies. The ranked, funding, and proxy lanes represent 323 distinct named founders after company-level deduplication.

## An honest completeness claim

The project cannot mathematically prove that it contains *every* UT Austin entrepreneur. Private companies can operate without disclosing financing, old companies may have thin digital records, founder biographies are sometimes contradictory, and commercial databases routinely conflate UT Austin with other institutions in the University of Texas System. Commercial alumni and venture databases contain thousands of possible leads, but those entries are neither a complete census nor uniformly verified.

Accordingly, the website describes itself as a **publicly verifiable census as of September 24, 2026**, not a definitive universe. Qualified names can be added when equivalent evidence appears; uncertain names remain in the audit queue rather than being promoted on inference.

## Inclusion rules

A record qualifies for the alumni/former-student index when all of the following are true:

- A reliable source establishes that at least one founder or co-founder attended UT Austin. Graduate students and people who left before earning a degree qualify when the source is explicit.
- A reliable source calls that person a founder or co-founder of the company. “Built,” “led,” “first employee,” or “early executive” does not substitute for founder status.
- The company is a real operating or exited venture. Companies may be bootstrapped, venture-backed, publicly traded, acquired, or defunct.
- Any displayed number is tied to a source and a date. An undisclosed value is shown as undisclosed rather than estimated from vibes, revenue, headcount, or press language.

The index groups multiple UT founders of the same company into one company-level record so that a single valuation is not counted more than once. A founder with multiple independently founded companies may appear more than once, because the economic outcomes are distinct.

## Exclusion and quarantine rules

The following do **not** establish eligibility by themselves:

- being headquartered in Austin;
- participating in UT Austin’s accelerator, incubator, faculty network, or alumni events;
- donating to UT, serving on a UT board, teaching at UT, or receiving an honorary recognition;
- attending another UT System institution, such as UT El Paso, UT Dallas, or UT Arlington;
- joining as a later CEO, president, operator, or first employee;
- a secondary database that lists UT Austin when primary biographies identify a different university.

Faculty-founded ventures are labeled separately from alumni. Candidates with one missing leg of the three-part test are quarantined rather than silently discarded. The provenance ledger records representative exclusions so the same false positives are not repeatedly reintroduced.

## Economic metric taxonomy

The ranking is numerical, but the numbers are not interchangeable. Every value is therefore labeled with both **type** and **date**.

| Metric | Meaning | Treatment |
|---|---|---|
| **Current market capitalization** | Equity-market value at the review snapshot | Most current, but volatile; not founder wealth and not enterprise value |
| **Successor market capitalization** | Current value of a public successor to the founded company | Explicitly marked as a lineage/successor value |
| **Transaction value** | Announced or completed acquisition, merger, or take-private price | Dated historical outcome; equity value and enterprise value are distinguished where known |
| **Private valuation** | Post-money valuation from a priced financing | Preserves the financing date; never described as current when stale |
| **Derived valuation** | Arithmetic implied by a disclosed stake purchase | Shows the derivation and is never presented as a directly negotiated whole-company price |
| **Founder wealth** | Dated third-party estimate of an individual’s net worth | Separate proxy used only when company value is not independently available; not a company valuation |
| **Disclosed funding** | Capital raised from investors or lenders | Separate funding-only lane; funding is never equated with valuation |

Numbers from different metric classes may appear in one descending index for discovery, but the label remains attached and the interface provides metric filters. Values are nominal and are not adjusted for inflation. Non-USD claims retain their reported currency; a clearly labeled approximate dollar conversion may be used only as the internal sort key. Historical sale prices are not “updated” to the present. A current market cap is a point-in-time snapshot and will drift after the review date.

## Source hierarchy

Sources were weighted in this order:

1. SEC filings, acquirer announcements, company financing releases, and official corporate histories;
2. UT Austin school, department, alumni, and commencement materials;
3. founder-authored biographies and credible institutional profiles;
4. established financial reporting and transparent market-data providers;
5. commercial private-market databases, used only with a visible provider/date label and never to override stronger primary evidence.

Search snippets and database fields were treated as leads, not proof. When sources disagreed, the index either used the narrower claim, disclosed the range, or withheld the record.

## Supplied Series A+ dataset cross-check

The September 2026 expansion pass tested a user-supplied CSV containing 470 rows, 460 unique people, and 419 unique company labels. It was treated as a lead list, not as evidence. Only 16 company labels and 15 founder names matched the then-published index exactly, so every apparent miss was re-run through the same three-claim test rather than bulk imported.

The file was especially useful for surfacing Jack Sharkey and Whop, but its rows also demonstrated why title-string matching is unsafe. Examples included an assistant to a founder labeled as the founder of MP Materials, a founder of an internal employee group labeled as a founder of Citi, a marketplace seller labeled as a founder of Poshmark, and plainly corrupted Apple and BP rows. Funding fields also mixed venture equity with debt facilities, IPO proceeds, royalty transactions, fund AUM, project-development commitments, and acquisition prices.

For accepted records, the published amount is therefore often different from the CSV amount. A company was promoted only after independent evidence established UT Austin student attendance, actual founder or co-founder status, and a correctly classified economic event. Rejected and unresolved high-risk rows are preserved in the website audit ledger and the provenance notes so future refreshes do not reintroduce them.

## YC batch audit

YC affiliation is independent metadata, not evidence of value or of a UT relationship. A YC badge requires a batch-specific YC company record or comparably authoritative batch source plus UT founder evidence—either a separate source or an official YC founder biography that explicitly names UT Austin. Companies reported by listicles or databases without both factual legs stay out of the confirmed YC ledger. Acquisitions, shutdowns, and rebrands keep their original batch label rather than being assigned to a later company identity.

## Research workflow

The working process was:

1. Seed candidates from official UT Austin alumni and school materials, founder histories, major exits, market screens, venture databases, and YC batch records.
2. Resolve the person’s precise UT Austin status and avoid UT System name collisions.
3. Verify founder/co-founder language against company, regulatory, university, or high-quality biographical sources.
4. Locate the strongest available economic evidence and preserve its metric type and date.
5. Group duplicate founders at the company level, mark successor or derived figures, and separate funding-only records.
6. Run an exclusion pass for Austin-only, donor-only, later-executive, and wrong-university false positives.
7. Publish source links at the record level and preserve expanded notes for difficult records, research candidates, and exclusions in `RESEARCH.provenance.md`.

## Known limitations

- Private-company valuations are often stale and may differ materially from later secondary-market indications.
- Funding totals can differ by provider because of debt, extensions, undisclosed rounds, and the treatment of acquired subsidiaries.
- Historical deal announcements sometimes mix equity purchase price, assumed debt, and enterprise value; the displayed label follows the cited source.
- Early corporate histories can blur “founder,” “co-founder,” and formative executive roles. Ambiguous cases are excluded or explicitly qualified.
- Wealth estimates are model-based and volatile.
- Public-market values will change after September 24, 2026.
- No public-source process can discover founders who never disclosed their education or financing.

## Update standard

A future update should not merely add a name. It should add the UT evidence, founder evidence, economic evidence, metric type, as-of date, and any YC batch evidence as separate fields. If one part cannot be supported, the candidate belongs in the audit queue until it can.
