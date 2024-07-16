export type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean; // Для входа админа
};

export type UserId = User['id'];

export type UserWithoutIdwithPassword = Omit<User, 'id'> & { password: string };

export type UserWithoutId = Omit<User, 'id'>;


export type UserWithoutName = Omit<UserWithoutIdwithPassword, 'name'>;
