import { motion } from 'framer-motion';

function NotFound() {
  return (
    <motion.div
      className="bg-black h-screen flex flex-col justify-center items-center"
      initial={{ x: '-100vw' }} // Start off-screen
      animate={{ x: 0 }} // Slide to the center
      transition={{ type: 'spring', stiffness: 60 }} // Smooth transition
    >
      <motion.h1
        className="text-white text-9xl font-bold"
        initial={{ opacity: 0 }} // Fade in the heading
        animate={{ opacity: 1 }} // Fully visible after entering
        transition={{ delay: 0.5, duration: 1 }} // Delay and smooth fade-in
      >
        404
      </motion.h1>
      <motion.p
        className="text-white text-2xl mt-4"
        initial={{ opacity: 0 }} // Fade in the text
        animate={{ opacity: 1 }} // Fully visible after entering
        transition={{ delay: 1, duration: 1 }} // Delayed fade-in
      >
        Page Not Found
      </motion.p>
    </motion.div>
  );
}

export default NotFound;
