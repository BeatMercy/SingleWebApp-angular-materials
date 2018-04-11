import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import {
  debounceTime, distinctUntilChanged, switchMap, map
} from 'rxjs/operators';

import { Order, getOrdersFromPage, buildOrderOptionKeys } from '../entity/order';
import { AuthHttp } from 'angular2-jwt';
import { authHttpServiceFactory } from '../../auth.module';
import { RequestOptions, Http } from '@angular/http';
import { MessageDialogService } from '../message-dialog.service';
import { MyMessageData } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-cashier-board',
  templateUrl: './cashier-board.component.html',
  styleUrls: ['./cashier-board.component.css']
})
export class CashierBoardComponent implements OnInit {
  provinceAbbr = [
    { value: '', viewValue: '无' },
    { value: '粤', viewValue: '粤' },
    { value: '赣', viewValue: '赣' },
    { value: '湘', viewValue: '湘' },
    { value: '京', viewValue: '京' },
    { value: '冀', viewValue: '冀' },
    { value: '苏', viewValue: '苏' },
    { value: '豫', viewValue: '豫' },
    { value: '辽', viewValue: '辽' },
    { value: '黑', viewValue: '黑' },
    { value: '皖', viewValue: '皖' },
    { value: '新', viewValue: '新' },
    { value: '鄂', viewValue: '鄂' },
    { value: '晋', viewValue: '晋' },
    { value: '陕', viewValue: '陕' },
    { value: '吉', viewValue: '吉' },
    { value: '青', viewValue: '青' },
    { value: '甘', viewValue: '甘' },
    { value: '贵', viewValue: '贵' },
    { value: '浙', viewValue: '浙' },
    { value: '鲁', viewValue: '鲁' },
    { value: '蒙', viewValue: '蒙' },
    { value: '藏', viewValue: '藏' },
    { value: '闽', viewValue: '闽' },
    { value: '川', viewValue: '川' },
    { value: '琼', viewValue: '琼' },
    { value: '云', viewValue: '云' }
  ];
  private authHttp: AuthHttp;
  plateAbbr = '';
  plateString = '';
  searchTerm = new Subject<string>();
  orders$: Observable<Array<Order>>;
  constructor(
    private messageService: MessageDialogService,
    private http: Http, requestOption: RequestOptions) {
    this.authHttp = authHttpServiceFactory(http, requestOption);
  }

  ngOnInit() {
    this.searchTerm.pipe(
      // 等待300毫秒输入搜索关键字
      debounceTime(300),
      // 忽略相同的搜索字段
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchUnpayOrder(term))
    ).subscribe(l => {
      /**
       * pipe返回的obsevable 事件是懒加载发生的，使用subscrib方法
       * 在事件emit 后 才进行orders的更新
       * 而orders=xxx.pipe()相当于只是绑定了一个事件监听器，不能即刻
       * 用xx.next() emitorders的加载
       */
      this.orders$ = of(l);
    });
    this.searchTerm.next('all');
    // document.getElementById('').children
  }
  abbrChange(abbr: string) {
    this.plateAbbr = abbr;
    this.searchTerm.next(abbr + this.plateString);
  }
  search(term: string) {
    this.plateString = term;
    this.searchTerm.next(term);
  }

  searchUnpayOrder(term: string): Observable<Order[]> {
    return this.authHttp.post(
      '/order/searchUnpay',
      {
        plateAbbr: this.plateAbbr,
        plateString: this.plateString
      }
    ).map(result => {
      return buildOrderOptionKeys(result.json()['content']);
    });
  }

  confirmPay(orderNo: string) {
    const result = this.messageService.showAuthConfirmForm(
      '/order/confirmPay',
      {
        'orderNo': orderNo
      }, {
        'text': '确定该账单已支付？',
        'confirmText': '已支付'
      });
    console.log(result);
    result.subscribe(
      next => {
        if (next === false) {
          return; // 对话框选择了取消
        }
        next.subscribe(
          next2 => {
            if (next2['success']) {
              this.searchTerm.next(this.plateAbbr + this.plateString + Math.random().toFixed(2));
              this.messageService.showMessage('操作成功', next2['msg']);
            } else {
              this.messageService.showMessage('操作失败', next2['msg']);
            }
          }
        );
      }
    );
  }

  cancelOrder(orderNo: string) {
    const result = this.messageService.showAuthConfirmForm(
      '/order/cancelOrder',
      {
        'orderNo': orderNo
      }, {
        'text': '确认取消该订单？',
        'confirmText': '确定'
      });
    // console.log(result);
    result.subscribe(
      next => {
        if (next === false) {
          return; // 对话框选择了取消
        }
        next.subscribe(
          next2 => {
            if (next2['success']) {
              this.searchTerm.next(this.plateAbbr + this.plateString + Math.random().toFixed(2));
              this.messageService.showMessage('操作成功', next2['msg']);
            } else {
              this.messageService.showMessage('操作失败', next2['msg']);
            }
          }
        );
      }
    );
  }

  resetTotal(original: number, orderNo: string) {
    const messageData = new MyMessageData('inputForm');
    messageData.isInputForm = true;
    messageData.messageDetail.text = '修改金额';
    messageData.messageDetail.confirmText = '修改';
    messageData.postData.url = '/order/resetTotal';
    messageData.postData.body = { 'orderNo': orderNo };
    messageData.inputFields = [{
      name: 'resetTotal',
      placeHolder: '金额',
      type: 'number',
      value: original
    }, {
      name: 'note',
      placeHolder: '备注',
      type: 'textarea',
      value: ''
    }];
    this.messageService.showAuthInputForm(messageData).subscribe(
      next => {
        if (next === false) {
          return; // 对话框选择了取消
        }
        next.subscribe(
          next2 => {
            if (next2['success']) {
              this.searchTerm.next(this.plateAbbr + this.plateString + Math.random().toFixed(2));
              this.messageService.showMessage('操作成功', next2['msg']);
            } else {
              this.messageService.showMessage('操作失败', next2['msg']);
            }
          }
        );
      }
    );
  }
}
