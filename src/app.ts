import { Dish, Ingredient } from "./dish";
import { Menu, Window, QuestionTypes } from "./menu";

let currentDishIndex: number = 0;

let borsch = new Dish({
  price: 100,
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

borsch.addIngredient({ name: "cabbage", description: "cover with water", count: 1, weight: 420, type: "cereal" });
borsch.addIngredient({ name: "carrot", description: "Grate the peeled", count: 3, weight: 320, type: "cereal", additionalState: "peeled raw" });
borsch.addIngredient({ name: "beef", description: "cut into cubes", count: 1, weight: 500, type: "cereal" });

let cofee = new Dish({
  price: 45,
  recipe: [
    "put coffe in the cup.",
    "pour hot water."
  ],
  title: "Cofee",
  description: "Simple cofee recipe"
});

cofee.addIngredient({ name: "cofee", description: "", count: 1, weight: 10, type: "holistic" });
cofee.addIngredient({ name: "water", description: "", count: 1, weight: 350, type: "liquid", additionalState: "boiled" });

const dishes: Dish[] = [
  borsch,
  cofee
];

const menu = new Menu();

menu.addWindow(new Window(
  "main menu",
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
      command: () => { menu.use("dishes"); }
    },
    {
      description: "Sell dishes",
      command: () => { menu.use("sell dish"); }
    },
    {
      description: "Exit",
      command: () => { Menu.clear(); }
    }
  ]
));

menu.addWindow(new Window(
  "sell dish",
  {
    onCreate: () => {
      Menu.clear();
      Menu.write("Sell Dishes\n");
      Menu.write(dishes.map((dish, index) => `${index + 1}. ${dish.title}`).join('\n'));
    }
  },
  [
    {
      description: "sell dish",
      command: () => {
        Menu
          .askUser([
            { max: dishes.length, name: "dishIndex", question: "Dish #:", type: QuestionTypes.NUMBER },
            { name: "dishCount", question: "How many dish?", type: QuestionTypes.NUMBER }
          ])
          .then( ({ dishIndex, dishCount } ) => {
            Menu.write(`Total price: ${dishes[dishIndex - 1].sell(dishCount)}`);
            setTimeout(() => {
              menu.use("main menu");
            }, 3000);
          });
      }
    },
    {
      description: "back to dishes",
      command: () => { menu.use("dishes"); }
    },
    {
      description: "main menu",
      command: () => { menu.use("main menu"); }
    }
  ]
));

menu.addWindow(new Window(
  "dishes",
  {
    onCreate: () => {
      Menu.clear();
      Menu.write("Dishes\n");
      Menu.write(dishes.map((dish, index) => `${index + 1}. ${dish.title}`).join('\n'));
    },
    onUpdate: () => { Menu.clear(); }
  },
  [
    {
      description: "Show dish",
      command: () => {
        Menu.write(dishes.map((dish, index) => `${index + 1}. ${dish.title}`).join('\n'));
        Menu
          .askUser([{ max: dishes.length, name: "value", question: "What dish you interested?", type: QuestionTypes.NUMBER }])
          .then( ({ value: dishIndex} ) => {
            currentDishIndex = dishIndex - 1;
            menu.use("dish recipe");
          });
      }
    },
    {
      description: "Edit dish",
      command: () => {
        Menu.write(dishes.map((dish, index) => `${index + 1}. ${dish.title}`).join('\n'));
        Menu
          .askUser([{ max: dishes.length, name: "value", question: "What dish you interested?", type: QuestionTypes.NUMBER }])
          .then( ({ value: dishIndex} ) => {
            currentDishIndex = dishIndex - 1;
            menu.use("dish edit");
          });
      }
    },
    {
      description: "Add dish",
      command: () => {
        menu.use("dish creation");
      }
    },
    {
      description: "Remove dish",
      command: () => {
        Menu.write(dishes.map((dish, index) => `${index + 1}. ${dish.title}`).join('\n'));
        Menu
          .askUser([{ max: dishes.length, name: "value", question: "What dish you interested?", type: QuestionTypes.NUMBER }])
          .then( ({ value: dishIndex} ) => {
            currentDishIndex = 0;
            dishes.splice(dishIndex - 1, 1);
            menu.use("dishes");
          });
      }
    },
    {
      description: "main menu",
      command: () => { menu.use("main menu"); }
    }
  ]
));

menu.addWindow(new Window(
  "dish recipe",
  {
    onCreate: () => {
      Menu.clear();
      Menu.write(`${dishes[currentDishIndex].title} recipe\n`);
      Menu.write(dishes[currentDishIndex].recipeText);
    }
  },
  [
    {
      description: "back to dishes",
      command: () => { menu.use("dishes"); }
    },
    {
      description: "main menu",
      command: () => { menu.use("main menu"); }
    }
  ]
));

menu.addWindow(new Window(
  "dish edit",
  {
    onCreate: () => {
      Menu.clear();
      Menu.write(`${dishes[currentDishIndex].title} recipe\n`);
      Menu.write(dishes[currentDishIndex].recipeText);
    }
  },
  [
    {
      description: "enter new description",
      command: () => {
        Menu
          .askUser([{ name: "value", question: "New recipe:", type: QuestionTypes.STRING }])
          .then( ({ value: newRecipeDescription} ) => {
            dishes[currentDishIndex].changeDescription(newRecipeDescription);
            menu.use("dish recipe");
          });
      }
    },
    {
      description: "back to dishes",
      command: () => { menu.use("dishes"); }
    },
    {
      description: "main menu",
      command: () => { menu.use("main menu"); }
    }
  ]
));

menu.addWindow(new Window(
  "dish creation",
  {
    onCreate: () => { Menu.clear(); },
    onUpdate: () => { Menu.clear(); }
  },
  [
    {
      description: "enter new dish details",
      command: async () => {
        Menu.write("Enter new dish details");

        let newDishDetails: any = await Menu.askUser([
          { name: "title", question: "Title:", type: QuestionTypes.STRING },
          { name: "price", question: "Price:", type: QuestionTypes.NUMBER },
          { name: "description", question: "Description:", type: QuestionTypes.STRING },
          { name: "recipe", question: "All recipes parts (';' is separator):", type: QuestionTypes.LIST }
        ]);

        let newDish: Dish = new Dish(newDishDetails);
        let askForIngredient: boolean = true;

        Menu.write("Set ingredients:");

        do {
          let newIngredient: any = await Menu.askUser([
            { name: "name", question: "Name:", type: QuestionTypes.STRING },
            { name: "description", question: "Description:", type: QuestionTypes.STRING },
            { name: "count", question: "Count:", type: QuestionTypes.NUMBER },
            { name: "weight", question: "Weight:", type: QuestionTypes.NUMBER },
            { name: "type", question: "Type:", type: QuestionTypes.STRING },
            { name: "additionalState", question: "Additional state:", type: QuestionTypes.STRING }
          ]);

          newDish.addIngredient(newIngredient);

          const askForIngredientResult = await Menu.askUser([{ name: "askForIngredient", question: "Add one more ingredient? (y/n)", type: QuestionTypes.STRING }]);//.askForIngredient === "y" ? true : false;
          askForIngredient = askForIngredientResult.askForIngredient === "y" ? true : false;
        } while (askForIngredient === true);

        dishes.push(newDish);

        menu.use("dishes");
      }
    },
    {
      description: "back to dishes",
      command: () => { menu.use("dishes"); }
    },
    {
      description: "main menu",
      command: () => { menu.use("main menu"); }
    }
  ]
));

menu.use("main menu");
