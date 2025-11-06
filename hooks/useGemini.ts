import { useState, useCallback } from 'react';
import { generateInsights } from '../services/geminiService';
import { DashboardStats } from './../types';

interface GeminiState {
  data: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useGemini = () => {
  const [state, setState] = useState<GeminiState>({
    data: null,
    isLoading: false,
    error: null,
  });

  const generate = useCallback(async (dashboardData: DashboardStats) => {
    setState({ data: null, isLoading: true, error: null });
    try {
      const insights = await generateInsights(dashboardData);
      setState({ data: insights, isLoading: false, error: null });
    } catch (e: any) {
      setState({ data: null, isLoading: false, error: e.message || 'An unknown error occurred' });
    }
  }, []);

  return { ...state, generate };
};
