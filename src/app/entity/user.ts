export class User {
    constructor() {
        this.id = null;
        this.username = null;
        this.password = null;
    }

    id: number | null;
    username: string | null;
    password: string | null;
}

export const USER: User = {
    id: null,
    username: null,
    password: null
};
export const HOST_URL = 'http://beatmercy.com:8080';
export const RSA_PRIVATE_KEY = 'ss';
