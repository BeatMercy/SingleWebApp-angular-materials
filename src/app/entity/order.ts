import { Page } from './page';
import { Pipe, PipeTransform } from '@angular/core';

export class Order {
    type: string;
    name: string;
    orderNo: string;
    thirdPartyOrderNo: string;

    plateNo: string;
    travelMiles: number;

    endTime: Date; // 订单结束时间/取消时间
    state: string;
    staffId: number;
    userId: number;
    total: number; // 预计总价;

    basePrice: number;
    selectedOption: JSON;
    optionKeys: Array<string>;

    isResetTotal: boolean;
    resetTotal: number; // 重设总价;
    payMethod: string;
    progress: string;
    note: string;

}

export function getOrdersFromPage(page: Page<Order>) {
    const orders: Order[] = page.content;
    orders.forEach(element => {
        element.optionKeys = Object.keys(element.selectedOption);
    });
    return orders;
}
