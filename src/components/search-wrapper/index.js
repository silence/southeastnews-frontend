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
        if (e.key === 'logout') {
            this.props.logout()
            this.props.getUserInfo()
            this.props.history.push('/login')
        }
    }
    render() {
        const admin = this.props.isAdmin ? (
            <Menu.Item key="admin" className={styles.floatRight}>
                <Icon type="user" theme="outlined" /> 管理员
            </Menu.Item>
        ) : null
        return (
            <Layout className={styles.layout}>
                <Header style={{ background: '#f0f2f5', padding: '0' }}>
                    <div className={styles['nav-header']}>
                        <Menu
                            onClick={this.handleClick}
                            mode="horizontal"
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item
                                key="displayLogo"
                                style={{ 'border-bottom': '0', fontSize: 20, color: '#1890ff' }}
                            >
                                东南亚新闻搜索
                            </Menu.Item>
                            <Menu.Item key="logout" className={styles.floatRight}>
                                <Icon type="logout" theme="outlined" /> 登出
                            </Menu.Item>
                            {admin}
                        </Menu>
                    </div>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <h1>content</h1>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2018 StarStudio</Footer>
            </Layout>
        )
    }
}

export default SearchWrapper
