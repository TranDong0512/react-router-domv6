import { useEffect, useRef, useState } from "react"

export interface IValue {
    value: string

}
function useThrottle(value: IValue, delay = 500) {
    const [throttleValue, setThrottleValue] = useState(value)
    const lastExecuted = useRef<number>(Date.now())
    useEffect(() => {
        if (Date.now() >= lastExecuted.current + delay) {
            lastExecuted.current = Date.now()
            setThrottleValue(value)
        } else {
            const handleTimer = setTimeout(() => {
                lastExecuted.current = Date.now()
                setThrottleValue(value)
            }, delay)
            return () => {
                clearTimeout(handleTimer)
            }
        }
    }, [value, delay])
    return throttleValue
}
export default useThrottle