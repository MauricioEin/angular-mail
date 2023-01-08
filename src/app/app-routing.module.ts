import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { EmailDetailsComponent } from './pages/email-details/email-details.component';
import { EmailListComponent } from './pages/email-list/email-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemAppComponent } from './pages/item-app/item-app.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'item', component: ItemAppComponent, children: [
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

