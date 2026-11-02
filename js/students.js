let students = [];

async function loadStudents() {
  const res = await fetch("data/masterCohortList.xlsx");
  const buffer = await res.arrayBuffer();
  const workbook = XLSX.read(buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  console.log("Sheets:", workbook.SheetNames);
  console.log("First rows:", rows.slice(0, 5));

  let currentCohort = null;
  students = [];

  for (const row of rows) {
  const firstCell = String(row.Name).trim();

  // Cohort header rows: "Cohort 1", "Cohort 3.5", etc.
  const header = firstCell.match(/^Cohort\s+([\d.]+)/i);
  if (header) {
    currentCohort = header[1];
    continue;
  }

  // Actual student name lives in the unlabeled column
  const name = String(row.__EMPTY).trim();
  if (!name) continue; // skip blank rows

  students.push({ ...row, Number: row.Name, Name: name, Cohort: currentCohort });
}

  students.sort((a, b) => a.Name.localeCompare(b.Name));
  renderStudents("all");
}

// "Neuha K." -> "NK", "Maria" -> "M", "???" -> ""
function getInitials(name) {
  const words = name
    .split(/\s+/)
    .map((w) => w.replace(/[^\p{L}]/gu, "")) // keep letters only
    .filter(Boolean);

  if (words.length === 0) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function renderStudents(cohort) {
  const list = document.getElementById("student-list");
  list.innerHTML = "";

  const filtered =
    cohort === "all"
      ? students
      : students.filter((s) => String(s.Cohort) === cohort);

  if (filtered.length === 0) {
    list.innerHTML =
      '<p class="empty-message">No students in this cohort yet.</p>';
    return;
  }

  filtered.forEach((student) => {
    const row = document.createElement("div");
    row.className = "student-row";
    row.dataset.index = students.indexOf(student);

    // Avatar: initials, or the star logo if no letters
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    const initials = getInitials(student.Name);
    if (initials) {
      avatar.textContent = initials;
    } else {
      avatar.textContent = "☆";
      avatar.classList.add("avatar-logo");
    }

    const name = document.createElement("span");
    name.className = "student-name";
    name.textContent = student.Name;

    // Controls on the right
    const controls = document.createElement("div");
    controls.className = "student-controls";
    const buttons = [
      ["edit", "✎", "Edit student"],
      ["email", "✉", "Email student"],
      ["remove", "✕", "Remove student"],
    ];
    for (const [action, icon, label] of buttons) {
      const btn = document.createElement("button");
      btn.className = "control-btn";
      btn.dataset.action = action;
      btn.textContent = icon;
      btn.title = label;
      btn.setAttribute("aria-label", label);
      controls.appendChild(btn);
    }

    row.append(avatar, name, controls);
    list.appendChild(row);
  });
}

// One listener handles every control button, including rows added later
document.getElementById("student-list").addEventListener("click", (e) => {
  const btn = e.target.closest(".control-btn");
  if (!btn) return;
  const student = students[btn.closest(".student-row").dataset.index];

  if (btn.dataset.action === "edit") {
    console.log("Edit", student); // hook up an edit form here
  } else if (btn.dataset.action === "email") {
    if (student["School Email"]) {
      window.location.href = `mailto:${student["School Email"]}`;
    }
  } else if (btn.dataset.action === "remove") {
    console.log("Remove", student); // hook up removal here
  }
});

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderStudents(btn.dataset.cohort);
  });
});

loadStudents();
