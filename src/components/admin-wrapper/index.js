import React, { Component } from 'react'
import {
    Table,
    Tag,
    Button,
    Modal,
    Form,
    Icon,
    Input,
    Radio,
    Popconfirm,
    Layout,
    Menu,
    Card,
    Spin,
    message
} from 'antd'
import styles from './index.module.scss'

const { Header, Content, Footer } = Layout
const RadioGroup = Radio.Group
const FormItem = Form.Item

const AdminWrapperForm = Form.create()(
    class extends Component {
        render() {
            const { visible, onCancel, onSubmit, form } = this.props
            const { getFieldDecorator } = form

            return (
                <Modal
                    title="添加用户"
                    centered
                    visible={visible}
                    okText="提交"
                    onOk={onSubmit}
                    onCancel={onCancel}
                >
                    <Form layout="vertical">
                        <FormItem label="用户名">
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: '请输入用户名!' },
                                    { max: 10, message: '不能超过10个字符' }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                />
                            )}
                        </FormItem>
                        <FormItem label="密码">
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '请输入密码!' },
                                    { max: 16, message: '不能超过16个字符' }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                    type="password"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label="权限设置"
                            labelCol={{ span: 8, offset: 0 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('isadmin', { initialValue: 0 })(
                                <RadioGroup>
                                    <Radio value={1}>管理员</Radio>
                                    <Radio value={0}>普通用户</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
    }
)

class AdminWrapper extends Component {
    state = {
        visible: false
    }
    componentDidMount() {
        this.props.getUserList()
    }

    handleNavClick = e => {
        e.domEvent.preventDefault()
        console.log(e)
        if (e.key === 'return') {
            this.props.getUserInfo()
            this.props.history.push('/search')
        }
        if (e.key === 'logout') {
            this.props.logout().then(() => this.props.getUserInfo())
            this.props.history.push('/login')
        }
    }

    showModal = () => {
        this.setState({ visible: true })
    }

    handleCancel = () => {
        this.setState({ visible: false })
    }

    handleSubmit = () => {
        const form = this.formRef.props.form
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            console.log('Received values of form: ', values)
            this.props
                .addUser(values)
                .then(() => this.props.getUserList())
                .catch(err => message.error(err.response.data.errormessage))
            form.resetFields()
            this.setState({ visible: false })
        })
    }

    handleDeleteConfirm = id => {
        console.log(id)
        this.props
            .deleteUser({ userid: id })
            .then(() => this.props.getUserList())
            .catch(err => message.error(err.response.data.errormessage))
    }

    saveFormRef = formRef => {
        this.formRef = formRef
    }

    render() {
        const columns = [
            {
                title: 'Id',
                dataIndex: 'key', // key为连续值,id为数据库唯一值
                key: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: '权限',
                key: 'isadmin',
                dataIndex: 'isadmin',
                render: isadmin =>
                    isadmin ? (
                        <Tag color="cyan" key>
                            管理员
                        </Tag>
                    ) : (
                        <Tag color="blue" key>
                            普通用户
                        </Tag>
                    )
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        {/* <a>修改密码</a>
                        <Divider type="vertical" /> */}
                        <Popconfirm
                            title="确定删除该用户吗?"
                            onConfirm={() => this.handleDeleteConfirm(record.id)}
                            onCancel={() => {}}
                        >
                            <a style={{ color: 'red' }}>删除用户</a>
                        </Popconfirm>
                    </span>
                )
            }
        ]

        // const data = [
        //     {
        //         key: '1',
        //         id: '1',
        //         username: 'test',
        //         isadmin: 1
        //     }
        // ]

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
                            <Menu.Item key="return" className={styles.floatRight}>
                                <Icon type="rollback" theme="outlined" /> 返回搜索页
                            </Menu.Item>
                        </Menu>
                    </div>
                </Header>
                <Content>
                    <Card bordered={false} title="成员管理">
                        <Button type="primary" onClick={this.showModal}>
                            添加用户
                        </Button>
                        <br />
                        <AdminWrapperForm
                            wrappedComponentRef={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onSubmit={this.handleSubmit}
                        />
                        {this.props.getUserListLoading ? (
                            <Spin />
                        ) : (
                            <Table
                                columns={columns}
                                dataSource={this.props.userList}
                                pagination={{ pageSize: 8 }}
                            />
                        )}
                    </Card>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2018 StarStudio</Footer>
            </Layout>
        )
    }
}

export default AdminWrapper
