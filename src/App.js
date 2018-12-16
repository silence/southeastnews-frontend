import React, { Component, Suspense, lazy } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo } from './actions/login-action'
import { withRouter } from 'react-router-dom'
import { Spin } from 'antd'
// import LoginWrapperPage from './pages/login-wrapper-page'
// import SearchWrapperPage from './pages/search-wrapper-page'
// import AdminWrapperPage from './pages/admin-wrapper-page'
import NewsDisplayPage from './pages/news-display-page'

const LoginWrapperPage = lazy(() => import('./pages/login-wrapper-page'))
const SearchWrapperPage = lazy(() => import('./pages/search-wrapper-page'))
const AdminWrapperPage = lazy(() => import('./pages/admin-wrapper-page'))
// news-display page cannot split code from route because of multilevel route
// const NewsDisplayPage = lazy(() => import('./pages/news-display-page'))

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
        if (process.env.NODE_ENV !== 'development') {
            console.log = () => {}
        }

        console.log(this.props)
        const path = this.props.location.pathname

        if (this.props.getUserInfoLoading) {
            return <Loading />
        } else {
            return (
                <>
                    {this.props.isLogin
                        ? path === '/admin' || /^\/search(\/\d+)?$/.test(path)
                            ? null
                            : this.props.history.push('/search')
                        : path === '/login'
                        ? null
                        : this.props.history.push('/login')}
                    <Suspense fallback={<Loading />}>
                        <Route path="/login" component={LoginWrapperPage} />
                        <Route exact path="/search" component={SearchWrapperPage} />
                        <Route path="/admin" component={AdminWrapperPage} />
                        <Route path="/search/:id" component={NewsDisplayPage} />
                    </Suspense>
                </>
            )
        }
    }
}

function Loading() {
    return (
        <div className="spin-wrapper">
            <Spin
                size="large"
                style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}
            />
        </div>
    )
}

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
