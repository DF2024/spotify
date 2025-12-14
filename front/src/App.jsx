import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import AlbumPage from './pages/AlbumPage';
import AdminPage from './pages/AdminPanel'; // <--- IMPORTAR
import MainLayout from './components/Layout/MainLayout';
import { useAuthStore } from './stores/useAuthStore';

// Protección básica: Solo logueados
const ProtectedRoute = ({ children }) => {
    const { token } = useAuthStore();
    return token ? children : <Navigate to="/login" />;
};

// Protección Admin: Solo rol 'admin'
const AdminRoute = ({ children }) => {
    const { token, isAdmin } = useAuthStore();
    // Si no hay token o no es admin, fuera
    if (!token || !isAdmin()) {
        return <Navigate to="/" />;
    }
    return children;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<RegisterPage />} />

                {/* Rutas con Layout */}
                <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                    <Route path="/" element={<HomePage />} />
                    {/* NUEVA RUTA DINÁMICA */}
                    <Route path="/album/:id" element={<AlbumPage/>}/>
                    {/* RUTA ADMIN */}
                    <Route path="/admin" element={
                        <AdminRoute>
                            <AdminPage />
                        </AdminRoute>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
