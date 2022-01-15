class AbstractMicroService {

	baseUrl: string = 'http://localhost:4200';

	get = async (paths: string[]): Promise<any> => {
		try {
			const assembledPath = paths.join('/').slice(0, -1);

			const res = await fetch(`${this.baseUrl}/${assembledPath}`);
			return res.json();
		} catch (e) {
			if (e instanceof Error) {
				throw new Error(e.message);
			}
		}
	}
}

export default AbstractMicroService;