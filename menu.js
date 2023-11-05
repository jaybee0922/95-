// let page = 1;
// const resultsPerPage = 4;

// document.getElementById("searchButton").addEventListener("click", function () {
//   page = 1;
//   const foodInput = document.getElementById("foodInput").value;
//   searchFood(foodInput, page);
//   document.getElementById("loadMoreButton").style.display = "block";
// });

// document
//   .getElementById("loadMoreButton")
//   .addEventListener("click", function () {
//     const foodInput = document.getElementById("foodInput").value;
//     page++;
//     searchFood(foodInput, page);
//   });

// function searchFood(query, page) {
//   const appId = "a0c3cbeb";
//   const appKey = "36cbad88ec06f8c067f394ba755ee69d";
//   const resultsDiv = document.getElementById("results");

//   if (page === 1) {
//     resultsDiv.innerHTML = ""; // Clear previous results only when it's the first page
//   }

//   const rowContainer = document.createElement("div"); // Create a new container for each row
//   rowContainer.className = "row-container"; // Add a class for styling

//   const from = (page - 1) * resultsPerPage;
//   const to = page * resultsPerPage;

//   fetch(
//     `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const hits = data.hits;

//       hits.forEach((hit) => {
//         const foodItem = hit.recipe;
//         const foodImage = foodItem.image;
//         const foodLabel = foodItem.label;
//         const foodDescription = foodItem.source;

//         const foodCard = document.createElement("div");
//         foodCard.className = "food-card";
//         foodCard.classList.add("show");

//         const imageElement = document.createElement("img");
//         imageElement.className = "food-image";
//         imageElement.src = foodImage;

//         const titleElement = document.createElement("h2");
//         titleElement.innerText = foodLabel;

//         const descriptionElement = document.createElement("p");
//         descriptionElement.innerText = foodDescription;

//         foodCard.appendChild(imageElement);
//         foodCard.appendChild(titleElement);
//         foodCard.appendChild(descriptionElement);

//         rowContainer.appendChild(foodCard); // Add the food card to the row container
//       });

//       resultsDiv.appendChild(rowContainer); // Add the row container to the results div
//     })
//     .catch((error) => {
//       console.error("Error fetching data: ", error);
//     });
// }

const app_id = "a0c3cbeb";
const app_key = "36cbad88ec06f8c067f394ba755ee69d";

const foodCardsContainer = document.getElementById("foodCardsContainer");
const searchInput = document.getElementById("foodSearchInput");
const searchButton = document.getElementById("searchButton");
const modal = document.getElementById("myModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalRecipe = document.getElementById("modalRecipe");
const closeModal = document.getElementById("closeModal");
const loadMoreButton = document.getElementById("loadMoreButton");
let page = 1;

searchButton.addEventListener("click", () => {
  page = 1;
  const query = searchInput.value.trim();
  if (query) {
    loadMoreButton.style.display = "block"; // Show "Load More" button
    fetchFoodData(query);
    // Update the URL with the search query
    history.pushState({ query: query }, "Search Results", `?q=${query}`);
  }
});

// Check if the URL has a search query on page load
const urlSearchParams = new URLSearchParams(window.location.search);
const searchQuery = urlSearchParams.get("q");

if (searchQuery) {
  searchInput.value = searchQuery;
  searchButton.click();
}

loadMoreButton.addEventListener("click", () => {
  page++;
  const query = searchInput.value.trim();
  if (query) {
    fetchFoodData(query);
  }
});

function fetchFoodData(query) {
  const resultsDiv = document.createElement("div");

  resultsDiv.className = "food-cards";
  resultsDiv.id = "foodCardsPage" + page;

  resultsDiv.style.display = "none";

  foodCardsContainer.appendChild(resultsDiv);

  const apiEndpoint = `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}&from=${
    (page - 1) * 4
  }&to=${page * 4}`;

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      const hits = data.hits;

      hits.forEach((hit) => {
        const foodItem = hit.recipe;
        const foodImage = foodItem.image;
        const foodLabel = foodItem.label;
        const foodDescription = foodItem.ingredientLines.join(", ");
        // const foodRecipe = foodItem.url;

        const foodCard = document.createElement("div");
        foodCard.className = "food-card";

        const imageElement = document.createElement("img");
        imageElement.src = foodImage;

        const titleElement = document.createElement("h2");
        titleElement.innerText = foodLabel;

        const descriptionElement = document.createElement("p");
        descriptionElement.className = "description";
        //   descriptionElement.innerText = "Ingredients: " + foodDescription;

        const recipeElement = document.createElement("p");
        recipeElement.className = "recipe";
        recipeElement.innerHTML = `<a href="#">View Recipe</a>`;

        foodCard.appendChild(imageElement);
        foodCard.appendChild(titleElement);
        foodCard.appendChild(descriptionElement);
        foodCard.appendChild(recipeElement);

        // Open the modal when a food card is clicked
        foodCard.addEventListener("click", () => {
          modal.style.display = "block";
          modalTitle.innerText = foodLabel;
          modalDescription.innerText = "Ingredients: " + foodDescription;
        });

        resultsDiv.appendChild(foodCard);
      });

      resultsDiv.style.display = "flex";

      if (hits.length < 4) {
        loadMoreButton.style.display = "none"; // Hide "Load More" button when no more results
      }
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
