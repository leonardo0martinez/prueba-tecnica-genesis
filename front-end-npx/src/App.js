import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/login'
import { Acceso } from './hooks/acceso'
import { Error404 } from './pages/error-404'
import { ENLACES } from './const/enlaces'
import { Registrar } from './pages/registrar'

export function App() {
  return (
    <Routes>
      {/* Inicio de Sesion */}
      <Route path={'/'} element={<Login />} />
      <Route path={'/registrar'} element={<Registrar />} />
      {/* Enlaces de Sistema */}
      <Route path={'/sistema'} element={<Acceso />}>
        {ENLACES.map((enlace, index) => (
          <Route key={index} path={enlace.path} element={enlace.component} />
        ))}
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
