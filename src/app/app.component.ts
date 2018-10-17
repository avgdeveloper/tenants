import { Component, OnInit, NgModule } from '@angular/core';
import { TenantsService } from './services/tenants.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'mean-stack';
  tenants: any;
  tenantsCashe: any;
  upTenants: any;
  newTs: any;
  searchName: string;

  constructor(private ts: TenantsService) {
  }

  //Get all tenants
  ngOnInit() {
    this.ts.getTenants().subscribe(tenants => this.tenantsCashe = this.tenants = tenants);
  }

  // Update teneants
  // 1. Get content  
  // 2. Update that

  getUpTs(tenant) {
    this.upTenants = tenant;
  }
  updateTs(upTs) {
    this.ts.updateTenant(upTs);
  }

  // Create new tenant
  // 1. get content
  // 2. create that

  addTenants() {
    this.newTs = 1;
  }
  createTenants(newTs) {
    this.ts.createTenant(newTs);
    console.log(newTs);
  }



  //Delete tenant by the name
  deleteTenant(_id) {
    if (confirm('Are you sure you want to delete this tenants?')) {
      this.ts.deleteTenant(_id);
    }
  }

  //Filter tenant by name
  filterTenants(sort) {
    this.ts.filterTenant(sort).subscribe(tenants => this.tenants = tenants);
  }

  //Search tenants by the name
  searchTenant() {
    const searchName = this.searchName.toLowerCase().trim();
    if (searchName.length > 0) {
      this.tenants = this.tenantsCashe.filter((tenant) => _.includes(tenant.name.toLowerCase(), searchName));
    } else {
      this.tenants = this.tenantsCashe;
    }
  }



}
