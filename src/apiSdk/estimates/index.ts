import axios from 'axios';
import queryString from 'query-string';
import { EstimateInterface, EstimateGetQueryInterface } from 'interfaces/estimate';
import { GetQueryInterface } from '../../interfaces';

export const getEstimates = async (query?: EstimateGetQueryInterface) => {
  const response = await axios.get(`/api/estimates${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEstimate = async (estimate: EstimateInterface) => {
  const response = await axios.post('/api/estimates', estimate);
  return response.data;
};

export const updateEstimateById = async (id: string, estimate: EstimateInterface) => {
  const response = await axios.put(`/api/estimates/${id}`, estimate);
  return response.data;
};

export const getEstimateById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/estimates/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEstimateById = async (id: string) => {
  const response = await axios.delete(`/api/estimates/${id}`);
  return response.data;
};
