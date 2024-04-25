import './index.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='font-mono'>
      <Outlet />
    </div>
  )
}

export default App;
