import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { <%= classify(name) %>RoutingModule } from './<%=dasherize(name)%>-routing.module';
import { <%= classify(name) %>Component } from './<%=dasherize(name)%>.component';

@NgModule({
  imports: [CommonModule, TranslateModule, <%= classify(name) %>RoutingModule],
  declarations: [<%= classify(name) %>Component]
})
export class <%= classify(name) %>Module {}
