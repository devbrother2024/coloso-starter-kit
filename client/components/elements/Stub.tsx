'use client';
const Stub = ({ size = '100x20', bgc = '00ff43', color = '00ff43' }) => {
  return <img src={`https://placehold.co/${size}/${bgc}/${color}`} alt="logo" />;
};

export default Stub;
