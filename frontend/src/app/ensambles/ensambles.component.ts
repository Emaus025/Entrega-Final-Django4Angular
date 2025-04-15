import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ensamble } from './models/ensamble.model';
import { User } from '../crud1/models/user.model';
import { Instrumento } from '../instrumentos/models/instrumento.model';
import { Partitura } from '../partituras/models/partitura.model';
import * as EnsamblesActions from './store/ensambles.actions';
import * as UsersActions from '../crud1/store/crud1.actions';
import * as InstrumentosActions from '../instrumentos/store/instrumentos.actions';
import * as PartiturasActions from '../partituras/store/partituras.actions';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-ensambles',
  templateUrl: './ensambles.component.html',
  styleUrls: ['./ensambles.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EnsamblesComponent implements OnInit {
  ensambles$: Observable<Ensamble[]>;
  users$: Observable<User[]>;
  instrumentos$: Observable<Instrumento[]>;
  partituras$: Observable<Partitura[]>;
  
  ensambleForm: FormGroup;
  editingId: number | null = null;

  constructor(
    private store: Store<{ 
      ensambles: { ensambles: Ensamble[] },
      crud1_usuario: { users: User[] },
      instrumentos: { instrumentos: Instrumento[] },
      partituras: { partituras: Partitura[] }
    }>,
    private fb: FormBuilder
  ) {
    this.ensambles$ = this.store.select(state => state.ensambles.ensambles);
    this.users$ = this.store.select(state => state.crud1_usuario.users);
    this.instrumentos$ = this.store.select(state => state.instrumentos.instrumentos);
    this.partituras$ = this.store.select(state => state.partituras.partituras);
    
    this.ensambleForm = this.fb.group({
      nombre: ['', Validators.required],
      director: [null, Validators.required],  // Changed to null
      miembros: [[]],  // Will store IDs
      instrumentos: [[]],  // Will store IDs
      partituras: [[]],  // Will store IDs
      descripcion: [''],
      activo: [true]
    });
  }

  // Replace BehaviorSubjects with regular arrays
  filteredUsers: User[] = [];
  filteredInstrumentos: Instrumento[] = [];
  filteredPartituras: Partitura[] = [];

  ngOnInit(): void {
    this.store.dispatch(EnsamblesActions.loadEnsambles());
    this.store.dispatch(UsersActions.loadUsers());
    this.store.dispatch(InstrumentosActions.loadInstrumentos());
    this.store.dispatch(PartiturasActions.loadPartituras());

    // Initialize filtered lists
    this.users$.subscribe(users => this.filteredUsers = [...users]);
    this.instrumentos$.subscribe(instrumentos => this.filteredInstrumentos = [...instrumentos]);
    this.partituras$.subscribe(partituras => this.filteredPartituras = [...partituras]);
  }

  // Replace filterItems method with this improved version
  filterItems(type: 'users' | 'instrumentos' | 'partituras', searchTerm: string): void {
    searchTerm = searchTerm.toLowerCase();

    switch(type) {
      case 'users':
        this.users$.pipe(take(1)).subscribe(users => {
          this.filteredUsers = users.filter(u => 
            u.nombre.toLowerCase().includes(searchTerm) || 
            u.apellido.toLowerCase().includes(searchTerm)
          );
        });
        break;
      case 'instrumentos':
        this.instrumentos$.pipe(take(1)).subscribe(instrumentos => {
          this.filteredInstrumentos = instrumentos.filter(i => 
            i.nombre.toLowerCase().includes(searchTerm) || 
            i.tipo.toLowerCase().includes(searchTerm)
          );
        });
        break;
      case 'partituras':
        this.partituras$.pipe(take(1)).subscribe(partituras => {
          this.filteredPartituras = partituras.filter(p => 
            p.titulo.toLowerCase().includes(searchTerm) || 
            p.compositor.toLowerCase().includes(searchTerm)
          );
        });
        break;
    }
  }

  onSubmit(): void {
    if (this.ensambleForm.valid) {
      const ensambleData: Ensamble = {
        ...this.ensambleForm.value
      };

      if (this.editingId) {
        ensambleData.id = this.editingId;
        this.store.dispatch(EnsamblesActions.updateEnsamble({ ensamble: ensambleData }));
      } else {
        this.store.dispatch(EnsamblesActions.createEnsamble({ ensamble: ensambleData }));
      }
      this.resetForm();
    }
  }

  onEdit(ensamble: Ensamble): void {
    this.editingId = ensamble.id || null;
    this.ensambleForm.patchValue({
      nombre: ensamble.nombre,
      director: ensamble.director,
      miembros: ensamble.miembros,
      instrumentos: ensamble.instrumentos,
      partituras: ensamble.partituras,
      descripcion: ensamble.descripcion || '',
      activo: ensamble.activo
    });
  }

  toggleSelection(field: 'miembros' | 'instrumentos' | 'partituras', itemId: number | undefined): void {
    if (!itemId) return;
    
    const control = this.ensambleForm.get(field);
    const currentValue: number[] = control?.value || [];
    const index = currentValue.indexOf(itemId);
  
    if (index > -1) {
      control?.setValue(currentValue.filter(id => id !== itemId));
    } else {
      control?.setValue([...currentValue, itemId]);
    }
  }

  isSelected(field: 'miembros' | 'instrumentos' | 'partituras', itemId: number | undefined): boolean {
    if (!itemId) return false;
    
    const control = this.ensambleForm.get(field);
    return control?.value.includes(itemId) || false;
  }

  resetForm(): void {
    this.ensambleForm.reset();
    this.editingId = null;
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de eliminar este ensamble?')) {
      this.store.dispatch(EnsamblesActions.deleteEnsamble({ id }));
    }
  }

  getDirectorName(directorId: number): string {
    let directorName = 'Desconocido';
    this.users$.subscribe(users => {
      const user = users.find(u => u.id === directorId);
      if (user) directorName = `${user.nombre} ${user.apellido}`;
    });
    return directorName;
  }

  getMemberNames(memberIds: number[]): string {
    let memberNames: string[] = [];
    this.users$.subscribe(users => {
      memberNames = users
        .filter(user => memberIds.includes(user.id!))
        .map(user => `${user.nombre} ${user.apellido}`);
    });
    return memberNames.join(', ');
  }

  getInstrumentNames(instrumentIds: number[]): string {
    let instrumentNames: string[] = [];
    this.instrumentos$.subscribe(instrumentos => {
      instrumentNames = instrumentos
        .filter(instrumento => instrumentIds.includes(instrumento.id!))
        .map(instrumento => instrumento.nombre);
    });
    return instrumentNames.join(', ');
  }

  getPartituraTitles(partituraIds: number[]): string {
    let partituraTitles: string[] = [];
    this.partituras$.subscribe(partituras => {
      partituraTitles = partituras
        .filter(partitura => partituraIds.includes(partitura.id!))
        .map(partitura => partitura.titulo);
    });
    return partituraTitles.join(', ');
  }
}