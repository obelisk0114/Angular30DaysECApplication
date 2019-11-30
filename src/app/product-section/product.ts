export interface IProduct {
  id: number;
  type: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity?: number;

  isEqual?(p1: IProduct, p2: IProduct): boolean;
}

export class ProductEntity implements IProduct {
  id: number;
  type: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity?: number;
  
  constructor(id: number, type: string, name: string, price: number, imageUrl: string) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  isEqual(p1: IProduct, p2: IProduct): boolean {
    return (p1.id === p2.id);
  }
}
