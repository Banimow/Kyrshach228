import { Recipe, RecipeIngredient } from "./recipe";
import { Menu, Window, QuestionTypes } from "./menu";

let borschRecipe = new Recipe({
  recipe: [
    "Prepare all the ingredients. Put the beet in a small saucepan, cover with water (the water should completely cover the beet) and boil until cooked.",
    "Take a medium sized saucepan, put a piece of beef (preferably use a piece of beef with bone) in it and cover with water. The water should completely cover the beef, while it is boiling. The water should completely cover the beef. Skim it when it starts to boil. Then reduce heat and simmer for an hour and a half without a lid. At the end add some salt. If you wish, you can add spices or a little vinegar to get rid of the peculiar smell of boiled meat.",
    "Chop the cabbage.",
    "Grate the peeled raw carrot.",
    "Take the meat out of the broth, cut into cubes and let it cool down. Carefully put the vegetables from the pan in the broth. Put the broth with vegetables on the fire, add the bay leaf, bring to the boil and cook over medium heat for 25-30 minutes."
  ],
  title: "Borsch",
  description: "Serve with sour cream and bread."
});

let cofeeRecipe = new Recipe({
  recipe: [
    "put coffe in the cup.",
    "pour hot water."
  ],
  title: "Cofee",
  description: "Simple cofee recipe"
});

const recipts: Recipe[] = [
  borschRecipe,
  cofeeRecipe
];

const showRecipe = (recipe: Recipe) => {
  console.log(recipe.recipeText);
};

const addIngredient = (recipe: Recipe, ingredient: RecipeIngredient) => {
  recipe.addIngredient(ingredient);
};

const changeDescription = (recipe: Recipe, description: string) => {
  recipe.changeDescription(description);
};

const menu = new Menu();

menu.addWindow(new Window(
  "main",
  {
    onCreate: () => {
      Menu.clear();
      Menu.write("Recipes Details\n");
    },
    onUpdate: () => { Menu.clear(); }
  },
  [
    {
      description: "Show recipts",
      command: () => { menu.use("recipts"); }
    }
  ]
));

menu.addWindow(new Window(
  "recipts",
  {
    onCreate: () => {
      Menu.clear();
      Menu.write("Recipts\n");
      Menu.write(recipts.map((recipe, index) => `${index + 1}. ${recipe.title}`).join('\n'));
    },
    onUpdate: () => { Menu.clear(); }
  },
  [
    {
      description: "Show recipe",
      command: () => { menu.use("recipts"); }
    },
    {
      description: "Edit recipe",
      command: () => { menu.use("recipts"); }
    },
    {
      description: "Add recipe",
      command: () => { menu.use("recipts"); }
    },
    {
      description: "Remove recipe",
      command: () => { menu.use("recipts"); }
    }
  ]
));

menu.use("main");
