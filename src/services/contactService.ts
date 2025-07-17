import axios from 'axios';
import type { Contact } from '../types/Contact';

const API_URL = 'http://localhost:3001/contacts';

export const getContacts = async (): Promise<Contact[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createContact = async (data: Omit<Contact, 'id'>): Promise<Contact> => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateContact = async (id: number, data: Omit<Contact, 'id'>): Promise<Contact> => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteContact = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
