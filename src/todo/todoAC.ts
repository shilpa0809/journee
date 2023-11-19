import { Action } from "redux";

export const ITEM_ADD = "ITEM_ADD";
export const ITEM_EDIT = "ITEM_EDIT";
export const ITEM_REMOVE = "ITEM_REMOVE";

export type TodoAction = AddTodoAction | EditTodoAction;

interface BaseAction extends Action {
  type: string;
}

export interface AddTodoAction extends BaseAction {
  type: typeof ITEM_ADD;
  text: string;
}

export const addTodo = (text: string): AddTodoAction => ({
  type: ITEM_ADD,
  text,
});

export interface EditTodoAction extends BaseAction {
  type: typeof ITEM_EDIT;
  itemId: string;
  text: string;
}

export const editTodo = (itemId: string, text: string): EditTodoAction => ({
  type: ITEM_EDIT,
  itemId,
  text,
});
