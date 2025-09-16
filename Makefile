SHELL := /bin/sh

up:
	docker-compose up -d --build

down:
	docker-compose down

logs:
	docker-compose logs -f | cat

backend-shell:
	docker-compose exec backend sh

frontend-shell:
	docker-compose exec frontend sh

mysql-shell:
	docker-compose exec mysql bash -lc "mysql -u$$DB_USER -p$$DB_PASSWORD $$DB_NAME"

migrate:
	docker-compose exec backend node src/scripts/migrate.js || true

seed:
	docker-compose exec backend node src/scripts/seed.js || true

test-backend:
	docker-compose exec backend npm test -- --colors | cat

build-frontend:
	docker-compose exec frontend npm run build
