import CssBaseLine from 'material-ui/core/CssBaseLine'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])
	return (
		<>
			<CssBaseLine />
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
