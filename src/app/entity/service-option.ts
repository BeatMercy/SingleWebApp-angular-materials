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
    serviceType: string | null;
    dtype: string | null;
    optionType: string | null;
    itemName: string | null;
    price: number | null;
    options: OptionDetail[] | null;
}
export function mapServiceOption(serviceOptions: ServiceOption[]): Observable<ServiceOption[]> {
    const options = new Array;
    const optionsName = new Set(serviceOptions.map(child => child.optionType));

    optionsName.forEach(name => {
        const items = new Array();
        for (let i = 0; i < serviceOptions.length; i++) {
            if (serviceOptions[i].optionType !== name) {
                continue;
            }
            const item = new OptionDetail(serviceOptions[i].itemName, serviceOptions[i].price);
            items.push(item);
        }
        const o = new ServiceOption();
        o.optionType = name;
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
