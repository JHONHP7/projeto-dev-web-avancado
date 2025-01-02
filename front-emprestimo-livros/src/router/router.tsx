import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from '../presentation/Home/Home';
import ListBooks from '../presentation/BookScene/ListBooks';
import CreateBook from '../presentation/BookScene/CreateBook';
import UpdateBook from '../presentation/BookScene/UpdateBook';
import Login from '../presentation/Login/Login';
import LoanScene from '../presentation/LoanScene/LoanScene';
import CreateLoan from '../presentation/LoanScene/CreateLoan';
import UserProfile from '../presentation/UserScene/UserProfile';
import ContentScene from '../presentation/Content/ContentScene';
import Register from '../presentation/Register/Register';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/content",
    element: <ContentScene />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
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
  {
    path: "/register",
    element: <Register />,
  },
]);