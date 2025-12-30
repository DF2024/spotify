import prisma from '../config/db.js'


const userService = {
    getAllUsers : async (pagination = {}) => {
        try {
            
            const { page = 1, limit = 10 } = pagination
            const skip = (page - 1) * limit

            const where = {}

            const users = await prisma.user.findMany({
                where,
                skip, 
                take: limit,
                orderBy: {
                    id: 'desc'
                },
                select: { 
                    id: true, 
                    username: true, 
                    email: true, 
                    role: true, 
                    avatarUrl: true, 
                    createdAt: true 
                } 
            })

            const total = await prisma.user.count({ where })
            const totalPages = Math.ceil(total / limit)

            return {
                users,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            }
        } catch (error) {
            throw error
        }
    },


    getUserById : async (userId) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(userId)
                },
                include:{
                    playlists: true
                }
            })
            if (!user) {
                throw new Error('Usuarios no encontrados')
            }

            const { passwordHash, ...userWithoutPassword } = user;
            return userWithoutPassword;

        } catch (error) {
            throw error        
        }
    },


    

    updateUser : async (userId, updateData) => {
        try {
  
            const existingUser = await prisma.user.findUnique({
                where: { id: Number(userId) }
            })

            if (!existingUser) {
                throw new Error('Usuario no encontrado')
            }


            if (updateData.username || updateData.email) {

               const duplicateUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { username: updateData.username },
                            { email: updateData.email }
                        ],
                        NOT: { id: Number(userId) }
                    }
                })

                if (duplicateUser) {
                    throw new Error('El nombre de usuario o email ya está en uso')
                }

            }


            const updateUser = await prisma.user.update({
                where: { id: Number(userId) },
                data: updateData,
                select: { id: true, username: true, email: true, role: true }
            })

            return updateUser
        } catch (error) {
            throw error
        }
    },



    deleteUser : async (userId) => {
        try {

            const existingUser = await prisma.user.findUnique({
                where: { id: Number(userId) }
            })

            if (!existingUser) {
                throw new Error('Usuario no encontrado')
            }


            await prisma.user.delete({
                where: { id: Number(userId) }
            })

            return { message: 'Usuario eliminado correctamente' }
        } catch (error) {
            throw error
        }
    }
}

export default userService

