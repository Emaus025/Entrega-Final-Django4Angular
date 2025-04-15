import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Instrumento } from './models/instrumento.model';
import * as InstrumentosActions from './store/instrumentos.actions';

@Component({
  selector: 'app-instrumentos',
  templateUrl: './instrumentos.component.html',
  styleUrls: ['./instrumentos.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class InstrumentosComponent implements OnInit {
  instrumentos$: Observable<Instrumento[]>;
  instrumentoForm: FormGroup;
  editingId: number | null = null;
  selectedFile: File | null = null;

  constructor(
    private store: Store<{ instrumentos: { instrumentos: Instrumento[] } }>,
    private fb: FormBuilder
  ) {
    this.instrumentos$ = this.store.select(state => state.instrumentos.instrumentos);
    this.instrumentoForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: [''],
      imagen: [null]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(InstrumentosActions.loadInstrumentos());
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.instrumentoForm.valid) {
      const instrumentoData: Instrumento = {
        ...this.instrumentoForm.value,
        imagen: this.selectedFile
      };

      if (this.editingId) {
        instrumentoData.id = this.editingId;
        this.store.dispatch(InstrumentosActions.updateInstrumento({ instrumento: instrumentoData }));
      } else {
        this.store.dispatch(InstrumentosActions.createInstrumento({ instrumento: instrumentoData }));
      }
      this.resetForm();
    }
  }

  onEdit(instrumento: Instrumento): void {
    this.editingId = instrumento.id || null;  // Handle possible undefined
    this.instrumentoForm.patchValue({
      nombre: instrumento.nombre,
      tipo: instrumento.tipo,
      descripcion: instrumento.descripcion || ''
    });
    this.selectedFile = null;
  }

  resetForm(): void {
    this.instrumentoForm.reset();
    this.editingId = null;
    this.selectedFile = null;
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de eliminar este instrumento?')) {
      this.store.dispatch(InstrumentosActions.deleteInstrumento({ id }));
    }
  }
}
