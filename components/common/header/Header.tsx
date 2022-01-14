import React, { FC } from 'react';
import Link from 'next/link';

const Header: FC = (): JSX.Element => {
	return (
		<Link href={'/'} passHref>
			<div className='header-container'>
				&#x263B; Johnny_Ray_Alt: ~/website.sh
			</div>
		</Link>
	)
}

export default Header;