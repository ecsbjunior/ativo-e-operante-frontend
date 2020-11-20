import api from './api';

interface AuthService {
  token: string;
  username: string;
};

export const signIn = async (username: string, password: string): Promise<AuthService> => {
  const params = {
    username,
    password
  };

  const response = await api.get("/admins", { params });

  return response.data;
};
