export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly _id?: string,
    public readonly status?: boolean
  ) {}
}
