import data from './data';
import modal from './modal';

//import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';

const rootReducer = combineReducers({
  // Estoy es una abreviacion cuando la key y  valor tienen el mismo nombre ejem: datos: data o data: data
  data,
  modal,
})

export default rootReducer;