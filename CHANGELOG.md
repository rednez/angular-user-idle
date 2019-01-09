## Pending
- Code style
- Update Angular to 7 and packager
- Make timer more accurate
- Extend API by `setCustomActivityEvents(customEvents: Observable<any>)`

## 2.0.0
- Replace rollup by Angular CLI 6 bundling.
- Migrate to Angular 6 core anf RxJS 6.
- Extend API by method setConfigValues({idle, timeout, ping}).
- Add demo app. Check by [angular-user-idle.rednez.com](http://angular-user-idle.rednez.com).

**BREAKING CHANGES**: To use this library you need to upgrade your dependencies to Angular 6 and RxJS 6.

## 1.1.0
- Include ts-sources in _dist_ to fix crashing on AOT (close #2, #3). 
Thanks to [costaivo](https://github.com/costaivo).
- Update dependency of Angular to 5.x, RxJS to 5.5.8.

## 1.0.4
- Fix incorrect user's inactivity timer

## 1.0.3
- Update gitignore

## 1.0.2
- Add config option for idle, timeout and ping values

## 1.0.1
- Update README

## 1.0.0
- Init project
