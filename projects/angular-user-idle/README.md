# angular-user-idle

Service for Angular 13+ to detect and control of user's idle.

[![npm version](https://badge.fury.io/js/angular-user-idle.svg)](https://badge.fury.io/js/angular-user-idle)

## Important
The library was written for my personal needs. So I distribute it "*as is*" without advanced supporting and change requesting.
If you like the library just use it if not then you're free to fork the repo and make what are you want.

### Demo
See [Demo app](https://rednez.github.io/angular-user-idle)

## Installation

`npm install angular-user-idle`

In app.module.ts:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UserIdleModule } from 'angular-user-idle';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    
    // Optionally you can set time for `idle`, `timeout` and `ping` in seconds.
    // Default values: `idle` is 600 (10 minutes), `timeout` is 300 (5 minutes) 
    // and `ping` is 120 (2 minutes).
    UserIdleModule.forRoot({idle: 600, timeout: 300, ping: 120})
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Usage

You should init user idle service in one of core component or service of your app,
for example login.component.ts:

```typescript
import { Component, OnInit } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';

@Component({
  templateUrl: './login.component.jade'
})
export class LoginComponent implements OnInit {

  readonly googlePlayLink: string;
  readonly appStoreLink: string;

  constructor(private userIdle: UserIdleService) {
  }

  ngOnInit() {
    //Start watching for user inactivity.
    this.userIdle.startWatching();
    
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => console.log('Time is up!'));
  }

  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }
}
```

##### About _ping_
Please note that ping is used if you want to perform some action periodically every _n_-minutes in lifecycle of timer
(from start timer to timeout).

For example, if you want to make a request to refresh token every 2 minutes you set ping to 120 and subscribe to ping's
observable like this:
```typescript
this.idle.ping$.subscribe(() => console.log("PING"));
```
The main schema will be as follow:

`|–– 2m (ping)––4m (ping) ––6m (ping)...-– 10m (user idle detected, start timer for 5 min) –- 12m (ping) –– 14m (ping) –– 15m (time is out)|`

If you don't use a ping just set ping to any value (not null) and just ignore it.

### API
`startWatching(): void;`

Start user idle service and configure it.

`onTimerStart(): Observable<number>`

Fired when timer is starting and return observable (stream) of timer's count.

`onTimeout(): Observable<boolean>;`

Fired when time is out and id user did not stop the timer.

`stopTimer()`

Stop timer.

`resetTimer()`

Reset timer after onTimeout() has been fired.

`stopWatching()`

Stop user idle service.

`setConfigValues({idle, timeout, ping})`

Set config values after module was initialized.

`setCustomActivityEvents(customEvents: Observable<any>): void`

Set custom activity events after module was initialized.

##### Service logic:
- User is inactive for 10 minutes
- `onTimerStart()` is fire and return countdown for 5 minutes
- If user did not stop timer by `stopTimer()` then time is up and `onTimeout()` is fire.
