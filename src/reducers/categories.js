const INTIAL_STATE = {
  categories: [],
};

const categories = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case 'CATEGORIES_RECIPES':
    return { ...state, categories: action.payload.data };
  case 'CATEGORIES_DRINKS':
    return { ...state, categories: action.payload.data };
  default:
    return state;
  }
};

export default categories;