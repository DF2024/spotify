import { useState } from 'react'
import { useAuthStore } from '../stores/useAuthStore'
import { useNavigate, Link } from 'react-router-dom';



const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const register = useAuthStore((state) => state.register);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 


        if (username.length < 3) return setError('El nombre debe tener al menos 3 caracteres');
        if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres');

        const success = await register(username, email, password);
        
        if (success) {
            alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
            navigate('/login'); 
        } else {
            setError('Error al registrarse. El email o usuario podría estar en uso.');
        }
    };

    return(
        <div className="bg-black h-screen flex flex-col items-center justify-center text-white p-4">
            <header className="mb-8">
                <img 
                    src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" 
                    alt="Spotify" 
                    className="w-40 md:w-48" 
                />
            </header>
            
            <div className="bg-black w-full max-w-sm">
                <h2 className="text-3xl font-bold mb-8 text-center tracking-tighter">Regístrate gratis para escuchar.</h2>
                
                {error && (
                    <div className="bg-red-500 text-white text-sm p-3 rounded mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-sm">Nombre de usuario</label>
                        <input 
                            type="text" 
                            className="p-3 rounded bg-[#121212] border border-[#727272] hover:border-white focus:outline-none focus:border-white transition"
                            placeholder="¿Cómo te llamamos?"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>


                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-sm">Correo electrónico</label>
                        <input 
                            type="email" 
                            className="p-3 rounded bg-[#121212] border border-[#727272] hover:border-white focus:outline-none focus:border-white transition"
                            placeholder="nombre@dominio.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>


                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-sm">Contraseña</label>
                        <input 
                            type="password" 
                            className="p-3 rounded bg-[#121212] border border-[#727272] hover:border-white focus:outline-none focus:border-white transition"
                            placeholder="Crea una contraseña segura"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        className="bg-green-500 text-black font-bold rounded-full py-3 mt-4 hover:scale-105 transition duration-200 uppercase tracking-wider text-sm"
                    >
                        Registrarse
                    </button>
                </form>

                <p className="mt-8 text-center text-[#b3b3b3] text-sm">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-white hover:text-spotify-green underline font-medium">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage