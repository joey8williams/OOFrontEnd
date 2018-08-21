import Component  from "./Component";
import Logger from "./Utilities/Logger";
import * as $ from 'jquery';
import IEventContract from "./Helpers/Interfaces/IEventContract";
const flattenDeep = require('lodash/flattenDeep'); 

interface IView {
    //The outermost wrapper id of the page. Usually #PageName
    readonly Selector: string;
    //The name of the view
    readonly PageName: string;
    //The list of Components contained in the view
    Components: Array<Component>
    //The Function led when the page loads
    DocumentReady: () => void;
    //The Function called when any JsonResponse comes from the server to the page
    JsonResponseHandler(postBackMethod:string, data:object): void;
    RenderResponseHandler(pComponentName :string, pParentSelector:string, pHtml :string) : void;
}

abstract class View implements IView{
    abstract readonly Selector: string;
    abstract readonly PageName: string;
    protected _components: Array<Component> = [];

    
    /**
     * Identical to $(document).ready(function() {...})
     * Feel free to extend as needed in your view's implementation.
     * Be sure to call super.DocumentReady() at the end if you do!
     */
    DocumentReady() : void { this.createComponentEventListeners()}

    private createComponentEventListeners() : void{
        this.Components.forEach(comp => Logger.event(comp.name));
        const eventContracts : Array<IEventContract> = flattenDeep(this.Components.map(comp => comp.events));

        eventContracts.forEach(contract => {
            const {event,selector,data,handler} = contract;
            $(`view[name="${this.Selector}"]`).on(event,selector,data,handler);
        });

    }

    /**
     * Returns a list of all components that have been added in the view's implementation
     */
    get Components(){ return this._components; }

    /**
     * Handles all JsonResponses from the server
     * @param postBackMethod The controller method hit 
     * @param data The data posted back
     */
    abstract JsonResponseHandler(postBackMethod:string,data:object);

    RenderResponseHandler(pComponentName:string, pParentSelector:string, pHtml:string){
        const component = this.Components.find(comp => comp.name === pComponentName);
        $(`${pParentSelector}`).append(pHtml);
        const newInstance = <HTMLElement>document.querySelector(`${pParentSelector} ${component.tagName}`);
        component.instance.set(newInstance);
    }

    addComponent(comp: any){ 
        if(comp instanceof Component){
            return this.Components.push(comp); 
        }
        throw new Error(`Attempted to add a component to ${this.PageName} that does not inherit from './Scripts/Library/Application/Component'`);
    }

}

export default View;