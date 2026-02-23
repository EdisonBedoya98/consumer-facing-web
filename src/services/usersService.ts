import axios from 'axios';
import type { ApiUser } from '../types/user';

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsersApi = async (): Promise<ApiUser[]> => {
  const response = await axios.get<ApiUser[]>(USERS_API_URL);
  return response.data;
};
