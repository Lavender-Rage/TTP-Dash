registerSearchSource({
  label: "Students",
  load: loadStudentData,
  text: (s) => s.Name,
  detail: (s) => (s.Cohort ? `Cohort ${s.Cohort}` : ""),
  select: (s) => {
    // On the Students page, open the pop-up directly.
    // On any other page, go to the Students page and open it there.
    if (typeof openStudentModal === "function") {
      openStudentModal(s);
    } else {
      window.location.href = `students.html?student=${encodeURIComponent(s.Name)}`;
    }
  },
});

// Later, for example:
// registerSearchSource({
//   label: "Jobs",
//   load: loadJobData,
//   text: j => j.Title,
//   detail: j => j.Company,
//   select: j => { window.location.href = `jobs.html?job=${encodeURIComponent(j.Title)}`; },
// });
