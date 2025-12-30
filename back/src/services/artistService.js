import prisma from '../config/db.js';

const artistService = {

    createArtist: async (data) => {
        return await prisma.artist.create({
            data: {
                name: data.name,
                bio: data.bio || null,
                imageUrl: data.imageUrl || null
            }
        });
    },


    getAllArtists: async () => {
        return await prisma.artist.findMany({
            orderBy: { name: 'asc' }
        });
    },


    getArtistById: async (id) => {
        const artist = await prisma.artist.findUnique({
            where: { id: parseInt(id) },
            include: {
                albums: true
            }
        });

        if (!artist) throw new Error('Artista no encontrado');
        return artist;
    },

    updateArtist: async (id, data) => {
        return await prisma.artist.update({
            where: { id: parseInt(id) },
            data: data 
        });
    },

    deleteArtist: async(id) => {
        const existingArtist = await prisma.artist.findUnique({
            where: {id: Number(id)}
        })

        if(!existingArtist){
            throw new Error('El artisita no se encuentra')
        }

        await prisma.artist.delete({
            where: { id: Number(id) }
        })

        return { message: 'Artista eliminado correctamente' }
    }
};

export default artistService;