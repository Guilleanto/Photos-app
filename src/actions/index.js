import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_ERROR} from '../constants/index'
import getDataApi from '../api/api'

export const  getData = () => {
    return {
        type: FETCHING_DATA
        }
}

export const getDataSuccess = data => {
    return {
        type: FETCHING_DATA_SUCCESS,
        data
    }
}

export const getDataFailure = (err) => {

    return {
        FETCHING_DATA_ERROR,
        err 
    }
};

export const fetchData = (query) => {
    return (dispatch) => {
        console.log('ESTOY EN EL ACTION', query);
        dispatch(getData())
        getDataApi(query)
            .then(([response, json]) => {
               
                console.log('success query fecthdata', response, json)
                dispatch(getDataSuccess(json))
            })
            .catch((err) => dispatch(getDataFailure(err)))
    }
}