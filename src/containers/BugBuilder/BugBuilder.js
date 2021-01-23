import React, {Component} from 'react';
import {connect} from 'react-redux'
import Aux from '../../hoc/Auxiliary';
import BurgerIngredients from '../../components/Burger/Burger';
import BuildControls  from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import Spinning from '../../components/UI/spinner/spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axiosOrder'
import errorHandler from '../../hoc/errorHandler/errorHandler'
import * as actions from '../../store/action/index'




class BurgerBuilder extends Component{
	state = {
		purchasing: false
	}
	
	//Getting the ingredients from backend(DB)
	componentDidMount(){
		this.props.onInitIngredients()
	}

	//Used to verify if the removed  ingredients are greater than zero 
	updatePurchsaseState(ingredients) {
		
 		const sum = Object.keys(ingredients)
			.map(igKey =>  {return ingredients[igKey ]})
			.reduce((sum,el) => {
				return sum + el 
			} ,0)
		return  sum > 0
	}
	
	//Order the burger button
	purchaseHandler = () =>{
		this.setState({purchasing: true})
	}
	
	purchaseCancelHandler = () => {
		this.setState({purchasing:false})
	}
	
	purchaseContinuelHandler = () => {	
		this.props.onInitPurchase()
		this.props.history.push('/checkout')
	}
	
	render(){
		//Enableing or disabling the less button in BuildControls component
		const disabledInfo = {...this.props.ings}
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		
		//For spinning animation 
		let ordersummary = null;
		
		//Adding Spinning componet to the initial load page 
		// So to prevent the error at the intial load.(We fetch (axios.get {line no: 29}) from DB before loading of the page).
		// To prevent this we are adding spinning componet for the inital load
		
		let burger = this.props.error ? <p> can't be loaded ERROR ..!!</p> : <Spinning/>
			
		if(this.props.ings){
			burger = (
				<Aux>
					<BurgerIngredients ingredients={this.props.ings} />
					<BuildControls ingredientAdded={this.props.onIngredientsAdded}
								ingredientRemoved={this.props.onIngredientsRemoved}
								disabled={disabledInfo}
								price={this.props.price}
								purchasable={this.updatePurchsaseState(this.props.ings)}
								ordered={this.purchaseHandler}
					/>
				</Aux>
			)
			
			ordersummary = <OrderSummary ingredients={this.props.ings}
								   purchaseCanceled={this.purchaseCancelHandler}
								   purchaseContinued={this.purchaseContinuelHandler}
								   price={this.props.price}  /> 
		}
		
		return(
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} > 
					{ordersummary}
				</Modal>
				{burger}
			</Aux>
		)
	}
}

const mapStateToProps = state =>{
	return{
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		onIngredientsAdded: (ingName) => dispatch(actions.addIngredients(ingName)),
		onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredients(ingName)),
		onInitIngredients: ()=> dispatch(actions.initIngredients()),
		onInitPurchase: ()=> dispatch(actions.purchaseInit())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder,axios));