import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseSeederService } from '../../services/database-seeder.service';
@Component({
  selector: 'app-seed-database',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="seedDatabase()" class="btn btn-danger">
      Seed Database (4k records per table)
    </button>
    <div *ngIf="loading" class="mt-2">Seeding in progress...</div>
    <div *ngIf="message" class="mt-2 alert alert-info">{{message}}</div>
  `
})
export class SeedDatabaseComponent {
  loading = false;
  message = '';

  constructor(private seeder: DatabaseSeederService) {}

  async seedDatabase() {
    this.loading = true;
    try {
      await this.seeder.seedDatabase();
      this.message = 'Database seeded successfully with 4,000 records per table!';
    } catch (error) {
      this.message = 'Error seeding database: ' + error;
    } finally {
      this.loading = false;
    }
  }
}