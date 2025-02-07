import './App.css'
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Allroute from './routes/Allroute';
import Footer from './componenets/Footer';
import Navbar from './componenets/Navbar';

function App() {
  return (
    <BrowserRouter> {/* Wrap your app with BrowserRouter */}
      <Navbar />
      <Allroute />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
