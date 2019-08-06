import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchContainerComponent } from "./search-container/container.component";
import { SerialContainerComponent } from './serial-container/serial-container.component';

const routes: Routes = [
  {
    path: "search/:id",
    component: SerialContainerComponent
  },
  {
    path: "search",
    component: SearchContainerComponent
  },
  {
    path: "",
    redirectTo:"search",
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
