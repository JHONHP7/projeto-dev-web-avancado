import { Navigate, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import CreateBook from '../presentation/BookScene/CreateBook';
import ListBooks from '../presentation/BookScene/ListBooks';
import UpdateBook from '../presentation/BookScene/UpdateBook';
import Home from '../presentation/Home/Home';
import CreateLoan from '../presentation/LoanScene/CreateLoan';
import LoanScene from '../presentation/LoanScene/LoanScene';
import Login from '../presentation/Login/Login';
import Register from '../presentation/Register/Register';
import UserProfile from '../presentation/UserScene/UserProfile';
import UsersList from '../presentation/UserScene/UsersList';
import UserUpdate from '../presentation/UserScene/UserUpdate';
import CreateUser from '../presentation/UserScene/CreateUser';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/content",
    element: <MainLayout />,
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
      {
        path: "/content/users",
        element: <UsersList />,
      },
      {
        path: "/content/users/create",
        element: <CreateUser />,
      },
      {
        path: "/content/users/edit-user/:id",
        element: <UserUpdate />,
      }
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
