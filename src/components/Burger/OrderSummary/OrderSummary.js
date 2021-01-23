import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button'


const OrderSummary = (props) => {
	const ingSummary = Object.keys(props.ingredients)
	.map(igKey => {
		return ( <li key={igKey}>
				<span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
			   </li> )
	})
	return(
		<Aux>
			<h3>Your Order </h3>
			<p>Your tasty burger with the following items:</p>
			<ul>{ingSummary}</ul>
			<p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
			<p>Please check before placing !</p>
			<Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
			<Button btnType='Success' clicked={props.purchaseContinued}>ORDER</Button>
			
		</Aux>
	)
}

export default OrderSummary;