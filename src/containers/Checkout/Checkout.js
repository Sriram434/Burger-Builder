import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
	
	checkoutCancelled = () =>{
		this.props.history.goBack()
	}

	checkoutContinued= ()=>{
		this.props.history.replace('/checkout/contact-data')
	}
		
	render(){
		let summary = <Redirect to='/' />
		
		if(this.props.ing){
			// Redirecting to home page after placing the order
			const purchasedRecirect = this.props.purchased ? <Redirect to='/' /> : null
			summary = (
				<div>
				{purchasedRecirect}
				<CheckoutSummary ingredients={this.props.ing}
								  checkoutCancelled={this.checkoutCancelled}
								  checkoutContinued={this.checkoutContinued}
				/>
				{/* Insted of path we are passing data to ContactData COMP */}
				<Route path={this.props.match.path + '/contact-data'} 
						component = {ContactData}
				/>
			</div>
			)
		}
		return summary
	}
}

const mapStateToProps = state =>{
	return {
		ing: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	}
}

export default connect(mapStateToProps)(Checkout);