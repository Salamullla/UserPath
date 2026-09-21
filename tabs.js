(() => {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  function activate(id, focus = false) {
    const previous = document.querySelector('[role="tabpanel"]:not([hidden])');
    const nextPanel = document.getElementById(id);
    const previousHeight = previous ? previous.offsetHeight : 0;
    if (previous !== nextPanel) document.dispatchEvent(new CustomEvent('offerings-before', {detail:{previous, nextPanel, previousHeight}}));
    tabs.forEach(tab => {
      const active = tab.getAttribute('aria-controls') === id;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
      if (active && focus) tab.focus();
    });
    document.dispatchEvent(new CustomEvent('offerings-change', {detail:{changed:previous !== nextPanel, nextPanel, previousHeight}}));
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.getAttribute('aria-controls')));
    tab.addEventListener('keydown', event => {
      const rtl = document.documentElement.dir === 'rtl';
      let next;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (event.key === 'ArrowRight') next = (index + (rtl ? -1 : 1) + tabs.length) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + (rtl ? 1 : -1) + tabs.length) % tabs.length;
      if (next === undefined) return;
      event.preventDefault();
      activate(tabs[next].getAttribute('aria-controls'), true);
    });
  });
  function followHash() {
    const id = location.hash.slice(1);
    if (id === 'services' || id === 'training' || id === 'about' || id === 'programmes') {
      activate(id === 'services' ? 'services' : 'training');
    }
  }
  document.querySelectorAll('a[href="#services"],a[href="#training"]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const id = link.hash.slice(1);
      activate(id);
      history.replaceState(null, '', '#' + id);
      document.getElementById('offerings').scrollIntoView({block:'start'});
    });
  });
  window.addEventListener('hashchange', followHash);
  followHash();
})();
