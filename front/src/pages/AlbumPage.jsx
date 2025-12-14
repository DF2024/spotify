import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import { usePlayerStore } from '../stores/usePlayerStore'
import { FaPlay, FaClock } from "react-icons/fa";


const AlbumPage = () => {
    const { id } = useParams()// Obtiene el ID de /album/:id
    const [album, setAlbum] = useState(null)
    const { setSong } = usePlayerStore()
    const { playAlbum } = usePlayerStore()

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const res = await api.get(`/albums/${id}`)
                setAlbum(res.data.data)
            } catch (error) {
                console.error("Error:", error)                
            }
        }
        fetchAlbum()
    }, [id])

    if(!album) return <div className='p-8 text-white'>Cargando...</div>

    // // Función para tocar el album entero (reproducir la primera canción)
    // const playAlbum = () => {
    //     if(album.songs.length > 0){
    //         setSong(album.songs[0])
    //         // Aquí se agregara la logica de "Cola"
    //     }
    // }

    // Helper para formatear tiempo

    const handlePlayAlbum = () => {
        if (album.songs.length > 0) {
            playAlbum(album.songs, 0); // Empieza desde la primera
        }
    };


    const formatDuration = (seconds) => {
        const min = Math.floor(seconds / 60)
        const sec = seconds % 60
        return `${min}:${sec < 10 ? '0' : ''}${sec}`
    }

    return(
        <div className="bg-gradient-to-b from-[#5038a0] to-[#121212] min-h-full text-white pb-10">
            {/* Header del Álbum */}
            <div className="flex items-end gap-6 p-8">
                <img 
                    src={album.coverImageUrl} 
                    alt={album.title} 
                    className="w-52 h-52 shadow-2xl shadow-black/50"
                />
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold uppercase">Álbum</span>
                    <h1 className="text-7xl font-bold tracking-tighter">{album.title}</h1>
                    <div className="flex items-center gap-2 mt-4 text-sm font-bold">
                        <img 
                            src={album.artist?.imageUrl || "https://via.placeholder.com/50"} 
                            className="w-6 h-6 rounded-full object-cover" 
                        />
                        <span>{album.artist?.name}</span>
                        <span className="text-white/70">• {album.releaseYear} • {album.songs.length} canciones</span>
                    </div>
                </div>
            </div>

            {/* Controles y Lista */}
            <div className="bg-black/20 p-6 backdrop-blur-md">
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
                    {/* Cabecera Tabla */}
                    <div className="grid grid-cols-[16px_4fr_1fr] px-4 py-2 text-[#b3b3b3] border-b border-white/10 text-sm mb-4">
                        <span>#</span>
                        <span>Título</span>
                        <span className="flex justify-end"><FaClock /></span>
                    </div>

                    {/* Lista de Canciones */}
                    {album.songs.map((song, index) => (
                        <div 
                            key={song.id}
                            onClick={() => playAlbum(album.songs, index)}
                            className="grid grid-cols-[16px_4fr_1fr] px-4 py-3 hover:bg-white/10 rounded-md cursor-pointer group items-center text-[#b3b3b3] hover:text-white transition"
                        >
                            <span className="group-hover:hidden">{index + 1}</span>
                            <span className="hidden group-hover:block text-white"><FaPlay size={10}/></span>
                            
                            <div className="flex flex-col">
                                <span className="text-white font-medium text-base">{song.title}</span>
                                <span className="text-xs group-hover:text-white">{album.artist.name}</span>
                            </div>
                            
                            <span className="flex justify-end font-mono text-sm">
                                {formatDuration(song.duration)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default AlbumPage