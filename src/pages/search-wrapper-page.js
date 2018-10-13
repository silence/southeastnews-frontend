import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchWrapper from '../components/search-wrapper'
import { withRouter } from 'react-router-dom'
import { getUserInfo } from '../actions/login-action'

class SearchWrapperPage extends Component {
    render() {
        return (
            <>
                {console.log(this.props)}
                <SearchWrapper
                    isAdmin={this.props.isAdmin}
                    getUserInfo={this.props.getUserInfo}
                    history={this.props.history}
                />
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAdmin: state.loginStore.isAdmin
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { getUserInfo }
    )(SearchWrapperPage)
)
