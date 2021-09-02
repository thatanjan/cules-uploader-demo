import cloudinary from 'cloudinary'
import { cloudinaryV2 } from './index'

const uploadImage = async (image, options) => {
	const { public_id } = await cloudinaryV2.uploader.upload(image, options)

	return public_id
}

export default uploadImage
