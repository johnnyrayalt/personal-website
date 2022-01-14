import React, { FC } from 'react';
import WorksList from '../worksList/WorksList';
import { ART, IMAGE_ROOTS, PROFESSIONAL, Schema } from '../../assets/constants';

interface Props {
	worksRootIndex: string,
}

const Projects: FC<Props> = (Props): JSX.Element => {
	const { worksRootIndex } = Props;

	const handleWorksListSelection = (): Schema[] => {
		let schema: Schema[] = [];
		switch (worksRootIndex) {
			case (IMAGE_ROOTS.art):
				schema = ART;
				break;
			case (IMAGE_ROOTS.professional):
				schema = PROFESSIONAL
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