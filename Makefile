run:
	vendor/bin/sail up -d

stop:
	vendor/bin/sail down

migrate:
	vendor/bin/sail artisan migrate

composer:
	docker run --rm \
    		--volume ${CURDIR}:/app \
    		--volume ${HOME}/.config/composer:/tmp \
    		--volume /etc/passwd:/etc/passwd:ro \
    		--volume /etc/group:/etc/group:ro \
    		--user $(shell id -u):$(shell id -g) \
    		--interactive \
    		composer composer ${ARGS}
