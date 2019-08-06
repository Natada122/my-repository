import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { SerialEffects } from "./Store/effects/Serial.effects";
import { SerialSearchComponent } from './serial-search/serial-search.component';
import { SerialListComponent } from './serial-list/serial-list.component';
import { SearchContainerComponent } from './search-container/container.component';
import { SerialContainerComponent } from './serial-container/serial-container.component';
import { SerialDetailComponent } from './serial-detail/serial-detail.component';
import { appReducers } from './Store/reducers/app.reducers';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, SerialSearchComponent, SerialListComponent, SearchContainerComponent, SerialContainerComponent, SerialDetailComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([SerialEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
