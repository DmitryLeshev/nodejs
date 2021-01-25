import * as express from 'express';
import { Application } from 'express';

class App {
	public app: Application;
	public port: number;

	constructor(appInit: {
		port: number;
		devMiddleWares: any;
		middleWares: any;
		controllers: any;
	}) {
		this.app = express();
		this.port = appInit.port;

		if (process.env.NODE_ENV === 'development') {
			this.devMiddlewares(appInit.devMiddleWares);
		}

		this.middlewares(appInit.middleWares);
		this.routes(appInit.controllers);
		this.assets();
		this.template();
	}

	private devMiddlewares(devMiddleWares: any) {
		devMiddleWares.forEach((devMiddleWare: any) => {
			this.app.use(devMiddleWare);
		});
	}

	private middlewares(middleWares: any) {
		middleWares.forEach((middleWare: any) => {
			this.app.use(middleWare);
		});
	}

	private routes(controllers: any) {
		controllers.forEach((controller: any) => {
			this.app.use('/api/v1/', controller.router);
		});
	}

	private assets() {
		this.app.use(express.static('public'));
		// this.app.use(express.static('views'))
	}

	private template() {
		// this.app.set('view engine', 'pug')
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the http://localhost:${this.port}`);
		});
	}
}

export default App;
