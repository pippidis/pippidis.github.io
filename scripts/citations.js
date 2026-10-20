/* Native <details> supplies disclosure semantics and keyboard support.
   Tabs follow the WAI-ARIA automatic-activation pattern: arrows, Home and End. */
(() => {
  async function copyCitation(button) {
    const panel = button.closest('.citation-format');
    const code = panel.querySelector('code');
    const status = panel.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(code.textContent);
      status.textContent = 'Copied.';
    } catch {
      // Clipboard permission can be denied or unavailable on non-HTTPS hosts.
      // Select the complete citation so a normal keyboard copy remains possible.
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
      code.closest('pre').focus();
      status.textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
    }
  }

  for (const content of document.querySelectorAll('.citation-content')) {
    const tabs = [...content.querySelectorAll('[role="tab"]')];
    const panels = [...content.querySelectorAll('.citation-format')];
    function activateTab(index, focus = true) {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      if (focus) tabs[index].focus();
    }
    tabs.forEach((tab, index) => {
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', tab.id);
      panels[index].querySelector('.citation-label').hidden = true;
      tab.addEventListener('click', () => activateTab(index));
      tab.addEventListener('keydown', (event) => {
        const targets = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 };
        if (event.key in targets) {
          event.preventDefault();
          activateTab(targets[event.key]);
        }
      });
    });
    for (const button of content.querySelectorAll('.copy-citation')) {
      button.hidden = false;
      button.addEventListener('click', () => copyCitation(button));
    }
    content.querySelector('.citation-tabs').hidden = false;
    content.classList.add('enhanced');
    activateTab(0, false);
  }
})();
