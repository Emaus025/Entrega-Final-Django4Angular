import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import * as Crud1Actions from './store/crud1.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crud1.component.html',
  styleUrls: ['./crud1.component.css']
})
export class Crud1Component implements OnInit {
  users$: Observable<User[]>;
  userForm: FormGroup;
  showModal = false;
  selectedUser: User | null = null;

  constructor(
    private store: Store<{ crud1_usuario: { users: User[] } }>,
    private fb: FormBuilder
  ) {
    this.users$ = this.store.select(state => state.crud1_usuario.users);
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      apellido: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.store.dispatch(Crud1Actions.loadUsers());
  }

  openAddModal() {
    this.selectedUser = null;
    this.userForm.reset();
    this.showModal = true;
  }

  editUser(user: User) {
    console.log('Editing user:', user);
    this.selectedUser = user;
    this.userForm.patchValue({
      nombre: user.nombre,
      correo: user.correo,
      apellido: user.apellido
    });
    this.showModal = true;
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      console.log('Deleting user with ID:', id);
      this.store.dispatch(Crud1Actions.deleteUser({ id }));
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      
      if (this.selectedUser) {
        // Update existing user
        const updatedUser = {
          ...this.selectedUser,
          ...userData
        };
        console.log('Updating user:', updatedUser);
        this.store.dispatch(Crud1Actions.updateUser({ user: updatedUser }));
      } else {
        // Create new user
        console.log('Creating new user:', userData);
        this.store.dispatch(Crud1Actions.createUser({ user: userData }));
      }
      
      this.closeModal();
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.userForm.reset();
    this.selectedUser = null;
  }

  // Form validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (!field) return '';
    
    if (field.hasError('required')) return 'Este campo es requerido';
    if (field.hasError('email')) return 'Email inválido';
    if (field.hasError('minlength')) return 'Mínimo 3 caracteres';
    
    return '';
  }
}
