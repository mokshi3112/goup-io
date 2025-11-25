
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TaskListPage from './pages/TaskListPage';
import TaskDetailPage from './pages/TaskDetailPage';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
