import prisma from '../config/db.js';

const playlistService = {
   
    createPlaylist: async (userId, data) => {
        return await prisma.playlist.create({
            data: {
                title: data.title,
                userId: userId, // Vinculamos al usuario que está logueado
                isPublic: data.isPublic === 'true' || data.isPublic === true,
                coverImageUrl: data.coverImageUrl || null
            }
        });
    },

    
    getUserPlaylists: async (userId) => {
        return await prisma.playlist.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'desc' }
        });
    },

    
    getPlaylistById: async (id) => {
        const playlist = await prisma.playlist.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: { 
                    select: { id: true, username: true } 
                },
                songs: { 
                    include: {
                        song: { 
                            include: {
                                album: { include: { artist: true } } 
                            }
                        }
                    },
                    orderBy: { addedAt: 'asc' }
                }
            }
        });

        if (!playlist) throw new Error('Playlist no encontrada');
        return playlist;
    },


    addSongToPlaylist: async (playlistId, songId) => {
       
        const exists = await prisma.playlistSong.findUnique({
            where: {
                playlistId_songId: { 
                    playlistId: parseInt(playlistId),
                    songId: parseInt(songId)
                }
            }
        });

        if (exists) throw new Error('La canción ya está en la playlist');

        return await prisma.playlistSong.create({
            data: {
                playlistId: parseInt(playlistId),
                songId: parseInt(songId)
            }
        });
    },


    removeSongFromPlaylist: async (playlistId, songId) => {
        return await prisma.playlistSong.delete({
            where: {
                playlistId_songId: {
                    playlistId: parseInt(playlistId),
                    songId: parseInt(songId)
                }
            }
        });
    },

    checkOwnership: async (playlistId, userId) => {
        const playlist = await prisma.playlist.findUnique({
            where: { id: parseInt(playlistId) }
        });
        if (!playlist) throw new Error('Playlist no encontrada');
        
        
        return playlist.userId === parseInt(userId);
    }
};

export default playlistService;