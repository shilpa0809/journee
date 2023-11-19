import React from "react";
import styled from "styled-components";
import { addTodo, editTodo } from "../todo/todoAC";
import { useAppDispatch, useAppSelector } from "../types";

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Item = styled.li`
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

const ItemList: React.FC = () => {
  const items = useAppSelector((s) => s.todos.items);
  const dispatch = useAppDispatch();
  return (
    <List>
      {items.map((item) => (
        <Item key={item.id}>
          <ItemCheckbox />
          <ItemInput
            type="text"
            value={item.text}
            onChange={(e) => dispatch(editTodo(item.id, e.target.value))}
          />
        </Item>
      ))}
      <Item key="new">
        <ItemCheckbox />
        <ItemInput
          type="text"
          value=""
          onChange={(e) => dispatch(addTodo(e.target.value))}
        />
      </Item>
    </List>
  );
};

export default ItemList;
