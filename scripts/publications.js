/* Search is progressive enhancement: all records and citations exist in HTML. */
(() => {
  const toolbar = document.querySelector('.archive-tools');
  if (!toolbar) return;

  const search = document.querySelector('#publication-search');
  const type = document.querySelector('#publication-type');
  const rows = [...document.querySelectorAll('.publication-row')];
  const groups = [...document.querySelectorAll('[data-publication-group]')];
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#empty-results');
  const normalize = (text) => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  const searchable = new Map(rows.map((row) => [row, normalize(row.dataset.search)]));

  function updateResults() {
    const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const row of rows) {
      const matchesType = type.value === 'all' || row.dataset.group === type.value;
      row.hidden = !(matchesType && terms.every((term) => searchable.get(row).includes(term)));
      if (!row.hidden) visible += 1;
    }
    for (const group of groups) {
      const hasResults = [...group.querySelectorAll('.publication-row')].some((row) => !row.hidden);
      const isEmptyDefault = !terms.length && type.value === 'all' && group.querySelector('.empty-group');
      group.hidden = !hasResults && !isEmptyDefault;
    }
    count.textContent = `${visible} of ${rows.length} works`;
    empty.hidden = visible !== 0;
  }

  search.addEventListener('input', updateResults);
  type.addEventListener('change', updateResults);
  toolbar.hidden = false;
  updateResults();
})();
