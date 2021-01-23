import * as actionTypes from '../action/actionTypes'
import {updateObject} from '../utility'

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false
}

const INGREDIENT_PRICE = {
	salad: 0.5,
	bacon: 0.4,
	cheese: 0.8,
	meat: 1.3 
}

const addIngredient = (state, action) => {
	const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
		const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
		const updatedState = {
			ingredients: updatedIngredients,
			totalPrice:  state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
		}
	return updateObject(state, updatedState)
}

const removeIngredient = (stae,action) => {
	const removeIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
	const removeIngredients = updateObject(state.ingredients, removeIngredient)
		const removeState = {
			ingredients: removeIngredients,
			totalPrice:  state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
		}
	return updateObject(state, removeState)
}

const setIngredient =(state,action) => {
	// To restrucure the order in the UI
	// ingredients: action.ingredients,
	return  updateObject(state,{
		ingredients:{
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		},
		totalPrice: 4,
		error: false
	})
}

const fetchIngFailed = (state, action) => {
	return updateObject(state, {
		error: true
	})
}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
			
		case actionTypes.REMOVE_INGREDIENT:	return removeIngredient(state,action)
			
		case actionTypes.SET_INGREDIENTS: return setIngredient(state,action)
			
		case actionTypes.FETCH_ING_FAILED: 	return fetchIngFailed(state,action)
			
		default : return state
	}
}

export default reducer;