import React, { FC } from 'react';
import Header from '../header/Header';
import Navigation from '../navigation/Navigation';

const MastHeader: FC = (): JSX.Element => {

	return (
		<>
			<Header />
			<Navigation />
		</>
	)
}

export default MastHeader;