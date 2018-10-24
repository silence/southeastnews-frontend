const defaultState = {
    fetchResultsLoading: 0,
    resultsList: []
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'FETCH_SEARCH_RESULTS_PENDING': {
            return {
                ...state,
                fetchResultsLoading: 1
            }
        }
        case 'FETCH_SEARCH_RESULTS_FULFILLED': {
            return {
                ...state,
                fetchResultsLoading: 0,
                resultsList: action.payload.data
            }
        }
        default:
            return state
    }
}
