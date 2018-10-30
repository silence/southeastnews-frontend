import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchWrapper from '../components/search-wrapper'
import { withRouter } from 'react-router-dom'
import { getUserInfo, logout } from '../actions/login-action'
import { fetchSearchResults, getIndex, chartApi } from '../actions/search-action'

class SearchWrapperPage extends Component {
    componentDidMount() {
        this.props.getIndex()
    }
    render() {
        return (
            <>
                {console.log(this.props)}
                <SearchWrapper
                    // isAdmin={this.props.isAdmin}
                    // getUserInfo={this.props.getUserInfo}
                    // history={this.props.history}
                    // logout={this.props.logout}
                    {...this.props}
                />
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAdmin: state.loginStore.isAdmin,
        fetchResultsLoading: state.searchStore.fetchResultsLoading,
        resultsList: state.searchStore.resultsList,
        languages: state.searchStore.languages,
        countResult: state.searchStore.countResult,
        timeResult: state.searchStore.timeResult
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { getUserInfo, logout, fetchSearchResults, getIndex, chartApi }
    )(SearchWrapperPage)
)
