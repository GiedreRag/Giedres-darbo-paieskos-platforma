import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextWrapper } from "./context/GlobalContext";
import { PublicLayout } from './layout/PublicLayout';
import { Page404 } from './pages/Page404';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Account } from './pages/Account';
import { UserLayout } from './layout/UserLayout';
import { AdminCitiesList } from './pages/AdminCitiesList';
import { UpdateForm } from './pages/UpdateForm';


function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route index path='/' element={<Home />}></Route>
            <Route path='/registracija' element={<Register />}></Route>
            <Route path='/prisijungimas' element={<Login />}></Route>
          </Route>
          <Route Component={UserLayout}>
            <Route path='/paskyra' element={<Account />}></Route>
            <Route path='/koreguoti-forma' element={<UpdateForm />}></Route>
            <Route path='/koreguoti-forma/miestu-sarasas' element={<AdminCitiesList />}></Route>
          </Route>
          <Route Component={PublicLayout}>
            <Route path='*' element={<Page404 />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  );
}

export default App;



