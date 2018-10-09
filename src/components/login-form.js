import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd'
import React, { Component } from 'react'
const FormItem = Form.Item

class NormalLoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                this.props.login(values)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const alert = this.props.errorMessage ? (
            <Alert message={this.props.errorMessage} type="error" />
        ) : null
        return (
            <>
                {alert}
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [
                                { required: true, message: '请输入你的用户名!' },
                                { max: 10, message: '不能超过10个字符' }
                            ]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.1)' }} />}
                                placeholder="用户名"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '请输入你的密码!' },
                                { max: 16, message: '不能超过16个字符' }
                            ]
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.1)' }} />}
                                type="password"
                                placeholder="密码"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                    </FormItem>
                </Form>
            </>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default WrappedNormalLoginForm
