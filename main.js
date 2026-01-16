
const toggleBtn = document.getElementById('toggle-btn');
const closeBtn = document.getElementById('close-chat');
const chatContainer = document.getElementById('chatbot-container');

// Open Chat
toggleBtn.addEventListener('click', () => {
    chatContainer.classList.add('active');
    toggleBtn.style.display = 'none';
});

// Close Chat
closeBtn.addEventListener('click', () => {
    chatContainer.classList.remove('active');
    toggleBtn.style.display = 'flex';
});


/* ---------- INFINITE CONTINUOUS SCROLL ---------- */
const slider = document.querySelector('.gallery-track');
let scrollSpeed = 0.5;

slider.innerHTML += slider.innerHTML;
let scrollPos = 0;

function infiniteScroll() {
  scrollPos += scrollSpeed;
  if (scrollPos >= slider.scrollWidth / 2) {
    scrollPos = 0;
  }
  slider.style.transform = `translateX(${-scrollPos}px)`;
  requestAnimationFrame(infiniteScroll);
}
infiniteScroll();

/* ---------- DRAG SCROLL ---------- */
const container = document.querySelector('.gallery-slider');
let isDown = false;
let startX;
let scrollStart;

container.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollStart = scrollPos;
});
container.addEventListener('mouseleave', () => isDown = false);
container.addEventListener('mouseup', () => isDown = false);
container.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  scrollPos = scrollStart - (x - startX);
});

/* ---------- PROFILE IMAGE LOGIC ---------- */
const basePic = document.querySelector('.profile-pic.base');
const hoverPic = document.querySelector('.profile-pic.hover');

function updateProfileImages(theme) {
  if (!basePic || !hoverPic) return;

  if (theme === 'dark') {
    basePic.src = basePic.dataset.dark;
    hoverPic.src = basePic.dataset.darkHover;
  } else {
    basePic.src = basePic.dataset.light;
    hoverPic.src = basePic.dataset.lightHover;
  }
}

/* ---------- DARK / LIGHT THEME ---------- */
const toggle = document.querySelector('#dark-mode-toggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  if (theme === 'dark') {
    toggle.checked = true;
    document.body.classList.add('dark-mode');
  } else {
    toggle.checked = false;
    document.body.classList.remove('dark-mode');
  }

  updateProfileImages(theme);
  localStorage.setItem('theme', theme);
}

toggle.addEventListener('change', () => {
  applyTheme(toggle.checked ? 'dark' : 'light');
});


const charCount = document.getElementById('char-count');

input.addEventListener('input', () => {
  const length = input.value.length;
  charCount.textContent = `${length}/1000`;
});


// load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (savedTheme === "dark") toggle.checked = true;
}

// when user switches
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});









