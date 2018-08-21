import emitter from '../EventEngine';
import { Actions } from '../../Enums/Events';

/**
 * Makes a request to the server given a url and optionally data to pass
 * @param pAbsoluteUrl The absolute route you want to hit. e.g. /Home/JsonEndpoint or /Admin/Page/JsonEndPoint NOT https://....../Home/JsonEndPoint
 * @param pData Any data that will be fed to the parameters of the endpoint
 */
export default function Request(pAbsoluteUrl : string, pData: object = null){
    emitter.emit(Actions.dataTransferRequest,pAbsoluteUrl,pData)
}