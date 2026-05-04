import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../Services/firebase";
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";
import { Calendar, Mail, User, Check, X } from "lucide-react";

const MyProfile = () => {
  const { user, loading: authLoading } = UserAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
    }
  }, [authLoading, user, navigate]);

  const joinDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Baru saja";

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      setIsEditing(false);
      setPreviewImage(null);
      toast.success("Profile updated!");
    } catch (error) {
      console.error(error);
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 px-4 selection:bg-lime-400 selection:text-black">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden bg-zinc-900/30 border border-zinc-800 rounded-[40px] backdrop-blur-xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-lime-400/10 blur-[100px] rounded-full" />
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-12 items-start">
            <div className="flex flex-col items-center w-full md:w-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-lime-400 to-emerald-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-zinc-900 shadow-2xl">
                  <img
                    src={
                      previewImage
                        ? URL.createObjectURL(previewImage)
                        : user?.photoURL || "https://via.placeholder.com/200"
                    }
                    className="w-full h-full object-cover"
                    alt="Avatar"
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center gap-2">
                <span className="px-4 py-1 bg-lime-400/10 text-lime-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-lime-400/20">
                  Movie Enthusiast
                </span>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-2">
                    My Account
                  </h1>
                  <p className="text-zinc-500 text-sm font-medium">
                    Kelola informasi profil
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`p-3 rounded-2xl transition-all duration-300 ${isEditing ? "bg-zinc-800 text-zinc-400 hover:text-white" : "bg-lime-400 text-black hover:scale-110 shadow-[0_0_20px_rgba(163,230,53,0.3)]"}`}
                >
                  {isEditing ? <X size={24} /> : <User size={24} />}
                </button>
              </div>

              {!isEditing ? (
                /* Mode View */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-700">
                  <InfoCard
                    icon={<User size={18} />}
                    label="Full Name"
                    value={user?.displayName || "Anonymous"}
                  />
                  <InfoCard
                    icon={<Mail size={18} />}
                    label="Email Address"
                    value={user?.email}
                  />
                  <InfoCard
                    icon={<Calendar size={18} />}
                    label="Joined Since"
                    value={joinDate}
                  />
                  <div className="p-6 rounded-3xl bg-zinc-800/20 border border-zinc-800 flex items-center justify-center italic text-zinc-600 font-bold text-xl uppercase tracking-widest">
                    DENFLIX MEMBER
                  </div>
                </div>
              ) : (
                /* Mode Edit */
                <form
                  onSubmit={handleUpdate}
                  className="space-y-6 animate-in slide-in-from-right-8 duration-500"
                >
                  <div className="group relative">
                    <label className="text-[10px] font-black text-lime-400 uppercase tracking-widest ml-4 mb-2 block">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-800/50 border-2 border-zinc-800 focus:border-lime-400 rounded-2xl p-4 transition-all outline-none font-bold"
                      placeholder="Your Name"
                    />
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-lime-400 text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="uppercase italic tracking-tighter text-lg">
                          Update Profile
                        </span>
                        <Check className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-komponen agar kode rapi
const InfoCard = ({ icon, label, value }) => (
  <div className="p-6 rounded-3xl bg-zinc-800/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
    <div className="flex items-center gap-3 text-lime-400 mb-3">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
        {label}
      </span>
    </div>
    <p className="text-lg font-bold truncate">{value}</p>
  </div>
);

export default MyProfile;
