import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PlayerComponent } from './components/player/player.component';
import { MerchComponent } from './components/merch/merch.component';
import { HaliSahaComponent } from './components/hali-saha/hali-saha.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { HalisahaDetayComponent } from './components/halisaha-detay/halisaha-detay.component';
import { ProductComponent } from './components/product/product.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { TeamsComponent } from './components/teams/teams.component';

export const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'player/:playerid', component: PlayerComponent},
    {path: 'merch', component: MerchComponent},
    {path: 'merch/productid', component: ProductComponent},
    {path: 'hali-saha', component: HaliSahaComponent},
    {path: 'hali-saha/halisahaid', component: HalisahaDetayComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'reset-password', component: ResetPasswordComponent},
    {path: 'admin-panel', component: AdminPanelComponent},
    {path: 'teams', component: TeamsComponent},
    {path: 'teams/:teamid', component: TeamDetailsComponent}
];
