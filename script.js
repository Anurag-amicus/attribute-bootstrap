document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const mobileSidebarToggle = document.getElementById("mobileSidebarToggle");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");

  // Desktop sidebar toggle (Collapse / Expand width)
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed");
    });
  }

  // Mobile sidebar toggle (Slide in drawer)
  if (mobileSidebarToggle && sidebar) {
    mobileSidebarToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      sidebar.classList.add("show");
      if (sidebarBackdrop) sidebarBackdrop.classList.add("show");
    });
  }

  // Close mobile sidebar on backdrop click
  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener("click", function () {
      if (sidebar) sidebar.classList.remove("show");
      sidebarBackdrop.classList.remove("show");
    });
  }

  // Accordion Icon Toggle logic
  const accordionButtons = document.querySelectorAll(".accordion-toggle-btn");

  // Initial setup of icons based on 'collapsed' class presence
  accordionButtons.forEach((button) => {
    const target = document.querySelector(button.dataset.bsTarget);
    const icon = button.querySelector(".accordion-icon");

    if (!target || !icon) return;

    if (target.classList.contains("show")) {
      icon.classList.remove("fa-circle-plus");
      icon.classList.add("fa-circle-minus");
      button.setAttribute("aria-expanded", "true");
    } else {
      icon.classList.remove("fa-circle-minus");
      icon.classList.add("fa-circle-plus");
      button.setAttribute("aria-expanded", "false");
    }
  });

  // Listen to bootstrap collapse events to handle "Expand All" / "Collapse All" sync and manual clicks
  const accordionItems = document.querySelectorAll(".accordion-collapse");
  accordionItems.forEach((item) => {
    item.addEventListener("show.bs.collapse", function () {
      const btn = document.querySelector(
        `.accordion-toggle-btn[data-bs-target="#${this.id}"]`,
      );
      if (!btn) return;

      btn.setAttribute("aria-expanded", "true");

      const icon = btn.querySelector(".accordion-icon");
      icon.classList.replace("fa-circle-plus", "fa-circle-minus");
    });

    item.addEventListener("hide.bs.collapse", function () {
      const btn = document.querySelector(
        `.accordion-toggle-btn[data-bs-target="#${this.id}"]`,
      );
      if (!btn) return;

      btn.setAttribute("aria-expanded", "false");

      const icon = btn.querySelector(".accordion-icon");
      icon.classList.replace("fa-circle-minus", "fa-circle-plus");
    });
  });

  // Expand All / Collapse All functionality
  const expandAllBtn = document.getElementById("expandAllBtn");
  const collapseAllBtn = document.getElementById("collapseAllBtn");

  if (expandAllBtn) {
    expandAllBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const collapses = document.querySelectorAll(".accordion-collapse");
      collapses.forEach((collapse) => {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapse, {
          toggle: false,
        });
        bsCollapse.show();
      });
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const collapses = document.querySelectorAll(".accordion-collapse");
      collapses.forEach((collapse) => {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapse, {
          toggle: false,
        });
        bsCollapse.hide();
      });
    });
  }
});
