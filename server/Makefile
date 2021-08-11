.ONESHELL:

.PHONY: clean install tests run all

clean:
	find . -type f -name '*.pyc' -delete
	find . -type f -name '*.log' -delete

install:
	pipenv install;

test:
	pipenv run python manage.py test;

run:
	pipenv run python manage.py run;

all: clean install tests run