import { AsyncHook } from "async_hooks";

interface MiddlewareContract{
    PageNames : Array<string>;
    load: () => Promise<void>
}
export default MiddlewareContract;