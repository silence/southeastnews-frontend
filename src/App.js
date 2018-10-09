import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginWrapperPage from './pages/login-wrapper-page'
import UserInfoCheckPage from './pages/userinfo-check-page'

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={LoginWrapperPage} />
                <Route path="/" component={UserInfoCheckPage} />
                <Route path="/search" component={Search} />
            </Switch>
        )
    }
}

const Search = () => {
    return <h1>search page</h1>
}

export default App
