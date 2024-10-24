import { motion } from 'framer-motion';

function NotFound() {
  return (
    <motion.div
      className="bg-black h-screen flex flex-col justify-center items-center"
      initial={{ x: '-100vw' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 60 }}
    >
      <motion.h1
        className="text-white text-9xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-white text-2xl mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Page Not Found
      </motion.p>
      <motion.p
        className="text-gray-400 text-xl mt-4 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Chats
      </motion.p>
    </motion.div>
  );
}

export default NotFound;
