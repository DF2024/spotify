import { Link } from 'react-router-dom';
import { GoHome, GoSearch } from "react-icons/go"; // Iconos Home/Search
import { LuLibrary } from "react-icons/lu"; // Icono Librería
import { FiPlusSquare } from "react-icons/fi"; // Icono Crear Playlist
import { useAuthStore } from '../../stores/useAuthStore';

const Sidebar = () => {
    const { user, isAdmin } = useAuthStore();

    return (
        <aside className="w-64 bg-black h-full flex flex-col gap-2 p-2">
            {/* Bloque 1: Navegación Principal */}
            <div className="bg-[#121212] rounded-lg p-4 flex flex-col gap-4">
                <Link to="/" className="flex items-center gap-4 text-[#b3b3b3] hover:text-white transition font-bold">
                    <GoHome size={24} />
                    Inicio
                </Link>
                <Link to="/search" className="flex items-center gap-4 text-[#b3b3b3] hover:text-white transition font-bold">
                    <GoSearch size={24} />
                    Buscar
                </Link>
            </div>

            {/* Bloque 2: Librería */}
            <div className="bg-[#121212] rounded-lg p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4 text-[#b3b3b3]">
                    <div className="flex items-center gap-2 hover:text-white transition cursor-pointer font-bold">
                        <LuLibrary size={24} />
                        Tu Biblioteca
                    </div>
                    <button className="hover:text-white hover:bg-[#1f1f1f] p-1 rounded-full">
                        <FiPlusSquare size={20} />
                    </button>
                </div>

                {/* Sección Scrollable de Playlists */}
                <div className="flex-1 overflow-y-auto">
                    {/* Botón especial para Admin */}
                    {isAdmin() && (
                        <Link to="/admin" className="block p-3 bg-white/10 rounded-md mb-2 text-sm font-bold text-center hover:bg-white/20">
                            🛠️ Panel de Admin
                        </Link>
                    )}
                    
                    {/* Aquí mapearemos las playlists del usuario luego */}
                    <div className="p-4 bg-[#242424] rounded-lg mt-4">
                        <p className="font-bold">Crea tu primera lista</p>
                        <p className="text-sm mt-2">Es muy fácil, te echaremos una mano.</p>
                        <button className="mt-4 px-4 py-2 bg-white text-black font-bold rounded-full text-sm hover:scale-105 transition">
                            Crear lista
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;