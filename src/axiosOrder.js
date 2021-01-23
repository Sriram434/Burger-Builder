import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-burger-76b92.firebaseio.com/'
})

export default instance;