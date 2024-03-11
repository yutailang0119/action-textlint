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
      - uses: actions/checkout@v3
      - run: npm install
      - name: run textlint
        id: run-textlint
        run: |
          echo "TEXTLINT_OUTPUT=$(./node_modules/.bin/textlint 'docs/**/*.md' -f json || true)" >> $GITHUB_OUTPUT
      - uses: yutailang0119/action-textlint@v3
        with:
          textlint-output: ${{ steps.run-textlint.outputs.TEXTLINT_OUTPUT }}
          ignore-warnings: true # Ignore Lint Warnings
        continue-on-error: false # If annotations contain error of severity, action-textlint exit 1.
```

## Author

[Yutaro Muta](https://github.com/yutailang0119)

## References

- Generated from [actions/typescript-action](https://github.com/actions/typescript-action) as template.

## License

action-textlint is available under the MIT license. See [the LICENSE file](./LICENSE) for more info.
