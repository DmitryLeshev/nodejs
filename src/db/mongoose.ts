import * as mongoose from 'mongoose';

export default async () => {
	const uri = `mongodb+srv://root:${process.env.MONGODB_PASSWORD}@cluster0.orhjy.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
	console.log(uri);

	await mongoose.connect(
		uri,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true,
		},
		(err) => {
			console.log(`[DB] : Mongoose -> started`);
		}
	);
};
