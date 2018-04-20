import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

/**
 * 获取默认的authHttp
 * @param http http工具
 * @param options http请求选项
 */
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(
        new AuthConfig({
            noTokenScheme: true,
            tokenName: 'token',
            tokenGetter: (() => localStorage.getItem('token')),
            noJwtError: false,
            globalHeaders: [{ 'Content-Type': 'application/json' }],
        }),
        http, options);
}

/**
 * 获取定制的authHttp
 * @param authConfig 个性设置认证配置内容包括 token前缀 token获取函数...
 * @param http @see authHttpServiceFactory
 * @param options @see authHttpServiceFactory
 */
export function customAuthHttpServiceFactory(authConfig: AuthConfig, http: Http, options: RequestOptions) {
    return new AuthHttp(authConfig,
        http, options);
}

@NgModule({
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }
    ]
})
export class AuthModule { }
