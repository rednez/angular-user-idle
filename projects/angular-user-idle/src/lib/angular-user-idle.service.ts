import { Injectable, Optional } from '@angular/core';
import {
  Observable,
  Subject,
  Subscription,
  merge,
  fromEvent,
  from,
  interval,
  timer,
  of
} from 'rxjs';
import {
  bufferTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  scan,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';
import { UserIdleConfig } from './angular-user-idle.config';

/**
 * User's idle service.
 */
@Injectable({
  providedIn: 'root'
})
export class UserIdleService {
  ping$: Observable<any>;

  /**
   * Events that can interrupts user's inactivity timer.
   */
  protected activityEvents$: Observable<any>;

  protected timerStart$ = new Subject<boolean>();
  protected timeout$ = new Subject<boolean>();
  protected idle$: Observable<any>;
  protected timer$: Observable<any>;
  /**
   * Idle value in seconds.
   * Default equals to 10 minutes.
   */
  protected idle = 600;
  /**
   * Timeout value in seconds.
   * Default equals to 5 minutes.
   */
  protected timeout = 300;
  /**
   * Ping value in seconds.
   * * Default equals to 2 minutes.
   */
  protected ping = 120;
  /**
   * Timeout status.
   */
  protected isTimeout: boolean;
  /**
   * Timer of user's inactivity is in progress.
   */
  protected isInactivityTimer: boolean;

  protected idleSubscription: Subscription;

  constructor(@Optional() config: UserIdleConfig) {
    if (config) {
      this.idle = config.idle;
      this.timeout = config.timeout;
      this.ping = config.ping;
    }

    this.activityEvents$ = merge(
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'resize'),
      fromEvent(document, 'keydown')
    );

    this.idle$ = from(this.activityEvents$);
  }

  /**
   * Start watching for user idle and setup timer and ping.
   */
  startWatching() {
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }

    // If any of user events is not active for idle-seconds when start timer.
    this.idleSubscription = this.idle$
      .pipe(
        bufferTime(5000), // Starting point of detecting of user's inactivity
        filter(arr => !arr.length && !this.isInactivityTimer),
        tap(() => this.isInactivityTimer = true),
        switchMap(() => interval(1000).pipe(
          takeUntil(
            merge(
              this.activityEvents$,
              timer(this.idle * 1000).pipe(
                tap(() => this.timerStart$.next(true))
              )
            )
          ),
          finalize(() => (this.isInactivityTimer = false))
          )
        )
      )
      .subscribe();

    this.setupTimer(this.timeout);
    this.setupPing(this.ping);
  }

  stopWatching() {
    this.stopTimer();
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
  }

  stopTimer() {
    this.timerStart$.next(false);
  }

  resetTimer() {
    this.stopTimer();
    this.isTimeout = false;
  }

  /**
   * Return observable for timer's countdown number that emits after idle.
   */
  onTimerStart(): Observable<number> {
    return this.timerStart$.pipe(
      distinctUntilChanged(),
      switchMap(start => (start ? this.timer$ : of(null)))
    );
  }

  /**
   * Return observable for timeout is fired.
   */
  onTimeout(): Observable<boolean> {
    return this.timeout$.pipe(
      filter(timeout => !!timeout),
      tap(() => this.isTimeout = true),
      map(() => true)
    );
  }

  getConfigValue(): UserIdleConfig {
    return {
      idle: this.idle,
      timeout: this.timeout,
      ping: this.ping
    };
  }

  /**
   * Set config values.
   * @param config
   */
  setConfigValues(config: UserIdleConfig) {
    if (this.idleSubscription && !this.idleSubscription.closed) {
      console.error('Call stopWatching() before set config values');
      return;
    }

    if (config.idle) {
      this.idle = config.idle;
    }
    if (config.ping) {
      this.ping = config.ping;
    }
    if (config.timeout) {
      this.timeout = config.timeout;
    }
  }

  /**
   * Setup timer.
   *
   * Counts every seconds and return n+1 and fire timeout for last count.
   * @param timeout Timeout in seconds.
   */
  protected setupTimer(timeout: number) {
    this.timer$ = interval(1000).pipe(
      take(timeout),
      map(() => 1),
      scan((acc, n) => acc + n),
      tap(count => {
        if (count === timeout) {
          this.timeout$.next(true);
        }
      })
    );
  }

  /**
   * Setup ping.
   *
   * Pings every ping-seconds only if is not timeout.
   * @param ping
   */
  protected setupPing(ping: number) {
    this.ping$ = interval(ping * 1000).pipe(
      filter(() => !this.isTimeout)
    );
  }
}
