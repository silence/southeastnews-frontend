import React, { Component } from 'react'
import { DatePicker, Tag } from 'antd'
import moment from 'moment'

class DatePickerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value || props.defaultValue || []
        }
        this.datePickerRef = React.createRef()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if ('value' in nextProps && nextProps.value) {
            return {
                value: nextProps.value
            }
        }
        return null
    }

    onChange = (moment, dateString) => {
        console.log(this.datePickerRef)
        if (dateString === '') return
        const newVal = [...new Set([...this.state.value, dateString])].sort()
        if (!('value' in this.props)) {
            this.setState({ value: newVal })
        }
        if (this.props.onChange) {
            this.props.onChange(newVal)
        }
    }

    onClose = (ev, index) => {
        ev.preventDefault()
        const newArr = [...this.state.value]
        newArr.splice(index, 1)
        if (!('value' in this.props)) {
            this.setState({ value: newArr })
        }
        if (this.props.onChange) {
            this.props.onChange(newArr)
        }
    }

    disableDate = (current, start, end) => {
        return current < moment(start) || current > moment(end)
    }

    render() {
        const { start, end } = this.props
        return (
            <>
                {this.state.value.length ? (
                    <div>
                        {this.state.value.map((value, index) => {
                            return (
                                <Tag
                                    color="#2db7f5"
                                    key={index}
                                    closable={true}
                                    onClose={ev => this.onClose(ev, index)}
                                >
                                    {value}
                                </Tag>
                            )
                        })}
                        <br />
                    </div>
                ) : null}

                <DatePicker
                    showTime={{
                        inputReadOnly: true
                    }}
                    showToday={false}
                    onChange={this.onChange}
                    onOk={e => console.log(e)}
                    onPanelChange={(...args) => console.log(args)}
                    onOpenChange={(...args) => console.log(args)}
                    disabledDate={current => this.disableDate(current, start, end)}
                    ref={ref => {
                        this.datePickerRef = ref
                    }}
                    style={{ marginTop: 10 }}
                />
                {console.log(this.state.value)}
            </>
        )
    }
}

export default DatePickerComponent
