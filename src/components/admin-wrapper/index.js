import React, { Component } from 'react'
import { Table, Tag, Button, Divider, Modal, Form, Icon, Input, Radio, Popconfirm } from 'antd'
import styles from './index.module.scss'

const RadioGroup = Radio.Group
const FormItem = Form.Item

const AdminWrapper = Form.create()(
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
                            {getFieldDecorator('isadmin', { initialValue: '0' })(
                                <RadioGroup>
                                    <Radio value="1">管理员</Radio>
                                    <Radio value="0">普通用户</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
    }
)

class AdminWrapperPage extends Component {
    componentDidMount() {
        this.props.getUserList()
    }

    state = {
        visible: true
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
            form.resetFields()
            this.setState({ visible: false })
        })
    }

    saveFormRef = formRef => {
        this.formRef = formRef
    }

    render() {
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
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
                render: () => (
                    <span>
                        <a>修改密码</a>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="确定删除该用户吗?"
                            onConfirm={this.handleConfirm}
                            onCancel
                        >
                            <a href="#" style={{ color: 'red' }}>
                                删除用户
                            </a>
                        </Popconfirm>
                    </span>
                )
            }
        ]

        const data = [
            {
                key: '1',
                id: '1',
                username: 'test',
                isadmin: 1
            },
            {
                key: '2',
                id: '2',
                username: 'riochen',
                isadmin: 0
            }
        ]

        return (
            <>
                <Button type="primary" onClick={this.showModal}>
                    添加用户
                </Button>
                <AdminWrapper
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleSubmit}
                />
                <Table columns={columns} dataSource={data} />
            </>
        )
    }
}

export default AdminWrapperPage
