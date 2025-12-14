import prisma from '../config/db.js';

const searchController = {
    searchAll: async (req, res) => {
        try {
            const { query } = req.query; // Ejemplo: ?query=bad

            if (!query || query === '') {
                return res.json({ success: true, data: { songs: [], artists: [], albums: [] } });
            }

            // Ejecutamos 3 búsquedas en paralelo (Promise.all)
            const [songs, artists, albums] = await Promise.all([
                // 1. Buscar Canciones
                prisma.song.findMany({
                    where: { title: { contains: query, mode: 'insensitive' } },
                    take: 10,
                    include: { album: { include: { artist: true } } }
                }),
                // 2. Buscar Artistas
                prisma.artist.findMany({
                    where: { name: { contains: query, mode: 'insensitive' } },
                    take: 5
                }),
                // 3. Buscar Álbumes
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