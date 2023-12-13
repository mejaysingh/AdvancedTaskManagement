import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  $id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: string;
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    resetTodo: (state) => {
      state.todos = [];
    },
    listTodo: (state, action: PayloadAction<Todo[]>) => {
      console.log('state==', state.todos, 'act=', action.payload);
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      console.log('state==', state.todos, 'act=', action.payload);
      const todo = state.todos.find((todo) => todo.$id === action.payload.$id);
      console.log('todo==', todo);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      console.log('state==', state.todos, 'act=', action.payload);
      state.todos = state.todos.filter((todo) => todo.$id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<Todo>) => {
      console.log('state==', state.todos, 'act=', action.payload);
      const todo = state.todos.find((todo) => todo.$id === action.payload.$id);
      if (todo) {
        todo.completed = action.payload.completed;
      }
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { listTodo, addTodo, editTodo, removeTodo, toggleTodo, setFilter, resetTodo } = todoSlice.actions;

export default todoSlice.reducer;
