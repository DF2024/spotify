import artistService from '../services/artistService.js';

const artistController = {
    createArtist: async (req, res) => {
        try {
            const { name, bio } = req.body;

            if (!name) {
                return res.status(400).json({ error: "El nombre del artista es obligatorio" });
            }

            // Manejo de la imagen (si se subió)
            let imageUrl = null;
            if (req.file) {
                imageUrl = req.file.path; // URL de Cloudinary
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
            console.error("❌ ERROR REAL:", JSON.stringify(error, null, 2)); // Para ver el objeto completo
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

            // 1. Preparamos el objeto con los datos a actualizar
            const dataToUpdate = {};

            if (name) dataToUpdate.name = name;
            if (bio) dataToUpdate.bio = bio;

            // 2. Si subieron una nueva imagen, actualizamos la URL
            if (req.file) {
                dataToUpdate.imageUrl = req.file.path; 
            }

            // 3. Llamamos al servicio pasando ID y DATOS
            const updatedArtist = await artistService.updateArtist(id, dataToUpdate);

            res.status(200).json({
                success: true, 
                message: "Artista actualizado correctamente",
                data: updatedArtist
            });

        } catch (error) {
            // Manejo de error si el ID no existe (Prisma lanza error P2025)
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