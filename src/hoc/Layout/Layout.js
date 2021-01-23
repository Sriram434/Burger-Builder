import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
	state={
		showSideDrawer: false
	}

	sideDrawerCloseHandler = () =>{
		this.setState({showSideDrawer:false})
	}
	
	sideMenuToggle = () => {
		this.setState((prevState)=> {
			return {showSideDrawer: !prevState.showSideDrawer}
		})
	}
	
	render(){
		return(
			<Aux>
				<Toolbar Clicked={this.sideMenuToggle}/>
				<SideDrawer open={this.state.showSideDrawer}
					closed={this.sideDrawerCloseHandler} />
				<main style={{'margin': '80px'}}>
					{this.props.children}
				</main>
			</Aux>
		)
	}
	
}

export default Layout;