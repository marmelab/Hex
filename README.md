# The Hex Game

Play the game of Hex (or Con-Tac-Tix) ([game presentation](<https://en.wikipedia.org/wiki/Hex_(board_game)>), [rules](https://www.hasbro.com/common/instruct/Con-Tac-Tix.PDF)).

This repo consists of 2 main parts:
- A web application, also hosting the API and a terminal-based version of the game - See the [README](web-app/README.md)
- A mobile application, client to the API - See the [README](mobile-app/README.md)

## Prerequisites
- Make
- Docker & Docker Compose

## Running the app

Configure the project for first launch

```bash
$ make init
```

Start the apps in dev mode (using docker-compose)

```bash
$ make start
```

Stop and remove the containers and volumes

```bash
$ make stop
```
