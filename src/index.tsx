import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { inobounce } from 'inobounce'
import { ViewportProvider } from './utils/useViewportHook'
import './index.css'

ReactDOM.render(
	<ViewportProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ViewportProvider>,
	document.getElementById('root'),
)
inobounce.enable()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
