import Home from "../views/Home";
import Agreement from "../views/Agreement";
import Instructions from "../views/Instructions";
import Help from "../views/Help";
import Login from "../views/user/Login";
import Register from "../views/user/Register";
import Files from "../views/Files";
import NotFound from "../views/errors/404"
import NoPermission from "../views/errors/403"
import InternalError from "../views/errors/500"
import Introduction from "../views/Introduction";
import Profile from "../components/Profile";
import UserList from "../views/admin/UserList";
import FileReview from "../views/admin/FileReview";
import MyFiles from "../views/MyFiles";


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
    redirect: '/instructions',
    children: [
      {
        path: '/instructions',
        name: 'instructions',
        component: Instructions
      },
      {
        path: '/about/agreement',
        name: 'agreement',
        component: Agreement
      },
      {
        path: '/about/introduction',
        name: 'introduction',
        component: Introduction
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
      },
      {
        path: '/myfiles',
        name: 'myfiles',
        component: MyFiles
      },
      {
        path: '/admin/users',
        name: 'users',
        component: UserList
      },
      {
        path: '/admin/file-review',
        name: 'review',
        component: FileReview
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
