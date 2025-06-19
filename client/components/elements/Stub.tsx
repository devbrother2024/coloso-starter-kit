'use client';
import Image from 'next/image';

const Stub = ({ size = '100x20', bgc = '00ff43', color = '00ff43' }) => {
  return (
    <Image
      src={`https://placehold.co/${size}/${bgc}/${color}`}
      alt="logo"
      width={parseInt(size.split('x')[0])}
      height={parseInt(size.split('x')[1])}
    />
  );
};

export default Stub;
