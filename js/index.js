// const totalEl = document.getElementById("total-students");

// fetchStudentData()
//   .then(list => {
//     totalEl.textContent = list.length;
//   })
//   .catch(err => {
//     console.error(err);
//     totalEl.textContent = "–";
//   });

// Change these if your spreadsheet columns are named differently
const COLUMNS = {
  type: "Type",
  company: "Company",
  tech: "Technical Interviews",
  behavior: "Behavioral Interviews",
  graduation: "Graduation",
};
const GRAD_WINDOW_MONTHS = 6;

/* ---------- Helpers ---------- */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function showNote(container, message) {
  container.innerHTML = "";
  container.appendChild(el("p", "overview-note", message));
}

function hasColumn(students, key) {
  return students.some(s => key in s);
}

// Returns "internship", "fulltime", "other" (company but no type), or null
function getPlacement(s) {
  const type = normalize(s[COLUMNS.type] || "");
  const company = String(s[COLUMNS.company] || "").trim();
  if (/intern/.test(type)) return "internship";
  if (/full|\bft\b/.test(type)) return "fulltime";
  if (company) return "other";
  return null;
}

function interviewCount(value) {
  const n = parseInt(value, 10);
  return isNaN(n) ? 0 : Math.max(0, Math.min(3, n));
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const SEASONS = { spring: 4, summer: 7, fall: 11, autumn: 11, winter: 0 };

function parseGraduation(value) {
  const t = normalize(value || "");
  if (!t) return null;
  let m;

  if ((m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/))) {          // 5/20/2026
    let year = +m[3];
    if (year < 100) year += 2000;
    return new Date(year, +m[1] - 1, +m[2]);
  }
  if ((m = t.match(/^(\d{4})-(\d{2})-(\d{2})/))) {                    // 2026-05-20
    return new Date(+m[1], +m[2] - 1, +m[3]);
  }
  if ((m = t.match(/([a-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})/))) {         // May 20, 2026
    const idx = MONTHS.indexOf(m[1].slice(0, 3));
    if (idx >= 0) return new Date(+m[3], idx, +m[2]);
  }
  if ((m = t.match(/([a-z]+)\.?,?\s*(\d{4})/))) {                     // May 2026 / Spring 2026
    if (m[1] in SEASONS) return new Date(+m[2], SEASONS[m[1]], 15);
    const idx = MONTHS.indexOf(m[1].slice(0, 3));
    if (idx >= 0) return new Date(+m[2], idx, 15);
  }
  if ((m = t.match(/^(\d{4})$/))) return new Date(+m[1], 4, 15);      // 2026 → May
  return null;
}

function monthsUntil(date) {
  const now = new Date();
  return (date.getFullYear() - now.getFullYear()) * 12 + (date.getMonth() - now.getMonth());
}

function relativeLabel(months) {
  if (months === 0) return "This month";
  if (months === 1) return "Next month";
  return `In ${months} months`;
}

function studentLink(name) {
  const a = el("a");
  a.href = `students.html?student=${encodeURIComponent(name)}`;
  a.appendChild(el("span", "overview-list__name", name));
  return a;
}

/* ---------- Sections ---------- */

function renderStats(students) {
  document.getElementById("total-students").textContent = students.length;

  if (!hasColumn(students, COLUMNS.type) && !hasColumn(students, COLUMNS.company)) {
    document.getElementById("placement-detail").textContent =
      `Add a "${COLUMNS.type}" column to track placements.`;
    return;
  }

  let internships = 0, fullTime = 0, placed = 0;
  for (const s of students) {
    const p = getPlacement(s);
    if (p) placed++;
    if (p === "internship") internships++;
    if (p === "fulltime") fullTime++;
  }
  const rate = students.length ? Math.round((placed / students.length) * 100) : 0;

  document.getElementById("internship-count").textContent = internships;
  document.getElementById("fulltime-count").textContent = fullTime;
  document.getElementById("placement-rate").textContent = `${rate}%`;
  document.getElementById("placement-detail").textContent =
    `${placed} of ${students.length} placed`;
}

