import { client } from './'
const url = '/southeast_news_backend/login'

export function getUserInfo() {
    return dispatch => {
        return dispatch({
            type: 'GET_USER_INFO',
            payload: client.get(`${url}/userInfo.php`)
        })
    }
}

export function login(userData) {
    return dispatch => {
        return dispatch({
            type: 'LOGIN',
            payload: client.post(`${url}/login.php`, userData)
        })
    }
}
