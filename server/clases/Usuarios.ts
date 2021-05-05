export default class Usuario {

    private static usuarios: Usuario[] = [];
    private id: string;
    private nombre: string = 'sin-nombre';
    private sala: string = 'sin-sala';

    constructor(id: string){ 
        this.id = id;   
        Usuario.usuarios.push(this);
    }

    /* ----------------------------------------------------------------------------------- Getters and Setters */

    public getID(): string {
        return this.id;
    }

    public setID(id: string): void {
        this.id = id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getSala(): string {
        return this.sala;
    }

    public setSala(sala: string): void {
        this.sala = sala;
    }

    /* ----------------------------------------------------------------------------------- Métodos estaticos */

    public static getUsuario(id: string) {
        return Usuario.usuarios.find(usuario => usuario.getID() === id );
    }

    public static getUsuarios(): Usuario[] {
        return Usuario.usuarios;
    }

    public static renameUsuario(id: string, nombre: string) {
        for(let usuario of Usuario.usuarios) {
            if(usuario.getID() === id) {
                usuario.setNombre(nombre);
                break;
            }
        }
    }

    public static getUsuariosBySala(sala: string) {
        return Usuario.usuarios.filter( usuario => usuario.getSala() === sala);
    }
    
    public static deleteUsuario(id: string) {
        const tempUsuario = Usuario.getUsuario(id);
        Usuario.usuarios = Usuario.usuarios.filter( usuario => usuario.getID() != id);
        return tempUsuario;
    }

}