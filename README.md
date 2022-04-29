## quizme
A CLI to help you test your knowledge.

### Usage

```sh
quizme
```

```sh
quizme --add
```

## TODO

- [x] Setup project and look at process.argv
- [x] Choose library to use for argument parsing/UI
	- [x] Inquirer
	- [ ] Commander
	- [ ] Caporal
	- [ ] yargs
- [x] Check for `--add` flag
	- [x] Prompt for question
	- [x] Prompt for answer
	- [x] Persist to storage with `created` set to now,  `lastAnswer` and `lastAsked` set to `null`
- [x] Without flag
	- [x] Select random question where lastAnswer is null or false
		- [x] If none available select another random question
	- [x] Ask question and evaluate answer
	- [x] Update the lastAnswer correct field
	- [x] Update the lastAsked data
- [x] #! that thing
- [ ] Got more time?
	- [ ] Other storage options
	- [ ] Ask questions lastAsked more than 2 weeks ago, etc
	- [ ] 