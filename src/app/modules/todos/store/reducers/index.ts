import { createSelector, createFeatureSelector } from '@ngrx/store';

import { TodosState } from '@app/todos/shared';
import { todosReducer, getTodoItems, getTodosFormInput, getTodosLastEdited } from './todos.reducer';

export const reducers = todosReducer;

export const getTodosState = createFeatureSelector<TodosState>('todos');

export const getTodoListState = createSelector(
  getTodosState,
  getTodoItems
);

export const getTodosFormInputState = createSelector(
  getTodosState,
  getTodosFormInput
);

export const getTodosLastEditedState = createSelector(
  getTodosState,
  getTodosLastEdited
);
