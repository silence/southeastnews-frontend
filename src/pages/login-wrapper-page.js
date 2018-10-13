import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, getUserInfo } from '../actions/login-action'
import { withRouter } from 'react-router-dom'
import LoginWrapper from '../components/login-wrapper'

class LoginWrapperPage extends Component {
    render() {
        return (
            <>
                {console.log(this.props)}
                {this.props.success || this.props.isLogin ? (
                    (this.props.getUserInfo(), this.props.history.push('/search'))
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
        isLogin: state.loginStore.isLogin
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { login, getUserInfo }
    )(LoginWrapperPage)
)
