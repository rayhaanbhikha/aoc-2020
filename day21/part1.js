const fs = require('fs');
const rawFoods = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim().split('\n');

const allIngrediants = {};
const allergenAssociations = new Map();
const allAllergens = new Set();
const allFoods = [];

class Food {
  constructor(id, ingrediantNames, allergens) {
    this.id = id;
    this.ingrediantNames = ingrediantNames;
    this.allergens = allergens;
  }

  get ingrediants() {
    return this.ingrediantNames.reduce((acc, ingrediantName) => {
      const ingrediant = allIngrediants[ingrediantName];
      if (ingrediant.allergen === null) {
        acc.push(ingrediant);
      }
      return acc;
    }, []);
  }

  containsAllergen(allergen) {
    return this.allergens.includes(allergen)
  }

  intersectIngrediants(otherFood) {
    const ingrediantsMatched = [];
    for (let i = 0; i < this.ingrediants.length; i++) {
      const myIngediant = this.ingrediants[i];
      for (let j = 0; j < otherFood.ingrediants.length; j++) {
        const otherFoodIngrediant = otherFood.ingrediants[j];
        if (myIngediant === otherFoodIngrediant) {
          ingrediantsMatched.push(myIngediant);
        }
      }
    }
    return ingrediantsMatched;
  }
}

class Ingrediant {
  constructor(name) {
    this.name = name;
    this.allergen = null;
    this.appears = 0;
  }

  setAllergen(allergen) {
    this.allergen = allergen;
  }
}

rawFoods.forEach((f, foodId) => {
  const [ingrediants, allergens] = f.replace(/\(|\)/g, '').trim().split('contains ');

  const foodIngrediants = ingrediants.trim().split(' ').map(ingrediant => {
    if (!allIngrediants[ingrediant]) {
      const ing = new Ingrediant(ingrediant);
      allIngrediants[ing.name] = ing;
    }
    allIngrediants[ingrediant].appears++;

    return ingrediant;
  })
  const foodAllergens = allergens.trim().split(', ');
  foodAllergens.forEach(a => allAllergens.add(a));


  const food = new Food(foodId, foodIngrediants, foodAllergens);
  allFoods.push(food);
})

// console.log(allFoods);
console.log(allAllergens);
// console.log(allIngrediants);

// const perAllergen = (allergen) => {
//   const foodsAssociatedWithAllergen = allFoods.filter(food => food.containsAllergen(allergen));
//   if (foodsAssociatedWithAllergen.length === 1 && foodsAssociatedWithAllergen[0].ingrediants.length === 1) {
//     const ingrediantName = foodsAssociatedWithAllergen[0].ingrediants[0].name;
//     allIngrediants[ingrediantName].setAllergen(allergen);
//     allAllergens.delete(allergen);
//     allergenAssociations.set(allergen, allIngrediants[ingrediantName])
//   }
//   for (let i = 0; i < foodsAssociatedWithAllergen.length; i++) {
//     const foodAssociatedWithAllergen = foodsAssociatedWithAllergen[i];
//     for (let j = i+1; j < foodsAssociatedWithAllergen.length; j++) {
//       const otherFood = foodsAssociatedWithAllergen[j];
//       const intersections = foodAssociatedWithAllergen.intersectIngrediants(otherFood);
//       if (intersections.length === 1) {
//         const ingrediantName = intersections[0].name;
//         allIngrediants[ingrediantName].setAllergen(allergen);
//         allAllergens.delete(allergen);
//         allergenAssociations.set(allergen, allIngrediants[ingrediantName])
//       }
//     }
//   }
// }



// allIngrediants['mxmxvkd'].allergen = 'dairy';
// perAllergen('dairy');
// perAllergen('fish');
// perAllergen('soy');

// allAllergens.forEach((allergen) => perAllergen(allergen));
do {
  const allergenQueue = Array.from(allAllergens);
  const allergen = allergenQueue.shift();
  perAllergen(allergen);
} while (allAllergens.size !== 0);

console.log(allAllergens)

const remainingIngrediants = Object.values(allIngrediants).filter((ingrediant) => ingrediant.allergen === null)
console.log(remainingIngrediants);

console.log(remainingIngrediants.reduce((acc, r) => acc + r.appears, 0));




// console.log(allFoods[0].intersectIngrediants(allFoods[1]))

