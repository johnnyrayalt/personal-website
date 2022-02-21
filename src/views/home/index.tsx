import Processing from '../../components/processing'
import React, { FC } from 'react'
import UnderConstruction from '../../components/underConstruction'
import './styles.css'

const Home: FC = (): JSX.Element => {

	return (
		<>
			<div className='home-container'>
				<UnderConstruction />
				<Processing />
			</div>
		</>
	)
}

export default Home
