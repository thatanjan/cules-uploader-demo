import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '../utils/createEmotionCache'

const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
	return (
		<CacheProvider value={emotionCache}>
			<CssBaseline />
			<Component {...pageProps} />
		</CacheProvider>
	)
}
