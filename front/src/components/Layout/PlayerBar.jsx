const PlayerBar = () => {
    return (
        <div className="h-20 bg-black border-t border-[#282828] px-4 flex items-center justify-between text-white fixed bottom-0 w-full z-50">
            {/* 1. Info de la Canción (Izquierda) */}
            <div className="flex items-center gap-4 w-[30%]">
                <div className="w-14 h-14 bg-[#282828] rounded flex items-center justify-center text-xs text-gray-400">
                    🎵
                </div>
                <div>
                    <div className="font-sm hover:underline cursor-pointer">Nombre Canción</div>
                    <div className="text-xs text-[#b3b3b3] hover:underline cursor-pointer">Artista</div>
                </div>
            </div>

            {/* 2. Controles (Centro) */}
            <div className="flex flex-col items-center w-[40%]">
                <div className="flex items-center gap-6 mb-1">
                    <button className="text-[#b3b3b3] hover:text-white">⏮</button>
                    <button className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:scale-105">
                        ▶
                    </button>
                    <button className="text-[#b3b3b3] hover:text-white">⏭</button>
                </div>
                <div className="w-full max-w-md flex items-center gap-2 text-xs text-[#b3b3b3]">
                    <span>0:00</span>
                    <div className="h-1 flex-1 bg-[#4d4d4d] rounded-full overflow-hidden">
                        <div className="h-full w-0 bg-white"></div>
                    </div>
                    <span>0:00</span>
                </div>
            </div>

            {/* 3. Volumen (Derecha) */}
            <div className="w-[30%] flex justify-end">
                Volumen
            </div>
        </div>
    );
};

export default PlayerBar;