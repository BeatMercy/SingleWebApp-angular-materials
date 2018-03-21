export class Product {
    constructor() {
        this.id = null;
    }

    id: number | null;
    type: string | null;	// 服务类 String型
    name: String | null;
    description: String | null;
    costTime: String | null;
    startPrice: number | null;
    originalPrice: number | null;
    thumbnailImg: String | null;
    imges: String[] | null;
    isSelling: Boolean | null;
    saleCount: number | null;
}
