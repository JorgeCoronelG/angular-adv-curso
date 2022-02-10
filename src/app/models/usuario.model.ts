import { environment } from "../../environments/environment";

export class Usuario {
  private baseUrl = environment.base_url;

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public uid?: string,
    public role?: string
  ) {}

  get imageUrl(): string {
    if (this.img?.includes('https')){
      return this.img;
    }
    return (this.img) ? `${this.baseUrl}/upload/usuarios/${this.img}` : `${this.baseUrl}/upload/usuarios/no-image`;
  }
}
