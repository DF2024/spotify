import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { usePlayerStore } from '../stores/usePlayerStore';
import { FaPlay, FaClock, FaMusic, FaTrash } from "react-icons/fa";
import { useAuthStore } from '../stores/useAuthStore';


const PlaylistPage = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const { playAlbum } = usePlayerStore(); 

    const { user } = useAuthStore()

    const fetchPlaylist = async () => {
        try {
            const res = await api.get(`/playlists/${id}`)
            setPlaylist(res.data.data)
        } catch (error) {
            console.error("Error al cargar playlist", error)
        }
    }

    useEffect(() => {
        fetchPlaylist();
    }, [id]);





    // --- TRUCO TÉCNICO ---
    // La DB devuelve: playlist.songs = [{ song: { id: 1, title: "X" } }, { song: { id: 2... } }]
    // El Player necesita: [ { id: 1, title: "X" }, { id: 2... } ]
    // Usamos useMemo para "aplanar" el array y no recalcularlo en cada render.
    const audioSongs = useMemo(() => {
        if (!playlist?.songs) return [];
        return playlist.songs.map(item => item.song);
    }, [playlist]);

    if (!playlist) return <div className="p-8 text-white">Cargando...</div>;

    const handlePlayPlaylist = () => {
        if (audioSongs.length > 0) {
            playAlbum(audioSongs, 0);
        }
    };

    // Helper formato tiempo
    const formatDuration = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const handleRemoveSong = async (songId) => {
        // Confirmación simple (opcional)
        if (!window.confirm("¿Quieres eliminar esta canción de la playlist?")) return;

        try {
            // DELETE /api/playlists/:playlistId/songs/:songId
            await api.delete(`/playlists/${id}/songs/${songId}`);
            
            // Recargamos la lista para ver los cambios
            fetchPlaylist(); 
        } catch (error) {
            console.error(error);
            alert("Error al eliminar: " + (error.response?.data?.error || "Error desconocido"));
        }  
    }

    return (
        <div className="bg-gradient-to-b from-[#1e3264] to-[#121212] min-h-full text-white pb-10">
            {/* Header */}
            <div className="flex items-end gap-6 p-8">
                {/* Imagen de portada o Placeholder */}
                {playlist.coverImageUrl ? (
                    <img 
                        src={playlist.coverImageUrl} 
                        alt={playlist.title} 
                        className="w-52 h-52 shadow-2xl shadow-black/50 object-cover"
                    />
                ) : (
                    <div className="w-52 h-52 bg-[#282828] flex items-center justify-center shadow-2xl shadow-black/50 text-gray-500">
                        <FaMusic size={64} />
                    </div>
                )}
                
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold uppercase">Playlist</span>
                    <h1 className="text-7xl font-bold tracking-tighter">{playlist.title}</h1>
                    <div className="flex items-center gap-2 mt-4 text-sm font-bold text-white/70">
                        <span>{playlist.user?.username}</span>
                        <span>• {playlist.songs.length} canciones</span>
                    </div>
                </div>
            </div>

            {/* Controles y Lista */}
            <div className="bg-black/20 p-6 backdrop-blur-md min-h-[500px]">
                {/* Botón Play Grande */}
                <div className="mb-6">
                    <button 
                        onClick={handlePlayPlaylist}
                        className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg text-black pl-1"
                    >
                        <FaPlay size={24} />
                    </button>
                </div>

             {/* Tabla */}
            <div className="flex flex-col">
                {/* CABECERA: Ajustamos las columnas agregando 'auto' al final */}
                <div className="grid grid-cols-[16px_4fr_3fr_1fr_auto] px-4 py-2 text-[#b3b3b3] border-b border-white/10 text-sm mb-4">
                    <span>#</span>
                    <span>Título</span>
                    <span>Álbum</span>
                    <span></span>
                    <span className="flex justify-end"><FaClock /></span>
                </div>

                {audioSongs.map((song, index) => (
                    <div 
                        key={song.id}
                        onClick={() => playAlbum(audioSongs, index)}
                        // FILA: Ajustamos las columnas igual que el header
                        className="grid grid-cols-[16px_4fr_3fr_1fr_auto] px-4 py-3 hover:bg-white/10 rounded-md cursor-pointer group items-center text-[#b3b3b3] hover:text-white transition"
                    >
                        {/* Columna 1 */}
           
                        <span className="group-hover:hidden">{index + 1}</span>
                        <span className="hidden group-hover:block text-white"><FaPlay size={10}/></span>
                
                         {/* Columna  */}
                        <div className="flex items-center gap-3 overflow-hidden">
                            <img src={song.album?.coverImageUrl} className="w-10 h-10 rounded object-cover" />
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-white font-medium text-base truncate pr-2">{song.title}</span>
                                <span className="text-xs group-hover:text-white truncate">{song.album?.artist?.name}</span>
                            </div>
                        </div>

                        <span className="text-sm hover:underline truncate pr-2">{song.album?.title}</span>
                        
                        {/* --- BOTÓN ELIMINAR (SOLO DUEÑO) --- */}
                        <div className="flex justify-end pr-31">
                            {/* Verificamos si el usuario actual es el dueño de la playlist */}
                            {user?.id === playlist.user?.id && (
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evita que se reproduzca la canción
                                        handleRemoveSong(song.id);
                                    }}
                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-2"
                                    title="Eliminar de playlist"
                                >
                                    <FaTrash size={14} />
                                </button>
                            )}
                        </div>

                        <span className="flex justify-end font-mono text-sm">
                            {formatDuration(song.duration)}
                        </span>


                    </div>
                            ))}

                            {audioSongs.length === 0 && (
                                <div className="text-center text-gray-400 mt-10">
                                    Esta playlist está vacía. ¡Agrega canciones!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
    );
};

export default PlaylistPage;