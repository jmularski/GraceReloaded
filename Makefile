up:
	docker-compose -f docker-compose.yml up

upd:
	docker-compose -f docker-compose.yml up -d

up-recreate:
	docker-compose -f docker-compose.yml up --build --force-recreate

upd-recreate:
	docker-compose -f docker-compose.yml up -d --build --force-recreate

down:
	docker-compose down --remove-orphans

stats:
	docker container stats

build:
	docker-compose build