import './Order.css'

const order = (props) => {
	const ingredients = [];
	
	for (let ingredientName in props.ingredients){
		//converting value from object to array
		// salad: 2 
		ingredients.push( 
			{
				name:ingredientName,
				amount:props.ingredients[ingredientName]
			})
	}
	
	const ingredientOutput = ingredients.map(ig =>{
		return <span 
				   style={{
						border: '1px solid #ccc', 
						margin:'auto 5px', 
						padding: '5px'
					}}
				  key={ig.name} >{ig.name} : {ig.amount} </span>
	})
	
	return(
		<div className='Order'>
			<p>Ingredients : {ingredientOutput}</p>
			<p>Total price:<strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
		</div>
	)
	
};

export default order;