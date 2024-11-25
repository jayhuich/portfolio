import { motion } from "framer-motion";

const TOTAL_STEPS = 6;

const stairsVariant = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"],
  },
};

const reverseIndex = (index: number) => {
  return TOTAL_STEPS - index - 1;
};

const Stairs = () => {
  return (
    <>
      {[...Array(TOTAL_STEPS)].map((_, index) => {
        return (
          <motion.div
            key={index}
            variants={stairsVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              delay: reverseIndex(index) * 0.1,
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="w-full h-full relative bg-white"
          />
        );
      })}
    </>
  );
};

export default Stairs;
