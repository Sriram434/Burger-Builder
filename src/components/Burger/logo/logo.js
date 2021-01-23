import React from 'react';
import classes from  './logo.module.css'
import burgerLogo from '../../../assets/images/burger-logo.png'

const logo = (props)=>(
	<div className={classes.Logo}>
 		<img src={burgerLogo} alt='Burger logo'/>
	</div>	
)


export default logo;