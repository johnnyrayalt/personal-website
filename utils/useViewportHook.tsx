import React, {
	createContext,
	FC,
	useContext,
	useEffect,
	useState,
} from 'react'
import { IViewport } from '../interfaces/IViewport'

const ViewportContext = createContext<IViewport>({
	width: global.innerWidth,
})

export const ViewportProvider: FC = ({ children }) => {
	const [width, setWidth] = useState<number>(window.innerWidth)

	const handleResize: (() => void) = () => setWidth(window.innerWidth)

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<ViewportContext.Provider value={{ width }}>
			{children}
		</ViewportContext.Provider>
	)
}

export const useViewport: (() => IViewport) = () => useContext<IViewport>(ViewportContext)