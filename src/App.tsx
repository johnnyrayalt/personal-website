import MastHead from './components/mastHead'
import React from 'react'
import Views from './views/Views'
import './App.css'

const App = (): JSX.Element => {

	return (
		<div className='App'>
			<MastHead />
			<div className='body-container'>
				<Views />
			</div>
		</div>
	)
}

export default App
