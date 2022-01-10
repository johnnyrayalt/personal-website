import React, { FC, useEffect, useState } from 'react';
import MastHeader from '../../components/common/mastHeader/MastHeader';
import Projects from '../../components/projects/Projects';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import c from '../../assets/constants';

const Project: FC = (): JSX.Element => {
	const router = useRouter();
 	const { project } = router.query;

	 useEffect(() => {
		 if (!project) return

		 const getProjectRoot = async (): Promise<void> =>  {
			 const projectRoot = project.toString();

			 if (projectRoot === c.IMAGE_ROOTS.art || projectRoot === c.IMAGE_ROOTS.professional) {
				 await setSlug({
					 err: false,
					 code: 200,
					 slug: projectRoot,
				 });
			 } else {
				 await setSlug({
					 err: true,
					 code: 404,
					 slug: '404',
				 });
			 }

		 };
		 getProjectRoot();
	 }, [project])

	const [slug, setSlug] = useState<{err: boolean, code: number, slug: string}>({ err: false, code: 200, slug: ''});

	return (
		<>
			<MastHeader />
			{(slug.err) ?
				(<ErrorPage statusCode={slug.code}/>) :
				(<Projects worksRootIndex={slug.slug}/>)}
		</>
	);
};

export default Project;