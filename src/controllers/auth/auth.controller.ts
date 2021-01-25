import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import IControllerBase from 'interfaces/IControllerBase.interface';
import User from '../../models/User';
// import Role from '../../models/Role';
import AuthService from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
// import * as bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';

export default class AuthController implements IControllerBase {
	private path = '/auth';
	private router = express.Router();
	private authService = new AuthService();
	// private createUserDto: CreateUserDto = new CreateUserDto();

	constructor() {
		this.initRoutes();
	}

	public initRoutes() {
		this.router.get(this.path + '/users', this.getUsers);
		this.router.post(
			this.path + '/registration',
			check('username', 'Имя пользователя не должно быть пустым').notEmpty(),
			check(
				'password',
				'Пароль должен быть больше 4 и меньше 10 символов'
			).isLength({ min: 4, max: 10 }),
			this.checkBody,
			this.registration
		);
		this.router.post(this.path + '/login', this.login);
	}

	checkBody = async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: 'fail',
				message: 'Ошибка при регистрации',
				...errors,
			});
		}
		next();
	};

	registration = async (req: Request, res: Response) => {
		// Check body
		const { username, password } = req.body;
		// const candidate = await User.findOne({ username });
		// if (candidate) {
		// 	return res.status(400).json({
		// 		status: 'fail',
		// 		message: 'Пользователь с таким именем уже существует',
		// 	});
		// }
		// Create user service
		const createUserDto: CreateUserDto = { username, password };
		const user = await this.authService.registration(createUserDto);
		// Return user and res ok
		return res.status(201).json({
			status: 'success',
			message: 'Пользователь успешно зарегистрирован',
			data: {
				user,
			},
		});
	};

	login = (req: Request, res: Response) => {
		console.log('login');
	};

	getUsers = async (req: Request, res: Response) => {
		const users = 'test';
		res.status(200).json({
			status: 'success',
			results: users.length,
			data: {
				users,
			},
		});
	};
}
