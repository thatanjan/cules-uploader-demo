import Head from 'next/head'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Fab from '@mui/material/Fab'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'

import Uploader from '../components/Uploader'

export default function Home() {
	const { push } = useRouter()
	return (
		<>
			<Head>
				<title>Cules Uploader</title>
			</Head>

			<Grid container justifyContent='center'>
				<Grid
					item
					xs={7}
					sx={{ display: 'grid', placeItems: 'center', height: '10rem' }}
				>
					<Typography variant='h2' color='primary'>
						Cules Uploader
					</Typography>
				</Grid>

				<Grid item xs={7}>
					<Uploader />{' '}
				</Grid>

				<Fab
					variant='extended'
					size='medium'
					color='primary'
					sx={{ position: 'fixed', bottom: '5%', right: '5%' }}
					onClick={() => push('/gallery')}
				>
					<PhotoLibraryIcon sx={{ mr: 1 }} />
					Gallery
				</Fab>
			</Grid>
		</>
	)
}
