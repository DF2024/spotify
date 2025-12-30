import { create } from 'zustand';

export const usePlayerStore = create((set, get) => ({
    isPlaying: false,
    currentSong: null,
    volume: 50,
    playlist: [], 
    currentIndex: 0,


    playAlbum: (songs, startIndex = 0) => {
        if(!songs || songs.length === 0) return

        set({
            queue: songs,
            currentSong: songs[startIndex],
            currentIndex: startIndex, 
            isPlaying: true
        })
    },

    setSong: (song) => {
        set({ 
            queue: [song],
            currentSong: song,
            currentIndex: 0, 
            isPlaying: true 
        })
    },
    

    nextSong: () => {
        const { queue, currentIndex } = get();
        const nextIndex = currentIndex + 1;

       
        if (nextIndex < queue.length) {
            set({
                currentSong: queue[nextIndex],
                currentIndex: nextIndex,
                isPlaying: true
            });
        } else {
           
            set({ isPlaying: false });
        }
    },


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