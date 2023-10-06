PACKAGE_VERSION := $(shell jq -r .version package.json)

build:
	mage
	yarn build
	docker-compose build

start:
	docker-compose up

package:
	yarn install --pure-lockfile
	make build
	-rm -rf dorianrod-fetchmate-datasource
	mv dist/ dorianrod-fetchmate-datasource
	zip dorianrod-fetchmate-datasource-$(PACKAGE_VERSION).zip dorianrod-fetchmate-datasource -r
