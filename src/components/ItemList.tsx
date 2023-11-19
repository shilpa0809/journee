import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { addTodo, editTodo, removeTodo } from "../actions/todo/todoAC";
import { Item, useAppDispatch, useAppSelector } from "../types/types";

const List = styled.ul`
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  list-style: none;
`;

const ItemContainer = styled.li`
  width: 100%;
  margin: 10px 0;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: #f5f5f5;
  transition: background-color 0.3s ease;
  padding: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #e0e0e0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
  }
`;

const ItemCheckbox = styled.input.attrs({
  type: "checkbox",
})`
  margin-right: 10px;
`;

const ItemInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;

  @media (max-width: 768px) {
    width: calc(100% - 30px);
    margin-top: 10px;
  }
`;

const TodoItem: React.FC<{ item: Item | null }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set focus on the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [item]);

  useEffect(() => {
    const focusedElement = document.activeElement;
    if (item && inputRef.current && inputRef.current !== focusedElement && inputRef.current.value.trim() === '') {
      // Pass the item ID to the removeTodo action
      dispatch(removeTodo(item.id));
    }
  }, [item, dispatch]);

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
        placeholder="Enter your task..."
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
