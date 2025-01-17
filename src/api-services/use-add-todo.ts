import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './ApiClient';
import { TodoQueryKeys } from './todo-query-key';
import { ApiResponse } from '@/interface-and-types';
import { toast } from 'react-hot-toast'

interface Data {
    text: string
}
const createTodoFn = async (data: Data) => {
  const response = await apiClient.post<ApiResponse<null>>('/todos', data);
  return response.data; 
};

export function useCreateTodo () {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodoFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: TodoQueryKeys.all });
    },
    onSuccess: (data) => {
      toast.success(data.msg)
      queryClient.invalidateQueries({ queryKey: TodoQueryKeys.all });
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });
}
