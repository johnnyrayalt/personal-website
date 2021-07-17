import React, { FC } from 'react'
import WorksList from '../../components/worksList'
import { ART, IMAGE_ROOTS, PROFESSIONAL, Schema } from '../../assets/constants'
import './styles.css'

interface Props {
	worksRootIndex: string
}

const Works: FC<Props> = (Props): JSX.Element => {
	const { worksRootIndex } = Props

	const handleWorksListSelection = (): Schema => {
		let schema: Schema = {} as Schema
		switch (worksRootIndex) {
		case IMAGE_ROOTS.art:
			schema = ART
			break
		case IMAGE_ROOTS.professional:
			schema = PROFESSIONAL
			break
		}

		if (!schema) {
			throw new Error(`No schema found for ${worksRootIndex}! How'd that happen?`)
		}

		return schema

	}

	return (
		<div className='works-container'>
			<WorksList worksList={handleWorksListSelection()} worksRootIndex={worksRootIndex} />
		</div>
	)
}

export default Works
