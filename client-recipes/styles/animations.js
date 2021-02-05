export const showUp = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};
export const appear = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: "0",
    transition: {
      delay: "0.5",
      duration: "0.7",
      type: "tween",
    },
  },
};
