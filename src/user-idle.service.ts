import { Injectable, Optional } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { UserIdleServiceConfig } from './user-idle.config';

/**
 * User's idle service.
 */
@Injectable()
export class UserIdleService {
  ping$: Observable<any>;
  private timerStart$ = new Subject<boolean>();
  private timeout$ = new Subject<boolean>();
  private idle$: Observable<any>;
  private timer$: Observable<any>;
  /**
   * Idle value in seconds.
   * Default equals to 10 minutes.
   */
  private idle: number = 600;
  /**
   * Timeout value in seconds.
   * Default equals to 5 minutes.
   */
  private timeout: number = 300;
  /**
   * Ping value in seconds.
   */
  private ping: number = 120;
  /**
   * Interrupt timer by user's events.
   */
  private interrupting: boolean;
  /**
   * Timeout status.
   */
  private isTimeout: boolean;

  private idleSubscription: Subscription;

  constructor(@Optional() config: UserIdleServiceConfig) {
    if (config) {
      this.idle = config.idle;
      this.timeout = config.timeout;
      this.ping = config.ping;
    }

    this.idle$ = Observable.merge(
      Observable.fromEvent(window, 'mousemove'),
      Observable.fromEvent(window, 'resize'),
      Observable.fromEvent(document, 'keydown'));
  }

  /**
   * Start watching for user idle and setup timer and ping.
   */
  startWatching() {
    /**
     * If any of user events is not active for idle-seconds when start timer.
     * If this.interrupts is sets to true the timer will be stopped if user
     * does any event (mousemove, resize or keydown).
     * @type {Subscription}
     */
    this.idleSubscription = this.idle$
      .map(() => {
        if (this.interrupting) {
          this.timerStart$.next(false);
        }
      })
      .bufferTime(this.idle * 1000)
      .filter(arr => !arr.length)
      .map(() => this.timerStart$.next(true))
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
   * @return {Observable<number>}
   */
  onTimerStart(): Observable<number> {
    return this.timerStart$
      .distinctUntilChanged()
      .switchMap(start => start ? this.timer$ : Observable.of(null));
  }

  /**
   * Return observable for timeout is fired.
   * @return {Observable<boolean>}
   */
  onTimeout(): Observable<boolean> {
    return this.timeout$
      .filter(timeout => !!timeout)
      .map(() => {
        this.isTimeout = true;
        return true;
      });
  }

  getConfigValue(): UserIdleServiceConfig {
    return {
      idle: this.idle,
      timeout: this.timeout,
      ping: this.ping
    };
  }

  /**
   * Setup timer.
   *
   * Counts every seconds and return n+1 and fire timeout for last count.
   * @param timeout Timeout in seconds.
   */
  private setupTimer(timeout: number) {
    this.timer$ = Observable.interval(1000)
      .take(timeout)
      .map(() => 1)
      .scan((acc, n) => acc + n)
      .map(count => {
        if (count === timeout) {
          this.timeout$.next(true);
        }
        return count;
      });
  }

  /**
   * Setup ping.
   *
   * Pings every ping-seconds only if is not timeout.
   * @param {number} ping
   */
  private setupPing(ping: number) {
    this.ping$ = Observable.interval(ping * 1000).filter(() => !this.isTimeout);
  }
}
