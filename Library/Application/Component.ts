import Logger from './Utilities/Logger';
import emitter from './EventEngine';
import { Actions } from '../Enums/Events';
import IEventContract from './Helpers/Interfaces/IEventContract';
import IComponentRenderProps from './Helpers/Interfaces/ComponentRenderProps';

interface IComponent {
    component: HTMLElement;
    wrapper: HTMLElement;
    readonly tagName: string;
    readonly name:string; //The name of the partial view which this component controls (exclude .cshtml)
    events: Array<IEventContract>;

    instance : {
        set: (pElement: HTMLElement) => void,
        dispose: () => void
    } ;
    render({pParentSelector, pData}:{pParentSelector: string, pData : object}): void;
}

abstract class Component implements IComponent{
    protected _component: HTMLElement;
    protected _wrapper: HTMLElement;
    abstract readonly tagName: string;
    abstract readonly name :string;

    constructor(){
        this._component = null;
        this._wrapper = null;
    }


    /**
     * Gets the HTML reference of the currently set component
     */
    get component(){ return this._component; }

    /**
     * Gets the HTML reference of the currently set component's parentElement
     */
    get wrapper(){ return this._wrapper; }


    abstract get events() : Array<IEventContract>;


    /**
     * Inserts the given content into a parent element, pWrapper.
     * @param pWrapper The parent element
     * @param pContent The content to be inserted, usually requested from the server.
     */
    render({pParentSelector,pData}:{pParentSelector:string, pData: any}) {
        Logger.debug(pData);
        emitter.emit(Actions.renderRequest,this.name,pParentSelector,pData);
    }

    /**
     * Sets or disposes of the HTML reference of a component. Uses recursion to find a suitable element or parent until one is found
     * If no suitable HTML tag name can be found, it will dispose automatically
     */
    get instance() : {set:(pElement:HTMLElement) => void, dispose: () => void}{
        const obj = {
            set: this.setSpecificInstance,
            dispose: this.disposeSpecificInstance 
        }
        obj.set = obj.set.bind(this);
        obj.dispose = obj.dispose.bind(this);
        return     obj;
    }

    /**
     * Sets the current reference instance of the component to the closest parent instance. Disposes of no instance can be found.
     * @param pElement 
     */
    protected setSpecificInstance(pElement : HTMLElement) : void {
        if(pElement === null) throw new Error('Must pass an element to setSpecific');
        if(pElement.nodeName.toLowerCase() !== this.tagName.toLowerCase()){
            if(pElement.nodeName.toLowerCase() === "content"){
                this.instance.dispose();
                throw new Error(`An attempt as made to set component ${this.tagName} but the tag name could not be found. Disposing.`);
            }
            else{
                this.setSpecificInstance(pElement.parentElement);
            }
        }
        else{
            this._component = <HTMLElement>pElement;
            this._wrapper = <HTMLElement>pElement.parentElement;
        }
    }

    /**
     * Disposes of the current HTML reference of a component
     */
    protected disposeSpecificInstance() : void {
        this._component = null;
        this._wrapper = null;
    }
}



export default Component;