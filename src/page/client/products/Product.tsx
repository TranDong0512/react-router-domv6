import React, { useState } from 'react';
import './Product.css';
import { useLoaderData, useNavigate } from 'react-router-dom';
export interface IProduct {
    id: number;
    name: string;
    avatar: string;
    createdAt: Date
}

const styles: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
};

export const Products = () => {
    const navigate = useNavigate();
    const { products } = useLoaderData();
    console.log('data', products);

    const handleDetailProduct = (id: number) => {
        navigate(`/products/${id}`);
    }
    const [productList] = useState<IProduct[]>(products);

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={styles}>Our Products</h1>
            <div className="product-grid">
                {productList && productList.map((product) => (
                    <div key={product.id} className="product-card" onClick={() => handleDetailProduct(product.id)}>
                        <img src={product.avatar} alt={product.name} />
                        <h2>{product.name}</h2>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
            {/* action tìm hiểu thêm chứ a chưa dùng bh cx ko biết */}
            <form method="post" action="/products">
                <input type="text" name="name" placeholder="Product Name" required />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};
