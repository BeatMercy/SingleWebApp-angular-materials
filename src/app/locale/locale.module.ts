import { NgModule, LOCALE_ID } from '@angular/core';
import * as moment from 'moment';

import { registerLocaleData } from '@angular/common';
import localeZh from '@angular/common/locales/zh';

@NgModule({
    imports: [
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'zh' }
    ],
})
export class LocaleModule {
    constructor() {
        moment.locale('zh');
        registerLocaleData(localeZh);
    }
}
