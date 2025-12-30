import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';
import { useAuthStore } from '../../stores/useAuthStore';

const MainLayout = () => {
    const { user, logout } = useAuthStore();

    return (
        <div className="h-screen flex flex-col bg-black text-white">
            <div className="flex-1 flex overflow-hidden">

                <Sidebar />
                
 
                <main className="flex-1 bg-[#121212] rounded-lg m-2 ml-0 overflow-y-auto relative">
              
                    <header className="absolute top-0 w-full p-4 flex justify-between items-center bg-transparent z-10">
                        <div className="flex gap-2">
  
                        </div>
                        <div className="flex items-center gap-4">
                            {user && (
                                <span className="font-bold text-sm bg-black/50 px-3 py-1 rounded-full">
                                    {user.username}
                                </span>
                            )}
                            <button 
                                onClick={logout} 
                                className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </header>

      
                    <div className="pt-16 px-6 pb-24">
                        <Outlet />
                    </div>
                </main>
            </div>


            <PlayerBar />
        </div>
    );
};

export default MainLayout;