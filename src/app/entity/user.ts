export class User {
    constructor() {
        this.id = null;
        this.username = null;
        this.password = null;
        this.authorities = ['NORMAL_USER'];
    }

    id: number | null;
    username: string | null;
    password: string | null;
    authorities: string[] | null;
}

export const USER: User = {
    id: null,
    username: null,
    password: null,
    authorities: ['NORMAL_USER']
};
export const HOST_URL = 'http://beatmercy.com:8080';
export const RSA_PRIVATE_KEY = 'ss';
