import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { addTodo, editTodo } from "../actions/todo/todoAC";
import { Item, useAppDispatch, useAppSelector } from "../types/types";

const List = styled.ul`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const ItemContainer = styled.li`
  width: 100%;
  margin: 4px 0;
  display: flex;
  flex-direction: row;
`;

const ItemInput = styled.input`
  width: 100%;
`;

const ItemCheckbox = styled.input.attrs({
  type: "checkbox",
})``;

const TodoItem: React.FC<{ item: Item | null }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set focus on the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (value: string) => {
    if (item) {
      dispatch(editTodo(item.id, value));
    } else {
      dispatch(addTodo(value));
    }
  };

  return (
    <ItemContainer>
      <ItemCheckbox />
      <ItemInput
        type="text"
        value={item ? item.text : ""}
        onChange={(e) => handleChange(e.target.value)}
        ref={inputRef} // Assign the ref to the input element
      />
    </ItemContainer>
  );
};

const ItemList: React.FC = () => {
  const items: Item[] = useAppSelector((s) => s.todos.items);

  return (
    <List>
      {items.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
      <TodoItem key="new" item={null} />
    </List>
  );
};

export default ItemList;
