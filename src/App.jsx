
import './App.css'
import { AppRouter } from './router/AppRouter'
import { HashRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <HashRouter>
          <AppRouter/>
    </HashRouter>
    
    </>
  )
}

export default App
