(function () {
  const form = document.getElementById('signupForm');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const pwInput = document.getElementById('password');
  const usernameError = document.getElementById('usernameError');
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

  function validateUsername() {
    const valid = usernameInput.value.trim().length >= 3;
    setFieldState(usernameInput, usernameError, valid);
    return valid;
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

  // Live Validation
  usernameInput.addEventListener('blur', validateUsername);
  emailInput.addEventListener('blur', validateEmail);
  pwInput.addEventListener('blur', validatePassword);

  usernameInput.addEventListener('input', function () {
    if (usernameInput.classList.contains('is-invalid')) validateUsername();
  });

  emailInput.addEventListener('input', function () {
    if (emailInput.classList.contains('is-invalid')) validateEmail();
  });

  pwInput.addEventListener('input', function () {
    if (pwInput.classList.contains('is-invalid')) validatePassword();
  });

  // Submit — store user in localStorage and redirect to dashboard
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    successBox.classList.remove('show');

    const usernameOk = validateUsername();
    const emailOk = validateEmail();
    const pwOk = validatePassword();

    if (!usernameOk || !emailOk || !pwOk) {
      form.classList.remove('shake');
      void form.offsetWidth;
      form.classList.add('shake');

      if (!usernameOk) {
        usernameInput.focus();
      } else if (!emailOk) {
        emailInput.focus();
      } else {
        pwInput.focus();
      }
      return;
    }

    // Simulate account creation
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    setTimeout(function () {
      // Persist user data to localStorage
      localStorage.setItem('fc_user', JSON.stringify({
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        password: pwInput.value
      }));
      localStorage.setItem('fc_logged_in', 'true');

      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      successBox.classList.add('show');

      // Redirect to dashboard after a brief pause
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
