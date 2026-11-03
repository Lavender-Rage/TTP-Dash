const searchSources = [];

function registerSearchSource(source) {
  searchSources.push(source);
}

(function setupGlobalSearch() {
  const input = document.getElementById("global-search");
  const panel = document.getElementById("search-results");
  if (!input || !panel) return;

  let results = []; // flat list of { source, item, el }
  let activeIndex = -1;
  let timer;

  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(runSearch, 120); // wait for a pause in typing
  });

  async function runSearch() {
    const term = normalize(input.value);
    if (!term) {
      closePanel();
      return;
    }

    const groups = await Promise.all(
      searchSources.map(async (source) => {
        try {
          const data = await source.load();
          const matches = data
            .filter((item) => normalize(source.text(item)).includes(term))
            .slice(0, source.limit || 6);
          return { source, matches };
        } catch (err) {
          console.error(`Search source "${source.label}" failed:`, err);
          return { source, matches: [] };
        }
      }),
    );

    if (normalize(input.value) !== term) return; // user kept typing; skip stale results
    render(groups, input.value.trim());
  }

  function render(groups, rawTerm) {
    panel.innerHTML = "";
    results = [];
    activeIndex = -1;

    const withMatches = groups.filter((g) => g.matches.length);
    if (withMatches.length === 0) {
      const empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = `No results for "${rawTerm}".`;
      panel.appendChild(empty);
    }

    for (const { source, matches } of withMatches) {
      const heading = document.createElement("p");
      heading.className = "search-group";
      heading.textContent = source.label;
      panel.appendChild(heading);

      for (const item of matches) {
        const index = results.length;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "search-item";
        btn.id = `search-option-${index}`;
        btn.setAttribute("role", "option");

        const title = document.createElement("span");
        title.className = "search-item__title";
        title.textContent = source.text(item);
        btn.appendChild(title);

        const detail = source.detail ? source.detail(item) : "";
        if (detail) {
          const d = document.createElement("span");
          d.className = "search-item__detail";
          d.textContent = detail;
          btn.appendChild(d);
        }

        btn.addEventListener("click", () => choose(index));
        results.push({ source, item, el: btn });
        panel.appendChild(btn);
      }
    }
    openPanel();
  }

  function choose(index) {
    const { source, item } = results[index];
    closePanel();
    input.value = "";
    source.select(item);
  }

  function highlight(index) {
    activeIndex = index;
    results.forEach((r, i) => r.el.setAttribute("aria-selected", i === index));
    results[index].el.scrollIntoView({ block: "nearest" });
    input.setAttribute("aria-activedescendant", results[index].el.id);
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" && results.length) {
      e.preventDefault();
      highlight((activeIndex + 1) % results.length);
    } else if (e.key === "ArrowUp" && results.length) {
      e.preventDefault();
      highlight((activeIndex - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && results.length) {
      e.preventDefault();
      choose(activeIndex >= 0 ? activeIndex : 0);
    } else if (e.key === "Escape") {
      closePanel();
    }
  });

  // Close when clicking anywhere outside the search area
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".global-search")) closePanel();
  });

  // Press "/" anywhere on the page to jump to the search bar
  document.addEventListener("keydown", (e) => {
    const typing = ["INPUT", "TEXTAREA"].includes(
      document.activeElement.tagName,
    );
    if (e.key === "/" && !typing) {
      e.preventDefault();
      input.focus();
    }
  });

  function openPanel() {
    panel.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }
  function closePanel() {
    panel.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
  }
})();
