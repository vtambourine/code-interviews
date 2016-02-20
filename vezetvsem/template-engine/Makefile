NODE_BIN := ./node_modules/.bin
BABEL :=  $(NODE_BIN)/babel
MOCHA := $(NODE_BIN)/mocha
JSCS := $(NODE_BIN)/jscs

.PHONY: all
all: build

.PHONY: build
build: clean
	@$(BABEL) src --out-dir build --modules common

.PHONY: lint
lint:
	@$(JSCS) src/

.PHONY: tests
tests:
	@$(MOCHA)

.PHONY: tests-watch
tests-watch:
	@$(MOCHA) --watch

.PHONY: clean
clean:
	@rm -fr build/*
