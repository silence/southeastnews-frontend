import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import './search-wrapper.module.scss'

const { Header, Content, Footer } = Layout

class SearchWrapper extends Component {
    render() {
        return (
            <Layout className="layout">
                <Header style={{ background: '#f0f2f5' }}>
                    <Menu>
                        <Menu.Item key="xadmin">
                            <Icon type="user" theme="outlined" /> 管理员
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <h1>content</h1>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default SearchWrapper
