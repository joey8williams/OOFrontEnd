import {environmentNotProduction} from '../Helpers/Decorators';

class Logger{

    /**
     * Basic console log, does not log in production
     * @param message message to be displayed
     */
    @environmentNotProduction()
    static log(message){
        console.log(message);
    }

    /**
     * Application's styled welcome console message. Doesn't log in production
     * @param message the message to be displayed
     */
    @environmentNotProduction()
    static welcome(message){
        console.log(`%c ${message}`,'color:#fff; background-color:blue; font-weight:700; font-size:18px; padding:3px;');

    }

    /**
     * A generic error message. Instead of console.error, it logs with a error icon, so control flow isn't broken. Doesn't log in production
     * @param message the error message to be displayed
     */
    @environmentNotProduction()
    static error(message) {
        console.exception = console.log.bind(console, '🚫');
        console.exception(message);
    }

    /**
     * Component's styled log for "Wiring Events ..." does not log in production
     * @param componentName The name of the component who's events are being wired
     */
    @environmentNotProduction()
    static event(componentName){
        console.log(`%c ✨ Wiring Events for ${componentName}`,'color:#000; background-color:#badc58; padding:3px;width:75px');
    }


    /**
     * Component's Styled log for "Disposing Events ..." does not log in production
     * @param componentName The component name who's events are being disposed
     */
    @environmentNotProduction()
    static disposeEvent(componentName){
        console.log(`%c 💥 Disposing Events for ${componentName}`,'color:#eb4d4b;background-color:#badc58;padding:3px;width:75px');
    }
    
    /**
     * Application Logged routing notification. Does not log in production
     * @param pageName The name of the page being initialized
     */
    @environmentNotProduction()
    static route(pageName){
        console.log(`%c 🚥 Routing to ${pageName} JavaScript`, "color:#130f40; background-color:#7ed6df; font-size:14px; padding:3px;width:75px;");
    }

    /**
     * A Giant Log option if you need to quickly and easily spot a variable in your console. Surrounds it with palm face icons. Does not log in production
     * @param message The thing you want to see
     * @param headerMessage a message/title to display above message (incase you want to list a variable name) 
     */
    @environmentNotProduction()
    static debug(message,headerMessage=''){
        console.log('🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍')
        if(headerMessage !== '')
            console.log(headerMessage);
        console.log(message);
        console.log('🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍ 🤦‍')
    }

    /**
     * A Log option with a smiley. Useful for... something. Does not log in production 
     * @param message 
     */
    @environmentNotProduction()
    static okay(message){
        console.log(` 😄 ${message}`);
    }
}

export default Logger;