function renderCohortChart(students) {
  const chart = document.getElementById("cohort-chart");

  if (!hasColumn(students, COLUMNS.type) && !hasColumn(students, COLUMNS.company)) {
    showNote(chart, `This chart fills in once the sheet has a "${COLUMNS.type}" or "${COLUMNS.company}" column.`);
    return;
  }

  const groups = new Map();
  for (const s of students) {
    if (!s.Cohort) continue;
    const g = groups.get(s.Cohort) || { total: 0, placed: 0 };
    g.total++;
    if (getPlacement(s)) g.placed++;
    groups.set(s.Cohort, g);
  }

  chart.innerHTML = "";
  const cohorts = [...groups.keys()].sort((a, b) => parseFloat(a) - parseFloat(b));

  for (const cohort of cohorts) {
    const { total, placed } = groups.get(cohort);
    const pct = Math.round((placed / total) * 100);

    const row = el("a", "cohort-bar");
    row.href = `students.html?cohort=${encodeURIComponent(cohort)}`;
    row.setAttribute("aria-label", `Cohort ${cohort}: ${placed} of ${total} placed, ${pct}%`);

    const track = el("div", "cohort-bar__track");
    const fill = el("div", "cohort-bar__fill");
    fill.style.width = `${pct}%`;
    track.appendChild(fill);

    row.append(
      el("span", "cohort-bar__label", `Cohort ${cohort}`),
      track,
      el("span", "cohort-bar__pct", `${pct}%`),
      el("span", "cohort-bar__detail", `${placed} of ${total}`)
    );
    chart.appendChild(row);
  }
}

function renderMockList(students) {
  const list = document.getElementById("mock-list");

  if (!hasColumn(students, COLUMNS.tech) && !hasColumn(students, COLUMNS.behavior)) {
    showNote(list, `Add "${COLUMNS.tech}" and "${COLUMNS.behavior}" columns to see who needs practice.`);
    return;
  }

  const needs = students
    .filter(s => !getPlacement(s))
    .map(s => ({
      student: s,
      tech: interviewCount(s[COLUMNS.tech]),
      behavior: interviewCount(s[COLUMNS.behavior]),
    }))
    .filter(x => x.tech < 3 || x.behavior < 3)
    .sort((a, b) => (a.tech + a.behavior) - (b.tech + b.behavior) ||
                    a.student.Name.localeCompare(b.student.Name));

  list.innerHTML = "";
  if (needs.length === 0) {
    showNote(list, "Every student who isn't placed yet has completed all their mock interviews.");
    return;
  }

  for (const { student, tech, behavior } of needs) {
    const link = studentLink(student.Name);
    const pills = el("span", "pill-group");
    pills.append(
      el("span", `pill${tech === 3 ? " pill--done" : ""}`, `Technical ${tech}/3`),
      el("span", `pill${behavior === 3 ? " pill--done" : ""}`, `Behavioral ${behavior}/3`)
    );
    link.appendChild(pills);
    const li = el("li");
    li.appendChild(link);
    list.appendChild(li);
  }
}

function renderGradList(students) {
  const list = document.getElementById("grad-list");

  const upcoming = students
    .map(s => ({ student: s, date: parseGraduation(s[COLUMNS.graduation]) }))
    .filter(x => x.date)
    .map(x => ({ ...x, months: monthsUntil(x.date) }))
    .filter(x => x.months >= 0 && x.months <= GRAD_WINDOW_MONTHS)
    .sort((a, b) => a.date - b.date || a.student.Name.localeCompare(b.student.Name));

  list.innerHTML = "";
  if (upcoming.length === 0) {
    showNote(list, `No graduations in the next ${GRAD_WINDOW_MONTHS} months.`);
    return;
  }

  for (const { student, months } of upcoming) {
    const link = studentLink(student.Name);
    const meta = el("span", "grad-meta");
    meta.append(
      el("span", "grad-meta__when", relativeLabel(months)),
      el("span", "grad-meta__date", String(student[COLUMNS.graduation]).trim())
    );
    link.appendChild(meta);
    const li = el("li");
    li.appendChild(link);
    list.appendChild(li);
  }
}

/* ---------- Start ---------- */

loadStudentData()
  .then(students => {
    renderStats(students);
    renderCohortChart(students);
    renderMockList(students);
    renderGradList(students);
  })
  .catch(err => {
    console.error(err);
    document.getElementById("total-students").textContent = "–";
    for (const id of ["cohort-chart", "mock-list", "grad-list"]) {
      showNote(document.getElementById(id), "Student data couldn't be loaded. Check the console for details.");
    }
  });