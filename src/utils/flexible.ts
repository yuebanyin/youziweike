export const initRem = () => {
  const baseSize = 16;

  const setRem = () => {
    const scale = document.documentElement.clientWidth / 375;
    const fontsize = baseSize * Math.min(scale, 3);
    document.documentElement.style.fontSize = `${fontsize}px`;
  };

  setRem();

  window.onresize = () => {
    setRem();
  };
};
