import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import './BuildControls.css'

const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'},
	{label: 'Bacon', type: 'bacon'},
]

const BuildControls = (props) =>{
	return (
		<div className= 'BuildControls'>
			<p>Current Price : <strong> {props.price.toFixed(2)}</strong></p>
			
			{controls.map(ctrl => 
			  	<BuildControl 
					key={ctrl.label} 
					label={ctrl.label} 
					added={props.ingredientAdded.bind(this, ctrl.type)}
					removed={props.ingredientRemoved.bind(this, ctrl.type)}
					disable={props.disabled[ctrl.type]}	
				/>
			)}
			<button 
				className='OrderButton'
				disabled= {!props.purchasable}
				onClick={props.ordered}>Order now ! </button>
		</div>
	)
	
}

export default BuildControls;