import styled from "styled-components";
import ToDoList from "./components/ToDoList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Title = styled.h2`
  font-size: 50px;
  font-weight: 600;
  margin: 20px 0;
`;

function App() {
  return (
    <Wrapper>
      <Title>ToDo-List</Title>
      <ToDoList />
    </Wrapper>
  );
}

export default App;
