/* Copy and navigation are separate actions: copying never leaves the archive. */
(() => {
  for (const button of document.querySelectorAll('.copy-doi')) {
    button.hidden = false;
    button.parentElement.querySelector('.doi-destination').textContent = '↗';
    button.addEventListener('click', async () => {
      const row = button.closest('.publication-row');
      const status = row.querySelector('.doi-status');
      const fallback = row.querySelector('.doi-fallback');
      try {
        await navigator.clipboard.writeText(button.dataset.doi);
        fallback.hidden = true;
        status.textContent = 'DOI copied.';
      } catch {
        fallback.value = button.dataset.doi;
        fallback.hidden = false;
        fallback.focus();
        fallback.select();
        status.textContent = 'DOI selected. Press Ctrl+C or ⌘C to copy.';
      }
    });
  }
})();
