import { MatPaginatorIntl } from '@angular/material';

export class MyPaginator extends MatPaginatorIntl {
    constructor() {
        super();
        this.firstPageLabel = '首页';
        this.lastPageLabel = '末页';
        this.previousPageLabel = '上一页';
        this.nextPageLabel = '下一页';
        this.itemsPerPageLabel = '每页数量：';
        this.getRangeLabel = function (page: number, pageSize: number, length: number): string {
            if (length === 0 || pageSize === 0) {
                return '无数据';
            }
            const startIndex = page * pageSize;
            const endIndex = startIndex < length ?
                Math.min(startIndex + pageSize, length) :
                startIndex + pageSize;
            return '第 ' + startIndex + 1 + ' 到 ' + endIndex + '，总共' + length + '个';
        };
    }

}
