const Ingredient = require("./Ingredient");

class UserPantry {
  constructor(pantry) {
    this.ingredients = pantry;
  }

  retrieveIngredients(ingredientsData) {
    this.ingredients = this.ingredients.map((item) => {
      const element = ingredientsData.find(
        (ingr) => ingr.id === item.ingredient
      );
      return new Ingredient(element, { amount: item.amount });
    });
  }

  getMissingIngredientsInfo(recipe) {
    const missingIngredients = recipe.ingredients.reduce((acc, item) => {
      const userIngredient = this.ingredients.find(
        (ingr) => ingr.id === item.id
      );
      const unit = item.getUnit();
      const amountNeeded = item.getAmount();
      const missingAmount = !userIngredient
        ? amountNeeded
        : userIngredient.getMissingAmount(amountNeeded);

      if (missingAmount > 0) {
        const message = `${missingAmount} ${unit} ${item.name}`;
        acc.push(message);
      }

      return acc;
    }, []);

    return missingIngredients;
  }

  checkRecipeIngridients(recipe) {
    const missingInfo = this.getMissingIngredientsInfo(recipe);

    return !missingInfo.length
      ? "You have enough ingredients to cook this recipe!"
      : `You need ${missingInfo.join(" and ")}`;
  }
}

module.exports = UserPantry;
