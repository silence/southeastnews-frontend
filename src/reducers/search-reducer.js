const defaultState = {
    fetchResultsLoading: 0,
    resultsList: [],
    languages: null,
    countResult: [],
    timeResult: null
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
        case 'GET_INDEX_FULFILLED': {
            return {
                ...state,
                languages: action.payload.data
                // languages: Object.keys(action.payload.data).map(lan =>
                //     lan.replace(/^[a-z]/, l => l.toUpperCase())
                // )
            }
        }
        case 'CHART_API_FULFILLED': {
            return {
                ...state,
                countResult: action.payload.data.count_result,
                timeResult: action.payload.data.time_result
            }
        }
        default:
            return state
    }
}
