import '@aws-amplify/ui-react/styles.css'
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ProtectedPage from './pages/ProtectedPage';
import Layout from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';


function App() {

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/protected-page' element={
            <ProtectedRoute>
              <ProtectedPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </div>
  );
}

export default (App);
