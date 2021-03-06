import { IParsedImageList } from '../interfaces/IParsedImageList'

class ImagesApi {

	get = async (root: string, key: string, size: string): Promise<IParsedImageList | undefined> => {
		try {
			const res = await fetch(`http://localhost:4200/images/${root}/${key}/${size}`)
			return await res.json() as IParsedImageList
		} catch (err) {
			if (err instanceof Error) {
				throw new Error(err.message)
			}
		}
	}

}

const singleton = new ImagesApi()
Object.freeze(singleton)
export default singleton