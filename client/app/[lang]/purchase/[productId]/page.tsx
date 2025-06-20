import DisallowVoucher from '@/components/templates/purchase/DisallowVoucher';
import Method from '@/components/templates/purchase/Method';
import Order from '@/components/templates/purchase/Order';
import Payment from '@/components/templates/purchase/Payment';
import Policy from '@/components/templates/purchase/Policy';
import Step from '@/components/templates/purchase/Step';
import Submit from '@/components/templates/purchase/Submit';
import Voucher from '@/components/templates/purchase/Voucher';

interface TypePurchasePage {
  params: { productId: string };
}

const PurchasePage = ({ params: { productId } }: TypePurchasePage) => {
  const id = Number(productId);

  return (
    <>
      <Step type="purchase" />
      <Order productId={id} />
      <DisallowVoucher />
      <div className="board-block">
        <Voucher productId={id} />
        <Payment />
      </div>
      <div className="board-block">
        <Method />
        <Policy />
      </div>
      <Submit />
    </>
  );
};

export default PurchasePage;
