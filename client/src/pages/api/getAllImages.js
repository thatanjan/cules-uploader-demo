import cloudinary from 'cloudinary'

import { uploadDir } from './upload'

const handler = async ({ method }, res) => {
	try {
		if (method !== 'GET')
			return res.status(400).json({ message: 'Invalid method' })

		const cloudinaryV2 = cloudinary.v2

		cloudinaryV2.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		})

		const images = await cloudinaryV2.api.resources({
			max_results: 100,
			type: 'upload',
			prefix: uploadDir,
		})

		const public_ids = images.resources.map((image) => image.public_id)
		console.log(images)

		return res.json({ images: public_ids })
	} catch (e) {
		return res.status(400).send({ message: 'Error processing request' })
	}
}

export default handler
