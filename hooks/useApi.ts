import { useState, useCallback } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

type ApiState<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

export const useApi = <T,>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const request = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    setState(prevState => ({ ...prevState, isLoading: true, error: null }));
    
    const token = localStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Handle cases with no response body
      const text = await response.text();
      const data: T = text ? JSON.parse(text) : null;

      setState({ data, error: null, isLoading: false });
      return data;
    } catch (error: any) {
      setState({ data: null, error: error.message, isLoading: false });
      throw error;
    }
  }, []);

  return { ...state, request };
};
