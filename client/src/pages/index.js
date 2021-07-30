import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'

import Uploader from '../components/Uploader'

export default function Home() {
	const { push } = useRouter()
	return (
		<Grid container justifyContent='center'>
			<Grid
				item
				xs={12}
				md={7}
				sx={{ display: 'grid', placeItems: 'center', height: '15vh' }}
			>
				<Typography variant='h2' color='primary'>
					Cules Uploader
				</Typography>
			</Grid>

			<Grid item xs={12} sm={10} md={7}>
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
	)
}
