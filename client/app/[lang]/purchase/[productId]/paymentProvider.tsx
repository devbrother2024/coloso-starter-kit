'use client';

import { ReactNode } from 'react';

import Script from 'next/script';

import getLogger from '@/utils/logger';
const logger = getLogger('pages', 'purchase');

interface TypePaymentProvider {
  children: ReactNode;
}

const PaymentProvider = ({ children }: TypePaymentProvider) => {
  return (
    <>
      <Script
        id="jQuery"
        src="https://code.jquery.com/jquery-1.12.4.min.js"
        onLoad={() => {
          logger.info('[onLoad jQuery] ready to payment!');
        }}
      />
      <Script
        id="iamport-js"
        src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js"
        onLoad={() => {
          logger.info('[onLoad iamport] ready to payment!');
        }}
      />
      {children}
    </>
  );
};

export default PaymentProvider;
