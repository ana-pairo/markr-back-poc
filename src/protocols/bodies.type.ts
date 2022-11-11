
export type SignUp = {
    email: string,
    name: string,
    password: string
}

export type Session = {
    id?: number,
    userId: number,
    token: string,
    createdAt?: Date | string
}

export type SignIn = Omit<SignUp, "password">