
import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import Dashboard from './components/Admin/Content/Dashboard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Questions from './components/Admin/Content/Question/Questions';
import PrivateRoute from './routes/PrivateRoute';
import { Suspense } from 'react';
import './Animation.scss'

const NotFound = () => {
    return (
        <div className='alert alert-danger'>
            404. Not Found Page
        </div>
    )
}
const Layout = (props) => {
    return (
        <Suspense fallback={
            <div className='full-screen'>
                <span className='loader'></span>
            </div>
        }>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />
                    <Route path="/quiz/:id" element={<DetailQuiz />} />
                </Route>

                <Route path="admin" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>} >
                    <Route index element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Suspense>
    )
}
export default Layout