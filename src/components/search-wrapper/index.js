import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import styles from './index.module.scss'

const { Header, Content, Footer } = Layout

class SearchWrapper extends Component {
    handleClick = e => {
        console.log(e)
        e.domEvent.preventDefault()
        if (e.key === 'admin') {
            this.props.getUserInfo()
            this.props.history.push('/admin')
        }
    }
    render() {
        const admin = this.props.isAdmin ? (
            <Menu.Item key="admin" className={styles.floatRight}>
                <Icon type="user" theme="outlined" /> 管理员
            </Menu.Item>
        ) : null
        return (
            <Layout className="layout">
                <Header style={{ background: '#f0f2f5' }}>
                    <Menu onClick={this.handleClick} mode="horizontal">
                        <Menu.Item key="lougout" className={styles.floatRight}>
                            <Icon type="logout" theme="outlined" /> 登出
                        </Menu.Item>
                        {admin}
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <h1>content</h1>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2018 星辰工作室</Footer>
            </Layout>
        )
    }
}

export default SearchWrapper
