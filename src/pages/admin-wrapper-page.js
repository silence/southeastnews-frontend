import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AdminWrapper from '../components/admin-wrapper'
import { getUserList, addUser, deleteUser, changePwd } from '../actions/admin-action'
import { getUserInfo, logout } from '../actions/login-action'

class AdminWrapperPage extends Component {
    render() {
        return (
            <>
                {console.log(this.props)}
                {this.props.isAdmin ? (
                    <AdminWrapper
                        // getUserList={this.props.getUserList}
                        // addUser={this.props.addUser}
                        // deleteUser={this.props.deleteUser}
                        // changePwd={this.changePwd}
                        // getUserListLoading={this.props.getUserListLoading}
                        // userList={this.props.userList}
                        {...this.props}
                    />
                ) : (
                    (this.props.getUserInfo(), this.props.history.push('/search'))
                )}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAdmin: state.loginStore.isAdmin,
        getUserListLoading: state.adminStore.getUserListLoading,
        userList: state.adminStore.userList
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { getUserList, addUser, deleteUser, changePwd, getUserInfo, logout }
    )(AdminWrapperPage)
)
