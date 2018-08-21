
interface IEventContract{
    selector:string,
    event:string,
    handler: (JQueryEventObject) => void;
    data : object;
}
export default IEventContract;