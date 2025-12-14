import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { usePlayerStore } from '../stores/usePlayerStore';
import { FaPlay, FaClock, FaPlusCircle } from "react-icons/fa";
import AddToPlaylistModal from '../components/UI/AddToPlaylistModal';

const AlbumPage = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [songToAdd, setSongToAdd] = useState(null); // Estado para el modal
    
    // Usamos playAlbum para reproducir en contexto
    const { playAlbum } = usePlayerStore();

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const res = await api.get(`/albums/${id}`);
                setAlbum(res.data.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchAlbum();
    }, [id]);

    if (!album) return <div className="p-8 text-white">Cargando álbum...</div>;

    // Reproducir todo el álbum desde la canción 0
    const handlePlayAlbum = () => {
        if (album.songs.length > 0) {
            playAlbum(album.songs, 0);
        }
    };

    const formatDuration = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <div className="bg-gradient-to-b from-[#5038a0] to-[#121212] min-h-full text-white pb-10">
            {/* Header del Álbum */}
            <div className="flex flex-col md:flex-row items-end gap-6 p-8">
                <img 
                    src={album.coverImageUrl || "https://via.placeholder.com/200"} 
                    alt={album.title} 
                    className="w-52 h-52 shadow-2xl shadow-black/50 object-cover rounded"
                />
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold uppercase">Álbum</span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">{album.title}</h1>
                    <div className="flex items-center gap-2 mt-4 text-sm font-bold">
                        <img 
                            src={album.artist?.imageUrl || "https://via.placeholder.com/50"} 
                            className="w-6 h-6 rounded-full object-cover" 
                            alt={album.artist?.name}
                        />
                        <span className="hover:underline cursor-pointer">{album.artist?.name}</span>
                        <span className="text-white/70">• {album.releaseYear} • {album.songs.length} canciones</span>
                    </div>
                </div>
            </div>

            {/* Controles y Lista */}
            <div className="bg-black/20 p-6 backdrop-blur-md min-h-[400px]">
                {/* Botón Play Grande */}
                <div className="mb-6">
                    <button 
                        onClick={handlePlayAlbum}
                        className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg text-black pl-1"
                    >
                        <FaPlay size={24} />
                    </button>
                </div>

                {/* Tabla de Canciones */}
                <div className="flex flex-col">
                    {/* Cabecera */}
                    <div className="grid grid-cols-[16px_4fr_1fr_1fr] md:grid-cols-[16px_4fr_1fr] px-4 py-2 text-[#b3b3b3] border-b border-white/10 text-sm mb-4">
                        <span>#</span>
                        <span>Título</span>
                        {/* La columna del botón + es invisible en el header, pero ocupa espacio en el grid */}
                        <span className="flex justify-end"><FaClock /></span>
                    </div>

                    {/* Lista */}
                    {album.songs.map((song, index) => (
                        <div 
                            key={song.id}
                            className="grid grid-cols-[16px_4fr_auto_1fr] px-4 py-3 hover:bg-white/10 rounded-md cursor-pointer group items-center text-[#b3b3b3] hover:text-white transition"
                        >
                            {/* Columna 1: Índice o Play */}
                            <div onClick={() => playAlbum(album.songs, index)}>
                                <span className="group-hover:hidden font-mono text-sm">{index + 1}</span>
                                <span className="hidden group-hover:block text-white"><FaPlay size={10}/></span>
                            </div>
                            
                            {/* Columna 2: Info Canción */}
                            <div className="flex flex-col pr-4" onClick={() => playAlbum(album.songs, index)}>
                                <span className="text-white font-medium text-base truncate">{song.title}</span>
                                <span className="text-xs group-hover:text-white">{album.artist.name}</span>
                            </div>

                            {/* Columna 3: Botón Agregar (+) */}
                            <div className="flex justify-end pr-4">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSongToAdd(song);
                                    }}
                                    className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition"
                                    title="Agregar a playlist"
                                >
                                    <FaPlusCircle size={18} />
                                </button>
                            </div>
                            
                            {/* Columna 4: Duración */}
                            <div className="flex justify-end font-mono text-sm" onClick={() => playAlbum(album.songs, index)}>
                                {formatDuration(song.duration)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- MODAL --- */}
            {songToAdd && (
                <AddToPlaylistModal 
                    song={songToAdd} 
                    onClose={() => setSongToAdd(null)} 
                />
            )}
        </div>
    );
};

export default AlbumPage;