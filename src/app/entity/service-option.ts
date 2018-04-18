import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

export class OptionDetail {
    constructor(itemName: string, price: number) {
        this.itemName = itemName;
        this.price = price;
    }
    itemName: string | null;
    price: number | null;
}
export class ServiceOption {
    constructor() {
        this.price = 0.0;
    }

    id: number | null;
    name: string | null; // 选项所属类型
    serviceType: string | null; // 所属服务类型
    dtype: string | null;
    optionType: string | null;  // 选项名称代号
    itemName: string | null;    // 选项名称
    price: number | null;
    options: OptionDetail[] | null;
}
export function mapServiceOption(serviceOptions: ServiceOption[]): Observable<ServiceOption[]> {
    const options = new Array;
    const optionsName = new Set(serviceOptions.map(child => child.name));

    optionsName.forEach(oName => {
        const items = new Array();
        const o = new ServiceOption();
        for (let i = 0; i < serviceOptions.length; i++) {
            if (serviceOptions[i].name !== oName) {
                continue;
            }
            if (o.name === undefined) { o.name = serviceOptions[i].name; }
            const item = new OptionDetail(serviceOptions[i].itemName, serviceOptions[i].price);
            items.push(item);
        }
        o.name = oName;
        o.options = items;
        options.push(o);
    });
    return of(options);

}

export function buildOptionDetailList(serviceOptions: ServiceOption[]): Observable<OptionDetail[]> {
    const options = new Array();
    for (let i = 0; i < serviceOptions.length; i++) {
        const item = new OptionDetail(serviceOptions[i].itemName, serviceOptions[i].price);
        options.push(item);
    }
    return of(options);
}
