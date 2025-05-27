import React from 'react';
import { Link, useLoaderData, useLocation, useParams } from 'react-router-dom';
import { IProduct } from '../products/Products';

// Define styles for the ProductDetail page
const styles: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
};

const containerStyles: React.CSSProperties = {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
};

const imageStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
    marginBottom: '20px',
};

const buttonStyles: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
};

const linkStyles: React.CSSProperties = {
    display: 'inline-block',
    marginTop: '20px',
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'none',
};

// Product interface to ensure type safety


const ProductDetail = () => {
    return (
        <div style={containerStyles}>
            {/* <h1 style={styles}>{product.name}</h1>
            <img src={product.avatar} alt={product.name} style={imageStyles} />
            <button style={buttonStyles}>Add to Cart</button>
            <br />
            <Link to="/products" style={linkStyles}>
                Back to Products
            </Link> */}
        </div>
    );
};

export default ProductDetail;