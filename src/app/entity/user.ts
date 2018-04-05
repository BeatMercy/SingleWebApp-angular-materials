export class User {
    constructor() {
        this.id = null;
        this.username = null;
        this.password = null;
        this.authorities = null;
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
    authorities: null
};
export const RSA_PRIVATE_KEY = 'ss';
