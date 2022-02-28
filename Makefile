init:
	@cp ./web-app/.env.dist ./web-app/.env
	@cp ./.docker/pgadmin/.env.pgadmin.dist ./.docker/pgadmin/.env.pgadmin
	@cp ./.docker/db/.env.db.dist ./.docker/db/.env.db
	@echo "init complete"

start:
	docker-compose -f docker-compose.base.yaml -f docker-compose.dev.yaml up -d --build

stop:
	docker-compose -f docker-compose.base.yaml -f docker-compose.dev.yaml down --v
