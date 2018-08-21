import * as $ from 'jquery';


class Router {
    /**
     * The list of registered routes
     */
    registeredRoutes: Map<string, string> ;

    constructor(pListOfKeyValueSelectorPageNamePairs: Map<string,string>) {
        this.registeredRoutes = new Map<string,string>();
        pListOfKeyValueSelectorPageNamePairs.forEach((selector,pageName) => {
            if (!this.routeExists(selector,pageName)) {
                this.addRoute(selector,pageName);
            }
        });
    }

    /**
     * Find a page's selector and return that page name
     */
    FindRoute() :string{
        
        let routes : Map<string,string> = new Map<string,string>();

        const viewSelector = $('view').attr('name');


        this.registeredRoutes.forEach((selector,pageName) => {
            if(viewSelector === selector)  routes.set(selector,pageName); 
        });

        //If there is only one instance, return the page name
        if (routes.size== 1) return routes.entries().next().value["1"];

        if (routes.size > 1) throw new Error("Duplicate Route Registered");

        throw new Error("Route Not Found");
    }

    /**
     * Given a Selector, PageName Add it to the list of registered routes
     * @param selector :string the css selector unique to this route
     * @param pageName :string the name of the page
     */
    private addRoute(selector:string, pageName:string) : boolean {
        let count = this.registeredRoutes.size;

        this.registeredRoutes.set(selector,pageName);

        return this.registeredRoutes.size > count;
    }

    /**
     * Given a Selector,PageName check and see if it already exists in the list of registered routes
     * @param selector :string the css selector unique to this route
     * @param pageName :string the name of the page
     */
    private routeExists(pSelector:string, pPageName:string) : boolean {
        let potentialMatches : Array<[string,string]> = new Array<[string,string]>();

        this.registeredRoutes.forEach((pageName,selector)=> {
            if(pSelector === selector) potentialMatches.push([selector,pageName]);
        });

        if (potentialMatches.length > 0) {
            if(potentialMatches.some(route => route["1"] == pPageName)) return true;

            const selector = potentialMatches.pop();

            throw new Error(`An attempt to add a View with duplicate selector ${selector} was made. Please choose a different selector name`);
        }
        return false;
    }
}

export default Router;