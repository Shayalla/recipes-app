import { SAVE_USER } from './types';
import { getRecipes, getDrinks, getRecipesByIngredients,
  getRecipesByName, getDrinksByIngredients, getDrinksByName,
  getRecipesByFirstLetter, getDrinksByFirstLetter,
  getCategoriesRecipes, getCategoriesDrinks,
  getRecipesByCategories, getDrinksByCategories,
  getIngredientsRecipes,
  getIngredientsDrinks } from '../services/api';

export const actionSaveUser = (email) => ({
  type: SAVE_USER,
  payload: {
    email,
  },
});

export const clearData = () => ({ type: 'CLEAR_DATA' });

export const actionGetUser = (email) => ({
  type: 'GET_USER',
  payload: {
    email,
  },
});

export const saveInputIngredientes = (input) => ({
  type: 'SAVE_INPUT_INGREDIENTES',
  payload: {
    input,
  },
});

export const actionRecipes = () => (dispatch) => (
  getRecipes()
    .then((data) => dispatch({
      type: 'GET_RECIPES',
      payload: {
        data,
      },
    }))
);

export const actionDrinks = () => (dispatch) => (
  getDrinks()
    .then((data) => dispatch({
      type: 'GET_DRINKS',
      payload: {
        data,
      },
    }))
);

export const actionRecipesByIngredients = (ingredients) => (dispatch) => (
  getRecipesByIngredients(ingredients)
    .then((data) => dispatch({
      type: 'RECIPES_INGREDIENTS',
      payload: {
        data,
      },
    }))
);

export const actionRecipesByName = (name) => (dispatch) => (
  getRecipesByName(name)
    .then((data) => dispatch({
      type: 'RECIPES_NAME',
      payload: {
        data,
      },
    }))
);

export const actionRecipesByFirstLetter = (firstLetter) => (dispatch) => (
  getRecipesByFirstLetter(firstLetter)
    .then((data) => dispatch({
      type: 'RECIPES_FIRST_LETTER',
      payload: {
        data,
      },
    }))
);

export const actionDrinksByIngredients = (ingredients) => (dispatch) => (
  getDrinksByIngredients(ingredients)
    .then((data) => dispatch({
      type: 'DRINKS_INGREDIENTS',
      payload: {
        data,
      },
    }))
);

export const actionDrinksByName = (name) => (dispatch) => (
  getDrinksByName(name)
    .then((data) => dispatch({
      type: 'DRINKS_NAME',
      payload: {
        data,
      },
    }))
);

export const actionDrinksByFirstLetter = (firstLetter) => (dispatch) => (
  getDrinksByFirstLetter(firstLetter)
    .then((data) => dispatch({
      type: 'DRINKS_FIRST_LETTER',
      payload: {
        data,
      },
    }))
);

export const actionCategoriesRecipes = () => (dispatch) => (
  getCategoriesRecipes()
    .then((data) => dispatch({
      type: 'CATEGORIES_RECIPES',
      payload: {
        data,
      },
    }))
);

export const actionCategoriesDrinks = () => (dispatch) => (
  getCategoriesDrinks()
    .then((data) => dispatch({
      type: 'CATEGORIES_DRINKS',
      payload: {
        data,
      },
    }))
);

export const actionRecipesByCategories = (category) => (dispatch) => (
  getRecipesByCategories(category)
    .then((data) => dispatch({
      type: 'RECIPES_CATEGORY',
      payload: {
        data,
      },
    }))
);

export const actionDrinksByCategories = (category) => (dispatch) => (
  getDrinksByCategories(category)
    .then((data) => dispatch({
      type: 'DRINKS_CATEGORY',
      payload: {
        data,
      },
    }))
);

export const actionIngredientsRecipes = () => (dispatch) => (
  getIngredientsRecipes()
    .then((data) => dispatch({
      type: 'INGREDIENTS_RECIPES',
      payload: {
        data,
      },
    }))
);

export const actionIngredientsDrinks = () => (dispatch) => (
  getIngredientsDrinks()
    .then((data) => dispatch({
      type: 'INGREDIENTS_DRINKS',
      payload: {
        data,
      },
    }))
);
