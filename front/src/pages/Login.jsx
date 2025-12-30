import { useState } from 'react'
import { useAuthStore } from '../stores/useAuthStore'
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/'); 
        } else {
            alert('Error al iniciar sesión');
        }
    };

    return(
                <div className="bg-black h-screen flex flex-col items-center justify-center text-white">
            <header className="mb-8">
                <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="Spotify" className="w-48" />
            </header>
            
            <div className="bg-black w-full max-w-sm p-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-sm">Email o usuario</label>
                        <input 
                            type="email" 
                            className="p-3 rounded bg-[#121212] border border-[#727272] hover:border-white focus:outline-none focus:border-white transition"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-sm">Contraseña</label>
                        <input 
                            type="password" 
                            className="p-3 rounded bg-[#121212] border border-[#727272] hover:border-white focus:outline-none focus:border-white transition"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit"
                        className="bg-green-500 text-black font-bold rounded-full py-3 mt-4 hover:scale-105 transition duration-200 uppercase tracking-wider text-sm"
                    >
                        Iniciar Sesión
                    </button>

                    <p className="mt-8 text-center text-[#b3b3b3] text-sm">
                        ¿No tienes cuenta?{' '}
                        <Link to="/signup" className="text-white hover:text-spotify-green underline font-medium">
                            Registrate aquí
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage