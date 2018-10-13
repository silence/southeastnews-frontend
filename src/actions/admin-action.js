import { client } from './'
const url = '/southeast_news_backend/admin'

export function getUserList() {
    return dispatch => {
        return dispatch({
            type: 'GET_USER_LIST',
            payload: client.get(`${url}/userList.php`)
        })
    }
}

export function addUser(userData) {
    return dispatch => {
        return dispatch({
            type: 'ADD_USER',
            payload: client.post(`${url}/addUser.php`, userData)
        })
    }
}

export function deleteUser(userId) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_USER',
            payload: client.post(`${url}/deleteUser.php`, userId)
        })
    }
}

export function changePwd(data) {
    return dispatch => {
        return dispatch({
            type: 'CHANGE_PWD',
            payload: client.post(`${url}/changepassword.php`, data)
        })
    }
}
