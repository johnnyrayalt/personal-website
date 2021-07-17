import About from './about'
import Home from './home'
import ProjectPage from './projectPage'
import React from 'react'
import Tensorflow from './tensorflow'
import Works from './works'
import { IMAGE_ROOTS } from '../assets/constants'
import { Route, Switch } from 'react-router-dom'

const Views = (): JSX.Element => {

	return (
		<Switch>
			<Route exact path='/' component={() => <Home />} />

			<Route
				exact
				path='/works/art'
				component={() => <Works worksRootIndex={IMAGE_ROOTS.art} />}
			/>

			<Route
				exact
				path='/works/professional'
				component={() => <Works worksRootIndex={IMAGE_ROOTS.professional} />}
			/>

			<Route
				exact
				path='/works/art/:id'
				component={() => <ProjectPage root={IMAGE_ROOTS.art} />}
			/>

			<Route
				exact
				path='/works/professional/:id'
				component={() => <ProjectPage root={IMAGE_ROOTS.professional} />}
			/>

			<Route
				exact
				path='/about'
				component={() => <About />}
			/>

			<Route
				exact
				path='/sandbox'
				component={() => <Tensorflow />}
			/>

		</Switch>
	)
}

export default Views
