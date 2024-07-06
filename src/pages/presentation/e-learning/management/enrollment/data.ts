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

export const enrollments = [
	{
		id: 1,
		studentId: 'stu123',
		name: 'John Doe',
		course: 'MERN stack',
		courseRelatedTo: 'Web development',
		description:
			'The process of creating software and applications using programming languages.',
		enrollmentDate: '2023-01-01',
		payment: {
			method: 'Affirm',
			payment: 250,
		},
		image: img1,
	},
	{
		id: 2,
		studentId: 'stu124',
		name: 'Jane Smith',
		course: 'Data Science',
		courseRelatedTo: 'Data Analysis',
		description:
			'Extracting insights from data using statistical and computational techniques.',
		enrollmentDate: '2023-02-15',
		payment: null,
		image: img2,
	},
	{
		id: 3,
		studentId: 'stu125',
		name: 'Alice Johnson',
		course: 'AI and Machine Learning',
		courseRelatedTo: 'Artificial Intelligence',
		description: 'Building models and algorithms that enable computers to learn from data.',
		enrollmentDate: '2023-03-10',
		payment: {
			method: 'GPay',
			payment: 400,
		},
		image: img3,
	},
	{
		id: 4,
		studentId: 'stu126',
		name: 'Bob Brown',
		course: 'Cybersecurity',
		courseRelatedTo: 'Security',
		description: 'Protecting systems, networks, and data from digital attacks.',
		enrollmentDate: '2023-04-05',
		payment: {
			method: 'Affirm',
			payment: 350,
		},
		image: img4,
	},
	{
		id: 5,
		studentId: 'stu127',
		name: 'Charlie Davis',
		course: 'Blockchain Technology',
		courseRelatedTo: 'Cryptocurrency',
		description: 'Understanding and developing blockchain systems and applications.',
		enrollmentDate: '2023-05-20',
		payment: {
			method: 'Klarna',
			payment: 450,
		},
		image: img5,
	},
	{
		id: 6,
		studentId: 'stu128',
		name: 'Diana Evans',
		course: 'Cloud Computing',
		courseRelatedTo: 'Cloud Services',
		description: 'Utilizing remote servers to store, manage, and process data.',
		enrollmentDate: '2023-06-30',
		payment: {
			method: 'GPay',
			payment: 500,
		},
		image: img1,
	},
	{
		id: 7,
		studentId: 'stu129',
		name: 'Ethan Foster',
		course: 'DevOps',
		courseRelatedTo: 'Software Development',
		description: 'Improving collaboration between software development and IT operations.',
		enrollmentDate: '2023-07-25',
		payment: {
			method: 'Affirm',
			payment: 275,
		},
		image: img2,
	},
	{
		id: 8,
		studentId: 'stu130',
		name: 'Fiona Green',
		course: 'Internet of Things',
		courseRelatedTo: 'Connected Devices',
		description: 'Connecting everyday devices to the internet for data exchange.',
		enrollmentDate: '2023-08-15',
		payment: {
			method: 'Klarna',
			payment: 600,
		},
		image: img3,
	},
	{
		id: 9,
		studentId: 'stu131',
		name: 'George Harris',
		course: 'Digital Marketing',
		courseRelatedTo: 'Marketing',
		description: 'Promoting products or brands via digital channels.',
		enrollmentDate: '2023-09-05',
		payment: {
			method: 'GPay',
			payment: 320,
		},
		image: img4,
	},
	{
		id: 10,
		studentId: 'stu132',
		name: 'Hannah White',
		course: 'UI/UX Design',
		courseRelatedTo: 'Design',
		description: 'Creating user-friendly and aesthetically pleasing interfaces.',
		enrollmentDate: '2023-10-10',
		payment: {
			method: 'Affirm',
			payment: 380,
		},
		image: img5,
	},
];
