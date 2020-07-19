import Home from "../views/Home";
import Agreement from "../views/Agreement";
import Downloading from "../views/Downloading";
import Help from "../views/Help";
import Login from "../views/user/Login";
import Register from "../views/user/Register";
import Files from "../views/Files";
import NotFound from "../views/errors/404"
import NoPermission from "../views/errors/403"
import InternalError from "../views/errors/500"
import Introduction from "../views/Introduction";
import Profile from "../components/Profile";


export default [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    component: Home,
    redirect: '/introduction',
    children: [
      {
        path: '/introduction',
        name: 'introduction',
        component: Introduction
      },
      {
        path: '/about/agreement',
        name: 'agreement',
        component: Agreement
      },
      {
        path: '/about/downloading',
        name: 'downloading',
        component: Downloading
      },
      {
        path: '/files/*',
        name: 'files',
        component: Files
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile
      },
      {
        path: '/help',
        name: 'help',
        component: Help
      }
    ]
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: NotFound
  },
  {
    path: '/no-permission',
    name: 'no-permission',
    component: NoPermission
  },
  {
    path: '/internal-error',
    name: 'internal-error',
    component: InternalError
  },
  {
    path: '*', redirect: '/login'
  }
]
