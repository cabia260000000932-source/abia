// ---------- 1. Select elements ----------
const yearSpan = document.getElementById('year');
const themeBtn = document.getElementById('theme-btn');
const codeBlock = document.getElementById('code');
const form = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');

// ---------- 2. Footer year ----------
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ---------- 3. Dark mode (remembers your choice) ----------
function setTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  if (themeBtn) {
    themeBtn.textContent = isDark ? 'Light mode' : 'Dark mode';
    themeBtn.setAttribute('aria-pressed', String(isDark));
  }
  try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(saved ? saved === 'dark' : prefersDark);

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark-mode'));
  });
}

// ---------- 4. Typing effect in the hero code window ----------
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (codeBlock && !reduceMotion) {
  const fullText = codeBlock.textContent;
  codeBlock.textContent = '';
  codeBlock.classList.add('typing');
  let i = 0;

  const timer = setInterval(() => {
    codeBlock.textContent += fullText[i];
    i++;
    if (i >= fullText.length) {
      clearInterval(timer);
      codeBlock.classList.remove('typing');
    }
  }, 28);
}

// ---------- 5. Contact form (shows messages on the page, no alert) ----------
function showStatus(text, type) {
  statusMsg.textContent = text;
  statusMsg.className = type;
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = [form.name, form.email, form.message];
    fields.forEach((f) => f.classList.remove('invalid'));

    const empty = fields.find((f) => !f.value.trim());
    if (empty) {
      empty.classList.add('invalid');
      empty.focus();
      showStatus('Please fill in your ' + empty.name + '.', 'error');
      return;
    }

    if (!form.email.checkValidity()) {
      form.email.classList.add('invalid');
      form.email.focus();
      showStatus('Enter a valid email address, like name@example.com.', 'error');
      return;
    }

    // Demo only: nothing is sent yet. See the note below to connect a real service.
    showStatus('Thanks, ' + form.name.value.trim() + '! Your message is ready to send.', 'ok');
    form.reset();
  });
}
