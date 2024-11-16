export interface Account {
	id: string;
  username: string;
  role: 'Admin' | 'User';
  darkMode: boolean;
  name: {
    firstname: string;
    lastname: string;
  },
	token: string;
  isAuthenticated: boolean;
}