# Hex Web

## Requirements
- Nest js
- PostgreSQL database, or Docker

## Installation

```bash
$ yarn
```

## Running the app

### Locally

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

#### Database configuration

Edit database connection params in `ormconfig.json` file.

### With Docker Compose

```bash
$ docker-compose up -d

# Or if you want to use the prod env
$ docker-compose -f deployment/docker-compose.prod.yaml up -d
```

#### Environment variables

You may edit the following environment variables in `.env.dev` or `.env.prod`:

| Variable           | Default value | Description                |
| :----------------- | :------------ | :------------------------- |
| `TYPEORM_HOST`     | `postgres`    | Postgres server hostname   |
| `TYPEORM_PORT`     | `5432`        | Postgres server port       |
| `TYPEORM_USERNAME` | `postgres`    | Postgres database username |
| `TYPEORM_PASSWORD` | `postgres`    | Postgres database password |
| `TYPEORM_DATABASE` | `test`        | Postgres database name     |

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Database operations

You can run TypeORM operations using this syntax

```bash
# exemple with schema:sync
$ yarn typeorm schema:sync
```

# Hex Console

Play the game of Hex (or Con-Tac-Tix) on the console ([game presentation](<https://en.wikipedia.org/wiki/Hex_(board_game)>), [rules](https://www.hasbro.com/common/instruct/Con-Tac-Tix.PDF)).

## Requirements

- Node.js

## Installation

```sh
yarn
```

### Playing

#### From scratch
```sh
yarn start:cli
```

#### From scratch with a specific board size
```sh
yarn start:cli -s 9
```

#### From a config file
```sh
yarn start:cli -f config.json
```

With config.json at the root of the project.
Example of content :
```
[
    [
        {
            "value": 1
        },
        {
            "value": null
        }
    ],
    [
        {
            "value": null
        },
        {
            "value": 2
        }
    ]
]
```

### Developing

```sh
## Re-run the script on change
yarn dev:cli

## typecheck && compile
yarn build

## format
yarn format

## test
yarn test
```
