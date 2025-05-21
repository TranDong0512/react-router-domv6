import { useCallback, useState } from "react"

function useToggle(init: boolean = false) {
    const [state, setState] = useState<boolean>(init)
    const toggle = useCallback(() => setState(prev => !prev), [])
    return [state, toggle] as const
}
export default useToggle