import About from './about'
import Home from './home'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Views = (): JSX.Element => {

	return (
		<Switch>
			<Route exact path='/' component={() => <Home />} />

			<Route exact path='/about' component={() => <About />} />
		</Switch>
	)
}

export default Views
