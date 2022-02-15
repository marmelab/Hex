# Hex Web

## Requirements
- Nest js

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
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
