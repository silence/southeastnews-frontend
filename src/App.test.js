import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import './main.scss'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <LocaleProvider locale={zh_CN}>
                    <App />
                </LocaleProvider>
            </Provider>
        </BrowserRouter>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
