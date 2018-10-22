const defaultState = {
    getUserListLoading: 1,
    userList: []
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
                userList: action.payload.data.userlist,
                getUserListLoading: 0
            }
        }
        case 'ADD_USER_FULFILLED': {
            return {
                ...state
            }
        }
        case 'DELETE_USER_FULFILLED': {
            return {
                ...state
            }
        }
        case 'CHANGE_PWD_FULFILLED': {
            return {
                ...state
            }
        }

        default:
            return state
    }
}
