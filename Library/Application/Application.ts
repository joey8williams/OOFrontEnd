import View from "./View";
import Router from './Router';
import Logger from './Utilities/Logger';
import * as $ from 'jquery';
import emitter from './EventEngine';
import { Actions } from "../Enums/Events";
import JsonResponse from "./Helpers/Interfaces/IJsonResponse";
import RenderResponse from "./Helpers/Interfaces/IRenderResponse";
import IMiddleware from './Helpers/Interfaces/IMiddlewareContract';


class Application {
    /**
     * The name of the application. Grabbed from the application tag in the Layout.cshtml file
     */
    constructor(){
        this.Views = new Map<string,View>();
        emitter.on(Actions.renderResponse,this.RenderResponseHandler,this);
        emitter.on(Actions.dataTransferResponse,this.JsonResponseHandler,this);
    }
    /**
     * The list of registered views
     */
    Views: Map<string,View>;

    Middleware: Array<IMiddleware> = [];

    /**
     * Starts the application
     */
    Start() {
        Logger.welcome('Development Mode Started');
        const pageName : string = this.Router.FindRoute();
        Logger.route(pageName);
        this.loadMiddleware(pageName);

        this.Views.get(pageName).DocumentReady();
    }

    JsonResponseHandler(response : JsonResponse){
        const pageName : string = this.Router.FindRoute();
        this.Views.get(pageName).JsonResponseHandler(response.data.method,response.data.data);
    }

    RenderResponseHandler({response,pParentSelector} : {response: RenderResponse, pParentSelector: string}){
        const pageName : string = this.Router.FindRoute();
        this.Views.get(pageName).RenderResponseHandler(response.data.component,pParentSelector,response.data.html);
    }

    

    /**
     * Adds a view to the list of registered views
     * @param view a class which implements Scripts/Library/Application/View
     */
    AddView(view: View) { this.Views.set(view.PageName,view); }

    /**
     * Adds a middleware object to the application. this will fire prior to page load. Great for Toast Notitications!
     * @param Middleware A class which implements IMiddleware
     */
    AddMiddleware(Middleware: IMiddleware) { this.Middleware.push(Middleware); }


    /**
     * The Application's Router. uses the View's Selector and PageName to find the currently active page
     */
    private get Router() {
        let pairs : Map<string,string> = new Map<string,string>();
        
        this.Views.forEach(view => pairs.set(view.Selector, view.PageName));

        return new Router(pairs);
    }

    private loadMiddleware(pageName:string){
        this.Middleware.filter(middleware => middleware.PageNames.some(page => page === pageName))
                       .forEach(middleware => middleware.load().catch(error => Logger.error(error)));
    }

    /**
     * Return the name of the application. Since this is a web.config property its better to let the DOM be responsible for holding it.
     */
    get name() : string { return $('application').attr('name'); }
}

export default Application;