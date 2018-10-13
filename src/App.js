import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo } from './actions/login-action'
import { withRouter } from 'react-router-dom'
import { Spin } from 'antd'
import LoginWrapperPage from './pages/login-wrapper-page'
import SearchWrapper from './components/search-wrapper'

class App extends Component {
    componentDidMount() {
        this.props.getUserInfo()
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps)
    //     if (nextProps.location.pathname === this.props.location.pathname) {
    //         return false
    //     }
    //     return true
    // }

    render() {
        console.log(this.props)
        const path = this.props.location.pathname
        if (this.props.getUserInfoLoading) {
            return <Spin />
        } else {
            return (
                <>
                    {this.props.isLogin
                        ? path === '/xadmin' || path === '/search'
                            ? null
                            : this.props.history.push('/search')
                        : path === '/login'
                            ? null
                            : this.props.history.push('/login')}
                    <Route path="/login" component={LoginWrapperPage} />
                    <Route path="/search" component={SearchWrapper} />
                    <Route path="/xadmin" component={AdminPage} />
                </>
            )
        }
    }
}

const AdminPage = () => <h1>admin page</h1>

function mapStateToProps(state) {
    return {
        isLogin: state.loginStore.isLogin,
        getUserInfoLoading: state.loginStore.getUserInfoLoading
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { getUserInfo }
    )(App)
)
