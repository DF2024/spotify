import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    

    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado: Token requerido' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; 
        
        next(); 
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};


export const verifyAdmin = (req, res, next) => {

    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        return res.status(403).json({ 
            error: 'Acceso prohibido: Se requieren permisos de administrador' 
        });
    }
};