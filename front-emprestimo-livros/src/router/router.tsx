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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Navigate to="advertises" replace />,
      },
      {
        path: "advertises",
        element: <ListAdvertise />,
      },
      {
        path: "books",
        element: <ListBooks />,
      },
      {
        path: "books/create",
        element: <CreateBook />,
      },
      {
        path: "books/update/:id",
        element: <UpdateBook />,
      },
      {
        path: "loans",
        element: <LoanScene />,
      },
      {
        path: "loans/create",
        element: <CreateLoan />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);