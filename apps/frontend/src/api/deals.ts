import API from './axios';
import { useQuery } from '@tanstack/react-query';

const getDeals = async () => {
  const res = await API.get('/deals');
  return res.data;
};

export const useDeals = () => {
  return useQuery({ queryKey: ['deals'], queryFn: getDeals });
};
