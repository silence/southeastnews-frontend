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
    Tag,
    Select,
    Radio
} from 'antd'
import styles from './index.module.scss'
import TagSelect from './TagSelect'

const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const { RangePicker } = DatePicker
const FormItem = Form.Item
const { Header, Content, Footer } = Layout
const Search = Input.Search
const Option = Select.Option
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
        expand: false
    }

    handleWebsiteCheck = (website, isCheck) => {}

    handleToggle = () => {
        const { expand } = this.state
        this.setState({ expand: !expand })
    }

    handleNavClick = e => {
        console.log(e)
        e.domEvent.preventDefault()
        if (e.key === 'admin') {
            this.props.getUserInfo()
            this.props.history.push('/admin')
        }
        if (e.key === 'logout') {
            this.props.logout().then(() => this.props.getUserInfo())
            this.props.history.push('/login')
        }
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                const fieldValues = {
                    ...values,
                    dateRange: [
                        values['dateRange'][0].format('YYYY-MM-DD'),
                        values['dateRange'][1].format('YYYY-MM-DD')
                    ],
                    sortMode: [values['sortMode'], values['searchMode']],
                    from: 0
                }
                delete fieldValues.searchMode
                console.log(fieldValues)
                this.props.fetchSearchResults(fieldValues)
            }
        })
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
                    <Form layout="horizontal">
                        <div className={styles['page-content']}>
                            <div className={styles['content-wrapper']}>
                                <h1>搜索列表</h1>
                                <div className={styles['search-wrapper']}>
                                    <FormItem>
                                        {getFieldDecorator('query', {
                                            rules: [{ required: true, message: '请输入搜索关键字' }]
                                        })(
                                            <Search
                                                placeholder="关键字、作者、新闻标题"
                                                enterButton="搜索"
                                                size="large"
                                                onSearch={this.handleSubmit}
                                            />
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                        </div>
                        <div className={styles['list-content']}>
                            <div className={styles['grid-content']}>
                                <Card bordered={false}>
                                    <FormItem label="网站选择" {...formLayout}>
                                        {getFieldDecorator('index', {
                                            initialValue: [
                                                'metrotv',
                                                'sindonews',
                                                'liputan6',
                                                'ripublika'
                                            ]
                                        })(
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
                                        {getFieldDecorator('language', {
                                            initialValue: 'Indonesia'
                                        })(<RadioGroup options={lanOptionsFromServer} />)}
                                    </FormItem>
                                    <Divider dashed />
                                    <div style={{ position: 'relative' }}>
                                        <FormItem label="时间范围选择" {...formLayout}>
                                            {getFieldDecorator('dateRange', {
                                                rules: [{ required: true }]
                                            })(<RangePicker />)}
                                        </FormItem>
                                        {/* eslint-disable-next-line*/}
                                        <a className={styles.toggle} onClick={this.handleToggle}>
                                            高级搜索
                                            <Icon type={this.state.expand ? 'up' : 'down'} />
                                        </a>
                                    </div>
                                    <div
                                        className="advanced-search"
                                        style={{ display: this.state.expand ? 'block' : 'none' }}
                                    >
                                        <Divider dashed />
                                        <FormItem label="排序模式2" {...formLayout}>
                                            {getFieldDecorator('searchMode', {
                                                initialValue: 'desc'
                                            })(
                                                <Select style={{ width: '30%' }}>
                                                    <Option value="desc">降序</Option>
                                                    <Option value="asc">升序</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                        <Divider dashed />
                                        <FormItem label="排序模式1" {...formLayout}>
                                            {getFieldDecorator('sortMode', {
                                                initialValue: 'score'
                                            })(
                                                <Select style={{ width: '30%' }}>
                                                    <Option value="score">按关联度排序</Option>
                                                    <Option value="time">按时间排序</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                    </div>
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
                                        // dataSource={listData}
                                        dataSource={this.props.resultsList}
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
                    </Form>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2018 StarStudio</Footer>
            </Layout>
        )
    }
}

// class SearchResultsList extends Component {
//     render() {
//         return <h1>test</h1>
//     }
// }

export default Form.create({
    onValuesChange(_, values) {
        console.log(values)
    }
})(SearchWrapper)
