import { combineReducers } from 'redux';
import drinks from './drink';
import recipes from './recipes';
import user from './user';
import categories from './categories';

const rootReducer = combineReducers({
  drinks,
  recipes,
  user,
  categories,
});

export default rootReducer;
