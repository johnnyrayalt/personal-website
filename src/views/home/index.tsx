import Processing from '../../components/processing'
import React, { FC } from 'react'
import './styles.css'

const Home: FC = (): JSX.Element => {

	return (
		<>
			<div className='home-container'>
				<Processing />
			</div>
		</>
	)
}

export default Home
