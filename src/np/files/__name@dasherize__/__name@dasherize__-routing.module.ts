import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { <%= classify(name) %>Component } from './<%=dasherize(name)%>.component';


const routes: Routes = [
  Shell.childRoutes([{ path: '<%= classify(name) %>', component: <%=classify(name)%>Component, data: { title: extract('<%= classify(name) %>Component') } }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class <%= classify(name) %>RoutingModule {}
