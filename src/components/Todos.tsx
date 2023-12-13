import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, editTodo, removeTodo, toggleTodo, setFilter, listTodo, resetTodo } from '../store/todoSlice';
import { logout } from '../store/authSlice';
import authService from '../appwrite/auth';
import appwriteService from "../appwrite/config";
import AddTodo from './AddTodo';

interface Todo {
  $id: string;
  text: string;
  completed: boolean;
}

function Todos() {
  const [todoFormEnabled, setTodoFormEnabled] = useState(true);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string>("");
  const userData = useSelector((state: any) => state.auth.userData); // Replace 'any' with the actual type of your auth state
  const todos = useSelector((state: any) => state.todos); // Replace 'any' with the actual type of your todos state
  const dispatch = useDispatch();
  const filter = todos.filter;

  useEffect(() => {
    // console.log('call query==', userData, ' hhh=', userData.$id);
    appwriteService.getTodos(userData.$id).then((todos) => {
      // console.log('todos fetch==', todos.documents);
      if (todos) {
        dispatch(listTodo(todos.documents));
      }
    });
  }, []);

  const filteredTodos = todos.todos.filter((task: Todo) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'active') {
      return !task.completed;
    }
    return true;
  });

  const handleEditClick = (id: string) => {
    setTodoFormEnabled(false);
    id && setTodo(filteredTodos.find((todo) => todo.$id === id) || null);
  };

  const todoHandler = (type: string, input: string) => {
    // console.log('upd==', todo);
    if (input) {
      if (type === 'Add') {
        todoCreate(input);
      } else {
        todoUpdate(input);
        setTodoFormEnabled(true);
      }
    }
  };

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(resetTodo());
      dispatch(logout());
    });
  };

  const todoCreate = async (text: string) => {
    // console.log('user data==', userData);
    setError("");
    try {
      const dbTodo = await appwriteService.createTodo({ text, userId: userData.$id });
      // console.log('data==', dbTodo);
      if (dbTodo) dispatch(addTodo(dbTodo));
    } catch (error) {
      setError(error.message);
    }
  };

  const todoUpdate = async (text: string) => {
    // console.log('upd==', todo, 'tct=', text);
    setError("");
    try {
      const dbTodo = await appwriteService.updateTodo({ id: todo?.$id || '', text });
      // console.log('db==', dbTodo);
      if (dbTodo) dispatch(editTodo(dbTodo));
      setTodo(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const todoDelete = async (id: string) => {
    // console.log('del==', todo, 'tct=', id);
    setError("");
    try {
      const dbTodo = await appwriteService.deleteTodo(id);
      // console.log('db==', dbTodo);
      if (dbTodo) dispatch(removeTodo(id));
    } catch (error) {
      setError(error.message);
    }
  };

  const todoToggle = async (id: string, completed: boolean) => {
    setError("");
    try {
      // console.log('comp==', completed, 'tct=', id);
      const dbTodo = await appwriteService.toggleTodo({ id, completed: !completed });
      // console.log('db==', dbTodo);
      if (dbTodo) dispatch(toggleTodo(dbTodo));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="todo-app">
        <h1>Todo List</h1>
        <div className="logout-button">
          <button onClick={logoutHandler}>Logout</button>
        </div>
        {error && <p className="error">{error}</p>}
        {todoFormEnabled ? <AddTodo label={"Add"} todoHandler={todoHandler} />
          : <AddTodo label={"Edit"} todoHandler={todoHandler} todo={todo} />}
        <div className="filter-buttons">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => dispatch(setFilter('all'))}>All</button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => dispatch(setFilter('completed'))}>Completed</button>
          <button className={filter === 'active' ? 'active' : ''} onClick={() => dispatch(setFilter('active'))}>Active</button>
        </div>
        <ul>
          {filteredTodos.length > 0 && filteredTodos.map((task) => (
            <li key={task.$id} className={task.completed ? 'completed' : ''}>
              <span>{task.text}</span>
              <div>
                <button className="edit-btn" onClick={() => handleEditClick(task.$id)}>Edit</button>
                <button className="delete-btn" onClick={() => todoDelete(task.$id)}>Delete</button>
                <button className="check-btn" onClick={() => todoToggle(task.$id, task.completed)}>
                  {task.completed ? 'Uncheck' : 'Check'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Todos;
