import songService from '../services/songService.js';

const songController = {
    uploadSong: async (req, res) => {
        try {
            console.log("Archivo recibido:", req.file); 

            if (!req.file) {
                return res.status(400).json({ error: "No se subió ningún archivo" });
            }

           
            const fileUrl = req.file.path; 

            const { title, duration, albumId, trackNumber } = req.body;

            
            if (!title || !albumId || !duration) {
                return res.status(400).json({ error: "Faltan datos requeridos" });
            }

            const newSong = await songService.createSong({
                title,
                duration, 
                albumId,
                trackNumber,
                fileUrl
            });

            res.status(201).json({ 
                success: true, 
                data: newSong,
                message: "Canción subida a Cloudinary y guardada en DB" 
            });

        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const songs = await songService.getAllSongs();
            res.json({ success: true, data: songs });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
   

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, duration, albumId, trackNumber } = req.body;
            
            const dataToUpdate = {};
            if (title) dataToUpdate.title = title;
            if (duration) dataToUpdate.duration = parseInt(duration);
            if (albumId) dataToUpdate.albumId = parseInt(albumId);
            if (trackNumber) dataToUpdate.trackNumber = parseInt(trackNumber);

           
            if (req.file) dataToUpdate.fileUrl = req.file.path;

            const updatedSong = await songService.updateSong(id, dataToUpdate);
            res.json({ success: true, message: "Canción actualizada", data: updatedSong });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await songService.deleteSong(id);
            res.json({ success: true, message: "Canción eliminada" });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};

export default songController;