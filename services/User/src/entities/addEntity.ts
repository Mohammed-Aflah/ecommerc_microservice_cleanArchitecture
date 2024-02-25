export class AddressEntity {
  constructor(
    public readonly state: string,
    public readonly district: string,
    public readonly mobile: string,
    public readonly building: string,
    public readonly email: string,
    public readonly street: string,
    public readonly _id?: string
  ) {}
}
