import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Route exact path="/" component={Test} />
            </Switch>
        )
    }
}

const Test = () => {
    return <h1>test</h1>
}

const Login = () => {
    return <h1>login</h1>
}

export default App
