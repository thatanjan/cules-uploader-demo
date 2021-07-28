import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import PublishIcon from '@material-ui/icons/Publish'

const Uploader = () => {
	return (
		<Card>
			<CardContent
				sx={{
					height: '20rem',
					display: 'grid',
					justifyItems: 'center',
					gridGap: '1rem',
				}}
			>
				<PublishIcon fontSize='large' sx={{ alignSelf: 'end' }} />
				<Typography>Drag and Drop to upload</Typography>
			</CardContent>
		</Card>
	)
}

export default Uploader
