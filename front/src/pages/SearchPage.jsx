import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { usePlayerStore } from '../stores/usePlayerStore';
import { FaPlay, FaSearch, FaPlusCircle } from "react-icons/fa";
import AddToPlaylistModal from '../components/UI/AddToPlaylistModal';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ songs: [], artists: [], albums: [] });
    const [songToAdd, setSongToAdd] = useState(null); 
    
    const { setSong } = usePlayerStore();

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim()) {
                try {
                    const res = await api.get(`/search?query=${query}`);
                    setResults(res.data.data);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setResults({ songs: [], artists: [], albums: [] });
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="p-6 text-white pb-20">
            {/* Barra de Búsqueda */}
            <div className="relative mb-8 max-w-md">
                <FaSearch className="absolute left-4 top-3.5 text-black z-10" />
                <input 
                    type="text"
                    placeholder="¿Qué quieres escuchar?"
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-white"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
            </div>


            {!query && (
                <div className="text-center mt-20">
                    <h2 className="text-2xl font-bold mb-4">Busca canciones, artistas o álbumes</h2>
                    <p className="text-gray-400">Encuentra tu música favorita entre millones de canciones.</p>
                </div>
            )}



            {results.songs.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Canciones</h2>
                    <div className="flex flex-col">
                        {results.songs.map(song => (
                            <div 
                                key={song.id}
                                className="flex items-center justify-between p-2 hover:bg-white/10 rounded group transition"
                            >
           
                                <div 
                                    className="flex items-center gap-3 cursor-pointer flex-1" 
                                    onClick={() => setSong(song)}
                                >
                                    <div className="relative">
                                        <img 
                                            src={song.album?.coverImageUrl || "https://via.placeholder.com/40"} 
                                            className="w-10 h-10 rounded object-cover" 
                                            alt={song.title}
                                        />
                                        <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center rounded">
                                            <FaPlay size={10} className="text-white"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{song.title}</div>
                                        <div className="text-xs text-gray-400">{song.album?.artist?.name}</div>
                                    </div>
                                </div>

    
                                <div className="flex items-center gap-4">

                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            setSongToAdd(song);
                                        }}
                                        className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition"
                                        title="Agregar a playlist"
                                    >
                                        <FaPlusCircle size={20} />
                                    </button>

                                    <span className="text-xs text-gray-400 w-10 text-right font-mono">
                                        {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {results.artists.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Artistas</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {results.artists.map(artist => (
                            <div key={artist.id} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition cursor-pointer group">
                                <img 
                                    src={artist.imageUrl || "https://via.placeholder.com/150"} 
                                    className="w-32 h-32 rounded-full object-cover mx-auto mb-3 shadow-lg group-hover:scale-105 transition duration-300" 
                                    alt={artist.name}
                                />
                                <div className="font-bold text-center truncate">{artist.name}</div>
                                <div className="text-sm text-gray-400 text-center">Artista</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {results.albums.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Álbumes</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {results.albums.map(album => (
                            <Link to={`/album/${album.id}`} key={album.id} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition block group">
                                <img 
                                    src={album.coverImageUrl || "https://via.placeholder.com/150"} 
                                    className="w-full aspect-square object-cover rounded mb-3 shadow-lg group-hover:shadow-xl transition" 
                                    alt={album.title}
                                />
                                <div className="font-bold truncate">{album.title}</div>
                                <div className="text-sm text-gray-400 truncate">{album.artist?.name} • {album.releaseYear}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            

            {query && results.songs.length === 0 && results.artists.length === 0 && results.albums.length === 0 && (
                <div className="text-center text-gray-400 mt-10">
                    No se encontraron resultados para "{query}"
                </div>
            )}


            {songToAdd && (
                <AddToPlaylistModal 
                    song={songToAdd} 
                    onClose={() => setSongToAdd(null)} 
                />
            )}
        </div>
    );
};

export default SearchPage;