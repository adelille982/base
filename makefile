# Répertoires
BACKEND_DIR=backend
FRONTEND_DIR=frontend

# Commandes
PHP=php
COMPOSER=composer
SYMFONY=$(PHP) $(BACKEND_DIR)/bin/console
NPM=npm --prefix $(FRONTEND_DIR)
NG=npx --prefix $(FRONTEND_DIR) ng

# Installation complète
install: install-backend install-frontend db migrations fixtures permissions cache

# Backend Symfony
install-backend:
	cd $(BACKEND_DIR) && $(COMPOSER) install

db:
	$(SYMFONY) doctrine:database:drop --if-exists --force
	$(SYMFONY) doctrine:database:create

migrations:
	$(SYMFONY) doctrine:migrations:migrate --no-interaction

fixtures:
	$(SYMFONY) doctrine:fixtures:load --no-interaction

# Permissions (Linux seulement)
permissions:
ifeq ($(OS),Windows_NT)
	@echo "⚠️  Permissions skipped on Windows (chmod non supporté)"
else
	chmod -R 775 $(BACKEND_DIR)/var
	chmod -R 775 $(BACKEND_DIR)/public/uploads
	chmod -R 775 $(BACKEND_DIR)/public/images
endif

# Cache
cache:
	$(SYMFONY) cache:clear
	$(SYMFONY) cache:warmup

# Frontend Angular
install-frontend:
	cd $(FRONTEND_DIR) && npm install && npx ng build

# Serveurs
serve-backend:
	cd $(BACKEND_DIR) && symfony server:start

serve-frontend:
	cd $(FRONTEND_DIR) && npx ng serve

# Reset DB & données
reset: db migrations fixtures

.PHONY: setup install-backend install-frontend db migrations fixtures permissions cache serve-backend serve-frontend reset
