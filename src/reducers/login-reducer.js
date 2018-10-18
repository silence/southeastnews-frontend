const defaultState = {
    isLogin: 0,
    isAdmin: 0,
    success: 0,
    errorMessage: '',
    username: '',
    getUserInfoLoading: 1
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'GET_USER_INFO_PENDING': {
            return {
                ...state,
                getUserInfoLoading: 1
            }
        }
        case 'GET_USER_INFO_FULFILLED': {
            return {
                ...state,
                isLogin: action.payload.data.islogin,
                isAdmin: action.payload.data.isadmin,
                username: action.payload.data.username,
                getUserInfoLoading: 0
            }
        }
        case 'LOGIN_FULFILLED': {
            return {
                ...state,
                success: action.payload.data.success,
                isAdmin: action.payload.data.isadmin
            }
        }
        case 'LOGIN_REJECTED': {
            return {
                ...state,
                success: action.payload.response.data.success,
                errorMessage: action.payload.response.data.errormessage
            }
        }
        case 'LOGOUT_FULFILLED': {
            return {
                ...state,
                success: 0
            }
        }
        default:
            return state
    }
}
