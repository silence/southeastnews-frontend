const defaultState = {
    fetchResultsLoading: false,
    resultsList: [],
    languages: null,
    countResult: [],
    timeResult: null,
    chartLoading: 1,
    getIndexLoading: 1,
    currentPage: 1
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'FETCH_SEARCH_RESULTS_PENDING': {
            return {
                ...state,
                fetchResultsLoading: true
            }
        }
        case 'FETCH_SEARCH_RESULTS_FULFILLED': {
            return {
                ...state,
                fetchResultsLoading: false,
                resultsList: action.payload.data
            }
        }
        case 'GET_INDEX_PENDING': {
            return {
                ...state,
                getIndexLoading: 1
            }
        }
        case 'GET_INDEX_FULFILLED': {
            return {
                ...state,
                languages: action.payload.data,
                getIndexLoading: 0
                // languages: Object.keys(action.payload.data).map(lan =>
                //     lan.replace(/^[a-z]/, l => l.toUpperCase())
                // )
            }
        }
        case 'CHART_API_PENDING': {
            return {
                ...state,
                chartLoading: 1
            }
        }
        case 'CHART_API_FULFILLED': {
            return {
                ...state,
                countResult: action.payload.data.count_result,
                timeResult: action.payload.data.time_result,
                chartLoading: 0
            }
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.payload
            }
        }
        default:
            return state
    }
}
