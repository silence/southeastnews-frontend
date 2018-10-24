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
