
const { VITE_NODE_ENV, VITE_NODE_ENV1, VITE_NODE_ENV2 } = import.meta.env

const env = {
    NODE_ENV: VITE_NODE_ENV,
    NODE_ENV1: VITE_NODE_ENV1,
    NODE_ENV2: VITE_NODE_ENV2,
}
export default env;