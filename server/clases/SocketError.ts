export default class SocketError extends Error {

    constructor(message: string) {
        super(message);
    }

    toJSON() {
        return {
            error: {
                name: this.name,
                message: this.message,
            }
        }
    }
}