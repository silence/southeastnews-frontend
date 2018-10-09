const defaultState = {
    isLogin: false,
    isAdmin: false,
    success: false,
    errorMessage: '',
    username: ''
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'GET_USER_INFO_FULFILLED': {
            return {
                ...state,
                isLogin: action.payload.data.islogin,
                isAdmin: action.payload.data.isadmin,
                username: action.payload.data.username
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
                success: action.payload.data.success,
                errorMessage: action.payload.data.errormessage
            }
        }
        default:
            return state
    }
}
