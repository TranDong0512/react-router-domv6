import React from "react";

function ProductItem({ product, handleChange }) {
  return (
    <div>
      <h3>{product.title}</h3>
      <p>{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductItem;

// Cái đoạn này là nó để định nghia kiểu dữ liệu cho props
// Để tránh việc truyền sai kiểu dữ liệu vào props
// title price, description là các thuộc tính bắt buộc phải có
// title, description là kiểu string
// price là kiểu number
ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,

    // Nếu truyền 1 hàm thì đây là cách check của nó
    handleChange: PropTypes.func.isRequired,
  }).isRequired,
};

ProductItem.defaultProps = {
  product: {
    title: "Default title",
    price: 0,
    description: "Default description",
  },
};
// dịt :)))
