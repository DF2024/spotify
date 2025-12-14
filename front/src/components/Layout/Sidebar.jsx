import { Link } from 'react-router-dom';
import { GoHome, GoSearch } from "react-icons/go"; // Iconos Home/Search
import { LuLibrary } from "react-icons/lu"; // Icono Librería
import { FiPlusSquare } from "react-icons/fi"; // Icono Crear Playlist
import { useAuthStore } from '../../stores/useAuthStore';
import { useEffect, useState } from 'react';
import api from '../../api/axios'

const Sidebar = () => {
    const { user, isAdmin } = useAuthStore();
    const [playlists, setPlaylist] = useState([])

    // Cargar playlists del usuario
    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const res = await api.get('/playlist');
                setPlaylist(res.data.data);
            } catch (error) {
                console.error("Error cargando playlist:", error);
            }
        };
        fetchPlaylists();
    }, [])

    // Función rápida para crear playlist (Opcional, versión simple)
    const createPlaylist = async () => {
        const title = prompt("Nombre de la nueva playlist:");
        if (!title) return;
        try {
            await api.post('/playlist', { title, isPublic: false });
            // Recargar página para verla (o podrías actualizar el estado)
            window.location.reload(); 
        } catch (error) {
            alert("Error al crear playlist");
        }
    };



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
                    
                    {/* Botón para crear playlist */}
                    <button 
                        onClick={createPlaylist}
                        className="hover:text-white hover:bg-[#1f1f1f] p-1 rounded-full"
                    >
                        <FiPlusSquare size={20} />
                    </button>
                </div>

                {/* Lista de Playlists */}
                <div className="flex-1 overflow-y-auto flex flex-col gap-2">
                    {/* Botón Admin */}
                    {isAdmin() && (
                        <Link to="/admin" className="block p-3 bg-white/10 rounded-md mb-2 text-sm font-bold text-center hover:bg-white/20 text-white">
                            🛠️ Panel de Admin
                        </Link>
                    )}

                    {/* Mapeo de Playlists */}
                    {playlists.map(playlist => (
                        <Link 
                            key={playlist.id} 
                            to={`/playlist/${playlist.id}`}
                            className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-md cursor-pointer group"
                        >
                            {/* Miniatura cuadrada */}
                            <div className="w-12 h-12 bg-[#282828] rounded flex items-center justify-center text-gray-500">
                                {playlist.coverImageUrl ? (
                                    <img src={playlist.coverImageUrl} className="w-full h-full object-cover rounded" />
                                ) : (
                                    <span className="text-xs">🎵</span>
                                )}
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-white font-medium truncate">{playlist.title}</span>
                                <span className="text-xs text-[#b3b3b3]">Playlist • {user.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;