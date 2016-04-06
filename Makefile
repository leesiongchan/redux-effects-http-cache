#
# Vars
#

BIN = ./node_modules/.bin
.DEFAULT_GOAL := all

#
# Tasks
#

node_modules: package.json
	@npm install
	@touch node_modules

test: node_modules
	${BIN}/babel-tape-runner test/*.js

validate: node_modules

all: validate test

#
# Phony
#

.PHONY: test validate
