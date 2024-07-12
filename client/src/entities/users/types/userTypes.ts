export type User = {
    id: number;
    login: string;
    email: string;
  };
  
  export type UserId = User['id'];
  
  export type UserForRega = Omit<User, 'id'> & { password: string };
  
  export type UserWithoutId = Omit<User, 'id'>;
  
  export type UserForLoga = Omit<UserForRega, 'login'>;
