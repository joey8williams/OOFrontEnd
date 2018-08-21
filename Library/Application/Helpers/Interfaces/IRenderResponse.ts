import IAxiosResponse from './IAxiosResponse';

/**
 * An abstract class to describe an incoming response from
 * the applications RenderComponent controller method
 */
abstract class RenderResponse implements IAxiosResponse{
    status: number;
    statusText:string;
    headers:object;
    config:object;
    request:object;
    data:{
        success : boolean;
        html:string;
        method:string;
        component: string;
    }
}

export default RenderResponse;