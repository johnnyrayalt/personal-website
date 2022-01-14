const checkSlug = (projectRoot: string, routes: String[], cb: (value: {err: boolean, code: number, slug: string}) => void) => {
	return routes.some((route) => route === projectRoot) ?
		cb({
			err: false,
			code: 200,
			slug: projectRoot,
		}) :
		cb({
			err: true,
			code: 404,
			slug: '404'
		});
};

export default checkSlug;