import React, { FC } from 'react';
import WorksList from './WorksList';
import c, { Schema } from '../../assets/constants';

interface Props {
	worksRootIndex: string,
}

const Projects: FC<Props> = (Props): JSX.Element => {
	const { worksRootIndex } = Props;

	const handleWorksListSelection = (): Schema => {
		let schema: Schema = {} as Schema;
		switch (worksRootIndex) {
			case (c.IMAGE_ROOTS.art):
				schema = c.ART;
				break;
			case (c.IMAGE_ROOTS.professional):
				schema = c.PROFESSIONAL
				break;
		}

		if (!schema) throw new Error(`No schema found for ${worksRootIndex}! How'd that happen?`)

		return schema;
	}

	return (
		<div className='projects-container'>
			<WorksList worksList={handleWorksListSelection()} worksRootIndex={worksRootIndex} />
		</div>
	)
}

export default Projects;