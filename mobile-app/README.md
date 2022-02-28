# Hex Mobile

## Requirements
- Expo

## Installation

```bash
$ yarn
```

## Environment variables

This project uses [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv) to handle its environment variables. To configure this app, you need to create a `/mobile-app/.env` file containing the following variables.

| Variable           | Example value              | Description                |
| :----------------- | :------------------------- | :------------------------- |
| `HEX_API_URL`      | `http://myhostname/api`    | Base URL to the Hex API    |

## Running the app

### Locally

```bash
# rendered on the web
$ expo start --web

# rendered on android(emulator needed https://docs.expo.dev/workflow/android-studio-emulator/)
$ expo start --android
```

## Building the app

### Prerequisite

Install the [expo-cli](https://docs.expo.dev/classic/building-standalone-apps/#1-install-expo-cli) (`yarn global add expo-cli`).

### Android build

You can package this app into an APK with the following command

```
$ expo build:android -t apk
```

### iOS build

TODO

