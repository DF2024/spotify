import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();


// 1. Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Configuración del Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'mstream-clone-music', // Nombre de la carpeta en Cloudinary
        resource_type: 'auto', // ¡CRUCIAL! Permite subir audio/video, no solo imágenes
    
    },
});

// 3. Crear el middleware de upload
const uploadCloudinary = multer({ storage: storage });

export default uploadCloudinary;