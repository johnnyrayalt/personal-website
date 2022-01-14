import React, { FC } from 'react';

interface Props {
	worksRootIndex: string,
}

const IndividualProject: FC<Props> = (Props): JSX.Element => {
	const { worksRootIndex } = Props;

	return (<>{worksRootIndex}</>);
}

export default IndividualProject;