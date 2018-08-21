import IAxiosResponse from './IAxiosResponse';

abstract class JsonResponse implements IAxiosResponse{
    status: number;
    statusText:string;
    headers:object;
    config:object;
    request:object;
    data:{
        success : boolean;
        data:object;
        method:string;
    }

}

export default JsonResponse;