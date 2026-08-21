const authForm = document.querySelector('#login-form');
const modeTabs = document.querySelectorAll('.auth-tab');
const modeLabel = document.querySelector('#auth-mode-label');
const authTitle = document.querySelector('#auth-title');
const authSubtitle = document.querySelector('#auth-subtitle');
const submitLabel = document.querySelector('#submit-label');
const formMessage = document.querySelector('#form-message');
const nameField = document.querySelector('.auth-name-field');
const confirmField = document.querySelector('.auth-confirm-field');
let authMode = 'login';

function setMessage(message, isSuccess = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle('success', isSuccess);
}

function setMode(mode) {
  authMode = mode;
  const isSignup = mode === 'signup';
  modeTabs.forEach((tab) => { const active = tab.dataset.mode === mode; tab.classList.toggle('is-active', active); tab.setAttribute('aria-selected', String(active)); });
  modeLabel.textContent = isSignup ? 'Start growing with clarity' : 'Welcome back';
  authTitle.textContent = isSignup ? 'Create account' : 'Sign in';
  authSubtitle.textContent = isSignup ? 'Set up your secure farm workspace.' : 'Continue to your farm dashboard.';
  submitLabel.textContent = isSignup ? 'Create account' : 'Sign in';
  nameField.classList.toggle('is-hidden', !isSignup);
  confirmField.classList.toggle('is-hidden', !isSignup);
  nameField.querySelector('input').required = isSignup;
  confirmField.querySelector('input').required = isSignup;
  authForm.reset();
  setMessage('');
}

modeTabs.forEach((tab) => tab.addEventListener('click', () => setMode(tab.dataset.mode)));
document.querySelectorAll('.password-toggle').forEach((toggle) => toggle.addEventListener('click', () => { const input = toggle.previousElementSibling; const visible = input.type === 'text'; input.type = visible ? 'password' : 'text'; toggle.textContent = visible ? 'Show' : 'Hide'; toggle.setAttribute('aria-label', visible ? 'Show password' : 'Hide password'); }));
document.querySelectorAll('.provider-button').forEach((button) => button.addEventListener('click', () => setMessage(`${button.dataset.provider} sign-in will be connected when OAuth credentials are configured.`)));
document.querySelector('.link-button').addEventListener('click', () => setMessage('Enter your email address, then use the password reset flow when email delivery is connected.'));
authForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(authForm));
  if (!authForm.reportValidity()) return;
  if (authMode === 'signup' && data.password !== data.confirmPassword) { setMessage('Passwords do not match.'); return; }
  localStorage.setItem('mavunoSession', JSON.stringify({ email: data.email, fullName: data.fullName || 'Mavuno farmer', signedInAt: new Date().toISOString() }));
  setMessage(authMode === 'signup' ? 'Account created. Opening your dashboard...' : 'Signed in. Opening your dashboard...', true);
  window.setTimeout(() => { window.location.href = 'dashboard.html'; }, 450);
});