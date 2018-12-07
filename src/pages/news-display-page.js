import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserInfo } from '../actions/login-action'
import { pushNews } from '../actions/push-action'
import NewsDisplay from '../components/news-display'
class NewsDisplayPage extends Component {
    render() {
        console.log(this.props)
        return (
            <NewsDisplay
                resultsList={this.props.resultsList}
                id={this.props.match.params.id}
                history={this.props.history}
                getUserInfo={this.props.getUserInfo}
                pushNews={this.props.pushNews}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        resultsList: state.searchStore.resultsList
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { getUserInfo, pushNews }
    )(NewsDisplayPage)
)
