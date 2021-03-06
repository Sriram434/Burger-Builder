import React,{Component} from 'react'
import {connect} from 'react-redux'
import Order from '../../components/CheckoutSummary/Order/Order'
import axios from '../../axiosOrder'
import errorHandler from '../../hoc/errorHandler/errorHandler'
import * as actions from '../../store/action/index'
import Spinner from '../../components/UI/spinner/spinner'

class Orders extends Component{

	componentDidMount(){
		this.props.onFetchOrders()
	}
	
	render(){
		let orders = < Spinner />
		if(!this.props.loading) {
			orders = this.props.orders.map( order => (
					<Order key={order.id} 
						   ingredients={order.ingredients}
							price={order.price}/>
				))
		}
		return(
			<div>
				{orders}
			</div>
			
		)
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: ()=> dispatch(actions.fetchOrders())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axios));