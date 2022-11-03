import { expect } from "chai";
import Ingredient from "../src/classes/Ingredient";
import UserPantry from "../src/classes/UserPantry";
import Recipe from "../src/classes/Recipe";
import {
  mockIngredientsData,
  mockUsers,
  rawCookieRecipe,
  rawPorkChopsRecipe,
} from "./mock-data";

describe("UserPantry", () => {
  let userSaigePantry,
    userEpfraimPantry,
    userSaige,
    userEpfraim,
    cookieRecipe,
    porkChopsRecipe;

  beforeEach(() => {
    userSaige = mockUsers[0];
    userEpfraim = mockUsers[1];
    userSaigePantry = new UserPantry(userSaige.pantry);
    userEpfraimPantry = new UserPantry(userEpfraim.pantry);
    cookieRecipe = new Recipe(rawCookieRecipe);
    porkChopsRecipe = new Recipe(rawPorkChopsRecipe);
  });

  it("should be a function", () => {
    expect(UserPantry).to.be.a("function");
  });

  it("should have an ingredient", () => {
    expect(userSaigePantry.ingredients).to.deep.equal([
      { ingredient: 20081, amount: 4 },
      { ingredient: 18372, amount: 10 },
    ]);

    expect(userEpfraimPantry.ingredients).to.deep.equal([
      { ingredient: 1009016, amount: 3 },
      { ingredient: 9003, amount: 7 },
    ]);
  });

  it("should transform ingredient to instance of Ingredient class", () => {
    userSaigePantry.retrieveIngredients(mockIngredientsData);
    expect(userSaigePantry.ingredients[0]).instanceOf(Ingredient);
    expect(userSaigePantry.ingredients[0]).to.deep.equal({
      id: 20081,
      name: "wheat flour",
      estCost: 142,
      quantity: { amount: 4 },
    });
  });

  it("should transform ingredient to instance of Ingredient class with different info", () => {
    userEpfraimPantry.retrieveIngredients(mockIngredientsData);
    expect(userEpfraimPantry.ingredients[0]).instanceOf(Ingredient);
    expect(userEpfraimPantry.ingredients[0]).to.deep.equal({
      id: 1009016,
      name: "apple cider",
      estCost: 468,
      quantity: { amount: 3 },
    });
  });

  it("should return empty array if no ingredients missing", () => {
    cookieRecipe.retrieveIngredients(mockIngredientsData);
    userSaigePantry.retrieveIngredients(mockIngredientsData);
    const result = userSaigePantry.getMissingIngredientsInfo(cookieRecipe);
    expect(result).to.deep.equal([]);
  });

  it("should return empty array if no ingredients missing for different pantry", () => {
    porkChopsRecipe.retrieveIngredients(mockIngredientsData);
    userEpfraimPantry.retrieveIngredients(mockIngredientsData);
    const result = userEpfraimPantry.getMissingIngredientsInfo(porkChopsRecipe);
    expect(result).to.deep.equal([]);
  });

  it("should return an array with missing ingredients", () => {
    porkChopsRecipe.retrieveIngredients(mockIngredientsData);
    userSaigePantry.retrieveIngredients(mockIngredientsData);

    const result = userSaigePantry.getMissingIngredientsInfo(porkChopsRecipe);
    expect(result).to.deep.equal(["1.5 cups apple cider", "2 pc apple"]);
  });

  it("should return an array with missing ingredients for different pantry", () => {
    cookieRecipe.retrieveIngredients(mockIngredientsData);
    userEpfraimPantry.retrieveIngredients(mockIngredientsData);

    const result = userEpfraimPantry.getMissingIngredientsInfo(cookieRecipe);
    expect(result).to.deep.equal([
      "1.5 c wheat flour",
      "0.5 tsp bicarbonate of soda",
    ]);
  });

  it("should return message if there is enough ingredients", () => {
    cookieRecipe.retrieveIngredients(mockIngredientsData);
    userSaigePantry.retrieveIngredients(mockIngredientsData);

    const result = userSaigePantry.checkRecipeIngridients(cookieRecipe);
    expect(result).to.equal("You have enough ingredients to cook this recipe!");
  });

  it("should return message if there is enough ingredients for different pantry", () => {
    porkChopsRecipe.retrieveIngredients(mockIngredientsData);
    userEpfraimPantry.retrieveIngredients(mockIngredientsData);

    const result = userEpfraimPantry.checkRecipeIngridients(porkChopsRecipe);
    expect(result).to.equal("You have enough ingredients to cook this recipe!");
  });

  it("should return message about missing ingredients", () => {
    porkChopsRecipe.retrieveIngredients(mockIngredientsData);
    userSaigePantry.retrieveIngredients(mockIngredientsData);

    const result = userSaigePantry.checkRecipeIngridients(porkChopsRecipe);
    expect(result).to.equal("You need 1.5 cups apple cider and 2 pc apple");
  });

  it("should return message about missing ingredients for different pantry", () => {
    cookieRecipe.retrieveIngredients(mockIngredientsData);
    userEpfraimPantry.retrieveIngredients(mockIngredientsData);

    const result = userEpfraimPantry.checkRecipeIngridients(cookieRecipe);
    expect(result).to.equal(
      "You need 1.5 c wheat flour and 0.5 tsp bicarbonate of soda"
    );
  });
});
