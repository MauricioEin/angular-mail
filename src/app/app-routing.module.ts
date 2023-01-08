import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { EmailDetailsComponent } from './pages/email-details/email-details.component';
import { EmailListComponent } from './pages/email-list/email-list.component';
import { HomeComponent } from './pages/home/home.component';
import { EmailAppComponent } from './pages/email-app/email-app.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'email', component: EmailAppComponent, children: [
      { path: 'list', component: EmailListComponent },
      { path: ':id', component: EmailDetailsComponent },// resolve: { contact: ContactResolver }},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

