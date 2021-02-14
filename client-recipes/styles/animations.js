export const showUp = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
export const appearLeft = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
      type: "tween",
    },
  },
};
export const appearRight = {
  hidden: {
    x: "200vw",
  },
  visible: {
    x: 0,
    transition: {
      delay: 1,
      duration: 0.5,
      type: "tween",
    },
  },
};
export const appearUp = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
      type: "tween",
    },
  },
};
export const scaleUp = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      delay: 0.7,
      duration: 0.5,
      type: "tween",
    },
  },
};
