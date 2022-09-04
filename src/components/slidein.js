import { motion } from "framer-motion";

const SlideInParent = ({ children, stagger = 0.3, once = true, scrollTriggered = true }) => {
  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView={scrollTriggered ? "visible" : undefined}
      animate={scrollTriggered ? undefined : "visible"}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
};

export const SlideChild = ({ children, stiffness = 100, y = 200, x = 200, alt = false }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: alt ? 0 : y,
      x: alt ? x : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness,
      },
    },
  };

  return <motion.div variants={variants}>{children}</motion.div>;
};

export default SlideInParent;
