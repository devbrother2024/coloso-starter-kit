interface TypeProductContents {
  publicTitle: string;
  subtitle: string;
}

const ProductContents = ({ publicTitle, subtitle = '' }: TypeProductContents) => (
  <div className="payment-list__contents">
    <strong className="title">{publicTitle}</strong>
    <p className="sub-title">{subtitle}</p>
  </div>
);

export default ProductContents;
