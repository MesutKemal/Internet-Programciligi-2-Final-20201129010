import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminUrunComponent } from './components/admin/admin-urun/admin-urun.component';
import { AuthGuard } from './services/AuthGuard';
import { AdminComponent } from './components/admin/admin/admin.component';
import { UrunComponent } from './components/urun/urun.component';
import { KategoriComponent } from './components/Kategori/Kategori.component';
import { UyeurunComponent } from './components/uyeurun/uyeurun.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },

  {
    path: 'login', component: LoginComponent
  },

  {
    path: 'urun/:UrunId', component: UrunComponent
  },

  {
    path: 'kategori/:katId', component: KategoriComponent
  },

  {
    path: 'uyeurun/:UyeId', component: UyeurunComponent
  },

  {
    path: 'admin', component: AdminComponent,
    canActivate: [AuthGuard],
    data:{
      yetkiler:['Admin'],
      gerigit: '/login'
    }
  },

  {
    path: 'admin/kategori', component: AdminKategoriComponent,
    canActivate: [AuthGuard],
    data:{
      yetkiler:['Admin'],
      gerigit: '/login'
    }
  },

  {
    path: 'admin/uye', component: AdminUyeComponent
  },

  {
    path: 'admin/urun', component: AdminUrunComponent
  },
  
  {
    path: 'admin/urun/:katId', component: AdminUrunComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
