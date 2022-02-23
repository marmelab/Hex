# The Hex Game

Play the game of Hex (or Con-Tac-Tix) ([game presentation](<https://en.wikipedia.org/wiki/Hex_(board_game)>), [rules](https://www.hasbro.com/common/instruct/Con-Tac-Tix.PDF)).

This repo consists of 2 main parts:
- A web application, also hosting the API and a terminal-based version of the game - See the [README](web-app/README.md)
- A mobile application, client to the API - See the [README](mobile-app/README.md)

## Running the app

### With Docker Compose

```bash
$ docker-compose -f docker-compose.base.yaml -f docker-compose.dev.yaml up -d

# Or if you want to use the prod env
$ docker-compose -f docker-compose.base.yaml -f docker-compose.prod.yaml up -d
```
