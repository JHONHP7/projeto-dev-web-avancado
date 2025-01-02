import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from '../presentation/Home/Home';
import ListAdvertise from '../presentation/AdvertiseScene/ListAdvertise';
import ListBooks from '../presentation/BookScene/ListBooks';
import CreateBook from '../presentation/BookScene/CreateBook';
import UpdateBook from '../presentation/BookScene/UpdateBook';
import Login from '../presentation/Login/Login';
import LoanScene from '../presentation/LoanScene/LoanScene';
import CreateLoan from '../presentation/LoanScene/CreateLoan';
import UserProfile from '../presentation/UserScene/UserProfile';
import Content from '../presentation/Content/ContentScene';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/content",
    element: <Content />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "/content/advertises",
        element: <ListAdvertise />,
      },
      {
        path: "/content/books",
        element: <ListBooks />,
      },
      {
        path: "/content/books/create",
        element: <CreateBook />,
      },
      {
        path: "/content/books/update/:id",
        element: <UpdateBook />,
      },
      {
        path: "/content/loans",
        element: <LoanScene />,
      },
      {
        path: "/content/loans/create",
        element: <CreateLoan />,
      },
      {
        path: "/content/profile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);