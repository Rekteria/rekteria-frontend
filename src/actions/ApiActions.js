import { apiPost } from '../helpers/Api';

export const API_SERVICE = 'API_SERVICE';

export const apiService = (data) => {
  const payload = apiPost('/api', data);
  return { type: API_SERVICE, payload };
};
