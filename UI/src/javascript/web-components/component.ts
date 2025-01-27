/*
TODO:   Explain what this file is doing - class that components inherit
        methods from
 */

export default class Component extends HTMLElement {
    constructor() {
        super();
    }

    public broadcastChange(message: string): void {
        console.log(message);
    }
}
