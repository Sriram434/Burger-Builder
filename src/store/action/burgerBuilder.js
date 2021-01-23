import * as actionTypes from './actionTypes';
import axios from '../../axiosOrder';

export const addIngredients = (name) =>{
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name	
	}
}

export const removeIngredients = (name) =>{
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name	
	}
}

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	}
}

export const fetchIngFailed = () => {
	return {
		type: actionTypes.FETCH_ING_FAILED
	}
}

export const initIngredients = () => {
	return dispatch => {
		axios.get('https://react-burger-76b92.firebaseio.com/ingredients.json')
		.then( res => {
			dispatch(setIngredients(res.data))
		})
		.catch(err => {
			dispatch(fetchIngFailed())
		})
	}
}