NODE_ENV ?= development

dev: export SECURE_PORT=444
dev: export NODE_ENV=development
dev: export DEFAULT_TIMEOUT=10000
dev: export PROXY_SERVER=http://localhost:3000
dev: export LOG_LEVEL=info
dev: export UV_THREADPOOL_SIZE=128
dev:
	node bin/dev.js

mock_production:
	NODE_ENV=production MOCK_PRODUCTION=true AA_DJANGO_SERVER=https://www.appannie.com  docker-compose run --service-ports next_dev
