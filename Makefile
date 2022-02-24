init:
	@cp ./web-app/.env.dev.dist ./web-app/.env.dev
	@cp ./.docker/pgadmin/.env.dev.pgadmin.dist ./.docker/pgadmin/.env.dev.pgadmin
	@cp ./.docker/db/.env.db.dev.dist ./.docker/db/.env.db.dev
	@echo "init complete"

start:
	docker-compose -f docker-compose.base.yaml -f docker-compose.dev.yaml up -d --build