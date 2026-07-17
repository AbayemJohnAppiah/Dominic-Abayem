(function () {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const pwInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const pwError = document.getElementById('passwordError');
  const toggleBtn = document.getElementById('togglePw');
  const submitBtn = document.getElementById('submitBtn');
  const successBox = document.getElementById('formSuccess');

  // Show / Hide Password
  toggleBtn.addEventListener('click', function () {
    const isVisible = pwInput.type === 'text';
    pwInput.type = isVisible ? 'password' : 'text';
    toggleBtn.classList.toggle('is-visible', !isVisible);
    toggleBtn.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
    pwInput.focus({ preventScroll: true });
  });

  // Validation Helpers
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function setFieldState(input, errorEl, valid) {
    input.classList.toggle('is-invalid', !valid);
    errorEl.classList.toggle('show', !valid);
  }

  function validateEmail() {
    const valid = isValidEmail(emailInput.value);
    setFieldState(emailInput, emailError, valid);
    return valid;
  }

  function validatePassword() {
    const valid = pwInput.value.length >= 6;
    setFieldState(pwInput, pwError, valid);
    return valid;
  }

  // Live validation
  emailInput.addEventListener('blur', validateEmail);
  pwInput.addEventListener('blur', validatePassword);
  emailInput.addEventListener('input', function () {
    if (emailInput.classList.contains('is-invalid')) validateEmail();
  });
  pwInput.addEventListener('input', function () {
    if (pwInput.classList.contains('is-invalid')) validatePassword();
  });

  // Submit — verify stored credentials and redirect to dashboard
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    successBox.classList.remove('show');

    const emailOk = validateEmail();
    const pwOk = validatePassword();

    if (!emailOk || !pwOk) {
      form.classList.remove('shake');
      void form.offsetWidth;
      form.classList.add('shake');
      (emailOk ? pwInput : emailInput).focus();
      return;
    }

    // Check against stored user in localStorage
    const storedUser = localStorage.getItem('fc_user');
    if (!storedUser) {
      // No account found — show failure
      emailInput.classList.add('is-invalid');
      emailError.classList.add('show');
      emailError.querySelector('.msg').textContent = 'No account found with this email. Please sign up first.';
      form.classList.remove('shake');
      void form.offsetWidth;
      form.classList.add('shake');
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.email !== emailInput.value.trim() || user.password !== pwInput.value) {
      // Wrong email or password
      emailInput.classList.add('is-invalid');
      emailError.classList.add('show');
      emailError.querySelector('.msg').textContent = 'Invalid email or password. Try again.';
      form.classList.remove('shake');
      void form.offsetWidth;
      form.classList.add('shake');
      return;
    }

    // Credentials match — simulate login
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    setTimeout(function () {
      localStorage.setItem('fc_logged_in', 'true');

      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      successBox.classList.add('show');
      form.reset();
      setFieldState(emailInput, emailError, true);
      setFieldState(pwInput, pwError, true);

      // Redirect to dashboard
      setTimeout(function () {
        window.location.href = 'dashboard.html';
      }, 600);
    }, 1100);
  });

  form.addEventListener('animationend', function (e) {
    if (e.animationName === 'shake') form.classList.remove('shake');
  });
})();

// Rotating testimonials on the brand panel
const testimonials = [
  {
    quote: "It feels like a shared house, not a social network. That difference is the whole point.",
    author: "Courage H. — Circle of 5, since 2026"
  },
  {
    quote: "We used to lose plans in a 400-message thread. Now the plan just... exists, and everyone can see it.",
    author: "Maxwell A. — Circle of 7, since 2026"
  },
  {
    quote: "No feed to scroll, no strangers to filter out. I open it, I see my actual friends, I close it.",
    author: "David A. — Circle of 9, since 2026"
  },
  {
    quote: "No ads, no strangers, just my closest friends.",
    author: "Cheryl D. — Circle of 4, since 2026"
  },
  {
    quote: "It feels more personal than any other social app.",
    author: "Gideon M. — Circle of 10, since 2023"
  },
  {
    quote: "Every conversation feels natural and private.",
    author: "Jessica A. — Circle of 3, since 2025"
  },
  {
    quote: "Talking here just feels easy and safe.",
    author: "Isaac A. — Circle of 2, since 2025"
  },
  {
    quote: "It's like chatting with someone who actually gets you.",
    author: "Habiba H — Circle of 8, since 2025"
  },
  {
    quote: "Every chat feels real, and it stays just between us.",
    author: "John A — Circle of 6, since 2025"
  },
  {
    quote: "Natural talks. Private space.",
    author: "Priscilla D — Circle of 1, since 2025"
  }
];

const quote = document.getElementById("quote");
const author = document.getElementById("author");

let current = 0;

function changeTestimonial() {
  current++;
  if (current >= testimonials.length) {
    current = 0;
  }
  quote.textContent = `"${testimonials[current].quote}"`;
  author.textContent = testimonials[current].author;
}

setInterval(changeTestimonial, 5000);
