/**
 * ugly code (:
 * need to refactor
 */

import React, { Component } from 'react'
import {
    Layout,
    Menu,
    Icon,
    Input,
    Card,
    Form,
    DatePicker,
    Divider,
    List,
    Tag,
    Select,
    Radio,
    Spin
} from 'antd'
import styles from './index.module.scss'
import TagSelect from './TagSelect'
import FlipMove from 'react-flip-move'
import Pie from './Pie'
import { Link } from 'react-router-dom'
import SoutheastAsiaMatch from './Southeast-Asia-Match'

const RadioGroup = Radio.Group
// const CheckboxGroup = Checkbox.Group
const { RangePicker } = DatePicker
const FormItem = Form.Item
const { Header, Content, Footer } = Layout
const Search = Input.Search
const Option = Select.Option
//const websitesFromServer = ['metrotv', 'sindonews', 'liputan6', 'ripublika']
// const lanOptionsFromServer = [
//     { label: '印度尼西亚语', value: 'Indonesia' },
//     { label: '越南语', value: 'Vietnam', disabled: true },
//     { label: '马来西亚语', value: 'Malaysia', disabled: true }
// ]

const device = window.matchMedia('(max-width: 700px)').matches // true: mobile , false: PC

// const listData = [
//     {
//         author: 'Tanti Yulianingsih ',
//         url:
//             'http://global.liputan6.com/read/3071643/kabar-gembira-banyak-lowongan-chef-di-australia',
//         media: 'Liputan6.com, Melbourne ',
//         abstract: 'Australia ternyata melirik juru masak dari Indonesia. Tertarik melamar?',
//         site: 'liputan6',
//         news_title: 'Kabar Gembira, Banyak Lowongan Chef di Australia',
//         public_date: '2017-08-26T00:00:00.000Z'
//     }
// ]

class SearchWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expand: false,
            activeTabKey: 'tab1',
            // websites: ['metrotv', 'sindonews', 'liputan6', 'ripublika']
            activeLan: 'Indonesia'
        }
        this.inputRef = React.createRef() //to handle the input focus
    }

    componentDidMount() {
        this.inputRef.input.input.focus = () => {} // f**k the origin focus behavior because of https://github.com/ant-design/ant-design/blob/master/components/input/Search.tsx#L27
    }

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

    handleTabChange = key => {
        console.log(key)
        this.setState({ activeTabKey: key })
    }

    handleLanguageSelect = e => {
        this.setState({ activeLan: e.target.value })
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                const fieldValues = {
                    ...values,
                    // dateRange: default is ALL time
                    dateRange: device
                        ? values['rangeMin'] && values['rangeMax']
                            ? [values['rangeMin'], values['rangeMax']]
                            : ['1000-01-01', '3000-01-01']
                        : values['dateRange']
                        ? [
                              values['dateRange'][0].format('YYYY-MM-DD'),
                              values['dateRange'][1].format('YYYY-MM-DD')
                          ]
                        : ['1000-01-01', '3000-01-01'],
                    sortMode: this.state.expand
                        ? [values['sortModeFirst'], values['sortModeSecond']]
<<<<<<< HEAD
                        : ['score', 'desc'],
=======
                        : ['time', 'desc'],
>>>>>>> github
                    // from: 0 // no need
                    language: values['language'].toLowerCase()
                }
                delete fieldValues.sortModeFirst
                delete fieldValues.sortModeSecond
                delete fieldValues.rangeMax
                delete fieldValues.rangeMin
                console.log(fieldValues)
                this.props.fetchSearchResults(fieldValues)

                const chartFieldValues = {
                    ...this.props.form.getFieldsValue(['dataRange', 'language', 'index', 'query']),
                    dateRange: device
                        ? values['rangeMin'] && values['rangeMax']
                            ? [values['rangeMin'], values['rangeMax']]
                            : ['1000-01-01', '3000-01-01']
                        : values['dateRange']
                        ? [
                              values['dateRange'][0].format('YYYY-MM-DD'),
                              values['dateRange'][1].format('YYYY-MM-DD')
                          ]
                        : ['1000-01-01', '3000-01-01'],
                    language: values['language'].toLowerCase()
                }
                this.props.chartApi(chartFieldValues)

                // this.props.chartApi(
                //     this.props.form.getFieldsValue(['dateRange', 'language', 'index', 'query'])
                // )
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
            labelCol: { span: 3 },
            wrapperCol: { span: 14, offset: 1 }
        }
        const tabList = [
            {
                key: 'tab1',
                tab: (
                    <>
                        <Icon type="ordered-list" theme="outlined" />
                        <span>搜索结果</span>
                    </>
                )
            },
            {
                key: 'tab2',
                tab: (
                    <>
                        <Icon type="pie-chart" theme="outlined" />
                        <span>统计信息</span>
                    </>
                )
            }
        ]

        const AdvanceSearch = this.state.expand ? (
            <div className="advanced-search">
                <Divider dashed />
                <FormItem label="排序模式1" {...formLayout}>
                    {getFieldDecorator('sortModeFirst', {
                        initialValue: 'time'
                    })(
                        <Select style={{ width: '30%' }}>
                            <Option value="score">按关联度排序</Option>
                            <Option value="time">按时间排序</Option>
                        </Select>
                    )}
                </FormItem>
                <Divider dashed />
                <FormItem label="排序模式2" {...formLayout}>
                    {getFieldDecorator('sortModeSecond', {
                        initialValue: 'desc'
                    })(
                        <Select style={{ width: '30%' }}>
                            <Option value="desc">降序</Option>
                            <Option value="asc">升序</Option>
                        </Select>
                    )}
                </FormItem>
                <Divider dashed />
                <FormItem label="统计时间段划分" {...formLayout}>
                    {getFieldDecorator('timeDivide', {
                        initialValue: 'year'
                    })(
                        <Select style={{ width: '30%' }}>
                            <Option value="year">年</Option>
                            <Option value="halfYear">半年</Option>
                            <Option value="quarter">季度</Option>
                            <Option value="month">月</Option>
                        </Select>
                    )}
                </FormItem>
            </div>
        ) : null

        const SearchResults = (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page)
                        this.props.setCurrentPage(page)
                    },
                    current: this.props.currentPage,
                    pageSize: 10
                }}
                loading={this.props.fetchResultsLoading}
                // dataSource={listData}
                dataSource={this.props.resultsList}
                renderItem={item => (
                    <List.Item
                        key={item.news_title}
                        actions={[
                            <Link to={`/search/${item.newsid}`}>在线阅读</Link>,
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                                <span>源网站阅读</span>
                            </a>
                            // <span>test3</span>
                        ]}
                    >
                        <List.Item.Meta
                            title={<Link to={`/search/${item.newsid}`}>{item.news_title}</Link>}
                            description={
                                <span>
                                    作者：
                                    <Tag color="blue">{item.author ? item.author : '未知'}</Tag>
                                    网站：
                                    <Tag color="green">{item.site}</Tag>
                                    发表时间：
                                    <Tag color="magenta">{item.public_date.slice(0, 10)}</Tag>
                                </span>
                            }
                        />
                        {`摘要：${item.abstract}`}
                    </List.Item>
                )}
            />
        )

        const MobileDateRange = (
            <FormItem label="时间范围选择" {...formLayout}>
                <Input.Group compact>
                    {getFieldDecorator('rangeMin', {
                        rules: [
                            {
                                pattern: /[12]\d\d\d-((0[1-9])|(1[012]))-((0[1-9])|(1\d)|(2\d)|(3[01]))/,
                                message: '格式不正确'
                            }
                        ]
                    })(
                        <Input
                            style={{ width: 120, textAlign: 'center' }}
                            placeholder="2000-01-01"
                        />
                    )}
                    <Input
                        style={{
                            width: 30,
                            borderLeft: 0,
                            pointerEvents: 'none',
                            backgroundColor: '#fff'
                        }}
                        placeholder="~"
                        disabled
                    />
                    {getFieldDecorator('rangeMax', {
                        rules: [
                            {
                                pattern: /[12]\d\d\d-((0[1-9])|(1[012]))-((0[1-9])|(1\d)|(2\d)|(3[01]))/,
                                message: '格式不正确'
                            }
                        ]
                    })(
                        <Input
                            style={{ width: 120, textAlign: 'center', borderLeft: 0 }}
                            placeholder="2020-01-01"
                        />
                    )}
                </Input.Group>
            </FormItem>
        )

        const PCDateRange = (
            <FormItem label="时间范围选择" {...formLayout}>
                {getFieldDecorator('dateRange', {})(<RangePicker />)}
            </FormItem>
        )

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
                                    paddingLeft: '24px'
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
                                                onSearch={e => {
                                                    console.log(e)
                                                    this.handleSubmit()
                                                    // this.inputRef.blur() // see https://github.com/ant-design/ant-design/blob/master/components/input/Search.tsx#L34
                                                    console.log(this.inputRef)
                                                }}
                                                ref={ref => (this.inputRef = ref)}
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
                                            // initialValue: [
                                            //     'metrotv',
                                            //     'sindonews',
                                            //     'liputan6',
                                            //     'ripublika'
                                            // ],
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择至少一个网站'
                                                }
                                            ]
                                        })(
                                            <TagSelect expandable className="tag-select">
                                                {this.props.getIndexLoading ? (
                                                    <Spin />
                                                ) : (
                                                    this.props.languages[this.state.activeLan].map(
                                                        website => {
                                                            return (
                                                                <TagSelect.Option
                                                                    value={website}
                                                                    key={website}
                                                                >
                                                                    {website}
                                                                </TagSelect.Option>
                                                            )
                                                        }
                                                    )
                                                )}
                                            </TagSelect>
                                        )}
                                    </FormItem>
                                    <Divider dashed />

                                    {device ? MobileDateRange : PCDateRange}

                                    <Divider dashed />
                                    <div style={{ position: 'relative' }}>
                                        <FormItem label="语种选择" {...formLayout}>
                                            {getFieldDecorator('language', {
                                                initialValue: 'Indonesia'
                                            })(
                                                this.props.getIndexLoading ? (
                                                    <Spin />
                                                ) : (
                                                    <RadioGroup
                                                        options={SoutheastAsiaMatch(
                                                            this.props.languages
                                                        )}
                                                        onChange={e => this.handleLanguageSelect(e)}
                                                    />
                                                )
                                            )}
                                        </FormItem>
                                        {/* eslint-disable-next-line*/}
                                        <a className={styles.toggle} onClick={this.handleToggle}>
                                            高级搜索
                                            <Icon type={this.state.expand ? 'up' : 'down'} />
                                        </a>
                                    </div>
                                    <FlipMove
                                        enterAnimation="accordionVertical"
                                        leaveAnimation="fade"
                                    >
                                        {AdvanceSearch}
                                    </FlipMove>
                                </Card>
                                <Card
                                    bordered={false}
                                    style={{ marginTop: '24px' }}
                                    tabList={tabList}
                                    onTabChange={key => this.handleTabChange(key)}
                                    activeTabKey={this.state.activeTabKey}
                                >
                                    {this.state.activeTabKey === 'tab1' ? (
                                        SearchResults
                                    ) : this.props.chartLoading ? (
                                        <Spin />
                                    ) : (
                                        <>
                                            <Pie
                                                data={this.props.countResult}
                                                guideTitle="各新闻网站报道数量比例"
                                            />
                                            <GeneratePies timeResult={this.props.timeResult} />
                                        </>
                                    )}
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

function GeneratePies({ timeResult }) {
    const timePie = []
    for (let [key, value] of Object.entries(timeResult)) {
        timePie.push(
            <Pie data={value} key={key} guideTitle={`${key.split('_')[1]}不同时间段报道比例`} />
        )
    }
    return <div>{timePie}</div>
}

export default Form.create({})(SearchWrapper)
