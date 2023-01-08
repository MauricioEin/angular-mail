import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { reducers, metaReducers } from './store/store';
import { AppEffects } from './store/app.effects';

import { AppComponent } from './root-component/index';
import { HomeComponent } from './pages/home/home.component';
import { ItemAppComponent } from './pages/item-app/item-app.component';

import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { ItemListComponent } from './cmps/item-list/item-list.component';
import { ItemEditComponent } from './cmps/item-edit/item-edit.component';
import { ItemPreviewComponent } from './cmps/item-preview/item-preview.component';
import { EmailDetailsComponent } from './pages/email-details/email-details.component';
import { EmailEditComponent } from './pages/email-edit/email-edit.component';
import { EmailPreviewComponent } from './cmps/email-preview/email-preview.component';
import { EmailFilterComponent } from './cmps/email-filter/email-filter.component';
import { FolderListComponent } from './cmps/folder-list/folder-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppHeaderComponent,
    ItemAppComponent,
    ItemEditComponent,
    ItemListComponent,
    ItemPreviewComponent,
    EmailDetailsComponent,
    EmailEditComponent,
    EmailPreviewComponent,
    EmailFilterComponent,
    FolderListComponent
    // ItemPreviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
