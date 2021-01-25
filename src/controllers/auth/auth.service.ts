import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import Role from '../../models/Role';
import User from '../../models/User';

export default class AuthService {
	registration = async (createUserDto: CreateUserDto) => {
		const { username, password } = createUserDto;

		console.log(username, password);

		const userRole = await Role.findOne({ value: 'USER' });
		const hashPassword = bcrypt.hashSync(password, 7);
		const user = new User({
			username,
			password: hashPassword,
			roles: [userRole.value],
		});
		await user.save();
		return user;
	};
}
