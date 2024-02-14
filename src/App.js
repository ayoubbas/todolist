import * as React from "react";
import Card from "@mui/material/Card";
import FloatingAction from "./components/FloatingAction";
import ModalOfInputs from "./components/ModalOfInputs";
import { MyTodos } from "./context/ContextTodos";
import ResponsiveAppBar from "./components/UserAccount";
function App() {
  const defaultTodos = [];
  const [todo, setTodos] = React.useState(defaultTodos);

  React.useEffect(() => {
    const getItem = JSON.parse(localStorage.getItem("todosArr")) ?? [];
    setTodos(getItem);
  }, []);

  return (
    <div className="main">
      <Card sx={{ minWidth: "sm" }}>
        <MyTodos.Provider value={{ todo, setTodos }}>
          <div className="header">
            <ResponsiveAppBar />
          </div>
          <FloatingAction />
        </MyTodos.Provider>
      </Card>
    </div>
  );
}

export default App;
