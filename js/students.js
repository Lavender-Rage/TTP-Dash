let students = [];

async function loadStudents() {
  students = await loadStudentData();
  renderStudents("all");
  const requested = params.get("student");
  if (requested) {
    const match = students.find((s) => s.Name === requested);
    if (match) openStudentModal(match);
  }

  if (cohort || requested)
    history.replaceState(null, "", window.location.pathname);
}

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

    // const name = document.createElement("span");
    const name = document.createElement("button");
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

const requested = new URLSearchParams(window.location.search).get("student");
if (requested) {
  const match = students.find((s) => s.Name === requested);
  if (match) openStudentModal(match);
  history.replaceState(null, "", window.location.pathname); // tidy the address bar
}

// One listener handles every control button, including rows added later
document.getElementById("student-list").addEventListener("click", (e) => {
  const nameBtn = e.target.closest(".student-name");

  if (nameBtn) {
    const student = students[nameBtn.closest(".student-row").dataset.index];
    openStudentModal(student);
    return;
  }
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

// Student pop-up
const modal = document.getElementById("student-modal");
let currentStudent = null;

function setText(id, value) {
  document.getElementById(id).textContent = value ? String(value).trim() : "—";
}

function setEmail(id, address) {
  const el = document.getElementById(id);
  el.textContent = "";
  if (!address) {
    el.textContent = "—";
    return;
  }
  const link = document.createElement("a");
  link.href = `mailto:${address}`;
  link.textContent = address;
  el.appendChild(link);
}

function openStudentModal(student) {
  currentStudent = student;

  const avatar = document.getElementById("modal-avatar");
  const initials = getInitials(student.Name);
  avatar.textContent = initials || "☆";
  avatar.classList.toggle("avatar-logo", !initials);

  setText("modal-name", student.Name);
  setText("modal-major", student.Major);
  setText("modal-graduation", student.Graduation);
  setEmail("modal-school-email", student["School Email"]);
  setEmail("modal-personal-email", student["Personal Email"]);
  setText("modal-phone", student.Phone);
  setText("modal-notes", student.Notes || "No notes yet.");

  setInterviewProgress("tech", student["Technical Interviews"]);
  setInterviewProgress("behavior", student["Behavioral Interviews"]);
  setWork(student.Company, student.Years);

  modal.showModal();
}

// Close: ✕ button, clicking the dark backdrop, or pressing Esc (built in)
document
  .getElementById("modal-close")
  .addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close(); // clicked outside the white box
});

document.getElementById("modal-edit").addEventListener("click", () => {
  console.log("Edit", currentStudent); // hook up editing later
});

function setInterviewProgress(prefix, value) {
  const parsed = parseInt(value, 10);
  const hasValue = !isNaN(parsed);
  const count = hasValue ? Math.max(0, Math.min(3, parsed)) : 0;

  document.getElementById(`${prefix}-count`).textContent = hasValue
    ? count
    : "–";
  document.querySelectorAll(`#${prefix}-bar span`).forEach((segment, i) => {
    segment.classList.toggle("filled", i < count);
  });
}

function setWork(company, years) {
  const companyEl = document.getElementById("work-company");
  const yearsEl = document.getElementById("work-years");
  const name = company ? String(company).trim() : "";
  const yrs = parseFloat(years);

  companyEl.textContent = name || "None listed yet";
  yearsEl.textContent = !isNaN(yrs)
    ? `${yrs} ${yrs === 1 ? "year" : "years"}`
    : "";
}

loadStudents();
