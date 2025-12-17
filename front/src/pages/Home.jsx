import { useEffect, useState } from 'react';
import api from '../api/axios';
import { usePlayerStore } from '../stores/usePlayerStore'; // 1. Importar Store
import { FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AddToPlaylistModal from '../components/UI/AddToPlaylistModal';

const HomePage = () => {
    const [songs, setSongs] = useState([]);
    const { setSong } = usePlayerStore(); // 2. Sacar la función setSong
    const [songToAdd, setSongToAdd] = useState(null)

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await api.get('/songs');
                setSongs(response.data.data); 
            } catch (error) {
                console.error("Error cargando canciones:", error);
            }
        };

        fetchSongs();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Hecho para ti</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {songs.map((song) => (
                    <div 
                        key={song.id} 
                        className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition duration-300 group cursor-pointer"
                    >
                        <div className="relative mb-4">
                            <img 
                                src={song.album?.coverImageUrl || "https://via.placeholder.com/150"} 
                                alt={song.title} 
                                className="w-full aspect-square object-cover rounded-md shadow-lg"
                            />
                            {/* 3. Agregar el evento onClick al botón de Play */}
                            <button 
                                onClick={() =>{
                                    console.log("1. Click en canción:", song);
                                    setSong(song)
                                }} 
                                className="absolute bottom-2 right-2 bg-spotify-green rounded-full p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:scale-105"
                            >
                                <span className="text-black text-xl">▶</span>
                            </button>
                        </div>

                        <h3 className="font-bold truncate text-white">{song.title}</h3>

                        <p className="text-sm text-[#b3b3b3] truncate mt-1">
                            {song.album?.artist?.name || "Artista desconocido"}
                        </p>
                        
                        <Link 
                            to={`/album/${song.album.id}`}
                            className="text-sm text-[#b3b3b3] truncate mt-1 hover:underline hover:text-white block">
                            {song.album?.title}
                        </Link>

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
                    </div>
                ))}
            </div>
            {songToAdd && (
                <AddToPlaylistModal 
                    song={songToAdd} 
                    onClose={() => setSongToAdd(null)} 
                />
            )}
        </div>
    );
};

export default HomePage;