import React from 'react'
import classes from './Input.module.css'

const input = (props) =>{
	let inputElement = null;
	let validationError = null;
	const inputClasses = [classes.InputElement]
	
	if (props.invalid && props.validate && props.touched){
		inputClasses.push(classes.Invalid)
		validationError = <p className = {classes.Error}>Please enter the correct i/p </p>
	}
	
	switch(props.elementType){
		case('input'):
			inputElement = <input 
				   className= {inputClasses.join(' ')}
				   {...props.elementConfig} value={props.value} onChange={props.changed} />
			break;
		case('textarea'):
			inputElement = <textarea 
				   className= {inputClasses.join(' ')} 
				   {...props.elementConfig} value={props.value} onChange={props.changed} />
			break;
		case('select'):
			inputElement = <select 
				   className= {inputClasses.join(' ')} 
				   value={props.value}  onChange={props.changed}>
				  {props.elementConfig.options.map(option => (
						<option value= {option.value} key={option.value} > {option.displayValue} </option>
					))}
				</select>
			break;
		default:
			inputElement = <input 
				   className= {inputClasses.join(' ')} 
				   {...props.elementConfig} value={props.value} onChange={props.changed} />
	}
	
	return(
		<div>
			<label>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	)
}

export default input;