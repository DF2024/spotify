import { Link } from 'react-router-dom';
import { GoHome, GoSearch } from "react-icons/go"; 
import { LuLibrary } from "react-icons/lu"; 
import { FiPlusSquare } from "react-icons/fi"; 
import { useAuthStore } from '../../stores/useAuthStore';
import { useEffect, useState } from 'react';
import api from '../../api/axios';

const Sidebar = () => {
  const { user, isAdmin } = useAuthStore();
  const [playlists, setPlaylist] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await api.get('/playlists');
        setPlaylist(res.data.data);
      } catch (error) {
        console.error("Error cargando playlist:", error);
      }
    };
    fetchPlaylists();
  }, []);

  const createPlaylist = async () => {
    const title = prompt("Nombre de la nueva playlist:");
    if (!title) return;

    try {
      await api.post('/playlist', { title, isPublic: false });
      window.location.reload();
    } catch (error) {
      alert("Error al crear playlist");
    }
  };

  return (
    <>

      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-md"
      >
        ☰
      </button>


      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}


      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-64
          bg-black flex flex-col gap-2 p-2
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        <div className="bg-[#121212] rounded-lg p-4 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 text-[#b3b3b3] hover:text-white transition font-bold"
          >
            <GoHome size={24} />
            Inicio
          </Link>

          <Link
            to="/search"
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 text-[#b3b3b3] hover:text-white transition font-bold"
          >
            <GoSearch size={24} />
            Buscar
          </Link>
        </div>


        <div className="bg-[#121212] rounded-lg p-4 flex-1 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-4 text-[#b3b3b3]">
            <div className="flex items-center gap-2 hover:text-white transition font-bold cursor-pointer">
              <LuLibrary size={24} />
              Tu Biblioteca
            </div>

            <button
              onClick={createPlaylist}
              className="hover:text-white hover:bg-[#1f1f1f] p-1 rounded-full"
            >
              <FiPlusSquare size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-2">
            {isAdmin() && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="block p-3 bg-white/10 rounded-md mb-2 text-sm font-bold text-center hover:bg-white/20 text-white"
              >
                Panel de Admin
              </Link>
            )}

            {playlists.map((playlist) => (
              <Link
                key={playlist.id}
                to={`/playlist/${playlist.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-md cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#282828] rounded flex items-center justify-center text-gray-400">
                  {playlist.coverImageUrl ? (
                    <img
                      src={playlist.coverImageUrl}
                      alt={playlist.title}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-xs">🎵</span>
                  )}
                </div>

                <div className="flex flex-col overflow-hidden">
                  <span className="text-white font-medium truncate">
                    {playlist.title}
                  </span>
                  <span className="text-xs text-[#b3b3b3] truncate">
                    Playlist • {user.username}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
