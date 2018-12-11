import axios from 'axios'

export function pushNews(data) {
    return dispatch => {
        return dispatch({
            type: 'PUSH_NEWS',
            payload: axios({
                method: 'post',
                url: '/receive_data/post_data/',
                data: data,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
        })
    }
}
