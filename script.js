/* ========== GENZ STUDIO — SHARED JAVASCRIPT ========== */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
  }, 2200);
});

/* ── PARTICLES ── */
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + .4;
      this.vx = (Math.random() - .5) * .45;
      this.vy = (Math.random() - .5) * .45;
      this.alpha = Math.random() * .55 + .1;
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx; this.y += this.vy; this.pulse += .02;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      const a = this.alpha * (.5 + .5 * Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,0,0,${a})`;
      ctx.shadowBlur = 6; ctx.shadowColor = '#FF0000';
      ctx.fill(); ctx.shadowBlur = 0;
    }
  }
  for (let i = 0; i < 75; i++) particles.push(new Particle());
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 115) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,0,0,${.07 * (1 - dist / 115)})`;
          ctx.lineWidth = .5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  const btn = document.getElementById('back-top');
  if (btn) btn.classList.toggle('show', window.scrollY > 300);
});

/* ── MOBILE MENU ── */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ── SCROLL REVEAL ── */
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 70);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: .07 });
  reveals.forEach(r => observer.observe(r));
});

/* ── BACK TO TOP ── */
function backToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* ── LIGHTBOX ── */
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  img.src = src;
  lb.classList.add('open');
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ── SLIDER (generic, call initSlider after DOM ready) ── */
function initSlider(trackId, dotsId, interval) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const imgs = track.querySelectorAll('img');
  const dotsEl = document.getElementById(dotsId);
  let current = 0, total = imgs.length, timer;
  if (dotsEl) {
    imgs.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'slider-dot' + (i === 0 ? ' active' : '');
      d.onclick = () => { go(i); resetTimer(); };
      dotsEl.appendChild(d);
    });
  }
  function go(n) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    if (dotsEl) dotsEl.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }
  function resetTimer() { clearInterval(timer); timer = setInterval(() => go(current + 1), interval || 3500); }
  resetTimer();
}

/* ── ORDER FORM ── */
function submitOrder() {
  const nama = (document.getElementById('f-nama') || {}).value?.trim();
  const tipe = (document.getElementById('f-tipe') || {}).value;
  const size = (document.getElementById('f-size') || {}).value;
  if (!nama || !tipe || !size) { alert('Mohon lengkapi semua field!'); return; }
  const msg = `Halo GENZ STUDIO,\nSaya ingin memesan map:\n\nNama: ${nama}\nTipe Map: ${tipe}\nUkuran: ${size}\n\nMohon info lebih lanjut.`;
  window.open(`https://wa.me/6285211080404?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ── LIVE CHAT MARQUEE ── */
function initLiveChat(containerId) {
  const track = document.getElementById(containerId);
  if (!track) return;
  const chats = [
    { name: 'RzxGamer', text: 'Bang hasil mapnya gila keren 🔥' },
    { name: 'DyxStudio', text: 'Trusted banget ini 💯' },
    { name: 'Naufal_RBX', text: 'Detail parah, worth it!' },
    { name: 'XyzPlayer', text: 'Fix langganan sih' },
    { name: 'AdiRoblox', text: 'Pelayanan super cepat' },
    { name: 'Viral_Map', text: 'Map gua jadi viral 🚀' },
    { name: 'GamingPro', text: 'Rekomen banget bro' },
    { name: 'ClientVIP', text: 'Admin ramah & fast respon' },
    { name: 'OrderBot', text: 'Hasil sesuai request 👍' },
    { name: 'TopClient', text: 'Kualitas premium bgt' },
    { name: 'SatisfiedX', text: 'Ga nyesel order disini' },
    { name: 'Keren99', text: 'Next order lagi ah' },
    { name: 'DevLvl99', text: 'Top tier developer!' },
    { name: 'BudgetUser', text: 'Harga masuk akal' },
    { name: 'MapFan', text: 'Sumpah hasilnya keren banget' }
  ];
  const colors = ['#FF0000', '#cc3300', '#ff3300', '#dd0000', '#ff6600', '#aa0000'];
  const initials = n => n.slice(0, 2).toUpperCase();
  let html = '';
  [...chats, ...chats].forEach((c, i) => {
    const color = colors[i % colors.length];
    html += `<div class="chat-bubble">
      <div class="chat-avatar" style="background:${color}">${initials(c.name)}</div>
      <div><div class="chat-name">${c.name}</div><div class="chat-text">${c.text}</div></div>
    </div>`;
  });
  track.innerHTML = html;
}
