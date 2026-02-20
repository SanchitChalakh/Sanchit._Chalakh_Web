const body = document.body;

/* Auto Theme */
window.addEventListener("DOMContentLoaded", () => {

  const savedTheme = localStorage.getItem("theme");

  if(savedTheme){
    body.classList.toggle("light", savedTheme === "light");
  }else{
    const hour = new Date().getHours();
    if(hour >= 7 && hour <= 18){
      body.classList.add("light");
    }
  }

});

/* Toggle */
function toggleMode(){
  body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    body.classList.contains("light") ? "light" : "dark"
  );
}

/* Scroll Progress */
const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / height) * 100;
  progressBar.style.width = progress + "%";
});

/* Music */
const music = document.getElementById("bgMusic");
let isPlaying = false;

function toggleMusic(){
  if(!isPlaying){
    music.play();
    isPlaying = true;
    localStorage.setItem("music","on");
  }else{
    music.pause();
    isPlaying = false;
    localStorage.setItem("music","off");
  }
}

window.addEventListener("DOMContentLoaded",()=>{
  if(localStorage.getItem("music")==="on"){
    music.play();
    isPlaying = true;
  }
});

/* Typing */
const typing = document.getElementById("typing");
const roles=["Student","Tech Learner","Future Developer"];
let r=0,i=0;

function type(){
  if(i<roles[r].length){
    typing.textContent+=roles[r][i++];
    setTimeout(type,90);
  }else{
    setTimeout(()=>{
      typing.textContent="";
      i=0;
      r=(r+1)%roles.length;
      type();
    },1200);
  }
}
type();

/* 3D Tilt */
const cards = document.querySelectorAll(".card-btn");

cards.forEach(card=>{
  card.addEventListener("mousemove", (e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / 10) * -1;
    const rotateY = (x - centerX) / 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", ()=>{
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});

/* Particles */
const c=document.getElementById("particles");
const ctx=c.getContext("2d");

function resize(){
  c.width=innerWidth;
  c.height=innerHeight;
}
resize();
window.addEventListener("resize",resize);

let dots=Array.from({length:80},()=>({
  x:Math.random()*c.width,
  y:Math.random()*c.height,
  vx:(Math.random()-.5)*0.8,
  vy:(Math.random()-.5)*0.8
}));

function animate(){
  ctx.clearRect(0,0,c.width,c.height);
  dots.forEach(d=>{
    ctx.fillStyle="rgba(0,242,255,0.7)";
    ctx.fillRect(d.x,d.y,2,2);
    d.x+=d.vx; 
    d.y+=d.vy;
    if(d.x<0||d.x>c.width)d.vx*=-1;
    if(d.y<0||d.y>c.height)d.vy*=-1;
  });
  requestAnimationFrame(animate);
}
animate();
