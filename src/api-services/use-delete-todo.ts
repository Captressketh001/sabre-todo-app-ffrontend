import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './ApiClient';
import { TodoQueryKeys } from './todo-query-key';
import { ApiResponse } from '@/interface-and-types';
import { toast } from 'react-hot-toast'

// Function to delete a todo
const deleteTodoFn = async (id: string) => {
  const response = await apiClient.delete<ApiResponse<null>>(`/todos/${id}`);
  return response.data;
};

// Hook for deleting a todo
export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodoFn(id),
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
