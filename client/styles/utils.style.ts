const unit = (size: number) => {
  return `${size / 10}rem`;
};

const units = (sizes: []) => {
  const m = sizes.map((s) => unit(s));
  return m.join(' ');
};

export { unit, units };
