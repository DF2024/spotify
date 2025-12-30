import { useState, useEffect } from 'react';
import api from '../api/axios';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('artist'); 
    

    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);


    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const artistsRes = await api.get('/artists');
            const albumsRes = await api.get('/albums');
            setArtists(artistsRes.data.data);
            setAlbums(albumsRes.data.data);
        } catch (error) {
            console.error("Error cargando datos:", error);
        }
    };



    const handleArtistSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        
        try {
            await api.post('/artists', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            setMessage('✅ Artista creado correctamente');
            e.target.reset();
            fetchData(); // Recargar listas
        } catch (error) {
            setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    const handleAlbumSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        
        try {
            await api.post('/albums', formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            setMessage('✅ Álbum creado correctamente');
            e.target.reset();
            fetchData();
        } catch (error) {
            setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleSongSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        
        try {
            await api.post('/songs', formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            setMessage('✅ Canción subida correctamente');
            e.target.reset();
        } catch (error) {
            setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

            {/* Pestañas */}
            <div className="flex gap-4 mb-8 border-b border-gray-700 pb-4">
                <button 
                    onClick={() => { setActiveTab('artist'); setMessage(''); }}
                    className={`px-4 py-2 rounded font-bold ${activeTab === 'artist' ? 'bg-white text-black' : 'bg-[#242424] hover:bg-[#343434]'}`}
                >
                    1. Crear Artista
                </button>
                <button 
                    onClick={() => { setActiveTab('album'); setMessage(''); }}
                    className={`px-4 py-2 rounded font-bold ${activeTab === 'album' ? 'bg-white text-black' : 'bg-[#242424] hover:bg-[#343434]'}`}
                >
                    2. Crear Álbum
                </button>
                <button 
                    onClick={() => { setActiveTab('song'); setMessage(''); }}
                    className={`px-4 py-2 rounded font-bold ${activeTab === 'song' ? 'bg-white text-black' : 'bg-[#242424] hover:bg-[#343434]'}`}
                >
                    3. Subir Canción
                </button>
            </div>


            {message && (
                <div className={`p-4 mb-6 rounded ${message.includes('✅') ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
                    {message}
                </div>
            )}

            {activeTab === 'artist' && (
                <form onSubmit={handleArtistSubmit} className="space-y-4 bg-[#181818] p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Nuevo Artista</h2>
                    <input name="name" placeholder="Nombre del Artista" required className="w-full p-3 rounded bg-[#2a2a2a] border border-transparent focus:border-white outline-none" />
                    <textarea name="bio" placeholder="Biografía (Opcional)" className="w-full p-3 rounded bg-[#2a2a2a] border border-transparent focus:border-white outline-none" />
                    <div>
                        <label className="block mb-2 text-sm text-gray-400">Foto del Artista</label>
                        <input type="file" name="image" accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-white file:text-black hover:file:bg-gray-200" />
                    </div>
                    <button disabled={loading} className="bg-green-500 text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition disabled:opacity-50">
                        {loading ? 'Guardando...' : 'Guardar Artista'}
                    </button>
                </form>
            )}


            {activeTab === 'album' && (
                <form onSubmit={handleAlbumSubmit} className="space-y-4 bg-[#181818] p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Nuevo Álbum</h2>
                    <input name="title" placeholder="Título del Álbum" required className="w-full p-3 rounded bg-[#2a2a2a] border border-transparent focus:border-white outline-none" />
                    <input name="releaseYear" type="number" placeholder="Año de lanzamiento (ej: 2023)" required className="w-full p-3 rounded bg-[#2a2a2a] border border-transparent focus:border-white outline-none" />
                    
                    <select name="artistId" required className="w-full p-3 rounded bg-[#2a2a2a] border border-transparent focus:border-white outline-none">
                        <option value="">Selecciona un Artista</option>
                        {artists.map(artist => (
                            <option key={artist.id} value={artist.id}>{artist.name}</option>
                        ))}
                    </select>

                    <div>
                        <label className="block mb-2 text-sm text-gray-400">Portada del Álbum</label>
                        <input type="file" name="image" accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-white file:text-black hover:file:bg-gray-200" />
                    </div>
                    <button disabled={loading} className="bg-green-500 text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition disabled:opacity-50">
                        {loading ? 'Creando...' : 'Crear Álbum'}
                    </button>
                </form>
            )}

            {activeTab === 'song' && (
                <form onSubmit={handleSongSubmit} className="space-y-4 bg-[#181818] p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Subir Canción</h2>
                    <input name="title" placeholder="Título de la Canción" required className="w-full p-3 rounded bg-[#2a2a2a] border border-transparent focus:border-white outline-none" />
                    <div className="flex gap-4">
                        <input name="duration" type="number" placeholder="Duración (segundos)" required className="flex-1 p-3 rounded bg-[#2a2a2a] border border-transparent focus:border-white outline-none" />
                        <input name="trackNumber" type="number" placeholder="Nro. Pista" className="flex-1 p-3 rounded bg-[#2a2a2a] border border-transparent focus:border-white outline-none" />
                    </div>

                    <select name="albumId" required className="w-full p-3 rounded bg-[#2a2a2a] border border-transparent focus:border-white outline-none">
                        <option value="">Selecciona un Álbum</option>
                        {albums.map(album => (
                            <option key={album.id} value={album.id}>{album.title} - {album.artist.name}</option>
                        ))}
                    </select>

                    <div>
                        <label className="block mb-2 text-sm text-gray-400">Archivo de Audio (MP3)</label>
                        <input type="file" name="audioFile" accept="audio/*" required className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-white file:text-black hover:file:bg-gray-200" />
                    </div>
                    <button disabled={loading} className="bg-green-500 text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition disabled:opacity-50">
                        {loading ? 'Subiendo...' : 'Subir Canción'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default AdminPage;