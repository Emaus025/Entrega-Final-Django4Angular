import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faker } from '@faker-js/faker/locale/es';

@Injectable({
  providedIn: 'root'
})
export class DatabaseSeederService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  async seedDatabase() {
//  await this.seedUsers(4000);
    await this.seedInstrumentos(4000);
    await this.seedPartituras(4000);
    await this.seedEnsambles(4000);
  }

  private async seedUsers(count: number) {
    const users = Array.from({length: count}, () => ({
      nombre: faker.person.firstName(),
      apellido: faker.person.lastName(),
      correo: faker.internet.email(),
      is_active: faker.datatype.boolean(0.8)
    }));

    for (const user of users) {
      await this.http.post(`${this.apiUrl}usuarios/`, user).toPromise();
    }
  }

  private async seedInstrumentos(count: number) {
    const instrumentTypes = ['Guitarra', 'Piano', 'Violín', 'Flauta', 'Batería', 'Saxofón', 'Trompeta', 'Arpa'];
    const instrumentos = Array.from({length: count}, () => ({
      nombre: `${faker.word.adjective()} ${faker.helpers.arrayElement(instrumentTypes)}`,
      tipo: faker.helpers.arrayElement(['Cuerda', 'Viento', 'Percusión', 'Electrónico']),
      descripcion: faker.lorem.sentence(),
      imagen: faker.image.url()
    }));

    for (const instrumento of instrumentos) {
      await this.http.post(`${this.apiUrl}instrumentos/`, instrumento).toPromise();
    }
  }

  private async seedPartituras(count: number) {
    const partituras = Array.from({length: count}, () => ({
      titulo: faker.music.songName(),
      compositor: faker.person.fullName(),
      dificultad: faker.helpers.arrayElement(['Fácil', 'Intermedio', 'Difícil', 'Avanzado']),
      descripcion: faker.lorem.paragraph()
    }));

    for (const partitura of partituras) {
      await this.http.post(`${this.apiUrl}partituras/`, partitura).toPromise();
    }
  }

  private async seedEnsambles(count: number) {
    // First get existing IDs
    const users = await this.http.get<any[]>(`${this.apiUrl}users/`).toPromise();
    const instrumentos = await this.http.get<any[]>(`${this.apiUrl}instrumentos/`).toPromise();
    const partituras = await this.http.get<any[]>(`${this.apiUrl}partituras/`).toPromise();

    if (!users || !instrumentos || !partituras) return;

    const ensambles = Array.from({length: count}, () => ({
      nombre: faker.company.name(),
      director: faker.helpers.arrayElement(users).id,
      miembros: faker.helpers.arrayElements(users, {min: 3, max: 10}).map(u => u.id),
      instrumentos: faker.helpers.arrayElements(instrumentos, {min: 2, max: 8}).map(i => i.id),
      partituras: faker.helpers.arrayElements(partituras, {min: 1, max: 5}).map(p => p.id),
      descripcion: faker.lorem.paragraph(),
      activo: faker.datatype.boolean(0.8)
    }));

    for (const ensamble of ensambles) {
      await this.http.post(`${this.apiUrl}ensambles/`, ensamble).toPromise();
    }
  }
}