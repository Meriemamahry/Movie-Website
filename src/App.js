// App.js
import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import NavBar from './Component/NavBar';
import Test from './Component/Test';
import Favorite from './Component/Favorite';
import NotFound from './Component/NotFound';
import About from './Component/About';
import Categories from './Component/Categories';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/Movie-Website/" element={<NavBar />}>
      <Route index element={<Test />} />
      <Route path="about/:id" element={<About />} />
      <Route path="categories" element={<Categories/>}/>
      <Route path="favorite" element={<Favorite />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
