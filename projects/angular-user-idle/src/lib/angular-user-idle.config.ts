import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";

export class UserIdleConfig {
  /**
   * Idle value in seconds.
   */
  idle?: number;
  /**
   * Timeout value in seconds.
   */
  timeout?: number;
  /**
   * Ping value in seconds.
   */
  ping?: number;
  /**
   * IdleSensitivity time that activity must remain below the idle detection threshold before
   * idle buffer timer count user's activity actions, in seconds.
   */
  idleSensitivity?: number;
}

export function provideUserIdleConfig(config: UserIdleConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: UserIdleConfig, useValue: config },
  ])
}
