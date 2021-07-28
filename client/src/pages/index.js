import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export default function Home() {
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

			<Grid item xs={12} md={7}></Grid>
		</Grid>
	)
}
