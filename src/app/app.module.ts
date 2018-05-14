import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {
MatButtonModule,
MatCardModule,
MatInputModule,
MatBadgeModule
} from '@angular/material';
import { UserIdleModule } from 'angular-user-idle';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimerComponent } from './timer/timer.component';
import { HeaderComponent } from './header/header.component';
import { DescriptionComponent } from './description/description.component';
import { FooterComponent } from './footer/footer.component';
import { GithubIconComponent } from './github-icon/github-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    HeaderComponent,
    DescriptionComponent,
    FooterComponent,
    GithubIconComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UserIdleModule.forRoot({idle: 60, timeout: 120, ping: 60}),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
