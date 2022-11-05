import "./styles.css";
import {
  fetchedIngredients,
  fetchedRecipes,
  fetchedUsers,
  postData,
} from "./apiCalls";
import "./images/turing-logo.png";
import Recipe from "./classes/Recipe";
import RecipeRepository from "./classes/RecipeRepository";
import UserRepo from "./classes/UserRepo";
import User from "./classes/User";
import UserList from "./classes/UserList";
import UserPantry from "./classes/UserPantry";

let usersData,
  recipeRepository,
  currentUser,
  userRepo,
  userList,
  userPantry,
  ingredientsData,
  recipesData;

//query selectors go here
//pages
const homePage = document.querySelector(".home-page");
const allRecipesPage = document.querySelector(".all-recipes-page");
const currentRecipePage = document.querySelector(".current-recipe");
const savedRecipePage = document.querySelector(".saved-recipes-page");
//containers
const allRecipesContainer = document.querySelector("#all-recipes-container");
const currentRecipeContainer = document.querySelector("#current-recipe-id");
const savedRecipeContainer = document.querySelector(
  "#saved-recipe-card-container"
);
const myPantry = document.querySelector(".my-pantry-list");
const pantryContainer = document.querySelector("#my-pantry-container");
const headerTitle = document.querySelector(".header-title");
//button
const homeButton = document.querySelector(".return-home");
const recipesButton = document.querySelector(".all-recipes-button");
const allSearchButtons = document.querySelectorAll(".search-button");
const myRecipesButton = document.querySelector(".my-recipes-button");
const myPantryButton = document.querySelector("#my-pantry-button");
//filters
const allTagSelect = document.querySelector("#all-tag-select");
const userTagSelect = document.querySelector("#user-tag-select");
const userSearchForm = document.querySelector(".user-search-bar");
const allSearchForm = document.querySelector(".all-search-bar");

const allImages = document.querySelectorAll(".image");
const allMiniImages = document.querySelectorAll(".mini-image");

//event listeners go here
window.addEventListener("load", getAllData);
recipesButton.addEventListener("click", renderAllRecipesPage);
homeButton.addEventListener("click", returnHome);
myRecipesButton.addEventListener("click", viewMyRecipes);
myPantryButton.addEventListener("click", showUserPantry);

allImages.forEach((image) => {
  image.addEventListener("click", seeRecipe);
});
allImages.forEach((image) => {
  image.addEventListener("keypress", seeRecipe);
});
allMiniImages.forEach((image) => {
  image.addEventListener("click", seeRecipe);
});
allMiniImages.forEach((image) => {
  image.addEventListener("keypress", seeRecipe);
});

allSearchButtons.forEach((button) => {
  button.addEventListener("click", searchForRecipes);
});

allTagSelect.addEventListener("change", searchAllRecipesByTag);
userTagSelect.addEventListener("change", searchUserRecipesByTag);
// addInfoButton.addEventListener("click", updateInfo)
// removeInfoButton.addEventListener("click", updateInfo)
/*
What->
get data from apiCalls
instantiate classes
update the DOM

How->
create functions for each fetch call
 that invokes each fetch call
 then turns that returned value into an instance of that class
seperate getData function logic into smaller functions
*/
//event handlers go here

function getAllData() {
  Promise.all([fetchedUsers, fetchedRecipes, fetchedIngredients])
    .then((data) => {
      usersData = data[0];
      recipesData = data[1];
      ingredientsData = data[2];
      const allRecipes = recipesData
        .map((recipe) => {
          const newRecipe = new Recipe(recipe);
          newRecipe.retrieveIngredients(ingredientsData);
          return newRecipe;
        })
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });

      recipeRepository = new RecipeRepository(allRecipes);
      userRepo = new UserRepo(usersData);

      renderTags();
      getUser();
      userPantry.retrieveIngredients(ingredientsData);
    })
    .catch((err) => console.log(err));
}

//----Post Event Handler
function updateInfo() {
  postData().then(() => {
    getUsersData().then((fetchedUsers) => {
      console.log("We Have Users!", fetchedUsers);
      renderPage();
    });
  });
}

function renderTags() {
  const tags = recipeRepository.getAllTags();
  tags.forEach((tag) => {
    allTagSelect.innerHTML += `<option value="${tag}">${tag}</option>`;
    userTagSelect.innerHTML += `<option value="${tag}">${tag}</option>`;
  });
}

