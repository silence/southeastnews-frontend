import React, { Component } from 'react'
import WrappedNormalLoginForm from './login-form'
import styles from './login-wrapper.module.scss'

class LoginWrapper extends Component {
    render() {
        return (
            <div className={styles['login-wrapper']}>
                <div className={styles.wrapper} />
                <div className={styles['login-form']}>
                    <WrappedNormalLoginForm
                        login={this.props.login}
                        errorMessage={this.props.errorMessage}
                    />
                </div>
            </div>
        )
    }
}

export default LoginWrapper
