import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/login-action'
import { Redirect } from 'react-router-dom'
import LoginWrapper from '../components/login-wrapper'

class LoginWrapperPage extends Component {
    render() {
        return (
            <>
                {this.props.success ? (
                    <Redirect to="/search" />
                ) : (
                    <LoginWrapper login={this.props.login} errorMessage={this.props.errorMessage} />
                )}
            </>
        )
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
)(LoginWrapperPage)
