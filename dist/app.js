(function () {
  const ranked = Array.isArray(window.FOUNDER_DATA)
    ? [...window.FOUNDER_DATA].sort((a, b) => (b.value - a.value) || a.company.localeCompare(b.company))
    : [];
  const funding = Array.isArray(window.FUNDING_DATA) ? [...window.FUNDING_DATA].sort((a, b) => b.value - a.value) : [];
  const wealth = Array.isArray(window.WEALTH_DATA) ? window.WEALTH_DATA : [];
  const seasonOrder = { Winter: 0, Spring: 1, Summer: 2, Fall: 3 };
  const yc = Array.isArray(window.YC_DATA) ? [...window.YC_DATA].sort((a, b) => {
    const [, aSeason = "", aYear = "0"] = a.batch.match(/^(Winter|Spring|Summer|Fall)\s+(\d{4})$/) || [];
    const [, bSeason = "", bYear = "0"] = b.batch.match(/^(Winter|Spring|Summer|Fall)\s+(\d{4})$/) || [];
    return Number(bYear) - Number(aYear)
      || (seasonOrder[bSeason] ?? -1) - (seasonOrder[aSeason] ?? -1)
      || a.company.localeCompare(b.company);
  }) : [];
  const unpriced = Array.isArray(window.UNPRICED_DATA) ? window.UNPRICED_DATA : [];
  const exclusions = Array.isArray(window.EXCLUSIONS) ? window.EXCLUSIONS : [];
  const ycBorderline = Array.isArray(window.YC_BORDERLINE) ? window.YC_BORDERLINE : [];

  const list = document.querySelector("#founder-list");
  const search = document.querySelector("#search");
  const count = document.querySelector("#result-count");
  const summary = document.querySelector("#summary-line");
  const empty = document.querySelector("#empty-state");
  const filters = [...document.querySelectorAll(".filter")];
  const rankById = new Map();
  let priorValue;
  let displayedRank = 0;
  ranked.forEach((record, index) => {
    if (record.value !== priorValue) displayedRank = index + 1;
    rankById.set(record.id, displayedRank);
    priorValue = record.value;
  });
  let activeMetric = "all";

  const escapeHtml = value => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const sourceLinks = sources => (sources || []).map(item =>
    `<a class="source" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.label)}</a>`
  ).join("");

  const allNamedFounders = [
    ...ranked.flatMap(record => record.founders.map(founder => founder.name)),
    ...funding.flatMap(record => record.founders.map(founder => founder.name)),
    ...wealth.flatMap(record => record.founders.map(founder => founder.name))
  ];
  const distinctFounders = new Set(allNamedFounders).size;
  summary.textContent = `${ranked.length} valued companies · ${distinctFounders} founders in ranked/funding/proxy lanes · ${yc.length} confirmed YC companies · reviewed through September 24, 2026.`;

  function matchesRanked(record, query) {
    const haystack = [
      record.company, record.sector, record.metricLabel, record.funding || "",
      ...record.founders.flatMap(founder => [founder.name, founder.ut])
    ].join(" ").toLowerCase();
    return (activeMetric === "all" || record.metric === activeMetric) && haystack.includes(query);
  }

  function renderRanked() {
    const query = search.value.trim().toLowerCase();
    const visible = ranked.filter(record => matchesRanked(record, query));
    count.textContent = `${visible.length} ${visible.length === 1 ? "company" : "companies"}`;
    empty.hidden = visible.length !== 0;
    list.innerHTML = visible.map(record => {
      const rank = rankById.get(record.id);
      const founderNames = record.founders.map(founder => escapeHtml(founder.name)).join(" · ");
      const utLines = record.founders.map(founder => `${escapeHtml(founder.name)} — ${escapeHtml(founder.ut)}`).join("<br>");
      const metadata = [
        `Founded ${escapeHtml(record.founded)}`,
        escapeHtml(record.sector),
        record.funding ? `${escapeHtml(record.funding)} disclosed funding` : null
      ].filter(Boolean).map(item => `<span>${item}</span>`).join("");

      return `<article class="entry" id="${escapeHtml(record.id)}">
        <div class="rank">${String(rank).padStart(2, "0")}</div>
        <div>
          <div class="entry-top">
            <h3><a href="#${escapeHtml(record.id)}">${escapeHtml(record.company)}</a></h3>
            <div class="value-block">
              <p class="value">${escapeHtml(record.valueLabel)}</p>
              <p class="metric">${escapeHtml(record.metricLabel)}</p>
            </div>
          </div>
          <p class="founders">${founderNames}</p>
          <p class="ut-line">${utLines}</p>
          <p class="description">${escapeHtml(record.description)}</p>
          <div class="metadata">${metadata}</div>
          <div class="sources">${sourceLinks(record.sources)}</div>
        </div>
      </article>`;
    }).join("");
  }

  function renderCompact(targetSelector, records) {
    const target = document.querySelector(targetSelector);
    target.innerHTML = records.map(record => {
      const founders = record.founders.map(founder => `${escapeHtml(founder.name)} — ${escapeHtml(founder.ut)}`).join("<br>");
      return `<article class="compact-entry" id="${escapeHtml(record.id)}">
        <div class="compact-top">
          <h3>${escapeHtml(record.company)}</h3>
          <div class="value-block"><p class="value">${escapeHtml(record.valueLabel)}</p><p class="metric">${escapeHtml(record.metricLabel)}</p></div>
        </div>
        <p class="ut-line">${founders}</p>
        <p class="description">${escapeHtml(record.description)}</p>
        <div class="sources">${sourceLinks(record.sources)}</div>
      </article>`;
    }).join("");
  }

  renderCompact("#funding-list", funding);
  renderCompact("#wealth-list", wealth);
  document.querySelector("#funding-count").textContent = `${funding.length} records`;

  document.querySelector("#unpriced-list").innerHTML = unpriced.map(record => `<article class="compact-entry">
    <h3>${escapeHtml(record.company)}</h3>
    <p class="ut-line">${escapeHtml(record.founders)}</p>
    <p class="description">${escapeHtml(record.note)}</p>
    <div class="sources">${sourceLinks(record.sources)}</div>
  </article>`).join("");
  document.querySelector("#unpriced-count").textContent = `${unpriced.length} records`;

  const ycSearch = document.querySelector("#yc-search");
  const ycList = document.querySelector("#yc-list");
  const ycCount = document.querySelector("#yc-count");
  const ycEmpty = document.querySelector("#yc-empty");

  function renderYc() {
    const query = ycSearch.value.trim().toLowerCase();
    const visible = yc.filter(record => [record.company, record.batch, record.founders, record.ut, record.status, record.founded, record.money, record.note].join(" ").toLowerCase().includes(query));
    ycCount.textContent = `${visible.length} of ${yc.length}`;
    ycEmpty.hidden = visible.length !== 0;
    ycList.innerHTML = visible.map((record, index) => `<article class="yc-entry">
      <div class="yc-number">${String(index + 1).padStart(2, "0")}</div>
      <div>
        <div class="yc-top"><h3><a href="${escapeHtml(record.url)}" target="_blank" rel="noreferrer">${escapeHtml(record.company)}</a></h3><span class="batch">${escapeHtml(record.batch)}</span></div>
        <p class="founders">${escapeHtml(record.founders)}</p>
        <p class="ut-line">${escapeHtml(record.ut)}</p>
        <div class="metadata"><span>Founded ${escapeHtml(record.founded)}</span><span>YC status: ${escapeHtml(record.status)}</span>${record.money ? `<span>${escapeHtml(record.money)}</span>` : ""}</div>
        ${record.note ? `<p class="yc-note">${escapeHtml(record.note)}</p>` : ""}
        <div class="sources">${record.evidenceUrl === record.url
          ? `<a class="source" href="${escapeHtml(record.url)}" target="_blank" rel="noreferrer">YC profile + UT evidence</a>`
          : `<a class="source" href="${escapeHtml(record.url)}" target="_blank" rel="noreferrer">YC profile</a><a class="source" href="${escapeHtml(record.evidenceUrl)}" target="_blank" rel="noreferrer">UT evidence</a>`}</div>
      </div>
    </article>`).join("");
  }

  document.querySelector("#audit-count").textContent = `${exclusions.length} exclusions · ${ycBorderline.length} YC borderlines`;
  document.querySelector("#exclusion-list").innerHTML = exclusions.map(item => `<div class="audit-row">
    <strong>${escapeHtml(item.name)}</strong>
    <div><span>${escapeHtml(item.reason)}</span>${item.sources?.length ? `<div class="sources">${sourceLinks(item.sources)}</div>` : ""}</div>
  </div>`).join("");
  document.querySelector("#yc-borderline-list").innerHTML = ycBorderline.map(item => `<div class="audit-row"><strong>${escapeHtml(item.company)} · ${escapeHtml(item.batch)}</strong><span>${escapeHtml(item.reason)}</span></div>`).join("");

  filters.forEach(button => {
    button.addEventListener("click", () => {
      activeMetric = button.dataset.metric;
      filters.forEach(filter => {
        const active = filter === button;
        filter.classList.toggle("active", active);
        filter.setAttribute("aria-pressed", String(active));
      });
      renderRanked();
    });
  });

  search.addEventListener("input", renderRanked);
  ycSearch.addEventListener("input", renderYc);
  renderRanked();
  renderYc();
}());
