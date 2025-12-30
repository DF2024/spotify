import prisma from '../config/db.js';

const searchController = {
    searchAll: async (req, res) => {
        try {
            const { query } = req.query; 

            if (!query || query === '') {
                return res.json({ success: true, data: { songs: [], artists: [], albums: [] } });
            }

            
            const [songs, artists, albums] = await Promise.all([
                
                prisma.song.findMany({
                    where: { title: { contains: query, mode: 'insensitive' } },
                    take: 10,
                    include: { album: { include: { artist: true } } }
                }),
                
                prisma.artist.findMany({
                    where: { name: { contains: query, mode: 'insensitive' } },
                    take: 5
                }),
                
                prisma.album.findMany({
                    where: { title: { contains: query, mode: 'insensitive' } },
                    take: 5,
                    include: { artist: true }
                })
            ]);

            res.json({
                success: true,
                data: { songs, artists, albums }
            });

        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};

export default searchController;