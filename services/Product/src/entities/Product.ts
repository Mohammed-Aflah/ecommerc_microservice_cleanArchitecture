export class Product {
  constructor(
    public readonly description: string,
    public readonly quantity: number,
    public readonly price: number,
    public readonly productName: string,
    public readonly status?: boolean,
    public readonly _id?: string,
    public readonly images?: string[]
  ) {}
}
