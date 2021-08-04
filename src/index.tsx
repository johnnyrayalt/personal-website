import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { STORAGE_KEYS } from './assets/constants'
import { StorageUtil } from './utils/storage/StorageUtil'
import { v4 as UUID} from 'uuid'
import { ViewportProvider } from './utils/useViewportHook'
import './index.css'

const newUserToken = UUID()
if (StorageUtil.getItem(STORAGE_KEYS.userToken) !== null) {
	StorageUtil.removeExpiredItems()

	if (StorageUtil.getItem(STORAGE_KEYS.userToken) === null) {
		StorageUtil.addItem(STORAGE_KEYS.userToken, newUserToken)
	}
} else {
	StorageUtil.addItem(STORAGE_KEYS.userToken, newUserToken)
}

ReactDOM.render(
	<ViewportProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ViewportProvider>,
	document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
