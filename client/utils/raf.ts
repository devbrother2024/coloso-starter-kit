let rAFTimeout: ReturnType<typeof requestAnimationFrame>;

export const throttleUsingRaf = (cb: () => void) => {
  if (rAFTimeout) {
    cancelAnimationFrame(rAFTimeout);
  }
  rAFTimeout = requestAnimationFrame(cb);
};
