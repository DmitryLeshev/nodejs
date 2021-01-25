import * as dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });

import App from './app';

import * as mongoose from 'mongoose';

import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import TestingController from './controllers/testing/testing.controller';
import AuthController from './controllers/auth/auth.controller';

const uri = `mongodb+srv://root:${process.env.MONGODB_PASSWORD}@cluster0.orhjy.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;

const app = new App({
	port: Number(process.env.PORT),
	controllers: [new TestingController(), new AuthController()],
	devMiddleWares: [morgan('dev')],
	middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
});

const start = async () => {
	try {
		await mongoose.connect(
			uri,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
			},
			(err) => {
				console.log(`[DB] : Mongoose -> started`);
			}
		);
		app.listen();
	} catch (error) {
		console.log(error);
	}
};

start();
