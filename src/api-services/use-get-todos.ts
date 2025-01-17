import { useQuery } from '@tanstack/react-query';
import { apiClient } from './ApiClient';
import { TodoQueryKeys } from './todo-query-key';
import { AxiosError } from 'axios';
import { ApiResponse, TodoList } from '@/interface-and-types';

const getTodosFn = async (status?: string) => {
  const response = await apiClient.get<ApiResponse<TodoList[]>>('/todos', {
    params: status ? { status } : '',
  });
  return response.data;
};

export function useGetTodos(status?: string) {
  return useQuery({
    queryKey: TodoQueryKeys.all,
    queryFn: () => getTodosFn(status),
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      return axiosError.response?.status !== 404 && failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: true,
  });
}
