import { useState, useEffect } from "react";
import { useGetTodos } from "../api-services/use-get-todos";
import { useCreateTodo } from "../api-services/use-add-todo";
import { useDeleteTodo } from "../api-services/use-delete-todo";
import { useEditTodo } from "../api-services/use-edit-todo";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../app-components/Loader";
import Modal from "../app-components/Modal";
import { TodoList } from "@/interface-and-types";
import {
  PlusCircleIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const TodoApp: React.FC = () => {
  // State definition
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  // Hooks from React Query
  const todos = useGetTodos(status);
  const addNewTodo = useCreateTodo();
  const editTodo = useEditTodo();
  const { mutate: deleteTodo, isPending } = useDeleteTodo();

  // form validation schema
  const schema = z.object({
    text: z
      .string()
      .refine((val) => val.trim() !== "", { message: "Required" }),
  });
  type SchemaType = z.infer<typeof schema>;

  // React hook form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SchemaType>({ resolver: zodResolver(schema) });

  // Create Todo Function
  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setIsLoading(true);
    const x = {
      text: data.text,
    };
    addNewTodo.mutate(x);
  };
  const handleEdit = (data: TodoList) => {
    setEdit(true);
    setValue("text", data.text);
    setCompleted(data.completed);
    setId(data._id);
  };
  // Edit Todo Function
  const onEdit: SubmitHandler<SchemaType> = async (data) => {
    setEdit(false);
    setValue("text", "");
    setIsLoading(true);
    const x = {
      _id: id,
      text: data.text,
      completed: completed,
    };
    editTodo.mutate(x);
  };
  // Delete Todo Function
  const deleteTask = (id: string) => {
    setIsLoading(true);
    deleteTodo(id);
  };
  // Todo status completion
  const toggleTaskCompletion = (todo: TodoList) => {
    const x = {
      _id: todo._id,
      text: todo.text,
      completed: !todo.completed,
    };
    editTodo.mutate(x);
  };

  useEffect(() => {
    if (addNewTodo.isSuccess || addNewTodo.isError) {
      setIsLoading(false);
      setValue("text", "");
    }
    // eslint-disable-next-line
  }, [addNewTodo.isSuccess, addNewTodo.isError]);

  useEffect(() => {
    if (editTodo.isSuccess || editTodo.isError) {
      setIsLoading(false);
      setValue("text", "");
    }
    // eslint-disable-next-line
  }, [editTodo.isSuccess, editTodo.isError]);

  useEffect(() => {
    if (!isPending) {
      setIsLoading(false);
    }
  }, [isPending]);

  useEffect(() => {
    todos.refetch();
  }, [status, todos]);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-auto">
      <main className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl dark:bg-gray-700">
        {/* Todo Header */}
        <div className="flex justify-between items-center mb-4">
                <h1 className="bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD_14.06%,#709DF7_51.02%,#4D78EF_79.09%)] bg-clip-text text-base leading-[1.2] tracking-tighter text-transparent sm:text-center font-semibold sm:text-lg sm:leading-[1.75rem] lg:text-left">
                  Sabre Todo App
                </h1>
                <div className="flex gap-4 text-black">
                  <Link to="/" className="hover:text-blue-500">Tasks</Link>
                  <Link to="/about"  className="hover:text-blue-500">About</Link>
              </div>
        </div>
        {/* Create todo form*/}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center bg-gray-100 p-3 rounded-lg mb-4"
        >
          <input
            type="text"
            {...register("text")}
            className="w-full px-4 py-2 bg-transparent text-gray-800 outline-none dark:text-white"
            placeholder="Add a new todo..."
          />
          {errors?.text && (
            <span className="text-red-500 text-xs">
              {errors?.text?.message}
            </span>
          )}
          <button type="submit" className="">
            <PlusCircleIcon className="w-10 h-10 text-blue-500 hover:text-blue-700" />
          </button>
        </form>
        {/* Todo List */}
        <div className="space-y-4 overflow-auto max-h-[50vh] custom-scrollbar">
          {todos.isLoading ? (
            <div className="text-center">Loading...</div>
          ) : todos?.data?.response && todos?.data?.response?.length > 0 ? (
            todos.data.response.map((todo, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-200 p-4 rounded-lg shadow-sm dark:bg-gray-600 mb-2"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTaskCompletion(todo)}
                    className="w-5 h-5 border-2 border-gray-600 rounded-full dark:border-gray-300"
                  />
                  <p
                    className={`ml-3 text-gray-700 dark:text-gray-300 ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.text}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteTask(todo._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(todo)}
                    aria-label="Edit todo"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">You have not created a todo!</div>
          )}
        </div>
        {/* Todo Filter */}
        <div className="flex justify-between items-center mt-6">
          {todos.data?.response.filter((todo) => !todo.completed).length + ' ' + `tasks`} 
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setStatus("")}
              className={`text-gray-600 dark:text-gray-400 hover:text-blue-500 ${
                status === "" ? "underline text-blue-500" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatus("active")}
              className={`text-gray-600 dark:text-gray-400 hover:text-blue-500 ${
                status === "active" ? "underline text-blue-500" : ""
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatus("completed")}
              className={`text-gray-600 dark:text-gray-400 hover:text-blue-500 ${
                status === "completed" ? "underline text-blue-500" : ""
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </main>
      {/* Loader */}
      {isLoading && <Loader title="Please Wait..." />}
      {/* Edit Todo Modal */}
      <Modal
        isOpen={edit}
        onClose={() => setEdit(false)}
        description="Edit Todo"
        confirmText="Edit"
        cancelText="Cancel"
        confirmColor="bg-purple-500 text-white"
        cancelColor="bg-gray-100 text-black"
        onConfirm={handleSubmit(onEdit)}
      >
        <input
          type="text"
          {...register("text")}
          className="w-full px-4 py-2 bg-transparent border-2 border-gray-800 rounded-lg text-gray-800 outline-none dark:text-white"
          placeholder="Edit todo..."
        />
      </Modal>
    </div>
  );
};

export default TodoApp;
