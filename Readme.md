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
yarn start
```

#### From scratch with a specific board size
```sh
yarn start -s 9
```

#### From a config file
```sh
yarn start -f config.json
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
yarn dev

## typecheck && compile
yarn build

## format
yarn prettier --write .

## test
yarn test
```
