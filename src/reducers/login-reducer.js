const defaultState = {
    loginState: null,
    isAdmin: false,
    success: false,
    error: ''
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'GET_USER_INFO_FULFILLED': {
            return {
                ...state,
                loginState: action.payload.data.loginState,
                isAdmin: action.payload.data.isAdmin
            }
        }
        case 'LOGIN_FULFILLED': {
            return {
                ...state,
                success: action.payload.data.success
            }
        }
        case 'LOGIN_REJECTED': {
            return {
                ...state,
                error: action.payload.data.message
            }
        }
        default:
            return state
    }
}
