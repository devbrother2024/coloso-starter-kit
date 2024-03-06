import { useCallback, useEffect, useState } from 'react';

import { useSnapshot } from 'valtio';

import { LocaleOptions } from '@/policy/local';
import { catalogStore, setCatalogStore } from '@/store/catalog';
import { TypeVoucherTemplate } from '@/types/voucher';
import { getMaxDiscountAmount } from '@/utils/catalog';
import { getMaxDiscountVoucherTemplate, sortVoucherTemplates } from '@/utils/sortVoucher';

const useCatalog = () => {
  const { product, display, downloadVouchers, welcomeVouchers } = useSnapshot(catalogStore);

  const [maxDiscountDownloadVoucher, setMaxDiscountDownloadVoucher] = useState<TypeVoucherTemplate | null>(null);
  const [maxDiscountWelcomeVoucher, setMaxDiscountWelcomeVoucher] = useState<TypeVoucherTemplate | null>(null);

  const [sortedDownloadVouchers, setSortedDownloadVouchers] = useState<TypeVoucherTemplate[]>([]);
  const [sortedWelcomeVouchers, setSortedWelcomeVouchers] = useState<TypeVoucherTemplate[]>([]);

  const salePrice = product.salePrice ?? 0;

  useEffect(() => {
    const maxDiscountDownloadVoucher = getMaxDiscountVoucherTemplate({ salePrice, voucherTemplates: downloadVouchers });
    const maxDiscountWelcomeVoucher = getMaxDiscountVoucherTemplate({ salePrice, voucherTemplates: welcomeVouchers });
    const maxDiscountPrice = getMaxDiscountAmount(
      maxDiscountDownloadVoucher?.maxDiscountedPrice,
      maxDiscountWelcomeVoucher?.maxDiscountedPrice,
    );
    const maxDiscountRate = getMaxDiscountAmount(
      maxDiscountDownloadVoucher?.maxDiscountRate,
      maxDiscountWelcomeVoucher?.maxDiscountRate,
    );
    setMaxDiscountDownloadVoucher(maxDiscountDownloadVoucher);
    setMaxDiscountWelcomeVoucher(maxDiscountWelcomeVoucher);
    setCatalogStore({ priceList: { salePrice, maxDiscountPrice, maxDiscountRate } });
  }, [salePrice, downloadVouchers, welcomeVouchers]);

  useEffect(() => {
    const sortedDownloadVouchers = sortVoucherTemplates({ salePrice, voucherTemplates: downloadVouchers });
    const sortedWelcomeVouchers = sortVoucherTemplates({ salePrice, voucherTemplates: welcomeVouchers });
    setSortedDownloadVouchers(sortedDownloadVouchers);
    setSortedWelcomeVouchers(sortedWelcomeVouchers);
  }, [salePrice, downloadVouchers, welcomeVouchers]);

  return {
    maxDiscountDownloadVoucher,
    maxDiscountWelcomeVoucher,
    sortedDownloadVouchers,
    sortedWelcomeVouchers,
  };
};

export default useCatalog;
