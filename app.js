/*--------------------change theme variables--------------*/
const body = document.querySelector("body");
const nav = document.querySelector("nav");
const modeToggle = document.querySelector(".dark-light");
const searchToggle = document.querySelector(".searchToggle");
const sidebarOpen = document.querySelector(".sidebarOpen");
const siderbarClose = document.querySelector(".siderbarClose");

/*---------------local storage for change theme variable-------------*/
let getMode = localStorage.getItem("mode");

/*-------------navlink animation && slideShow variable--------*/
const menu = document.querySelector("#menu");
const slides = document.querySelectorAll(".slideshow .slide-image");
let currentSlide = 0;

/*-------------keep user selected mode even page refresh ----*/
if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
}

// js code to toggle dark and light mode
modeToggle.addEventListener("click", () => {
  const language = document.querySelector("#language");
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");
  language.classList.add("language");

  // js code to keep user selected mode even page refresh or file reopen
  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
  } else {
    localStorage.setItem("mode", "dark-mode");
  }
});

// js code to toggle search box
searchToggle.addEventListener("click", () => {
  searchToggle.classList.toggle("active");
});

//   js code to toggle sidebar
sidebarOpen.addEventListener("click", () => {
  nav.classList.add("active");
});
body.addEventListener("click", (e) => {
  let clickedElm = e.target;
  if (
    !clickedElm.classList.contains("sidebarOpen") &&
    !clickedElm.classList.contains("menu")
  ) {
    nav.classList.remove("active");
  }
});

/*----------------image slide show--------------*/

const slideShow = () => {
  let len = slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });
  currentSlide = (currentSlide + 1) % len;
};

setInterval(slideShow, 3000);

/*-------------navlink menu animation bouncing--------*/
const animationMenu = () => {
  requestAnimationFrame(() => {
    menu.classList.add("blink");
  });
};

setInterval(animationMenu, 1000);

/*----------------language translate---------------*/
document.addEventListener("DOMContentLoaded", function () {
  translateText(); // Translate on page load
});

// Automatically translate when language is changed
document.getElementById("language").addEventListener("change", function () {
  translateText();
});

async function translateText() {
  const selectedLanguage = document.getElementById("language").value;
  const elementsToTranslate = [
    { id: "home", text: "Home" },
    { id: "menu", text: "Menu" },
    { id: "contact", text: "Contact" },
    { id: "About", text: "About" },
  ];

  for (const element of elementsToTranslate) {
    const elementNode = document.getElementById(element.id);
    if (elementNode) {
      if (selectedLanguage !== "en") {
        const encodedText = encodeURIComponent(element.text);
        // const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${selectedLanguage}`;
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          if (data.responseData && data.responseData.translatedText) {
            elementNode.textContent = data.responseData.translatedText;
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        elementNode.textContent = element.text;
      }
    }
  }
}

/** @type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 1500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 50;
const enemiesArray = [];
let gameFrame = 0;

class enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy1.png";
    const { width, height } = canvas;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.width = this.height = 100;
    this.speed = Math.random() * 4 - 2;
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }

  update() {
    this.x += this.speed;
    this.y += this.speed;
    this.frame =
      gameFrame % 2 === 0 ? (this.frame > 4 ? 0 : this.frame + 1) : this.frame;
  }
  // update() {
  //   this.x += this.speed;
  //   this.y += this.speed;
  //   if (gameFrame % 2 === 0) {
  //     this.frame > 4 ? (this.frame = 0) : this.frame++;
  //   }
  // }

  draw() {
    const {
      x,
      y,
      width,
      height,
      frame,
      spriteWidth,
      spriteHeight,
      image: img,
    } = this;
    const sx = frame * spriteWidth;
    ctx.drawImage(img, sx, 0, spriteWidth, spriteHeight, x, y, 50, 50);
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new enemy());
}
console.log(enemiesArray);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();

// const sr = ScrollReveal({
//   origin: "top",
//   distance: "20px",
//   duration: 1500,
//   reset: true,
// });

// function translateText() {
//   const selectedLanguage = document.getElementById("language").value;

//   // Array of elements to translate
//   const elementsToTranslate = [
//     { id: "home", text: "Home" },
//     { id: "menu", text: "Menu" },
//     { id: "contact", text: "Contact" },
//     { id: "About", text: "About" },
//   ];

//   elementsToTranslate.forEach((element) => {
//     const elementNode = document.getElementById(element.id);
//     if (elementNode) {
//       // Check if the selected language is different from the current language
//       if (selectedLanguage !== "en") {
//         // Replace spaces with '%20' for URL encoding
//         const encodedText = encodeURIComponent(element.text);

//         // Construct the API URL with target language code
//         const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${selectedLanguage}`;

//         fetch(apiUrl)
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.responseData && data.responseData.translatedText) {
//               elementNode.textContent = data.responseData.translatedText;
//             }
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//           });
//       } else {
//         // If the selected language is English, no need to make a translation request
//         elementNode.textContent = element.text;
//       }
//     }
//   });
// }
