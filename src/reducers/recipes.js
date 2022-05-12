const INTIAL_STATE = {
  recipes: [],
  byCategories: [],
  ingredients: [],
};

const recipes = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_RECIPES':
    return { ...state, recipes: action.payload.data };
  case 'RECIPES_INGREDIENTS':
    return { ...state, recipes: action.payload.data };
  case 'RECIPES_NAME':
    return { ...state, recipes: action.payload.data };
  case 'RECIPES_FIRST_LETTER':
    return { ...state, recipes: action.payload.data };
  case 'RECIPES_CATEGORY':
    return { ...state, byCategories: action.payload.data };
  case 'INGREDIENTS_RECIPES':
    return { ...state, ingredients: action.payload.data };
  case 'CLEAR_DATA':
    return INTIAL_STATE;
  default:
    return state;
  }
};

export default recipes;
