const credentials = {
  appId: "a0c3cbeb",
  appKey: "36cbad88ec06f8c067f394ba755ee69d",
};

const myFirst = credentials.appId;
const mySecond = credentials.appKey;

const foodCardsContainer = document.getElementById("foodCardsContainer");
const searchInput = document.getElementById("foodSearchInput");
const searchButton = document.getElementById("searchButton");
const modal = document.getElementById("myModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalRecipe = document.getElementById("modalRecipe");
const closeModal = document.getElementById("closeModal");
const loadMoreButton = document.getElementById("loadMoreButton");
let myPage = 1;

const createApiEndpoint = (query) => {
  return (
    `https://api.edamam.com/search?q=${query}` +
    `&app_id=${myFirst}&app_key=${mySecond}` +
    `&from=${(myPage - 1) * 4}&to=${myPage * 4}`
  );
};

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    loadMoreButton.style.display = "block";
    clearFoodCards();
    fetchFoodData(query);

    history.pushState({ query: query }, "Search Results", `?q=${query}`);
  }
});

const urlSearchParams = new URLSearchParams(window.location.search);
const searchQuery = urlSearchParams.get("q");

if (searchQuery) {
  searchInput.value = searchQuery;
  searchButton.click();
}

loadMoreButton.addEventListener("click", () => {
  myPage++;
  const query = searchInput.value.trim();
  if (query) {
    fetchFoodData(query);
  }
});

const clearFoodCards = () => {
  foodCardsContainer.innerHTML = "";
};

const fetchFoodData = (query) => {
  const resultsDiv = createResultsDiv();
  const apiEndpoint = createApiEndpoint(query);

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      const hits = data.hits;
      hits.forEach((hit) => {
        const { recipe } = hit;
        const { image, label, ingredientLines } = recipe;
        const foodCard = createFoodCard(image, label, ingredientLines);
        resultsDiv.appendChild(foodCard);
      });
      updateUI(resultsDiv, hits);
    })
    .catch((error) => console.error("Error fetching data: ", error));
};

const createResultsDiv = () => {
  const resultsDiv = document.createElement("div");
  resultsDiv.className = "food-cards";
  resultsDiv.id = `foodCardsPage${myPage}`;
  resultsDiv.style.display = "none";
  foodCardsContainer.appendChild(resultsDiv);
  return resultsDiv;
};

const createFoodCard = (image, label, ingredients) => {
  const card = document.createElement("div");
  card.className = "food-card";
  const img = document.createElement("img");
  img.src = image;
  const title = createTitleElement(label);
  const desc = document.createElement("p");
  desc.className = "description";
  const recipe = createRecipeElement();
  card.append(img, title, desc, recipe);

  card.onclick = () => {
    modal.style.display = "block";
    modalTitle.innerText = label;
    modalDescription.innerText = `Ingredients: ${ingredients.join(", ")}`;
  };

  return card;
};

const createTitleElement = (label) => {
  return Object.assign(document.createElement("h5"), {
    innerText: label,
    style: {
      marginTop: "15px",
      backgroundColor: "#ff6700",
      color: "white",
      padding: "15px",
    },
  });
};

const createRecipeElement = () => {
  return Object.assign(document.createElement("p"), {
    className: "recipe",
    innerHTML: `<a href="#">View Recipe</a>`,
  });
};

const updateUI = (resultsDiv, hits) => {
  resultsDiv.style.display = hits.length ? "flex" : "none";
  loadMoreButton.style.display = hits.length < 4 ? "none" : "block";
};

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
