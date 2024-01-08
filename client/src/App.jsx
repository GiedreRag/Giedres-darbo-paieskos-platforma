import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextWrapper } from "./context/GlobalContext";
import { PublicLayout } from './layout/PublicLayout';
import { Page404 } from './pages/Page404';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Account } from './pages/accounts/Account';
import { UserLayout } from './layout/UserLayout';
import { AdminCitiesList } from './pages/cities/AdminCitiesList';
import { UpdateForm } from './pages/accounts/admin/UpdateForm';
import { AdminNewCity } from './pages/cities/AdminNewCity';
import { AdminEditCity } from './pages/cities/AdminEditCity';
import { Users } from './pages/users/Users';
import { Posters } from './pages/posters/Posters';
import { AddPoster } from './pages/posters/AddPoster';
import { EditPoster } from './pages/posters/EditPoster';
import { AllPostersPublic } from './pages/AllPostersPublic';


function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route index path='/' element={<Home />}></Route>
            <Route path='/visi-skelbimai' element={<AllPostersPublic />}></Route>
            <Route path='/registracija' element={<Register />}></Route>
            <Route path='/prisijungimas' element={<Login />}></Route>
          </Route>
          <Route Component={UserLayout}>
            <Route path='/paskyra' element={<Account />}></Route>
            <Route path='/paskyra/koreguoti-forma' element={<UpdateForm />}></Route>
            <Route path='/paskyra/koreguoti-forma/miestu-sarasas' element={<AdminCitiesList />}></Route>
            <Route path='/paskyra/koreguoti-forma/miestu-sarasas/naujas' element={<AdminNewCity />}></Route>
            <Route path='/paskyra/koreguoti-forma/miestu-sarasas/:city/koreguoti' element={<AdminEditCity />}></Route>
            <Route path='/paskyra/vartotojai' element={<Users />}></Route>
            <Route path='/paskyra/skelbimai' element={<Posters />}></Route>
            <Route path='/paskyra/skelbimai/naujas' element={<AddPoster />}></Route>
            <Route path='/paskyra/skelbimai/:posterId/koreguoti' element={<EditPoster />}></Route>
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



