import { useEffect } from 'react'
import Route from './routes/Routes'
import './assets/scss/index.scss'
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,  
      once: true,        
      // offset: 500,
    });
  }, []);
  return (
    <>
      <Route />
    </>
  )
}

export default App
