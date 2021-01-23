import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary'

const errorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state={
			error: null 
		}
	 
		componentWillMount(){
			//Clearing the error msg in req which we get from res
			this.reqIntercep = axios.interceptors.request.use(req =>{
				this.setState({error: null})
				return req 
			})
			//Fetching the error msg from the response
			this.resIntercep = axios.interceptors.response.use(res => res , error=> {
				this.setState({error: error})
			})
		}
		
		componentWillUnmount(){
			// console.log('component will inmount', this.reqIntercep, this.resIntercep)
			axios.interceptors.request.eject(this.reqIntercep)
			axios.interceptors.response.eject(this.resIntercep)
		}
		
		errorBackDrop = () =>{
			this.setState({error: null})
		}
	
		render(){
			return(
				<Aux>
					<Modal show={this.state.error} modalClosed={this.errorBackDrop}>
						{this.state.error ?  this.state.error.message : null }
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>

			)
		}
		
	}
}

export default errorHandler;