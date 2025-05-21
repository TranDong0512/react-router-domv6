import React from 'react';
import './Products.css';
import useFetch from '../../../hook/api/useFetch';
import useQueryParam from '../../../hook/search/useQueryParam';
import useDebounce from '../../../hook/utils/useDebounce';

export interface IProduct {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    createdAt: Date
}
interface ProductsResponse {
    products: IProduct[];
    total: number;
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
    // Đây là sử dụng useQueryParam để lấy các query params từ URL
    const { getQueryParamByKey, setQueryParam } = useQueryParam()
    // Các state page, limit, order, inputValue mục đích là để hiển thị lên giao diện người dùng và cập nhật URL 
    const [page, setPage] = React.useState<number>(parseInt(getQueryParamByKey('page=') || '1'));
    const [limit, setLimit] = React.useState<number>(parseInt(getQueryParamByKey('limit=') || '4'));
    const [order, setOrder] = React.useState<string>(getQueryParamByKey('order=') || '');
    const [inputValue, setInputValue] = React.useState<string>(getQueryParamByKey('search?q='));

    // useDebounce là một custom hook để trì hoãn việc cập nhật giá trị inputValue trong 500ms (số s tùy chỉnh)
    const debouncedInputValue = useDebounce(inputValue, 500);

    // useFetch là một custom hook để gọi API và lấy dữ liệu từ server
    // Ở đây mỗi khi anh search hay chọn limit, odder, page thì path sẽ được làm mới
    // Trong useFetch, tại useEffect sẽ gọi lại api khi patch thay đổi ns vừa rồi đúng không
    const { state } = useFetch(
        {
            path: `${path}/search?q=${debouncedInputValue}&limit=${limit}&skip=${(limit * (page - 1))}&sortBy=${order ? "price" : ""}&order=${order}`,
            method: 'GET',
        }
    );

    const data = state.data as ProductsResponse | undefined;

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={styles}>Our Products</h1>
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={inputValue}

                    // đù bug rồi mé cứu t bug rồi nhìn tái hiện bug này Toản bì đc thì t gửi 

                    // tìm kiếm on change thì anh cập nhật state inputValue,
                    // cập nhật page về 1 set lại queryParam page=1 và search=q=inputValue

                    // thấy vừa anh xóa search thì nó sẽ xóa luôn queryParam search

                    // ok chưa
                    // Tương tự các hàm bên dưới

                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setPage(1);
                        // 2 thông số này sẽ hiển thị lên URL 
                        setQueryParam('page=', '1');
                        setQueryParam('search/q=', e.target.value);
                    }}
                />
                <select value={limit} onChange={(e) => {
                    setLimit(parseInt(e.target.value));
                    setPage(1);
                    setQueryParam('page=', '1');
                    setQueryParam('limit=', e.target.value);
                }}>
                    <option value={4}>4 / page</option>
                    <option value={8}>8 / page</option>
                    <option value={12}>12 / page</option>
                </select>
                <select value={order} onChange={(e) => {
                    setOrder(e.target.value);
                    setPage(1);
                    setQueryParam('page=', '1');
                    setQueryParam('order=', e.target.value);
                }}>
                    <option value="">Sort By Price</option>
                    <option value="asc">Price: Low → High</option>
                    <option value="desc">Price: High → Low</option>
                </select>
            </div>

            <div className="product-grid">
                {data?.products && data.products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.thumbnail} alt={product.title} />
                        <h2>{product.title}</h2>
                        <h4>{product.price}</h4>
                        <p>Created At: {new Date(product.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
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
            </div>
        </div>
    );
};
export default Products;