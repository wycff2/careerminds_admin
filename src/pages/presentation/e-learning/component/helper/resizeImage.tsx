import Resizer from 'react-image-file-resizer';

const compressImage = (file: File): Promise<Blob> => {
	return new Promise((resolve, reject) => {
		Resizer.imageFileResizer(
			file,
			1920, // max width
			1920, // max height
			'JPEG', // output format
			80, // quality (0-100)
			0, // rotation angle
			(uri) => {
				if (typeof uri === 'string') {
					// Convert base64/URI to Blob
					fetch(uri)
						.then((res) => res.blob())
						.then((blob) => {
							resolve(blob);
						})
						.catch((err) => {
							console.error('Error converting base64/URI to blob:', err);
							reject(err);
						});
				} else {
					reject(new Error('Invalid URI'));
				}
			},
			'base64', // output type
		);
	});
};

export default compressImage;
