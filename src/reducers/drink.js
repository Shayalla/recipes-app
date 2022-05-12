const INTIAL_STATE = {
  drinks: [],
  byCategories: [],
  ingredients: [],
};

const drinks = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_DRINKS':
    return { ...state, drinks: action.payload.data };
  case 'DRINKS_INGREDIENTS':
    return { ...state, drinks: action.payload.data };
  case 'DRINKS_NAME':
    return { ...state, drinks: action.payload.data };
  case 'DRINKS_FIRST_LETTER':
    return { ...state, drinks: action.payload.data };
  case 'DRINKS_CATEGORY':
    return { ...state, byCategories: action.payload.data };
  case 'INGREDIENTS_DRINKS':
    return { ...state, ingredients: action.payload.data };
  case 'CLEAR_DATA':
    return INTIAL_STATE;
  default:
    return state;
  }
};

export default drinks;
