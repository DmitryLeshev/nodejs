export interface IUser {
	username: string;
	password: string;
	role: UserRole;
}

export enum UserRole {
	USER = 'USER',
	ADMIN = 'ADMIN',
}
