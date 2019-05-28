import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'terms/:myid', loadChildren: './terms/terms/terms.module#TermsPageModule' },
  { path: 'privacy', loadChildren: './terms/privacy/privacy.module#PrivacyPageModule' },
  { path: 'account', loadChildren: './pages/account/account.module#AccountPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
