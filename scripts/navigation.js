/* Navigation stays visible without JavaScript; small screens get a disclosure. */
(() => {
  const button = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('#main-navigation');
  const mobile = matchMedia('(max-width: 720px)');
  function setOpen(open) {
    navigation.hidden = mobile.matches && !open;
    button.setAttribute('aria-expanded', String(open));
    const label = open ? 'Close navigation' : 'Open navigation';
    button.setAttribute('aria-label', label);
    button.title = label;
  }
  function resize() {
    button.hidden = !mobile.matches;
    setOpen(false);
  }
  button.addEventListener('click', () => setOpen(navigation.hidden));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && !navigation.hidden) {
      setOpen(false);
      button.focus();
    }
  });
  mobile.addEventListener('change', resize);
  resize();
})();
