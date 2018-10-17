import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  constructor(private http: Http) { }

  // Get all tenats
  getTenants() {
    return this.http.get('http://localhost:3000/api/tenants').pipe(
      map(res => res.json())
    );
  }
  // Create new tenants
  createTenant(newTs) {
    return this.http.post('http://localhost:3000/api/tenant', newTs);
  }
  // Update tenants
  updateTenant(upTs) {
    return this.http.put(`http://localhost:3000/api/tenant/${upTs._id}`, upTs);
  }
  // Delete Tenants
  deleteTenant(_id) {
    return this.http.delete(`http://localhost:3000/api/tenants/${_id}`);
  }
  // Filter tenants
  filterTenant(sort) {
    return this.http.get(`http://localhost:3000/api/tenants/filter/${sort}`).pipe(
      map(res => res.json())
    );
  }
}
