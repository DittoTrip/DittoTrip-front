// import styled from 'styled-components';
import { DittoProvider } from './context/themeContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import Layout from './layout/Layout';
import Home from './pages/Home';
import ErrorPage from './pages/Error';
import LangPage from './pages/LangPage';
import Category from './pages/Category';
import Review from './pages/Review';
import NewReview from './pages/NewReview';
import ReviewDetail from './pages/ReviewDetail';
import Search from './pages/Search';
import Join from './pages/Join';
import Report from './pages/Report';
import Spot from './pages/Spot';

const router = createBrowserRouter([
  {
    path: '/',

    element: (
      <Layout GNBType="home">
        <Home />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
  },
  {
    path: '/lang',
    element: (
      <Layout>
        <LangPage />
      </Layout>
    ),
  },
  {
    path: '/category',
    element: (
      <Layout GNBType="search">
        <Category />
      </Layout>
    ),
  },
  {
    path: '/spot/:id',
    element: (
      <Layout GNBType="search">
        <Spot />
      </Layout>
    ),
  },
  {
    path: '/review',
    element: (
      <Layout GNBType="search">
        <Review />
      </Layout>
    ),
  },
  {
    path: '/review/new',
    element: (
      <Layout GNBType="search">
        <NewReview />
      </Layout>
    ),
  },
  {
    path: '/review/:id',
    element: (
      <Layout GNBType="search">
        <ReviewDetail />
      </Layout>
    ),
  },
  {
    path: '/search',
    element: (
      <Layout GNBType="search">
        <Search />
      </Layout>
    ),
  },
  {
    path: '/join',
    element: (
      <Layout>
        <Join />
      </Layout>
    ),
  },
  {
    path: '/report',

    element: (
      <Layout GNBType="search">
        <Report />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <>
      <DittoProvider>
        <RouterProvider router={router} />
      </DittoProvider>
    </>
  );
}

export default App;
