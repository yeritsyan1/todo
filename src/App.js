import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/registration/Signin";
import MyTodoBody from "./components/todo/myTodo/MyTodoBody";
import Todo from "./components/todo/addTodo/Todo";
import { URL } from "./constants/constants";
import AuthProvider from "./auth/AuthProvider";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageNotFound />}>
            PageNotFound
          </Route>
          <Route element={<AuthProvider />}>
            <Route path={URL.add.path} element={<Todo />}>
              Add todo
            </Route>
            <Route path={URL.myTodos.path} element={<MyTodoBody />}>
              My todo
            </Route>
            Auth Context
          </Route>
          <Route path={URL.signIn.path} element={<Signin />}>
            Register
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
