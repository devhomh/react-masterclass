import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #ecf0f1;
  height: 85vh;
  width: 100vw;
  max-width: 680px;
  border-radius: 15px;
  padding: 15px;
`;

const Select = styled.select`
  background-color: transparent;
  width: 100px;
  height: 40px;
  text-align: center;
  margin-right: 15px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  appearance: none;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const InputCategory = styled.input`
  margin-left: 10px;
  font-size: 20px;
  height: 40px;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

function ToDoList() {
  const [open, setOpen] = useState(false);
  const onClick = (event: React.MouseEvent<SVGElement>) => {
    setOpen((current) => !current);
  };
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Wrapper>
      <Nav>
        <Select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </Select>
        <FontAwesomeIcon
          icon={faPlus}
          size="2x"
          onClick={onClick}
          color="#95a5a6"
          cursor="pointer"
        />
        {open ? (
          <form>
            <InputCategory placeholder="Creat New Category" autoFocus />
          </form>
        ) : null}
      </Nav>
      <CreateToDo />
      <hr />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Wrapper>
  );
}

export default ToDoList;

// -----------------React Form 미사용-------------------- //
/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} placeholder="Write a to do" value={toDo} />
        <button>Add</button>
      </form>
    </div>
  );
}
 */
