import { produce } from 'immer';
import { getNewId } from '../../utils/utils';
import { ITEM_ADD, ITEM_EDIT, ITEM_REMOVE, TodoAction } from '../../actions/todo/todoAC';
import { Item } from '../../types/types';

interface State {
  items: Item[];
}

const initialState: State = {
  items: [],
};

const todoReducer = (state: State = initialState, action: TodoAction): State => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case ITEM_ADD: {
        const newItem: Item = {
          id: getNewId(),
          done: false,
          text: action.text,
        };
        draftState.items.push(newItem);
        break;
      }
      case ITEM_EDIT: {
        const { itemId, text } = action;
        const index = draftState.items.findIndex((item) => item.id === itemId);
        if (index !== -1) {
          draftState.items[index].text = text;
        }
        break;
      }
      case ITEM_REMOVE: {
        const { itemId } = action;
        draftState.items = draftState.items.filter((item) => item.id !== itemId);
        break;
      }
      default:
        break;
    }
  });
};

export default todoReducer;
