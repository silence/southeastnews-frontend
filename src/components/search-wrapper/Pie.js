import React from 'react'
import { Chart, Geom, Axis, Tooltip, Coord, Label, track } from 'bizcharts'
import { Icon } from 'antd'
import DataSet from '@antv/data-set'
import styles from './Pie.module.scss'

track(false) //disable send user record

class LabelLine extends React.Component {
    state = {
        chartIns: null
    }

    handleDownloadImage = () => {
        const chartIns = this.state.chartIns
        chartIns.downloadImage()
    }

    render() {
        const { DataView } = DataSet
        // const { Text, Html } = Guide
        // const data = [
        //     {
        //         item: '事例一',
        //         count: 40
        //     },
        //     {
        //         item: '事例二',
        //         count: 21
        //     },
        //     {
        //         item: '事例三',
        //         count: 17
        //     },
        //     {
        //         item: '事例四',
        //         count: 13
        //     },
        //     {
        //         item: '事例五',
        //         count: 9
        //     }
        // ]
        const data = this.props.data
        const dv = new DataView()
        dv.source(data).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        })
        const cols = {
            percent: {
                formatter: val => {
                    val = val * 100
                    return `${val.toFixed(2)}%`
                }
            }
        }
        return (
            <>
                <Chart
                    height={(window.innerHeight / 100) * 40}
                    data={dv}
                    scale={cols}
                    padding={['20%', '20%']}
                    forceFit={true}
                    onGetG2Instance={chartIns => {
                        this.setState({ chartIns: chartIns })
                    }}
                    className={styles.chartWrapper}
                >
                    <Coord type="theta" radius={0.75} />
                    <Axis name="percent" />
                    {/* <Legend position="right" /> */}
                    <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    {/* <Guide>
                        <Text
                            content="test"
                            top={true}
                            style={{
                                fill: '#fff', // 文本颜色
                                fontSize: '12', // 文本大小
                                fontWeight: 'bold', // 文本粗细
                                rotate: 30 // 旋转角度
                            }}
                        />
                        <Html position={['120%', '100%']} html="<p>网站统计</p>" />
                        
                    </Guide> */}
                    <div className={styles['guide-title']}>
                        <p>{this.props.guideTitle}</p>
                        {/* <button onClick={this.handleDownloadImage}>下载图片</button> */}
                        {/* eslint-disable-next-line */}
                        <a onClick={this.handleDownloadImage}>
                            <Icon type="cloud-download" theme="outlined" />
                            下载图片
                        </a>
                    </div>

                    <Geom
                        type="intervalStack"
                        position="percent"
                        color="item"
                        tooltip={[
                            'item*percent',
                            (item, percent) => {
                                percent = (percent * 100).toString().slice(0, 5) + '%'
                                return {
                                    name: item,
                                    value: percent
                                }
                            }
                        ]}
                        style={{
                            lineWidth: 1,
                            stroke: '#fff'
                        }}
                    >
                        <Label
                            content="percent"
                            formatter={(val, item) => {
                                console.log(val)
                                console.log(item)
                                return item.point.item.includes('_')
                                    ? item.point.item.split('_')[1]
                                    : item.point.item + ': ' + val
                            }}
                            offset={10}
                        />
                    </Geom>
                </Chart>
            </>
        )
    }
}

export default LabelLine
