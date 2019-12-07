interface RecipeIngredient {
  name: string,
  description?: string,
  count: number | string,
  weight: number,
  type: string,
  additionalState?: string
}

interface RecipeDetails {
  title?: string,
  description?: string,
  ingredients?: RecipeIngredient[],
  recipe?: string[]
}

class Recipe implements RecipeDetails {
  title: string = "";
  ingredients: RecipeIngredient[] = [];
  description: string = "";
  recipe: string[] = [];

  get recipeText(): string {
    return `Ingredients:\n${this.ingredients.map((ingredient, ingredientIndex) => {
        switch (ingredient.type) {
          case 'liquid': return `${ingredientIndex + 1}) ${ingredient.count} ml ${ingredient.name} (${ingredient.additionalState})`;
          case 'cereal': return `${ingredientIndex + 1}) ${ingredient.weight} g ${ingredient.name} (${ingredient.additionalState})`;
          case 'holistic': return `${ingredientIndex + 1}) ${ingredient.count} ${ingredient.name} (${ingredient.additionalState})`;
          default: return `${ingredientIndex + 1}) ${ingredient.name} to taste`;
        }
      }).join('\n\n')}\nRecipe:\n${this.recipe.map((recipePart, recipePartIndex) => (
        `${recipePartIndex + 1}) ${recipePart}`
      )).join('\n\n')}
    `;
  }

  constructor(recipeDetails: RecipeDetails = { title: "", description: "", recipe: [] }) {
    for (let key in recipeDetails) {
      (this[key as keyof RecipeDetails] as RecipeDetails[keyof RecipeDetails]) = recipeDetails[key as keyof RecipeDetails];
    }
  }

  public addIngredient(recipeIngredient: RecipeIngredient): RecipeIngredient {
    this.ingredients.push(recipeIngredient);
    return this.ingredients[this.ingredients.length - 1];
  }

  public changeDescription(newDescription: string) {
    this.description = newDescription;
  }
}

export { RecipeIngredient, Recipe }
