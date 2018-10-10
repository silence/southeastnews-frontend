import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'

class SearchPage extends Component {
    render() {
        return <></>
    }
}

function mapStateToProps(state) {
    return {
        success: state.loginStore.success,
        errorMessage: state.loginStore.errorMessage,
        isAdmin: state.loginStore.isAdmin
    }
}

export default connect(
    mapStateToProps,
    { login }
)(SearchPage)
