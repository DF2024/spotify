import artistService from '../services/artistService.js';

const artistController = {
    createArtist: async (req, res) => {
        try {
            const { name, bio } = req.body;

            if (!name) {
                return res.status(400).json({ error: "El nombre del artista es obligatorio" });
            }


            let imageUrl = null;
            if (req.file) {
                imageUrl = req.file.path; 
            }

            const newArtist = await artistService.createArtist({
                name,
                bio,
                imageUrl
            });

            res.status(201).json({
                success: true,
                message: "Artista creado exitosamente",
                data: newArtist
            });

        } catch (error) {
            console.error("❌ ERROR REAL:", JSON.stringify(error, null, 2)); 
            console.error("❌ MENSAJE:", error.message);
            console.error("❌ STACK:", error.stack);
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const artists = await artistService.getAllArtists();
            res.status(200).json({ success: true, data: artists });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const { id } = req.params;
            const artist = await artistService.getArtistById(id);
            res.status(200).json({ success: true, data: artist });
        } catch (error) {
            res.status(404).json({ success: false, error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, bio } = req.body;

           
            const dataToUpdate = {};

            if (name) dataToUpdate.name = name;
            if (bio) dataToUpdate.bio = bio;

            
            if (req.file) {
                dataToUpdate.imageUrl = req.file.path; 
            }

            
            const updatedArtist = await artistService.updateArtist(id, dataToUpdate);

            res.status(200).json({
                success: true, 
                message: "Artista actualizado correctamente",
                data: updatedArtist
            });

        } catch (error) {
            
            if (error.code === 'P2025') {
                return res.status(404).json({ success: false, error: "Artista no encontrado" });
            }
            res.status(500).json({ success: false, error: error.message });
        }
    },

    delete: async(req, res) => {
        try {
            const {id} = req.params
            const artist = await artistService.deleteArtist(id)
            res.status(200).json({success: true, data: artist})
        } catch (error) {
            res.status(404).json({success:false, error: error.message})
        }
    }
};

export default artistController;