import { EventEmitter } from 'events';
const eventBus = new EventEmitter();



export const EVENTS = {
    FILE_UPLOADED: "fileUploaded",
};

export default eventBus;