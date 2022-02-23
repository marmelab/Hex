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
