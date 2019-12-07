import { Recipe, RecipeIngredient as Ingredient, RecipeDetails } from "./recipe";

interface DishDetails extends RecipeDetails {
  photo?: string,
  price: number
}

class Dish extends Recipe {
  protected photo?: string = "";
  protected price: number = 0;

  constructor(details: DishDetails) {
    super(details);

    this.photo = details.photo;
    this.price = details.price;
  }

  public showPrice(): number {
    return this.price;
  }

  public sell(count: number): number {
    return count * this.price;
  }
}

export { Dish, Ingredient };
