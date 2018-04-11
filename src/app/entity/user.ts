export class User {
    constructor() {
    }

    id: number | null;
    username: string | null;
    password: string | null;
    headimg: string | null;
    authorities: string[] | null;
    phone: string | null;
    weixin: string | null;
    qq: string | null;
    realName: string | null;

}
export function buildUser( user: User, userdata: any) {
    user.id = userdata['id'];
    user.username = userdata['username'];
    user.headimg = userdata['headimg'];
    user.phone = userdata['phone'];
    user.weixin = userdata['weixin'];
    user.qq = userdata['qq'];
    user.realName = userdata['realName'];

}
export const USER: User = {
    id: null,
    username: null,
    password: null,
    authorities: null,
    headimg: 'assets/img/default_head',
    phone: null,
    weixin: null,
    qq: null,
    realName: null,
};
export const RSA_PRIVATE_KEY = 'ss';
