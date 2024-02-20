export class Auth {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly role: "admin" | "user",
    public readonly _id?: string,
    public readonly name?: string
  ) {}
}
