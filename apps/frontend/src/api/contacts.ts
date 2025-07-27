import API from './axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const getContacts = async () => {
  const res = await API.get('/contacts');
  return res.data;
};

export const useContacts = () => {
  return useQuery({ queryKey: ['contacts'], queryFn: getContacts });
};

export const useAddContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contact: any) => API.post('/contacts', contact),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contacts'] }),
  });
};
