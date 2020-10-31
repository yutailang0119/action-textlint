<a href="https://github.com/yutailang0119/action-textlint/actions"><img alt="action-textlint status" src="https://github.com/yutailang0119/action-textlint/workflows/build-test/badge.svg"></a>

# GitHub Action for textlint

This Action generates annotations from [textlint](https://textlint.github.io) Report JSON.

## Usage

An example workflow(.github/workflows/textlint.yml) to executing textlint follows:

```yml
name: textlint

on:
  pull_request:
    paths:
      - .github/workflows/textlint.yml
      - 'docs/**/*.md'

jobs:
  textlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - name: run textlint
        run: |
          ./node_modules/.bin/textlint 'docs/**/*.md' -f json -o textlint-report.json || true
      - uses: yutailang0119/action-textlint@main
        with:
          json_path: textlint-report.json
```

## Author

[Yutaro Muta](https://github.com/yutailang0119)

## References

- Generated from [actions/typescript-action](https://github.com/actions/typescript-action) as template.

## License

action-textlint is available under the MIT license. See [the LICENSE file](./LICENSE) for more info.
