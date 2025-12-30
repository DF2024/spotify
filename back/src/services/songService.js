import prisma from '../config/db.js';

const songService = {
    createSong: async (data) => {
        try {
           
            const newSong = await prisma.song.create({
                data: {
                    title: data.title,
                    duration: parseInt(data.duration), 
                    fileUrl: data.fileUrl,
                    trackNumber: data.trackNumber ? parseInt(data.trackNumber) : null,
                    albumId: parseInt(data.albumId)
                }
            });
            return newSong;
        } catch (error) {
            throw error;
        }
    },

    getAllSongs: async () => {
        return await prisma.song.findMany({
            include: {
                album: {
                    include: { artist: true }
                }
            }
        });
    },
    
   
    getSongsByAlbum: async (albumId) => {
        return await prisma.song.findMany({
            where: { albumId: parseInt(albumId) },
            orderBy: { trackNumber: 'asc' }
        });
    },
   
    updateSong: async (id, data) => {
        return await prisma.song.update({
            where: { id: parseInt(id) },
            data: data
        });
    },

    deleteSong: async (id) => {
        return await prisma.song.delete({
            where: { id: parseInt(id) }
        });
    }
};

export default songService;