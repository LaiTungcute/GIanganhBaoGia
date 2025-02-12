import AppRouters from './router/AppRouters';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom' // Fix import statement

const App = () => (
  <Router> {/* Fix component name */}
    <AppRouters />
  </Router>
);

export default App
