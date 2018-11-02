import React from 'react'
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util,
    track
} from 'bizcharts'
import DataSet from '@antv/data-set'

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
            <div>
                <Chart
                    height={window.innerHeight / 2}
                    data={dv}
                    scale={cols}
                    padding={[80, 100, 80, 80]}
                    forceFit={true}
                    onGetG2Instance={chartIns => {
                        this.setState({ chartIns: chartIns })
                    }}
                    className="chartTest"
                >
                    <Coord type="theta" radius={0.75} />
                    <Axis name="percent" />
                    <Legend
                        position="right"
                        offsetY={-window.innerHeight / 2 + 120}
                        offsetX={-100}
                    />
                    <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color="item"
                        tooltip={[
                            'item*percent',
                            (item, percent) => {
                                percent = percent.toFixed(4) * 100 + '%'
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
                                return item.point.item + ': ' + val
                            }}
                        />
                    </Geom>
                </Chart>
                <button onClick={this.handleDownloadImage}>下载图片</button>
            </div>
        )
    }
}

export default LabelLine
