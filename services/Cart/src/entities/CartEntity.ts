export class Cart {
  constructor(
    public readonly userId: string,
    public readonly products: { productId: string; quantity: number }[]
  ) {}
}
