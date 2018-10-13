const defaultState = {
    getUserListLoading: 1
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'GET_USER_LIST_PENDING': {
            return {
                ...state,
                getUserListLoading: 1
            }
        }
        case 'GET_USER_LIST_FULFILLED': {
            return {
                ...state,
                isLogin: action.payload.data.islogin,
                isAdmin: action.payload.data.isadmin,
                username: action.payload.data.username,
                getUserInfoLoading: 0
            }
        }

        default:
            return state
    }
}
