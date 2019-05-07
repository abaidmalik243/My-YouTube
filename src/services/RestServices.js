import axios from 'axios';
import { BASE_URL } from '../constants/Application';

const RestService = {

    addVideo: (data) => {
        // console.log('check data at services: ', data);
        return axios.post(BASE_URL + 'video/add', data);

    },
}

export default RestService;
