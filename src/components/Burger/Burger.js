import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'
import './Burger.css'

const Burger = (props) => {
	//Converting objects to array 
	let  transIng = Object.keys(props.ingredients)
	.map(igKey => {
		//Array is used to get the length of the ingredients property 
		return[...Array(props.ingredients[igKey])].map((_,i) => {
			return < BurgerIngredients type={igKey} key={igKey + i}/> 
		})
	})
	.reduce((acc, el) => {  // To get the array which are greater than zero quantity
			return acc.concat(el)
	},[])
	
	if((transIng.length === 0) || (transIng.length < 0) ){
		transIng = <p>Please enter the ingredients </p>
	}
	
	return(
		<div className='Burger'>
			<BurgerIngredients type='bread-top' />
		    {transIng}
			<BurgerIngredients type='bread-bottom' />	
		</div>
	)
}

export default Burger;