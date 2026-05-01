import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Hanya opacity, tanpa y: 30
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        duration: 1, // Durasi sedikit lebih lama agar halus
        delay: delay, // Menggunakan delay yang dikirim dari props
        ease: [0.42, 0, 0.58, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};