function searchAllRecipesByTag(event) {
  const tagValue = event.target.value;
  const filteredRecipes = recipeRepository.filterByTag(tagValue);
  viewAllRecipes(filteredRecipes);
}

function searchUserRecipesByTag(event) {
  const tagValue = event.target.value;
  const filteredRecipes = userList.filterByTag(tagValue);
  viewAllRecipes(filteredRecipes);
}

function getUser() {
  let randomIndex = Math.floor(Math.random() * userRepo.userCatalog.length);
  let randomUser = userRepo.userCatalog[randomIndex];
  currentUser = new User(randomUser);
  userPantry = new UserPantry(randomUser.pantry);
  userList = new UserList();
}

function renderAllRecipesPage() {
  viewAllRecipes(recipeRepository.newRecipes);
  headerTitle.innerText = "All Recipes";
  changeToAllInputs();
}

function viewAllRecipes(recipes) {
  addHidden(recipesButton);
  addHidden(myPantry);
  addHidden(homePage);
  addHidden(currentRecipePage);
  removeHidden(allRecipesPage);
  addHidden(savedRecipePage);
  removeHidden(homeButton);
  removeHidden(myRecipesButton);

  allRecipesContainer.innerHTML = "";
  if (!recipes.length) {
    allRecipesContainer.innerHTML = "<p>Nothing to show!😕</p>";
    return;
  }
  recipes.forEach((recipe) => {
    const newSection = document.createElement("section");
    newSection.className = "recipe-card-container";
    newSection.innerHTML = `
        <img tabindex="0" class="image" id="${recipe.id}" src="${recipe.image}">
        <p class="recipe-name"> ${recipe.name} </p>`;

    allRecipesContainer.appendChild(newSection);
    const recipeImage = newSection.querySelector(".image");
    recipeImage.addEventListener("click", seeRecipe);
    recipeImage.addEventListener("keypress", seeRecipe);
  });
  allSearchForm.elements.search.value = "";
  userSearchForm.elements.search.value = "";
  renderTags();
}

function searchForRecipes(event) {
  event.preventDefault();
  let filteredElements;

  if (event.target.id.includes("all")) {
    const inputValue = allSearchForm.elements.search.value;
    filteredElements = recipeRepository.filterByName(inputValue);
  } else {
    const inputValue = userSearchForm.elements.search.value;
    filteredElements = userList.filterByName(inputValue);
  }
  viewAllRecipes(filteredElements);
}

function seeRecipe(event) {
  const visibleRecipe = recipeRepository.newRecipes.find((recipe) => {
    return parseInt(event.target.id) === recipe.id;
  });
  renderRecipe(visibleRecipe);
}

//other functions go here
function renderRecipe(recipe) {
  addHidden(allRecipesPage);
  removeHidden(currentRecipePage);
  addHidden(savedRecipePage);
  addHidden(homePage);
  removeHidden(myRecipesButton);
  changeToAllInputs();
  headerTitle.innerText = "More Info";

  currentRecipeContainer.innerHTML = "";
  const newSection = document.createElement("section");
  newSection.className = "recipe-details";
  newSection.innerHTML += `<h2>${recipe.name}</h2>`;
  newSection.innerHTML += `<img tabindex="0" class="image" id="${recipe.id}" src="${recipe.image}">`;
  newSection.innerHTML += renderIngredients(recipe.ingredients);
  newSection.innerHTML += renderInstructions(recipe.instructions);
  newSection.innerHTML += `<p>Estimated cost: ${recipe.getCost()} dollars</p>
  <button class="save-recipe-button" id="${recipe.id}"> Save Recipe </button>`;
  currentRecipeContainer.appendChild(newSection);
  const recipeImage = newSection.querySelector(".image");
  recipeImage.addEventListener("click", seeRecipe);
  recipeImage.addEventListener("keypress", seeRecipe);
  const saveRecipeButton = newSection.querySelector(".save-recipe-button");
  const alreadySaved = userList.recipesToCook.map((thisRecipe) => {
    return thisRecipe.name;
  });
  if (alreadySaved.includes(recipe.name)) {
    addHidden(saveRecipeButton);
  }
  saveRecipeButton.addEventListener("click", addToSavedRecipe);
}

function renderInstructions(instructions) {
  let html = "";
  instructions.forEach((item) => {
    html += `<li>${item.instruction}</li>`;
  });

  return `
    <ol>
      <p>Instructions:</p>
      ${html}
    </ol>
  `;
}

