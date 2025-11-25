
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TaskListPage from './pages/TaskListPage';
import TaskDetailPage from './pages/TaskDetailPage';
import TaskForm from './components/TaskForm';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#e0e6ff',
            border: '1px solid rgba(99, 102, 241, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<TaskListPage />} />
            <Route path="/add-task" element={<TaskForm />} />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
