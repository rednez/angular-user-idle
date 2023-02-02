import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { UserIdleModule } from 'angular-user-idle';
import { MatBadgeModule } from '@angular/material/badge';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimerComponent } from './timer/timer.component';
import { HeaderComponent } from './header/header.component';
import { DescriptionComponent } from './description/description.component';
import { FooterComponent } from './footer/footer.component';
import { GithubIconComponent } from './github-icon/github-icon.component';
import { ApiInfoComponent } from './api-info/api-info.component';
import { provideUserIdleConfig } from '../../../angular-user-idle/src/public-api';

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
  ],
  providers: [
    provideUserIdleConfig({ idle: 60, timeout: 120, ping: 60 })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
