import albumService from '../services/albumService.js';

const albumController = {
    createAlbum: async (req, res) => {
        try {

            const { title, releaseYear, artistId } = req.body;


            if (!title || !artistId) {
                return res.status(400).json({ error: "El título y el ID del artista son obligatorios" });
            }


            let coverImageUrl = null;
            if (req.file) {
                coverImageUrl = req.file.path; 
            }

            const newAlbum = await albumService.createAlbum({
                title,
                releaseYear,
                artistId,
                coverImageUrl
            });

            res.status(201).json({
                success: true,
                message: "Álbum creado exitosamente",
                data: newAlbum
            });

        } catch (error) {

            if (error.code === 'P2003') { 
                return res.status(400).json({ error: "El ID del artista no es válido" });
            }
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const albums = await albumService.getAllAlbums();
            res.status(200).json({ success: true, data: albums });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const { id } = req.params;
            const album = await albumService.getAlbumById(id);
            res.status(200).json({ success: true, data: album });
        } catch (error) {
            res.status(404).json({ success: false, error: error.message });
        }
    },
    
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, releaseYear, artistId } = req.body;
            
            const dataToUpdate = {};
            if (title) dataToUpdate.title = title;
            if (releaseYear) dataToUpdate.releaseYear = parseInt(releaseYear);
            if (artistId) dataToUpdate.artistId = parseInt(artistId);
            
            // Si suben nueva portada
            if (req.file) dataToUpdate.coverImageUrl = req.file.path;

            const updatedAlbum = await albumService.updateAlbum(id, dataToUpdate);
            res.json({ success: true, message: "Álbum actualizado", data: updatedAlbum });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await albumService.deleteAlbum(id);
            res.json({ success: true, message: "Álbum eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};

export default albumController;