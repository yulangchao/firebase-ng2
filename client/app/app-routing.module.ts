import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TableComponent } from './tables/table.component';
import { SignInComponent } from './auth/signin/signin.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { ItemComponent } from './items/item.component';
import { RukuComponent } from './ruku/ruku.component';
import { ChukuComponent } from './chuku/chuku.component';
import { SummaryComponent } from './summary/summary.component';
import { ChatComponent } from './chat/chat.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'table', component: TableComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'item', component: ItemComponent },
  { path: 'ruku', component: RukuComponent },
  { path: 'chuku', component: ChukuComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'stock', component: StockComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
