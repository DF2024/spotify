import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from "react-icons/fa";


const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const PlayerBar = () => {

    const { currentSong, isPlaying, togglePlay, nextSong, prevSong } = usePlayerStore();
    

    const audioRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5); 


    useEffect(() => {
        if (currentSong) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Error play:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [currentSong, isPlaying]);


    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);


    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };


    const handleEnded = () => {
        nextSong(); 
    };


    const handleSeek = (e) => {
        const time = e.target.value;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    
    if (!currentSong) return null; 


    const currentPercentage = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="h-20 bg-black border-t border-[#282828] px-4 flex items-center justify-between text-white fixed bottom-0 w-full z-50">
            
           
            <audio 
                ref={audioRef}
                src={currentSong.fileUrl} 
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
                onEnded={handleEnded}
            />

          
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


            <div className="flex flex-col items-center w-[40%]">
                <div className="flex items-center gap-6 mb-1">

                    <button 
                        onClick={prevSong}
                        className="text-[#b3b3b3] hover:text-white">
                        <FaStepBackward />
                    </button>           

                    <button 
                        onClick={togglePlay}
                        className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition"
                    >
                        {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} className="ml-1"/>}
                    </button>
                  
                    <button 
                        onClick={nextSong}
                        className="text-[#b3b3b3] hover:text-white">
                        <FaStepForward />
                    </button>

                </div>


                <div className="w-full max-w-md flex items-center gap-2 text-xs text-[#b3b3b3]">
                    <span>{formatTime(currentTime)}</span>
                    
                    <input 
                        type="range" 
                        min="0" 
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                        style={{
                            background: `linear-gradient(to right, #ffffff ${currentPercentage}%, #4d4d4d ${currentPercentage}%)`
                        }}
                    />
                    
                    <span>{formatTime(duration)}</span>
                </div>
            </div>


            <div className="w-[30%] flex justify-end items-center gap-2">
                <FaVolumeUp className="text-[#b3b3b3]" />
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-24 h-1 bg-[#4d4d4d] rounded-lg cursor-pointer accent-[#1ed760]"
                />
            </div>
        </div>
    );
};

export default PlayerBar;