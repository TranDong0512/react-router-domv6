import React from 'react';
import './Products.css';
import useFetch from '../../../hook/api/useFetch';
import useQueryParam from '../../../hook/search/useQueryParam';
// import useDebounce from '../../../hook/utils/useDebounce';

export interface IProduct {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    createdAt: Date
}

const styles: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
};
const path = '/products'
function Products() {

    const { getQueryParamByKey, setQueryParam } = useQueryParam()
    const [page, setPage] = React.useState<number>(parseInt(getQueryParamByKey('page=') || '1'));
    const [limit, setLimit] = React.useState<number>(parseInt(getQueryParamByKey('_limit=') || '4'));
    const [order, setOrder] = React.useState<string>(getQueryParamByKey('_order=') || '');
    // const [inputValue, setInputValue] = React.useState<string>(getQueryParamByKey('search?q='));

    // const debouncedInputValue = useDebounce(inputValue, 500);

    const { state } = useFetch<IProduct[]>(
        {
            path: `${path}?_limit=${limit}&_skip=${(limit * (page - 1))}_sortBy=${order ? "price" : ""}_order=${order}`,
            method: 'GET',
        }
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={styles}>Our Products</h1>
            <div className="controls">
                {/* <input
                    type="text"
                    placeholder="Search products..."
                    value={inputValue}



                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setPage(1);
                        // 2 thông số này sẽ hiển thị lên URL 
                        setQueryParam('page=', '1');
                        setQueryParam('search/q=', e.target.value);
                    }}
                /> */}
                <select value={limit} onChange={(e) => {
                    setLimit(parseInt(e.target.value));
                    setPage(1);
                    setQueryParam('page=', '1');
                    setQueryParam('_limit=', e.target.value);
                }}>
                    <option value={4}>4 / page</option>
                    <option value={8}>8 / page</option>
                    <option value={12}>12 / page</option>
                </select>
                <select value={order} onChange={(e) => {
                    setOrder(e.target.value);
                    setPage(1);
                    setQueryParam('page=', '1');
                    setQueryParam('_order=', e.target.value);
                }}>
                    <option value="">Sort By Price</option>
                    <option value="asc">Price: Low → High</option>
                    <option value="desc">Price: High → Low</option>
                </select>
            </div>

            <div className="product-grid">
                {state.data?.map((product: IProduct) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
            {/* <div className="pagination">
                <button onClick={() => {
                    setPage(page - 1);
                    setQueryParam('page=', (page - 1).toString());
                }} disabled={page === 1}>
                    ⬅️ Prev
                </button>
                <span>
                    Page {page} of {Math.ceil((data?.total ?? 0) / limit)}
                </span>
                <button
                    onClick={() => {
                        setPage(page + 1);
                        setQueryParam('page=', (page + 1).toString());
                    }}
                    disabled={(data?.products?.length ?? 0) < limit}
                >
                    Next ➡️
                </button>
            </div> */}
        </div>
    );
};
export default Products;