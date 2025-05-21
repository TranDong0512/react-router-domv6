import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
// Tạo một custom hook useQueryParam để quản lý các query params trong URL
const useQueryParam = () => {
    const location = useLocation() // Lấy current location trên browser 
    const [searchParams, setSearchParams] = useSearchParams(); // instance của URLSearchParams đại diện cho Query String
    const [allQueryParams, setAllQueryParams] = useState(Object.fromEntries(searchParams)); // State để chứa các query params trên URL
    //  URL: ?page=2&sort=asc => { page: '2', sort: 'asc' }

    // UseEffect để cập nhật allQueryParams mỗi khi searchParams thay đổi
    // 1. Khi người dùng thay đổi URL (thay đổi searchParams) thì allQueryParams sẽ được cập nhật
    useEffect(() => {
        setAllQueryParams(Object.fromEntries(searchParams))
    }, [searchParams])


    // Hàm lấy giá trị của query param theo key

    const getQueryParamByKey = (key: string) => {
        // Tạo mới một instance của URLSearchParams từ location.search
        // location.search là phần query string của URL hiện tại
        const params = new URLSearchParams(location.search);
        // params.get(key) sẽ trả về giá trị của query param tương ứng với key
        // Nếu không tìm thấy giá trị, trả về chuỗi rỗng
        return params.get(key) || "";
        // getQueryParamByKey('page=2') => '2'
        // getQueryParamByKey('sort=asc') => 'asc'
        // getQueryParamByKey('search=') => ''
    };


    // Hàm thiết lập giá trị cho query param theo key
    const setQueryParam = (key: string, value: string) => {
        // Tạo mới một instance của URLSearchParams từ location.search
        const params = new URLSearchParams(location.search);
        // Nếu value không phải là chuỗi rỗng, thêm hoặc cập nhật giá trị cho key thông qua params.set(key, value)

        if (value) {
            params.set(key, value);
        } else {
            // Nếu value là chuỗi rỗng, xóa key khỏi params
            // Điều này có nghĩa là nếu người dùng không nhập gì vào ô tìm kiếm, thì sẽ xóa key đó khỏi URL thông qua params.delete(key)
            params.delete(key);
        }
        // Cập nhật searchParams với các tham số mới
        // Điều này sẽ làm cho URL trên trình duyệt được cập nhật với các tham số mới mà không cần phải tải lại trang
        setSearchParams(params);
    }

    // Hàm xóa query param theo key
    // Hàm này sẽ xóa một query param khỏi URL
    const removeQueryParamByKey = (key: string) => {
        // Tạo mới một instance của URLSearchParams từ location.search  
        const params = new URLSearchParams(location.search);
        // Xóa key khỏi params thông qua params.delete(key)
        params.delete(key);
        // Cập nhật searchParams với các tham số mới
        setSearchParams(params);
    }
    return {
        allQueryParams,
        getQueryParamByKey,
        setQueryParam,
        removeQueryParamByKey,
    };
};

export default useQueryParam;
