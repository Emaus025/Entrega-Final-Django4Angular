import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Partitura } from './models/partitura.model';
import * as PartiturasActions from './store/partituras.actions';

@Component({
  selector: 'app-partituras',
  templateUrl: './partituras.component.html',
  styleUrls: ['./partituras.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PartiturasComponent implements OnInit {
  partituras$: Observable<Partitura[]>;
  partituraForm: FormGroup;
  editingId: number | null = null;
  selectedFile: File | null = null;

  constructor(
    private store: Store<{ partituras: { partituras: Partitura[] } }>,
    private fb: FormBuilder
  ) {
    this.partituras$ = this.store.select(state => state.partituras.partituras);
    this.partituraForm = this.fb.group({
      titulo: ['', Validators.required],
      compositor: ['', Validators.required],
      dificultad: ['', Validators.required],
      descripcion: [''],
      archivo_pdf: [null],
      instrumentos: [[]],
      ensamble: [null]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(PartiturasActions.loadPartituras());
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.partituraForm.valid) {
      const partituraData: Partitura = {
        ...this.partituraForm.value,
        archivo_pdf: this.selectedFile
      };

      if (this.editingId) {
        partituraData.id = this.editingId;
        this.store.dispatch(PartiturasActions.updatePartitura({ partitura: partituraData }));
      } else {
        this.store.dispatch(PartiturasActions.createPartitura({ partitura: partituraData }));
      }
      this.resetForm();
    }
  }

  onEdit(partitura: Partitura): void {
    this.editingId = partitura.id || null;  // Handle undefined case
    this.partituraForm.patchValue({
      titulo: partitura.titulo,
      compositor: partitura.compositor,
      dificultad: partitura.dificultad,
      descripcion: partitura.descripcion || '',
      instrumentos: partitura.instrumentos || [],
      ensamble: partitura.ensamble
    });
    this.selectedFile = null;
  }

  resetForm(): void {
    this.partituraForm.reset();
    this.editingId = null;
    this.selectedFile = null;
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta partitura?')) {
      this.store.dispatch(PartiturasActions.deletePartitura({ id }));
    }
  }

  downloadPdf(pdfUrl: string | File): void {
    if (typeof pdfUrl === 'string') {
      window.open(pdfUrl, '_blank');
    }
  }
}
