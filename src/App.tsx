import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { ROUTES } from "./Routes";
import TasksPage from "./pages/TasksPage/TasksPage";


function App() {
    return (
      <BrowserRouter basename="/">
        <Routes>
          <Route path={ROUTES.TASKS} element={<TasksPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;