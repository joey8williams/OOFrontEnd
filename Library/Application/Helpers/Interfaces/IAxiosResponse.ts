/**
 * A Generic interface to describe axios responses
 */
interface IAxiosResponse{
    data : object;
    status : number;
    statusText: string;
    headers: object;
    config: object;
    request : object
}
export default IAxiosResponse;