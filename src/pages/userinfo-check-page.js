import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../actions/login-action'
import { Redirect } from 'react-router-dom'

class UserInfoCheckPage extends Component {
    componentDidMount() {
        this.props.getUserInfo()
    }

    render() {
        return <>{this.props.isLogin ? null : <Redirect to="/login" />}</>
    }
}

function mapStateToProps(state) {
    return {
        isLogin: state.loginStore.isLogin
    }
}

export default connect(
    mapStateToProps,
    { getUserInfo }
)(UserInfoCheckPage)
