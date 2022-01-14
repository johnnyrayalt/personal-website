import React, { useEffect, useState } from 'react';
import { router } from 'next/client';
import MastHeader from '../../../../components/common/mastHeader/MastHeader';
import IndividualProject from '../../../../components/projects/IndividualProject';
import ErrorPage from 'next/error';
import checkSlug from '../../../../utils/checkSlug';
import { IMAGE_KV } from '../../../../assets/constants';

const Project = () => {
	const { project } = router.query;
	const [slug, setSlug] = useState<{err: boolean, code: number, slug: string}>({ err: false, code: 200, slug: ''})

	useEffect(() => {
		if (!project) return;

		const worksRootIndex = (): void => {
			const projectRoot = project.toString();
			checkSlug(projectRoot, Object.values(IMAGE_KV), setSlug)
		}

		worksRootIndex();
	}, [project])

	return (
		<>
			<MastHeader />
			{(slug.err) ?
				(<ErrorPage statusCode={slug.code} />) :
				(<IndividualProject worksRootIndex={slug.slug} />)
			}
		</>
	)
}

export default Project;