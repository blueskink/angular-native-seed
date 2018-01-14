import { State, Action } from '@ngrx/store';

import { Todo, TodosState } from '@app/todos/shared';
import { TodosAction, TodosActionTypes } from '@app/todos/store/actions';

const initialState: TodosState = {
  incrementId: 0,
  formInput: '',
  lastEdited: null,
  items: []
};

const newState = (state, newData) => {
  return { ...state, ...newData };
};

export function todosReducer(
  state: TodosState = initialState,
  action: TodosAction
): TodosState {

  switch (action.type) {
    case TodosActionTypes.add: {
      const item = Object.assign({}, action.payload, { id: state.incrementId });
      const items = [...state.items, item];
      return newState(state, { incrementId: state.incrementId + 1, items });
    }

    case TodosActionTypes.edit: {
      const idx = state.items.findIndex(item => item.id === action.payload.id);
      const updatedItem: Todo = {...state.items[idx], text: action.payload.text };
      const items = [...state.items];
      items.splice(idx, 1, updatedItem);
      return newState(state, { items, lastEdited: action.payload.id });
    }

    case TodosActionTypes.delete: {
      const idx = state.items.findIndex(item => item.id === action.payload);
      const items = [...state.items];
      items.splice(idx, 1);
      return newState(state, { items });
    }

    case TodosActionTypes.completeSet: {
      const idx = state.items.findIndex(item => item.id === action.payload);
      const items = [...state.items];
      const updatedItem = { ...state.items[idx], completed: true };
      items.splice(idx, 1, updatedItem);
      return newState(state, { items });
    }

    case TodosActionTypes.completeUnset: {
      const idx = state.items.findIndex(item => item.id === action.payload);
      const items = [...state.items];
      const updatedItem = { ...state.items[idx], completed: false };
      items.splice(idx, 1, updatedItem);
      return newState(state, { items });
    }

    case TodosActionTypes.formInputSet: {
      const formInput = action.payload;
      return newState(state, { formInput });
    }

    case TodosActionTypes.formInputReset: {
      return newState(state, { formInput: '' });
    }

    default: {
      return state;
    }
  }
}

export const getTodoItems = (state: TodosState) => state.items;
export const getTodosFormInput = (state: TodosState) => state.formInput;
export const getTodosLastEdited = (state: TodosState) => state.lastEdited;
