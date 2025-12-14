import { create } from 'zustand';

export const usePlayerStore = create((set, get) => ({
    isPlaying: false,
    currentSong: null,
    volume: 50,
    playlist: [], // Lista de canciones actual (cola de reproducción)
    currentIndex: 0,

    // Función 1: Reproducir una lista entera (Ej: Álbum o Playlist)
    playAlbum: (songs, startIndex = 0) => {
        if(!songs || songs.length === 0) return

        set({
            queue: songs,
            currentSong: songs[startIndex],
            currentIndex: startIndex, 
            isPlaying: true
        })
    },

    // Función 2: Reproducir canción suelta (sin cola)
    setSong: (song) => {
        set({ 
            queue: [song],
            currentSong: song,
            currentIndex: 0, 
            isPlaying: true 
        })
    },
    
      // Función 3: Siguiente Canción
    nextSong: () => {
        const { queue, currentIndex } = get();
        const nextIndex = currentIndex + 1;

        // Si hay siguiente canción, avanzamos
        if (nextIndex < queue.length) {
            set({
                currentSong: queue[nextIndex],
                currentIndex: nextIndex,
                isPlaying: true
            });
        } else {
            // Si llegamos al final, paramos (o podrías poner repeat)
            set({ isPlaying: false });
        }
    },

    // Función 4: Canción Anterior
    prevSong: () => {
        const { queue, currentIndex } = get();
        const prevIndex = currentIndex - 1;

        if (prevIndex >= 0) {
            set({
                currentSong: queue[prevIndex],
                currentIndex: prevIndex,
                isPlaying: true
            });
        }
    },
    
    togglePlay: () => set((state) => ({ 
        isPlaying: !state.isPlaying 
    })),
    
    setVolume: (val) => set({ 
        volume: val 
    }),
}));