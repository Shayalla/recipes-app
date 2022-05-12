import React from 'react';

import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Recipes from './Recipes';
import Drinks from './Drinks';
import RecipeDetails from './RecipeDetails';
import DrinkDetails from './DrinkDetails';
import RecipeProcess from './RecipeProcess';
import DrinkProcess from './DrinkProcess';
import Explorer from './Explorer';
import RecipesExplorer from './RecipesExplorer';
import DrinksExplorer from './DrinksExplorer';
import RecipesByIngredients from './RecipesByIngredients';
import DrinksByIngredients from './DrinksByIngredients';
import RecipesByOrigin from './RecipesByOrigin';
import Perfil from './Perfil';
import RecipesDone from './RecipesDone';
import FavoriteRecipes from './FavoriteRecipes';

// Source: https://medium.com/@nutanbhogendrasharma/create-multiple-pages-using-routing-in-react-part-2-5d667ca051c6
function Routers() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Recipes } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/:id" component={ RecipeDetails } />
      <Route exact path="/bebidas/:id" component={ DrinkDetails } />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ RecipeProcess }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ DrinkProcess }
      />
      <Route exact path="/explorar" component={ Explorer } />
      <Route exact path="/explorar/comidas" component={ RecipesExplorer } />
      <Route exact path="/explorar/Bebidas" component={ DrinksExplorer } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ RecipesByIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinksByIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ RecipesByOrigin } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />

    </Switch>
  );
}

export default Routers;
