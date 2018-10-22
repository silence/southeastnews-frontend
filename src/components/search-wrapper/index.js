import React, { Component } from 'react'
import {
    Layout,
    Menu,
    Icon,
    Input,
    Card,
    Form,
    Checkbox,
    DatePicker,
    Divider,
    List,
    Tag
} from 'antd'
import styles from './index.module.scss'
import TagSelect from '../TagSelect'

const CheckboxGroup = Checkbox.Group
const { RangePicker } = DatePicker
const FormItem = Form.Item
const { Header, Content, Footer } = Layout
const Search = Input.Search
const websitesFromServer = ['metrotv', 'sindonews', 'liputan6', 'ripublika']
const lanOptionsFromServer = [
    { label: '越南语', value: 'Vietnam', disabled: true },
    { label: '印度尼西亚语', value: 'Indonesia' },
    { label: '马来西亚语', value: 'Malaysia', disabled: true }
]

const listData = [
    {
        author: 'Tanti Yulianingsih ',
        url:
            'http://global.liputan6.com/read/3071643/kabar-gembira-banyak-lowongan-chef-di-australia',
        media: 'Liputan6.com, Melbourne ',
        abstract: 'Australia ternyata melirik juru masak dari Indonesia. Tertarik melamar?',
        site: 'liputan6',
        news_title: 'Kabar Gembira, Banyak Lowongan Chef di Australia',
        public_date: '2017-08-26T00:00:00.000Z'
    }
]

class SearchWrapper extends Component {
    state = {
        selectedWebsites: []
    }

    handleWebsiteCheck = (website, isCheck) => {}

    handleNavClick = e => {
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
        const { getFieldDecorator } = this.props.form
        const formLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 14, offset: 1 }
        }
        return (
            <Layout className={styles.layout}>
                <Header
                    style={{
                        padding: '0'
                    }}
                >
                    <div className={styles['nav-header']}>
                        <Menu
                            onClick={this.handleNavClick}
                            mode="horizontal"
                            style={{ lineHeight: '63px' }}
                        >
                            <Menu.Item
                                key="displayLogo"
                                style={{
                                    borderBottom: '0',
                                    fontSize: 20,
                                    color: '#1890ff',
                                    padding: '0'
                                }}
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
                <Content>
                    <div className={styles['page-content']}>
                        <div className={styles['content-wrapper']}>
                            <h1>搜索列表</h1>
                            <div className={styles['search-wrapper']}>
                                <Search
                                    placeholder="关键字、作者、新闻标题"
                                    enterButton="搜索"
                                    size="large"
                                    onSearch={value => console.log(value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles['list-content']}>
                        <div className={styles['grid-content']}>
                            <Card bordered={false}>
                                <Form layout="horizontal">
                                    <FormItem label="网站选择" {...formLayout}>
                                        {getFieldDecorator('website', {})(
                                            <TagSelect>
                                                {websitesFromServer.map(website => {
                                                    return (
                                                        <TagSelect.Option
                                                            value={website}
                                                            key={website}
                                                        >
                                                            {website}
                                                        </TagSelect.Option>
                                                    )
                                                })}
                                            </TagSelect>
                                        )}
                                    </FormItem>
                                    <Divider dashed />
                                    <FormItem label="语种选择" {...formLayout}>
                                        {getFieldDecorator('lanSelect', {
                                            initialValue: ['Indonesia']
                                        })(<CheckboxGroup options={lanOptionsFromServer} />)}
                                    </FormItem>
                                    <Divider dashed />
                                    <FormItem label="时间范围选择" {...formLayout}>
                                        {getFieldDecorator('range-picker')(<RangePicker />)}
                                    </FormItem>
                                </Form>
                            </Card>
                            <Card bordered={false} style={{ marginTop: '24px' }}>
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={{
                                        onChange: page => {
                                            console.log(page)
                                        },
                                        pageSize: 10
                                    }}
                                    dataSource={listData}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.news_title}
                                            actions={[
                                                <span>test1</span>,
                                                <span>test2</span>,
                                                <span>test3</span>
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={item.news_title}
                                                description={
                                                    <span>
                                                        <Tag>{item.author}</Tag>
                                                        <Tag>{item.site}</Tag>
                                                        {/* <Tag>{item.public_data}</Tag> */}
                                                    </span>
                                                }
                                            />
                                            {item.abstract}
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2018 StarStudio</Footer>
            </Layout>
        )
    }
}

class SearchResultsList extends Component {
    render() {
        return <h1>test</h1>
    }
}

export default Form.create({
    onValuesChange(_, values) {
        console.log(values)
    }
})(SearchWrapper)
