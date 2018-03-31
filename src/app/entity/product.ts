export class Product {
    constructor(name: string) {
        this.id = null;
        this.name = name;
    }

    id: number | null;
    type: string | null;	// 服务类 String型
    name: string | null;
    description: string | null;
    costTime: string | null;
    startPrice: number | null;
    originalPrice: number | null;
    thumbnailImg: string | null;
    imges: string[] | null;
    isSelling: Boolean | null;
    saleCount: number | null;
}
export const PRODUCTS: Product[] = [
    {
        id: 1,
        type: null,
        name: '小型车洗车服务',
        description: '为车型在xxxx一下的车提供洗车服务',
        costTime: null,
        startPrice: 35,
        originalPrice: null,
        thumbnailImg: null,
        imges: null,
        isSelling: false,
        saleCount: 0
    },
    {
        id: 2,
        type: null,
        name: '2型车洗车服务',
        description: '为车型在xxxx一下的车提供洗车服务',
        costTime: null,
        startPrice: 35,
        originalPrice: null,
        thumbnailImg: null,
        imges: null,
        isSelling: false,
        saleCount: 0
    }, {
        id: 3,
        type: null,
        name: '3型车洗车服务',
        description: '为车型在xxxx一下的车提供洗车服务',
        costTime: null,
        startPrice: 35,
        originalPrice: null,
        thumbnailImg: null,
        imges: null,
        isSelling: false,
        saleCount: 0
    }, {
        id: 3,
        type: null,
        name: '4型车洗车服务',
        description: '为车型在xxxx一下的车提供洗车服务',
        costTime: null,
        startPrice: 35,
        originalPrice: null,
        thumbnailImg: null,
        imges: null,
        isSelling: false,
        saleCount: 0
    }, {
        id: 3,
        type: null,
        name: '5型车洗车服务',
        description: '为车型在xxxx一下的车提供洗车服务',
        costTime: null,
        startPrice: 35,
        originalPrice: null,
        thumbnailImg: null,
        imges: null,
        isSelling: false,
        saleCount: 0
    }, {
        id: 3,
        type: null,
        name: '小型车洗车服务',
        description: '为车型在xxxx一下的车提供洗车服务',
        costTime: null,
        startPrice: 35,
        originalPrice: null,
        thumbnailImg: null,
        imges: null,
        isSelling: false,
        saleCount: 0
    }, {
        id: 3,
        type: null,
        name: '小型车洗车服务',
        description: '为车型在xxxx一下的车提供洗车服务',
        costTime: null,
        startPrice: 35,
        originalPrice: null,
        thumbnailImg: null,
        imges: null,
        isSelling: false,
        saleCount: 0
    }, {
        id: 3,
        type: null,
        name: '小型车洗车服务',
        description: '为车型在xxxx一下的车提供洗车服务',
        costTime: null,
        startPrice: 35,
        originalPrice: null,
        thumbnailImg: null,
        imges: null,
        isSelling: false,
        saleCount: 0
    }
];
