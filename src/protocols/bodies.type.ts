export type SignUp = {
  email: string;
  name: string;
  password: string;
};

export type Session = {
  id?: number;
  userId: number;
  token: string;
  createdAt?: Date | string;
};

export type Book = {
  id: number;
  userId: number;
  name: string;
  link?: string;
  chaptersNumber?: number;
  pagesNumber?: number;
  status?: StatusRole;
  insertedAt?: Date | string;
  updatedAt?: Date | string;
};

enum StatusRole {
  finished = "finished",
  reading = "reading",
}

export type SignIn = Omit<SignUp, "password">;
