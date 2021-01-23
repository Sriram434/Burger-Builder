import React from 'react'
import  classes from './Toolbar.module.css'
import Logo from '../../Burger/logo/logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle'

const Toolbar = (props) => (
	<header className={classes.Toolbar}>
		<DrawToggle Clicked={props.Clicked}/>
		<div className={classes.Logo}>
			<Logo />	
		</div>

		<nav className={classes.DeskTop}>
			<NavigationItems/>	
		</nav>
	</header>
)


export default Toolbar;