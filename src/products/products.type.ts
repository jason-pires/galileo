export interface Color {
    id: number,
    name: string
}

export interface BaseProduct {
    name: string;
    color: Color;
    size: string;
    price: number;
}

export interface Product extends BaseProduct {
    id: number;
}