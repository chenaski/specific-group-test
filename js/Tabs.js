export class Tabs {
  tabs = null;

  constructor(tabs) {
    this.tabs = tabs.reduce((acc, tab) => {
      const id = tab.dataset.target;
      const section = document.querySelector(`[data-id=${id}]`);
      return {
        ...acc,
        [id]: {
          tab,
          section,
        },
      };
    }, {});

    Object.entries(this.tabs).forEach(([id, { tab, section }]) => {
      if (!section || !tab) return;
      tab.addEventListener("click", () => {
        if (!section || !tab) return;
        this.hideAll();
        tab.dataset.active = "true";
        section.dataset.active = "true";
      });
    });
  }

  hideAll() {
    Object.entries(this.tabs).forEach(([id, { tab, section }]) => {
      if (!section || !tab) return;
      tab.dataset.active = "false";
      section.dataset.active = "false";
    });
  }
}
