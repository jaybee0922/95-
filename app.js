const scrolling = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const [rightImage, leftImage] = [
      document.querySelector(".right-image"),
      document.querySelector(".left-image"),
    ];
    let lastScrollY = 0;

    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      const centerPosition = window.innerHeight / 2;
      const isScrollingDown = scrollPosition > lastScrollY;
      const isPastCenter = scrollPosition > centerPosition;

      rightImage.classList.toggle(
        "centered",
        isScrollingDown ? isPastCenter : !isPastCenter
      );
      leftImage.classList.toggle(
        "centered",
        isScrollingDown ? !isPastCenter : isPastCenter
      );

      lastScrollY = scrollPosition;
    });
  });
};

scrolling();

const body = document.querySelector("body");
const nav = document.querySelector("nav");
const modeToggle = document.querySelector(".dark-light");
const searchToggle = document.querySelector(".searchToggle");
const sidebarOpen = document.querySelector(".sidebarOpen");
const siderbarClose = document.querySelector(".siderbarClose");

let getMode = localStorage.getItem("mode");

const menu = document.querySelector("#menu");
const slides = document.querySelectorAll(".slideshow .slide-image");
let currentSlide = 0;

if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
}

modeToggle.addEventListener("click", () => {
  // const language = document.querySelector("#language");
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");
  // language.classList.add("language");

  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
  } else {
    localStorage.setItem("mode", "dark-mode");
  }
});

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

/*----------------language translate---------------*/
document.addEventListener("DOMContentLoaded", function () {
  translateText();
});

document.getElementById("language").addEventListener("change", function () {
  translateText();
});

