import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../Services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../Services/firebase";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

    const userRef = doc(db, "users", user.email); 
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        savedShows: [],
      });
    }
      Swal.fire({
        title: "Success!",
        html: `Welcome, <b class="text-denflix-primary">
        ${result.user.displayName} 🍿`,
        icon: "success",
        showConfirmButton: false,
        backdrop: `
      rgba(0,0,0,0.6)
      url("")
      left top
      no-repeat
    `,
        timer: 3000,
        timerProgressBar: true,
        background: "#080808",
        color: "#fff",
        iconColor: "#EAB308",
        customClass: {
          popup: "rounded-3xl border border-white/10 shadow-2xl",
        },
      });
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        Swal.fire({
          title: "Login Error",
          text: "Something went wrong, please try again.",
          icon: "error",
          background: "#080808",
          color: "#fff",
          confirmButtonColor: "#EAB308",
          backdrop: `
      rgba(0,0,0,0.6)
      url("")
      left top
      no-repeat
    `,
        });
      }
    }
  };

  const logOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will need to login again to access your exclusive features!",
      icon: "warning",
      showCancelButton: true,
      backdrop: `
      rgba(0,0,0,0.6)
      url("")
      left top
      no-repeat
    `,
      confirmButtonColor: "#EAB308",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Log out!",
      cancelButtonText: "Cancel",
      background: "#080808",
      color: "#fff",
      iconColor: "#EAB308",
      customClass: {
        popup: "rounded-3xl border border-white/10 shadow-2xl",
        confirmButton: "rounded-full px-6 py-2 font-bold",
        cancelButton: "rounded-full px-6 py-2 font-bold",
      },
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth);

        Swal.fire({
          title: "Logged Out",
          text: "See you later!👋",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          background: "#080808",
          backdrop: false,
          color: "#fff",
          iconColor: "#EAB308",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
        });
      } catch (error) {
        console.error("Logout Error:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
