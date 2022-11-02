class Ingredient {
  constructor(ingredientRow, quantity) {
    this.id = ingredientRow.id;
    this.name = ingredientRow.name;
    this.estCost = ingredientRow.estimatedCostInCents;
    this.quantity = quantity;
  }
  countEstCost() {
    return this.quantity.amount * this.estCost;
  }
  getAmount() {
    return this.quantity.amount;
  }
  getUnit() {
    return this.quantity.unit || "pc";
  }
  getMissingAmount(needed) {
    return needed - this.quantity.amount;
  }
}

module.exports = Ingredient;