async function translateText() {
  const selectedLanguage = document.getElementById("language").value;
  const elementsToTranslate = [
    { id: "home", text: "Home" },
    { id: "menu", text: "Food" },
    { id: "About", text: "About" },
    // slide shhow
    {
      id: "first-paragraph",
      text: " Food is more than just sustenance; it is an art form that transcends cultures and brings people together. The pleasure of eating food is in the subtle blend of flavors, the perfect balance of textures, and the harmonious combination of flavors that create a culinary masterpiece.",
    },
    { id: "first-title", text: "Plate Pleasure" },
    {
      id: "button-food",
      text: "Search",
    },

    // left image
    { id: "second-title", text: "Grilled Meat" },
    {
      id: "second-first-paragraph",
      text: "We specialize in authentic Southern cuisine, using only the finest ingredients to create delicious and mouth watering dishes.",
    },
    {
      id: "second-second-paragraph",
      text: "Our menu features a variety of delicious dishes, including ribs, brisket, and smothered pork chops, along with sides like mac and cheese and mashed potatoes.",
    },

    // button of left && right image
    { id: "second-button", text: "Read more" },

    // right image
    { id: "third-title", text: "Putchinta" },
    {
      id: "third-paragraph",
      text: "Filipino kakanin is a traditional dish from the Philippines that consists of cooked rice mixed with various ingredients.",
    },
    {
      id: "third-third-paragraph",
      text: " Puto cuchinta or kutsinta is a type of steamed rice cake found throughout the Philippines. ",
    },

    // Menu && Popular dishes
    { id: "menu-dishes", text: "Menu" },
    { id: "popular-dishes", text: "Popular Dishes" },
    {
      id: "popular-dishes-paragraph",
      text: "The Filipino cuisine is known for its rich and flavorful dishes that combine a mix of Asian, European, and African influences.",
    },

    // Burger
    { id: "burger", text: "Burger" },
    {
      id: "burger-paragraph",
      text: " Our burger is a perfect choice for any occasion, whether it's a quick lunch or a romantic dinner with your significant other.",
    },

    // Pizza
    { id: "pizza", text: "Pizza" },
    {
      id: "pizza-paragraph",
      text: "Our pizza is a perfect choice for any occasion, whether it's a quick lunch or a romantic dinner with your significant other.",
    },

    //Salad
    { id: "salad", text: "Salad" },
    {
      id: "salad-paragraph",
      text: "Our salad is made with organic ingredients and is served with a crisp dressing that will leave you wanting more.",
    },

    // Testimonials
    { id: "fifth-title", text: "Our Customer Reviews" },
    {
      id: "fifth-paragraph",
      text: "Our dining experience at this restaurant was truly exceptional. From the moment we walked in, we were greeted with warm hospitality and a welcoming atmosphere. ",
    },
    //First personal review
    { id: "first-person", text: "Ryan Azur" },
    {
      id: "first-review",
      text: "Each bite is a culinary delight, with flavors that leave you wanting more.",
    },
    { id: "date1", text: "November 7, 2023" },

    //Second personal review
    { id: "second-person", text: "Quez Fabela" },
    {
      id: "second-review",
      text: "The ambiance is warm and cozy, creating a welcoming atmosphere for dining.",
    },
    { id: "date2", text: "November 7, 2023" },

    // Third personal review
    { id: "third-person", text: "Lancelot Guinevere" },
    {
      id: "third-review",
      text: "The menu offers a variety of options, cater to all tastes and preferences.",
    },
    { id: "date3", text: "November 7, 2023" },

    // Popular dishes
    { id: "menu-title", text: "Menu" },

    { id: "menu-subtitle", text: "Popular Dishes" },
    {
      id: "menu-paragraph",
      text: "The Filipino cuisine is known for its rich and flavorful dishes that combine a mix of Asian, European, and African influences. The use of spices and herbs, along with fresh ingredients, results in a culinary experience that is both flavorful and satisfying.",
    },
    { id: "menu-burger", text: "Burger" },
    {
      id: "menu-burger-paragraph",
      text: "Our burger is a perfect choice for any occasion, whether it's a quick lunch or a romantic dinner with your significant other.",
    },
    { id: "menu-pizza", text: "Pizza" },
    {
      id: "menu-pizza-paragraph",
      text: "Our pizza is a perfect choice for any occasion, whether it's a quick lunch or a romantic dinner with your significant other.",
    },
    { id: "menu-salad", text: "Salad" },
    {
      id: "menu-salad-paragraph",
      text: "Our salad is made with organic ingredients and is served with a crisp dressing that will leave you wanting more.",
    },

    // Testimonials
    { id: "fifth-title", text: "Our Customer Reviews" },
    {
      id: "fifth-paragraph",
      text: "Our dining experience at this restaurant was truly exceptional. From the moment we walked in, we were greeted with warm hospitality and a welcoming atmosphere. ",
    },
    //First personal review
    { id: "first-person", text: "Ryan Azur" },
    {
      id: "first-review",
      text: "Each bite is a culinary delight, with flavors that leave you wanting more.",
    },
    { id: "date1", text: "November 7, 2023" },

    //Second personal review
    { id: "second-person", text: "Quez Fabela" },
    {
      id: "second-review",
      text: "The ambiance is warm and cozy, creating a welcoming atmosphere for domestics.",
    },
    { id: "date2", text: "November 7, 2023" },

    // Third personal review

    { id: "third-person", text: "Lancelot Guinevere" },
    {
      id: "third-review",
      text: "The menu offers a variety of options, cater to all tastes and preferences.",
    },
    { id: "date3", text: "November 7, 2023" },

    // Footer
    { id: "footer-title", text: "Plate Pleasure" },
    {
      id: "first-class-paragraph",
      text: "Food is a universal language that transcends borders and brings people together. It has the power to evoke memories, create moments of joy, and satisfy the soul.",
    },
    { id: "get-help", text: "Get Help" },
    { id: "status1", text: "FAQs" },
    { id: "status2", text: "Terms & Conditions" },
    { id: "status3", text: "Licensing" },
    { id: "status4", text: "Privacy Policy" },
    { id: "status5", text: "Contact Us" },
    { id: "footer-title", text: "Connect With Us" },
    { id: "footer-title", text: "Tropang SyntaxSculptor" },
    { id: "third-class-paragraph", text: "Created by: Cristel, Geoff" },
  ];

  for (const element of elementsToTranslate) {
    const elementNode = document.getElementById(element.id);
    if (elementNode) {
      if (selectedLanguage !== "en") {
        const textToTranslate = encodeURIComponent(element.text);
        // const apiUrl = `https://api.mymemory.translated.net/get?q=${textToTranslate}&langpair=en|${selectedLanguage}`;
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

  draw() {
    const { x, y, frame, spriteWidth, spriteHeight, image: img } = this;
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

// Define the display function
