import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../api/login/login.service';
import { ToastController } from '@ionic/angular';
import { CrearUsuario } from 'src/app/models/CrearUsuario';
import { Usuarios } from 'src/app/models/Usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';
  usuarios: Usuarios[] = [];
  mostrarFormulario: Boolean = false; 

  nuevoUsuario: CrearUsuario = {
    usuario: '',        
    contrasena: '',
    correo: ''
  };
  
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastController: ToastController
  ) {}

  login() {
    // Verificar si los campos usuario y contraseña están completos
    if (!this.usuario.trim() || !this.contrasena.trim()) {
      this.presentToast('Usuario y contraseña son obligatorios', 'danger');
      return; // Salir de la función si los campos son obligatorios
    }
  
    this.loginService.validateUser(this.usuario, this.contrasena).subscribe(
      async (response) => {
        if (response.body && response.body.length > 0) {
          const usuario = response.body[0];
          console.log('Inicio de sesión exitoso', usuario);
          const nombreRol = usuario.roles.nombre;
          const id = usuario.id;
          localStorage.setItem('id', id);
          localStorage.setItem('rol', nombreRol); // Almacenar el rol
          // Redirigir al dashboard o a la página principal
          this.router.navigate(['/home']);
          console.log('Rol del usuario:', nombreRol); // Imprimir el rol
          
          // Limpiar los campos después del inicio de sesión exitoso
          this.usuario = '';
          this.contrasena = '';
          await this.presentToast('Iniciaste sesión correctamente', 'success');
        } else {
          await this.presentToast('Usuario o contraseña incorrectos', 'danger');
        }
      },
      async (error) => {
        console.error('Error al iniciar sesión:', error);
        await this.presentToast('Hubo un problema al iniciar sesión. Inténtalo de nuevo.', 'danger');
      }
    );
  }

  crearUsuarios() {
    const { usuario, contrasena, correo } = this.nuevoUsuario;
  
    // Verificar que los campos sean obligatorios
    if (!usuario.trim() || !contrasena.trim() || !correo) {
      this.presentToast('Usuario, contraseña y correo son obligatorios', 'danger');
      return; // Salir de la función si hay campos vacíos
    }
  
    this.loginService.validarCrearUsuario(usuario, correo).subscribe(
      (response) => {
        const usuariosResponse = response.body as Usuarios[] || []; // Asegura que sea un array
  
        const usuarioExiste = usuariosResponse.some(u => u.usuario === usuario);
        const correoExiste = usuariosResponse.some(u => u.correo === correo);
  
        if (usuarioExiste && correoExiste) {
          this.presentToast("Usuario y correo ya existen", "danger");
        } else if (usuarioExiste) {
          this.presentToast("Usuario ya existe", "danger");
        } else if (correoExiste) {
          this.presentToast("Correo ya existe", "danger");
        } else {
          // Si no existe, asignar rol_id automáticamente y crear el usuario
          const usuarioConRol = { ...this.nuevoUsuario, rol_id: 4 }; // Asigno rol de voluntario automaticamente
  
          this.loginService.agregarUsuario(usuarioConRol).subscribe(
            async (response) => {
              console.log("Usuario creado:", response.body);
              this.nuevoUsuario = { usuario: '', contrasena: '', correo: '' }; // Limpiar inputs
              this.toggleFormulario(); // Cerrar el formulario aquí
              await this.presentToast("Usuario creado exitosamente", "success");
            },
            (error) => {
              console.error('Error al crear el usuario:', error);
              this.presentToast('Hubo un problema al crear el usuario. Inténtalo de nuevo.', 'danger');
            }
          );
        }
      }
    );
  }
  
  
  
  
  
  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color,
    });
    toast.present();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.nuevoUsuario = { usuario: '', contrasena: '', correo: ''};
   
  }
}

