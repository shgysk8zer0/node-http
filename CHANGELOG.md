# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v1.0.5] - 2023-10-01

### Fixed
- Fixed `exports`

## [v1.0.4] - 2023-10-01

### Changed
- Update `@shgysk8zer0/consts`
- Mark all used `@shgysk8zer0/consts` as external

## [v1.0.3] - 2023-09-29

### Added
- Add `HTTPError.toResponse()` method
- Add functions to get status codes and file/mime types

### Changed
- Update `@shgysk8zer0/consts`

## [v1.0.2] - 2023-09-25

### Added
- Install and use `@shgysk8zer0/consts`
- Export all modules as CommonJS in `/cjs/`

### Fixed
- Fix `imports` in `package.json` to work with `@shgysk8zer0/http/module` as well as `@shgysk8zer0/http/module.js`

## [v1.0.1] - 2023-09-24

### Deprecated
-  Deprecated `parseMultipartFormData()` due to [ReDoS  issue](https://github.com/shgysk8zer0/node-http/issues/2)

## [v1.0.0] - 2023-09-22

Initial Release
