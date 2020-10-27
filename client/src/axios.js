import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://solati-test.herokuapp.com/api'
});

export default instance;