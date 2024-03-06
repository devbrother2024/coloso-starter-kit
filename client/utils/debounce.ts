let timeId: ReturnType<typeof setTimeout>;

export const debounce = (cb: () => void, delay = 100) => {
  clearTimeout(timeId);
  timeId = setTimeout(cb, delay);
};
