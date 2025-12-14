import { useEffect, useState } from 'react';
import api from '../api/axios';

const HomePage = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await api.get('/songs');
                // Asumiendo que tu backend devuelve { success: true, data: [...] }
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
                        {/* Imagen (Portada del álbum) */}
                        <div className="relative mb-4">
                            <img 
                                src={song.album?.coverImageUrl || "https://via.placeholder.com/150"} 
                                alt={song.title} 
                                className="w-full aspect-square object-cover rounded-md shadow-lg"
                            />
                            {/* Botón Play flotante (Solo visible en hover) */}
                            <div className="absolute bottom-2 right-2 bg-spotify-green rounded-full p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                                <span className="text-black text-xl">▶</span>
                            </div>
                        </div>

                        <h3 className="font-bold truncate text-white">{song.title}</h3>
                        <p className="text-sm text-[#b3b3b3] truncate mt-1">
                            {song.album?.artist?.name || "Artista desconocido"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;