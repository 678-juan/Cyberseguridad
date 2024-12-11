export class JwtPayloadDto {
  sub: number; // ID del usuario
  username: string; // Nombre de usuario
  rol: string; // ID del rol (un número que representa el rol)
}