function renderIngredients(ingredients) {
  let html = "";
  ingredients.forEach((item) => {
    html += `<li>${item.quantity.amount} ${item.quantity.unit} ${item.name}</li>`;
  });
  return `
    <ul>
      <p>Ingredients</p>
      ${html}
    </ul>
  `;
}

function addToSavedRecipe(event) {
  const newSavedRecipe = recipeRepository.newRecipes.find((recipe) => {
    return parseInt(event.target.id) === recipe.id;
  });
  const existingData = userList.recipesToCook.find((recipe) => {
    return newSavedRecipe.id === recipe.id;
  });
  if (!existingData) {
    userList.recipesToCook.push(newSavedRecipe);
  }
  saveRecipe();
}

function saveRecipe() {
  viewMyRecipes();
  savedRecipeContainer.innerHTML = "";
  userList.recipesToCook.forEach((recipe) => {
    const newSection = document.createElement("section");
    newSection.className = "recipe-card-container";
    newSection.innerHTML = `
        <img tabindex="0" class="image" id="${recipe.id}" src="${recipe.image}">
        <button class="delete-recipe" id="${recipe.id}">Delete Recipe</button>
        <p class="recipe-name"> ${recipe.name} </p>`;

    savedRecipeContainer.appendChild(newSection);
    const recipeImage = newSection.querySelector(".image");
    recipeImage.addEventListener("click", seeRecipe);
    recipeImage.addEventListener("keypress", seeRecipe);
    const deleteRecipeButtons = newSection.querySelectorAll(".delete-recipe");
    deleteRecipeButtons.forEach((button) => {
      button.addEventListener("click", deleteRecipe);
    });
  });
}

function deleteRecipe(event) {
  const removeRecipe = userList.recipesToCook.find((recipe) => {
    return parseInt(event.target.id) === recipe.id;
  });
  const indexNumber = userList.recipesToCook.indexOf(removeRecipe);
  userList.recipesToCook.splice(indexNumber, 1);
  saveRecipe();
  if (!userList.recipesToCook.length) {
    savedRecipeContainer.innerHTML = "<p>Nothing to show!😕</p>";
    return;
  }
}

function returnHome() {
  removeHidden(myPantryButton);
  addHidden(allRecipesPage);
  addHidden(currentRecipePage);
  addHidden(savedRecipePage);
  addHidden(myPantry);
  removeHidden(homePage);
  removeHidden(recipesButton);
  addHidden(homeButton);
  removeHidden(myRecipesButton);
  changeToAllInputs();
  headerTitle.innerText = "Whats Cookin', Good Lookin'?";
}

function viewMyRecipes() {
  removeHidden(recipesButton);
  removeHidden(myPantryButton);
  addHidden(myPantry);
  addHidden(allRecipesPage);
  addHidden(currentRecipePage);
  addHidden(homePage);
  addHidden(myRecipesButton);
  removeHidden(savedRecipePage);
  changeToUserInputs();

  userSearchForm.style.visibility = "visible";
  headerTitle.innerText = "Recipes to Cook";
  if (!userList.recipesToCook.length) {
    savedRecipeContainer.innerHTML = "<p>Nothing to show!😕</p>";
    return;
  }
}

function showUserPantry() {
  addHidden(userTagSelect);
  addHidden(allTagSelect);
  removeHidden(myRecipesButton);
  removeHidden(homeButton);
  addHidden(allRecipesPage);
  addHidden(myPantryButton);
  addHidden(currentRecipePage);
  addHidden(homePage);
  addHidden(savedRecipePage);
  removeHidden(myPantry);
  headerTitle.innerText = "My pantry";
  renderPantryItems();
  userSearchForm.style.visibility = "hidden";
  allSearchForm.style.visibility = "hidden";
}

function renderPantryItems() {
  pantryContainer.innerHTML = "";
  userPantry.ingredients.forEach((item) => {
    pantryContainer.innerHTML += `<p>${item.quantity.amount} ${item.name}</p>`;
  });
}

function changeToAllInputs() {
  addHidden(userTagSelect);
  removeHidden(allTagSelect);
  removeHidden(allSearchForm);
  addHidden(userSearchForm);
  allSearchForm.style.visibility = "visible";
}

function changeToUserInputs() {
  addHidden(allTagSelect);
  removeHidden(userTagSelect);
  addHidden(allSearchForm);
  removeHidden(userSearchForm);
  userSearchForm.style.visibility = "visible";
}

function addHidden(element) {
  element.classList.add("hidden");
}

function removeHidden(element) {
  element.classList.remove("hidden");
}
