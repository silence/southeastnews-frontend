import { client } from './'
const url = '/southeast_news_backend/mongo-es/php_api'

export function fetchSearchResults(data) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_SEARCH_RESULTS',
            payload: client.post(`${url}/searchApi.php`, data)
        })
    }
}

export function getIndex() {
    return dispatch => {
        return dispatch({
            type: 'GET_INDEX',
            payload: client.get(`${url}/getIndex.php`)
        })
    }
}

export function chartApi(data) {
    return dispatch => {
        return dispatch({
            type: 'CHART_API',
            payload: client.post(`${url}/chartApi.php`, data)
        })
    }
}
