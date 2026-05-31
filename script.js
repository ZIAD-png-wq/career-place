(function () {
  document.querySelectorAll('a.page-scroll[href*="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var href = this.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var instanceData = [
    { provider: 'AWS', name: 't3.micro', region: 'US-East', price: '$0.0104/hr' },
    { provider: 'AWS', name: 'm5.large', region: 'US-East', price: '$0.096/hr' },
    { provider: 'AWS', name: 'g4dn.xlarge', region: 'Asia-Pacific', price: '$0.526/hr' },
    { provider: 'GCP', name: 'e2-standard-2', region: 'US-East', price: '$0.067/hr' },
    { provider: 'GCP', name: 'n2-standard-4', region: 'EU-West', price: '$0.189/hr' },
    { provider: 'Azure', name: 'D2s v4', region: 'US-East', price: '$0.096/hr' }
  ];

  var heroSearchInput = document.getElementById('hero-search-input');
  var heroSearchBtn = document.getElementById('hero-search-btn');
  var heroSearchResults = document.getElementById('hero-search-results');

  function renderSearchResults(query) {
    if (!heroSearchResults) return;
    var trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      heroSearchResults.textContent = 'Enter an instance name to see matching cloud prices.';
      return;
    }

    var matches = instanceData.filter(function (instance) {
      return instance.name.toLowerCase().indexOf(trimmed) !== -1;
    });

    if (!matches.length) {
      heroSearchResults.textContent = 'No matching instances found. Try t3.micro, n2-standard-4, or D2s v4.';
      return;
    }

    heroSearchResults.innerHTML = '<strong>Search results:</strong><br>' + matches
      .map(function (instance) {
        return '<div style="margin-top:0.5rem;padding:0.75rem;border-radius:1rem;background:rgba(255,255,255,0.05);border:1px solid rgba(148,163,184,0.15);">' +
          '<strong>' + instance.name + '</strong> — ' + instance.provider + ' (' + instance.region + ') — ' + instance.price + '</div>';
      })
      .join('');
  }

  if (heroSearchBtn && heroSearchInput) {
    heroSearchBtn.addEventListener('click', function () {
      renderSearchResults(heroSearchInput.value);
    });

    heroSearchInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        renderSearchResults(heroSearchInput.value);
      }
    });
  }

  var contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      contactForm.reset();
      var success = document.getElementById('success');
      if (success) {
        success.textContent = 'Thank you! We will get back to you soon.';
      }
    });
  }
})();
