const img1 =
	'https://t4.ftcdn.net/jpg/03/69/19/81/360_F_369198116_K0sFy2gRTo1lmIf5jVGeQmaIEibjC3NN.jpg';
const img2 =
	'https://t3.ftcdn.net/jpg/02/65/60/80/360_F_265608067_Nth2hs7Ri68NZBgHHhGuWIxaP6Z1m170.jpg';
const img3 =
	'https://t3.ftcdn.net/jpg/06/33/80/44/360_F_633804450_DWH5bj77LdDwlCSvMcqy6qVk4j9kchT3.jpg';
const img4 =
	'https://cewd.vtc.edu/wp-content/uploads/2022/02/GES3044_Web-Development-Bootcamp_Self-Paced-with-Coaching.jpg';
const img5 =
	'https://c8.alamy.com/comp/P9YRGJ/positive-web-developer-using-a-smartphone-while-working-with-holograms-P9YRGJ.jpg';

export const Feedback = [
	{
		id: 1,
		userId: 101,
		name: 'John Doe',
		thumb: img1,
		feedbackBelongsTo: 'Introduction to Python',
		comment:
			'A comprehensive introduction to Python, covering basics such as syntax, control flow, and data structures. Great for beginners!',
		updatedAt: '2024-10-10',
		rating: 4.5,
		ratingOption:[
			'1','2','3,','4','5'
		]
	},
	{
		id: 2,
		userId: 102,
		name: 'Emma Smith',
		thumb: img2,
		feedbackBelongsTo: 'Web Development with HTML and CSS',
		comment:
			'A fantastic introduction to web development! The course covers both HTML and CSS thoroughly.',
		updatedAt: '2024-02-10',
		rating: 4.7,
		ratingOption:[
			'1','2','3,','4','5'
		]
	},
	{
		id: 3,
		userId: 103,
		name: 'Michael Johnson',
		thumb: img3,
		feedbackBelongsTo: 'Web Development with HTML and CSS',
		comment:
			'I learned how to create beautiful websites with HTML for structure and CSS for styling. Highly recommend!',
		updatedAt: '2024-03-10',
		rating: 4.8,
		ratingOption:[
			'1','2','3,','4','5'
		]
	},
	{
		id: 4,
		userId: 104,
		name: 'Sarah Williams',
		thumb: img4,
		feedbackBelongsTo: 'Advanced JavaScript Techniques',
		comment:
			'This course took my JavaScript skills to the next level with advanced concepts like closures and async programming.',
		updatedAt: '2024-04-10',
		rating: 4.9,
		ratingOption:[
			'1','2','3,','4','5'
		]
	},
	{
		id: 5,
		userId: 105,
		name: 'Daniel Brown',
		thumb: img5,
		feedbackBelongsTo: 'Web Development with HTML and CSS',
		comment:
			'The course was very detailed and helpful in understanding how to build and style web pages from scratch.',
		updatedAt: '2024-05-10',
		rating: 4.6,
		ratingOption:[
			'1','2','3,','4','5'
		]
	},
	{
		id: 6,
		userId: 106,
		name: 'Olivia Wilson',
		thumb: img1,
		feedbackBelongsTo: 'Ethical Hacking and Penetration Testing',
		comment:
			'An eye-opening course on ethical hacking. Learned a lot about the methodologies and tools used in penetration testing.',
		updatedAt: '2024-06-10',
		rating: 4.8,
		ratingOption:[
			'1','2','3,','4','5'
		]
	},
	{
		id: 7,
		userId: 107,
		name: 'James Taylor',
		thumb: img2,
		feedbackBelongsTo: 'Machine Learning with Python',
		comment:
			'Excellent course on machine learning! The hands-on projects with scikit-learn and TensorFlow were particularly useful.',
		updatedAt: '2024-07-10',
		rating: 4.9,
		ratingOption:[
			'1','2','3,','4','5'
		]
	},
	{
		id: 8,
		userId: 108,
		name: 'Sophia Martinez',
		thumb: img3,
		feedbackBelongsTo: 'Cloud Security Best Practices',
		comment:
			'Great course on securing cloud environments. It covered all the essential best practices and tools.',
		updatedAt: '2024-08-10',
		rating: 4.7,
		ratingOption:[
			'1','2','3,','4','5'
		]
	},
	{
		id: 9,
		userId: 109,
		name: 'William Anderson',
		thumb: img4,
		feedbackBelongsTo: 'Cybersecurity Incident Response',
		comment:
			'Very informative course on incident response. It provides practical steps to handle cybersecurity incidents effectively.',
		updatedAt: '2024-09-10',
		rating: 4.8,
		ratingOption:[
			'1','2','3,','4','5'
		]
	},
	{
		id: 10,
		userId: 110,
		name: 'Isabella Thompson',
		thumb: img5,
		feedbackBelongsTo: 'Data Visualization with Tableau',
		comment:
			'Loved this course! It taught me how to create insightful data visualizations using Tableau.',
		updatedAt: '2024-10-10',
		rating: 4.9,
		ratingOption:[
			'1','2','3,','4','5'
		]
	},
];
