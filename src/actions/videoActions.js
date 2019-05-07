import { ADD_VIDEO } from './../constants/VideoConstants';
import RestService from '../services/RestServices';


export function addVideo(data) {
    return (dispatch) => {
        console.log("hello at action", data);
        RestService.addVideo(data).then((response) => {
            console.log('successfully save data');
            // if (RestService.checkAuth(response.data)) {
                dispatch({
                    type: ADD_VIDEO,
                    response: response.data,
                    payload: {
                        formData: data,
                    }
                });
            // } else {
            //     dispatch({
            //         type: INVALID_TOKEN
            //     })
            // }
        });
    }
}
