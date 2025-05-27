/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useReducer } from "react";
import { axiosInstance } from "../../config/axios";
type Methods = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";

type FetchParams = {
  path: string;
  method: Methods;
  body?: unknown;
  config?: import("axios").AxiosRequestConfig;
};
// T được gọi là generic type
type State<T> =
  | { data: null; isLoading: boolean; error: null }
  | { data: null; isLoading: boolean; error: AxiosError }
  | { data: T; isLoading: boolean; error: null };

type Action<T> =
  | { type: "loading"; error: undefined }
  | { type: "success"; data: T }
  | { type: "error"; error: AxiosError };


const fetch = async <T>(
  path: string,
  method: Methods,
  body?: unknown,
  config?: import("axios").AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  switch (method) {
    case "POST":
      return await axiosInstance.post(path, body, config);
    case "GET":
      return await axiosInstance.get(path, config);
    case "DELETE":
      return await axiosInstance.delete(path, config);
    case "PUT":
      return await axiosInstance.put(path, body, config);
    case "PATCH":
      return await axiosInstance.patch(path, body, config);
    default:
      throw new Error("Unknown request method");
  }
};
// Hàm reducer là một hàm nhận vào state hiện tại và action
function reducer<T>(state: State<T>, action: Action<T>) {
  // state là giá trị hiện tại của state lần đầu tiên nó là initialState
  // action là giá trị mới mà chúng ta muốn cập nhật cho state
  // action.type là kiểu của action mà chúng ta muốn thực hiện
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "success":
      return { data: action.data, isLoading: false, error: null };
    case "error":
      return { data: null, isLoading: false, error: action.error };
    default:
      throw new Error("Unknown action type");
  }
}
const useFetch = <T>({ path, method, body, config }: FetchParams) => {

  // useReducer là một hook trong React giúp quản lý state của component
  // Tất cả thứ mà useReducer làm được thì useState cũng làm được 
  // Nhưng useReducer có thể giúp quản lý state phức tạp hơn

  // useReducer nhận vào một hàm reducer và một giá trị khởi tạo state
  const [state, dispatch] = useReducer(reducer<T>, {
    data: null,
    isLoading: false,
    error: null,
  });
  // call api
  useEffect(() => {
    let shouldCancel = false;
    (async () => {
      dispatch({ type: "loading", error: undefined });
      try {
        const { data } = await fetch<T>(path, method, body, config);

        if (shouldCancel) return;
        dispatch({ type: "success", data });

      } catch (error: unknown) {

        if (shouldCancel) return;
        const axiosError = error instanceof AxiosError ? error : new AxiosError("An unknown error occurred");
        dispatch({ type: "error", error: axiosError });
      }
      return () => {
        shouldCancel = true;
      };
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return { state };
};
export default useFetch;
