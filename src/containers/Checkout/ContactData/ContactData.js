import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from '../../../axiosOrder';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/spinner/spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/errorHandler/errorHandler'
import * as actions from '../../../store/action/index'
import './ContactData.css';


class ContactData extends Component{
	state={
		orderForm:{
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation:{
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street Name'
				},
				value: '',
				validation:{
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode:{
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation:{
					required: true,
					minLength: 3
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'County Name'
				},
				value: '',
				validation:{
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter E-Mail'
				},
				value: '',
				validation:{
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'fastest'},
						{value: 'General', displayValue: 'General'},
					]
				},
				value: 'fastest',
				validation: {},
				valid: true

			}
		},
		formIsValid: false
	};
		
	//Passing the data to DB	
	orderHandler = (event) => {
		event.preventDefault();
		let formData = {};
		//Getting the value from the DB
		for (let keyValue in this.state.orderForm){
			formData[keyValue] = this.state.orderForm[keyValue].value
		}
		const order={
			ingredients: this.props.ing,
			price: this.props.price,
			order: formData
		}
		
		this.props.onOrderBurger(order)
		
	}
	
	//Validating the input
	checkValidity(value, rules){
		let isValid = true
		
		if(!rules){
			return true
		}
		
		if(rules.required){
			//return true if the i/p value is NE to empty
			isValid = value.trim() !== '' && isValid
		}
		
		if(rules.minLength){
			isValid = value.length >= rules.minLength && isValid
		}
		
		return isValid;
	}
	
	//Changing the state value immutably for the i/p user provided
	inputChangeHandler = (event, inputId) =>{
		const updatedForm ={...this.state.orderForm}
		const formUpdated = {...updatedForm[inputId]}
		
		formUpdated.value = event.target.value
		//Checking i/p Valid state (T or F)
		formUpdated.valid = this.checkValidity(formUpdated.value, formUpdated.validation)
		formUpdated.touched = true
		updatedForm[inputId] = formUpdated
		let formValid = true;
		for(let inputKey in updatedForm){
			formValid = updatedForm[inputKey].valid && formValid
		}
		this.setState({orderForm: updatedForm, formIsValid: formValid})
	}
		
	render(){
		const formArray = [];
		
		for(let key in this.state.orderForm){
			formArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}
		let form = (
			<form onSubmit={this.orderHandler}>
					 {/*<Input inputtype='input' type='text' name='name' placeholder='name' /> */}
					{formArray.map(formElement => (
						<Input 
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							validate={formElement.config.validation}
							touched={formElement.config.touched}
							changed= { (event) =>  this.inputChangeHandler(event ,formElement.id)}/>
					))}
					<Button btnType='Success' disabled={!this.state.formIsValid} >ORDER</Button>
				</form>
		);
		if(this.props.loading){
            form = <Spinner />;
        }
		return(
			<div className='ContactData'>
				<h4> Enter your contact details </h4>
				{form}	
			</div>
		)
	}
}

const mapStateToProps = state =>{
	return{
		ing: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));