import environments from '../../Enums/environments';
import * as $ from 'jquery';
import Logger from '../Utilities/Logger';


/**
 * A Decorator Function. Checks what environment the JavaScript is currently being run in. If the environment is not production,
 * it will call the function that it is decorating. Otherwise it will skip the call
 */
export function environmentNotProduction(){
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        const original : () => void = descriptor.value;
        descriptor.value = function(...args){
            try{
                if(process.env.NODE_ENV !== environments.production)
                    original.apply(this,args);
            }
            catch(e){ throw new Error('Error checking HTML instance of component'); }
        }
        return descriptor;
    }

}


/**
 * A decorator function, best used on event callbacks to set the HTML instance of your component
 * to the event.target or event.target.parentElement.parentElement......
 */
export function superSet(){
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        const original : () => void = descriptor.value;
        descriptor.value = function(...args){
            try{
                this.instance.set(args.find(arg => arg.target !== undefined).target);
                original.apply(this,args);
            }
            catch(e){
                throw new Error('An attempt was made to superSet a method which did not have an event as a parameter');
            }
        }
        return descriptor;
    }
}

/**
 * A decorator function, best used on getters/setters to make sure there is an active instance of the component you're about to send data to
 */
export function checkSet(){
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        const original : () => void = descriptor.value;
        descriptor.value = function(...args){
            try{
                if(this.component === null) throw new Error('Component HTML reference not set');

                original.apply(this,args);
            }
            catch(e){ throw new Error('Error checking HTML instance of component'); }
        }
        return descriptor;
    }

}

