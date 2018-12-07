import React, { Component } from 'react'
import { Icon, message, Button } from 'antd'
import styles from './index.module.scss'

class NewsDisplay extends Component {
    state = {
        pushLoading: false,
        disabled: false
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    onPushNews = news => {
        const data = {
            CLIENT_ID: 'pusher',
            CLIENT_SECRET:
                'pbkdf2_sha256$100000$Th8l8buAjpZc$6DI7O4Fp0UApZUBczCUvpHdEx8Whocb/041Exdn4j0Y=',
            status: 2, // for test
            news_categories: 0,
            news_title: news.news_title,
            website: news.site,
            url: news.url,
            news_content: news.news_content,
            public_date: news.public_date
        }
        let formData = new FormData()
        for (let [key, value] of Object.entries(data)) {
            formData.append(key, value)
        }
        this.props
            .pushNews(formData)
            .then(res => {
                console.log(res)
                message.success('推送成功')
            })
            .catch(err => {
                console.log(err.response)
                message.error('推送失败')
            })
            .finally(() => {
                this.setState({ pushLoading: false })
                this.setState({ disabled: true })
            })
        this.setState({ pushLoading: true })
    }

    render() {
        const resultsList = this.props.resultsList
        const id = this.props.id
        const news = resultsList[id]
        console.log(this.props)

        if (news === undefined) {
            this.props.getUserInfo()
            this.props.history.push('/search')
            return null
        } else {
            let count = 0
            Object.values(news.highlight).forEach(el =>
                el.forEach(el => {
                    count += el.match(/<em>.*?<\/em>/g).length
                })
            )
            console.log(count)
            return (
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <a onClick={() => this.props.history.goBack()} href>
                            <Icon
                                type="left"
                                style={{ fontSize: 20, paddingLeft: 14, color: '#222222' }}
                            />
                        </a>
                    </div>

                    <div className={styles.title}>
                        <OriginOrHighLight resultsList={news} content="news_title" />
                    </div>

                    <div className={styles.site}>
                        <p>{news.site}</p>
                    </div>

                    <div className={styles.author}>
                        <OriginOrHighLight resultsList={news} content="author" />
                    </div>

                    <div className={styles['public-date']}>
                        <p>{news.public_date.slice(0, 10)}</p>
                    </div>

                    <div className={styles.abstract}>
                        <OriginOrHighLight resultsList={news} content="abstract" />
                    </div>

                    <div className={styles['news-content']}>
                        <OriginOrHighLight resultsList={news} content="news_content" />
                    </div>
                    <div className={styles.footer}>
                        <span>
                            在这篇文章中您搜索的关键字共出现
                            <span style={{ color: 'red', padding: 0 }}>{count}</span>次
                        </span>
                        <Button
                            icon="cloud-upload"
                            onClick={() => this.onPushNews(news)}
                            loading={this.state.pushLoading}
                            disabled={this.state.disabled}
                            style={{ float: 'right' }}
                        >
                            点击进行新闻推送
                        </Button>
                    </div>
                </div>
            )
        }
    }
}

function OriginOrHighLight({ resultsList, content }) {
    if (resultsList.highlight[content]) {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: resultsList.highlight[content]
                }}
            />
        )
    } else {
        return (
            <div>
                <p>{resultsList[content]}</p>
            </div>
        )
    }
}

export default NewsDisplay
