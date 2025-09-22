export interface IUser {
    uid: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
}

export interface IAuth extends Pick<IUser, 'email' | 'password'> {}

export interface IUserCreated extends Omit<IUser, 'uid'> {}

export interface IUserGet extends Pick<IUser, 'uid' | 'name' | 'lastName'> {}