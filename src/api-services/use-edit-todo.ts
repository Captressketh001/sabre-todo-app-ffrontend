import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './ApiClient';
import { TodoQueryKeys } from './todo-query-key';
import { ApiResponse, TodoList } from '@/interface-and-types';
import { toast } from 'react-hot-toast'


const EditTodoFn = async (data: TodoList) => {
  const x = {
    text: data.text,
    completed: data.completed
  }
  const response = await apiClient.put<ApiResponse<null>>(`/todos/${data._id}`, x);
  return response.data; 
};

export function useEditTodo () {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EditTodoFn,
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
