import { EventEmitter } from 'events';
const eventBus = new EventEmitter();

// Defines event types for the application
export const EVENTS = {
    FILE_UPLOADED: "fileUploaded",
};

export default eventBus;
