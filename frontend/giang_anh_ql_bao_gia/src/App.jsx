import AppRouters from './router/AppRouters';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

const App = () => (
  <AuthProvider>
    <Router>
      <AppRouters />
    </Router>
  </AuthProvider>
);

export default App
