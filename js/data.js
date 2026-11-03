async function fetchStudentData() {
  const res = await fetch("data/masterCohortList.xlsx");
  if (!res.ok) throw new Error(`Could not load students.xlsx (${res.status})`);

  const buffer = await res.arrayBuffer();
  const workbook = XLSX.read(buffer);
  const sheet = workbook.Sheets["Master Distro"];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });

  const list = [];
  let currentCohort = null;

  for (const row of rows) {
    const firstCell = String(row.Name).trim();
    const nameCell = String(row.__EMPTY).trim();

    const header = (firstCell + " " + nameCell).match(/\bcohort\s*(\d+(?:\.\d+)?)/i);
    if (header && !/^\d+$/.test(firstCell)) {
      currentCohort = header[1];
      continue;
    }

    if (!nameCell) continue;
    list.push({ ...row, Number: row.Name, Name: nameCell, Cohort: currentCohort });
  }

  list.sort((a, b) => a.Name.localeCompare(b.Name));
  return list;
}

let studentDataPromise = null;

function loadStudentData() {
  if (!studentDataPromise) studentDataPromise = fetchStudentData();
  return studentDataPromise;
}

function normalize(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}