import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import React from 'react'

const CustomAlert = ({ severity, title, description }) => {
	return (
		<Alert severity={severity} sx={{ margin: '1rem 0' }}>
			<AlertTitle>{title}</AlertTitle>
			{description}
		</Alert>
	)
}

export default CustomAlert
