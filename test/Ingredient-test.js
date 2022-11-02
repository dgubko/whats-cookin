const chai = require("chai");
const Ingredient = require("../src/classes/Ingredient");
const expect = chai.expect;

describe("Ingredient", () => {
  let ingredient, ingredientRow;
  beforeEach(() => {
    ingredientRow = {
      id: 20081,
      name: "wheat flour",
      estimatedCostInCents: 142,
    };
    ingredient = new Ingredient(ingredientRow, {
      amount: 1.5,
      unit: "c",
    });
  });
  it("should be a function", () => {
    expect(Ingredient).to.be.a("function");
  });

  it("should have an id", () => {
    expect(ingredient.id).to.equal(20081);
  });

  it("should have a name", () => {
    expect(ingredient.name).to.equal("wheat flour");
  });

  it("should have a cost", () => {
    expect(ingredient.estCost).to.equal(142);
  });

  it("should have quantity", () => {
    expect(ingredient.quantity).to.deep.equal({
      amount: 1.5,
      unit: "c",
    });
  });

  it("should count an estimated cost", () => {
    expect(ingredient.countEstCost()).to.equal(213);
  });

  it("should return amount", () => {
    expect(ingredient.getAmount()).to.equal(1.5);
  });

  it("should return units if present", () => {
    expect(ingredient.getUnit()).to.equal("c");
  });

  it("should return default unit", () => {
    ingredient = new Ingredient(ingredientRow, {
      amount: 1.5,
      unit: "",
    });
    expect(ingredient.getUnit()).to.equal("pc");
  });

  it("should return amount of ingredient needed as a positive number if not enough", () => {
    expect(ingredient.getMissingAmount(5)).to.equal(3.5);
  });

  it("should return amount of ingredient needed as negative if enough", () => {
    expect(ingredient.getMissingAmount(1)).to.equal(-0.5);
  });
});
