import * as EventEmitter from 'eventemitter3';
import RequestEngine from './RequestEngine';
import {Actions} from '../Enums/Events';



const emitter = new EventEmitter();

//Any emitter that is not context dependent should go below.
emitter.on(Actions.renderRequest,RequestEngine.render);
emitter.on(Actions.dataTransferRequest,RequestEngine.transferData);


export default emitter;
