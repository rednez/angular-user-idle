import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {provideUserIdleConfig} from 'angular-user-idle';
import {ApiInfoComponent} from './api-info/api-info.component';
import {AppComponent} from './app.component';
import {DescriptionComponent} from './description/description.component';
import {FooterComponent} from './footer/footer.component';
import {GithubIconComponent} from './github-icon/github-icon.component';
import {HeaderComponent} from './header/header.component';
import {TimerComponent} from './timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    HeaderComponent,
    DescriptionComponent,
    FooterComponent,
    GithubIconComponent,
    ApiInfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatBadgeModule,
    MatIconModule
  ],
  providers: [
    provideUserIdleConfig({ idle: 60, timeout: 120, ping: 60 })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
