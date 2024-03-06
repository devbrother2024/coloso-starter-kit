import OrderCatalog from '@/components/templates/purchase/OrderCatalog';
import OrderClassroomLink from '@/components/templates/purchase/OrderClassroomLink';
import OrderPayment from '@/components/templates/purchase/OrderPayment';
import OrderState from '@/components/templates/purchase/OrderState';
import Step from '@/components/templates/purchase/Step';

interface TypePurchaseDonePage {
  params: { orderId: string };
}

const PurchaseDonePage = ({ params: { orderId } }: TypePurchaseDonePage) => {
  const id = Number(orderId);
  return (
    <>
      <Step type="order" />
      <OrderState orderId={id} />
      <OrderCatalog />
      <OrderPayment />
      <OrderClassroomLink />
    </>
  );
};
export default PurchaseDonePage;
