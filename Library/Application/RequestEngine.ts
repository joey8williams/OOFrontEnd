import axios from 'axios';
import Logger from './Utilities/Logger';
import * as $ from 'jquery';
import RenderResponse from './Helpers/Interfaces/IRenderResponse';
import * as qs from 'qs';
import emitter from './EventEngine';
import { Actions } from '../Enums/Events';
import environments from '../Enums/environments';
import JsonResponse from './Helpers/Interfaces/IJsonResponse';
import Loader from './Utilities/Loader';
import IComponentRenderProps from './Helpers/Interfaces/ComponentRenderProps';


/**
 * The main way to communicate with the server, handles all Json and HTML needs. 
 * Abstract because all methods are contacted via pub/sub and are static
 */
abstract class RequestEngine{
    

    static transferData(pAbsoluteUrlPath:string, pData: object = {}){
        const stringifedData = qs.stringify(pData);

        RequestEngine.gracefullyRequest(RequestEngine.formatUrl(pAbsoluteUrlPath),stringifedData).then((response : JsonResponse) => {
            Logger.debug(response, "JsonEndPointResponse")
            emitter.emit(Actions.dataTransferResponse,response);
        });
    }


    static render(pComponentName,pParentSelector,pData:any){
        const data = qs.stringify({
            pComponentName: pComponentName,
            pRenderProps: pData
        });

        Promise.resolve()
            .then(() => RequestEngine.gracefullyRequest(RequestEngine.formatUrl('/Component/Render'),data))
            .then((response : RenderResponse) => {
                         emitter.emit(Actions.renderResponse,{
                             response:response,
                             pParentSelector:pParentSelector
                            });
                });
    }

    private static gracefullyRequest(url, data){
        return axios.post(url,data)
                    .catch(error => {
                        Logger.error(error);
                        Logger.error('TODO: CATCH ERRORS GRACEFULLY'); 
                    });

    }

    private static formatUrl(url){
        return `${process.env.NODE_ENV === environments.local ? '' : $('application').attr('name')}${url}`;
    }
}

export default RequestEngine;