import { STORAGE_KEYS } from '../../assets/constants'
import { StorageUtil } from '../storage/StorageUtil'
import { v4 as UUID } from 'uuid'

export class HttpHeaders {

	static get(): { [name: string] : string } {
		return {
			'Content-type': 'application/json',
			'x-user-token': this.getUserToken(),
			'x-request-id': this.generateRequestId()
		}
	}

	private static generateRequestId(): string {
		return UUID()
	}

	private static getUserToken(): string {
		const userToken: string | null = StorageUtil.getItem(STORAGE_KEYS.userToken)

		if (userToken === null) {
			const newUserToken: string = UUID()
			StorageUtil.addItem(STORAGE_KEYS.userToken, newUserToken)
			return newUserToken
		}

		return userToken
	}
}