
import { useEffect, useState } from "react";

// custom hook tạo ra 1 hook mới dựa trên các hook có sẵn thực hiện 1 công việc cụ thể mà lặp đi lặp lại
// useDebounce là một custom hook giúp trì hoãn việc cập nhật giá trị của một biến trong một khoảng thời gian nhất định
function useDebounce(value: string, delay: number = 800) {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        const handleTimer = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(handleTimer)
        }
    }, [value, delay])
    return debounceValue
}
export default useDebounce

// khi người dùng nhập vào ô tìm kiếm thì hàm setInputValue được chạy và cập nhật lại giá trị của inputValue
// Nhưng giá trị sẽ không được trả ra ngay lập tức mà sẽ bị delay 500ms
// Hook này trả về kết quả cuối cùng sau khi người dùng dừng nhập trong 500ms 