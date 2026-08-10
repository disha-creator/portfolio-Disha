// -----------------------------
// Typed text effect (roles)
// -----------------------------
const roles = [
  "Web Developer",
  "Python Developer",
  "Data Analyst",
  "Cyber Security",
  "Software Engineer",
  "Automation Enthusiast",
  " AI & ML Learner",
  "Open to Jobs & Internships"
];
const typedEl = document.getElementById('typed-line');
let rIndex = 0, chIndex = 0, typing = true;

function typeLoop() {
  const current = roles[rIndex];
  if (typing) {
    chIndex++;
    typedEl.textContent = current.slice(0, chIndex);
    if (chIndex === current.length) {
      typing = false;
      setTimeout(typeLoop, 900);
    } else setTimeout(typeLoop, 70);
  } else {
    chIndex--;
    typedEl.textContent = current.slice(0, chIndex);
    if (chIndex === 0) {
      typing = true;
      rIndex = (rIndex + 1) % roles.length;
      setTimeout(typeLoop, 200);
    } else setTimeout(typeLoop, 40);
  }
}
typeLoop();



const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;
window.addEventListener('resize', () => { 
  W = canvas.width = innerWidth; 
  H = canvas.height = innerHeight; 
});

const particles = [];
const pCount = Math.floor((W*H)/70000); // density
const palette = ["#ff7ac6","#6fe8ff","#c39bff","#ffcc4d","#7affc0"];

function rand(min,max){ return Math.random()*(max-min)+min; }
for(let i=0;i<pCount;i++){
  particles.push({
    x: rand(0,W), y: rand(0,H),
    r: rand(0.9,2.8),
    vx: rand(-0.25,0.25), vy: rand(-0.2,0.2),
    baseAlpha: rand(0.25,0.6),
    twinkle: rand(0,Math.PI*2),
    twinkleSpeed: rand(0.01,0.03),
    color: palette[Math.floor(rand(0,palette.length))]
  });
}
function drawParticles(){
  ctx.clearRect(0,0,W,H);
  for(const p of particles){
    p.x += p.vx; p.y += p.vy;
    p.twinkle += p.twinkleSpeed;
    if (p.x < -10) p.x = W + 10;
    if (p.x > W +10) p.x = -10;
    if (p.y < -10) p.y = H + 10;
    if (p.y > H +10) p.y = -10;

    const alpha = p.baseAlpha * (0.5 + 0.5*Math.sin(p.twinkle));
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.shadowBlur = 8;
    ctx.shadowColor = p.color;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();


const obs = new IntersectionObserver((entries) => {
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('visible');
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));



const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-links a");

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const secTop = sec.offsetTop - 120;
    if (pageYOffset >= secTop) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


// -----------------------------
// Card tilt effect (hover)
// -----------------------------
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width/2;
    const centerY = rect.height/2;
    const rotateX = ((y - centerY) / 20).toFixed(2);
    const rotateY = ((centerX - x) / 20).toFixed(2);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});


// -----------------------------
// Print resume button (agar page me #printBtn ho to hi)
// -----------------------------
const printBtn = document.getElementById('printBtn');
if (printBtn) {
  printBtn.addEventListener('click', () => window.print());
}


// -----------------------------
// Sticky Navbar
// -----------------------------
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  if(window.scrollY > 20){
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});










