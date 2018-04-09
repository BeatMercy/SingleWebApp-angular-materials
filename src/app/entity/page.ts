export class Sort {
    ascending: boolean;
    descending: boolean;
    direction: string;
    ignoreCase: boolean;
    nullHandling: string;
    property: string;
}
export class Page<T> {
    content: Array<T> | null;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElement: number;
    size: number;
    sort: Sort | null;
    totalElements: number;
    totalPages: number;
}
export function jsonToPage<T>(json: any): Page<T> {
    const page = new Page<T>();
    page.first = json['first'];
    page.last = json['last'];
    page.number = json['number'];
    page.size = json['size'];
    page.sort = json['sort'];
    page.totalElements = json['totalElements'];
    page.totalPages = json['totalPages'];

    page.content = json['content'];
    return page;
}
