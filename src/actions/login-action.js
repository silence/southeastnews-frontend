import { client } from './'
const url = '/'

export function getUserInfo() {
    return dispatch => {
        return dispatch({
            type: 'GET_USER_INFO',
            payload: client.get(`${url}/userInfo`)
        })
    }
}

export function login(userData) {
    return dispatch => {
        return dispatch({
            type: 'LOGIN',
            payload: client.post(url, userData)
        })
    }
}
