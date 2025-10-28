// Secure Netlify form bridge: only allows auto-submit from modal, not direct access
(function () {
  // Only allow auto-submit if special token is present in sessionStorage
  const token = sessionStorage.getItem('inquiry-bridge-token');
  if (!token) {
    document.body.innerHTML = '<div style="color:#fff;text-align:center;margin-top:4rem;font-size:1.5rem">Přístup zamítnut.</div>';
    return;
  }
  sessionStorage.removeItem('inquiry-bridge-token');

  // Fill form fields from sessionStorage
  const name = sessionStorage.getItem('inquiry-name') || '';
  const contact = sessionStorage.getItem('inquiry-contact') || '';
  const message = sessionStorage.getItem('inquiry-message') || '';
  document.querySelector('input[name="name"]').value = name;
  document.querySelector('input[name="contact"]').value = contact;
  document.querySelector('textarea[name="message"]').value = message;

  // Auto-submit the form
  setTimeout(() => {
    document.querySelector('form').submit();
  }, 100);
})();
