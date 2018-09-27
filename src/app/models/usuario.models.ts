export class Usuario {

  constructor(
    public id_usuario: number,
    public nombre: string,
    public email: string,
    public password: string,
    public imagen: string,
    public id_rol: number,
    public google: boolean,
    public uc: string,
    public um: string,
  ) {}
}

