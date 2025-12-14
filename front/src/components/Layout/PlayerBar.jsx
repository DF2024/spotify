import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from "react-icons/fa";

// Helper para formatear tiempo (ej: 125s -> "2:05")
const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const PlayerBar = () => {
    // 1. Obtener estado global
    const { currentSong, isPlaying, togglePlay, nextSong, prevSong } = usePlayerStore();
    
    // 2. Referencia al elemento <audio> real
    const audioRef = useRef(null);

    // 3. Estado local para la barra de progreso
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5); // 50% volumen por defecto

    // EFECTO 1: Cuando cambia la canción o el estado de play/pause
    useEffect(() => {
        if (currentSong) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Error play:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [currentSong, isPlaying]);

    // EFECTO 2: Manejar volumen
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // HANDLER: Actualizar barra de progreso mientras suena
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    // HANDLER: Cuando termina la canción
    const handleEnded = () => {
        nextSong(); // Poner pause (aquí luego podrías poner 'nextSong')
    };

    // HANDLER: Cambiar posición de la canción (Seek)
    const handleSeek = (e) => {
        const time = e.target.value;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    // Si no hay canción seleccionada, mostramos el player vacío o nada
    if (!currentSong) return null; 

    return (
        <div className="h-20 bg-black border-t border-[#282828] px-4 flex items-center justify-between text-white fixed bottom-0 w-full z-50">
            
            {/* --- ELEMENTO DE AUDIO INVISIBLE (EL CEREBRO REAL) --- */}
            <audio 
                ref={audioRef}
                src={currentSong.fileUrl} // URL de Cloudinary
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
                onEnded={handleEnded}
            />

            {/* 1. Info de la Canción (Izquierda) */}
            <div className="flex items-center gap-4 w-[30%]">
                <img 
                    src={currentSong.album?.coverImageUrl} 
                    alt="Cover" 
                    className="w-14 h-14 rounded object-cover"
                />
                <div className="hidden md:block">
                    <div className="text-sm font-bold hover:underline cursor-pointer">
                        {currentSong.title}
                    </div>
                    <div className="text-xs text-[#b3b3b3] hover:underline cursor-pointer">
                        {currentSong.album?.artist?.name}
                    </div>
                </div>
            </div>

            {/* 2. Controles (Centro) */}
            <div className="flex flex-col items-center w-[40%]">
                <div className="flex items-center gap-6 mb-1">
                    {/* Retroceder */}
                    <button 
                        onClick={prevSong}
                        className="text-[#b3b3b3] hover:text-white">
                        <FaStepBackward />
                    </button>           
                    {/* Pausa */}
                    <button 
                        onClick={togglePlay}
                        className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition"
                    >
                        {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} className="ml-1"/>}
                    </button>
                    {/* Siguente */}
                    <button 
                        onClick={nextSong}
                        className="text-[#b3b3b3] hover:text-white">
                        <FaStepForward />
                    </button>

                </div>

                {/* Barra de Progreso */}
                <div className="w-full max-w-md flex items-center gap-2 text-xs text-[#b3b3b3]">
                    <span>{formatTime(currentTime)}</span>
                    
                    <input 
                        type="range" 
                        min="0" 
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-[#4d4d4d] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                    />
                    
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* 3. Volumen (Derecha) */}
            <div className="w-[30%] flex justify-end items-center gap-2">
                <FaVolumeUp className="text-[#b3b3b3]" />
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-24 h-1 bg-[#4d4d4d] rounded-lg cursor-pointer"
                />
            </div>
        </div>
    );
};

export default PlayerBar;