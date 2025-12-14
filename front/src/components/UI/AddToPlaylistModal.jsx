import { useEffect, useState } from 'react';
import { FaTimes, FaMusic } from 'react-icons/fa';
import api from '../../api/axios';

const AddToPlaylistModal = ({ song, onClose }) => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. Cargar las playlists del usuario al abrir el modal
    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const res = await api.get('/playlists');
                setPlaylists(res.data.data);
            } catch (error) {
                console.error("Error cargando playlists:", error);
            }
        };
        fetchPlaylists();
    }, []);

    // 2. Función para agregar la canción a la playlist seleccionada
    const handleAddToPlaylist = async (playlistId) => {
        setLoading(true);
        try {
            // Endpoint: POST /api/playlists/:id/songs
            await api.post(`/playlists/${playlistId}/songs`, { songId: song.id });
            alert(`Canción agregada a la playlist!`);
            onClose(); // Cerrar modal al terminar
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.error || "Error al agregar canción");
        } finally {
            setLoading(false);
        }
    };

    return (
        // Fondo oscuro (Overlay)
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
            
            {/* Contenido del Modal */}
            <div className="bg-[#282828] w-full max-w-md rounded-lg p-6 shadow-2xl relative animate-fadeIn">
                
                {/* Botón Cerrar */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <FaTimes size={20} />
                </button>

                <h2 className="text-xl font-bold text-white mb-2">Agregar a playlist</h2>
                <p className="text-gray-400 text-sm mb-6">Elige una lista para guardar <span className="text-white font-bold">{song.title}</span></p>

                {/* Lista de Playlists */}
                <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {playlists.length === 0 && (
                        <p className="text-center text-sm text-gray-500 py-4">No tienes playlists creadas aún.</p>
                    )}

                    {playlists.map(playlist => (
                        <button
                            key={playlist.id}
                            onClick={() => handleAddToPlaylist(playlist.id)}
                            disabled={loading}
                            className="flex items-center gap-3 p-3 hover:bg-[#3E3E3E] rounded-md transition text-left group disabled:opacity-50"
                        >
                            <div className="w-10 h-10 bg-[#121212] flex items-center justify-center rounded text-gray-500">
                                <FaMusic />
                            </div>
                            <span className="text-white font-medium group-hover:text-spotify-green transition">
                                {playlist.title}
                            </span>
                        </button>
                    ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10 text-center">
                    <button onClick={onClose} className="text-sm text-white hover:underline">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddToPlaylistModal;