import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoApp from '../pages/List';
import { useGetTodos } from '../api-services/use-get-todos';
import {useCreateTodo} from '../api-services/use-add-todo'
import { useDeleteTodo } from '../api-services/use-delete-todo';
import { useEditTodo } from '../api-services/use-edit-todo';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../api-services/use-get-todos', () => ({
  useGetTodos: jest.fn(),
}));
jest.mock("../api-services/use-add-todo", () => ({
    useCreateTodo: jest.fn(),
  }));
  
  jest.mock("../api-services/use-delete-todo", () => ({
    useDeleteTodo: jest.fn(),
  }));
  jest.mock("../api-services/use-edit-todo", () => ({
    useEditTodo: jest.fn(),
  }));

describe('TodoApp Component', () => {
  const mockTodos = [
    { _id: '1', text: 'Test Todo 1', completed: false },
    { _id: '2', text: 'Test Todo 2', completed: true },
  ];

  beforeEach(() => {
    (useGetTodos as jest.Mock).mockReturnValue({
      data: { response: mockTodos },
      refetch: jest.fn(),
      isLoading: false,
    });
    (useCreateTodo as jest.Mock).mockReturnValue({ mutate: jest.fn() });
    (useDeleteTodo as jest.Mock).mockReturnValue({ mutate: jest.fn(), isPending: false });
    (useEditTodo as jest.Mock).mockReturnValue({ mutate: jest.fn() });
  });

  it('renders the component correctly', () => {
    render(
    <MemoryRouter>
      <TodoApp />
    </MemoryRouter>
  );
    expect(screen.getByText('Sabre Todo App')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('displays todos from the API', () => {
    render(
    <MemoryRouter>
      <TodoApp />
    </MemoryRouter>
  );
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  it('creates a new todo', async () => {
    const mockMutate = jest.fn();
    (useCreateTodo as jest.Mock).mockReturnValue({ mutate: mockMutate });

    render(
    <MemoryRouter>
      <TodoApp />
    </MemoryRouter>
  );
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByRole('button', { name: /plus/i });

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({ text: 'New Todo' });
    });
  });

  it('deletes a todo', async () => {
    const mockDelete = jest.fn();
    (useDeleteTodo as jest.Mock).mockReturnValue({ mutate: mockDelete });

    render(
    <MemoryRouter>
      <TodoApp />
    </MemoryRouter>
  );
    const deleteButton = screen.getAllByRole('button', { name: /trash/i })[0];

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith('1'); 
    });
  });

  it('edits a todo', async () => {
    const mockEdit = jest.fn();
    (useEditTodo as jest.Mock).mockReturnValue({ mutate: mockEdit });

    render(
    <MemoryRouter>
      <TodoApp />
    </MemoryRouter>
  );
    const editButton = screen.getAllByRole('button', { name: /edit role/i })[0];
    fireEvent.click(editButton);

    const modalInput = screen.getByPlaceholderText('Edit todo...');
    fireEvent.change(modalInput, { target: { value: 'Updated Todo' } });

    const confirmButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockEdit).toHaveBeenCalledWith({
        _id: '1',
        text: 'Updated Todo',
        completed: false,
      });
    });
  });

  it('toggles todo completion', async () => {
    const mockEdit = jest.fn();
    (useEditTodo as jest.Mock).mockReturnValue({ mutate: mockEdit });

    render(
    <MemoryRouter>
      <TodoApp />
    </MemoryRouter>
  );
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(mockEdit).toHaveBeenCalledWith({
        _id: '1',
        text: 'Test Todo 1',
        completed: true,
      });
    });
  });

  it('filters todos based on status', () => {
    render(
    <MemoryRouter>
      <TodoApp />
    </MemoryRouter>
  );
    const activeButton = screen.getByText('Active');

    fireEvent.click(activeButton);

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Todo 2')).toBeNull();
  });
});
