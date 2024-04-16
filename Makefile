.PHONY: deps
deps:
	yarn install

.PHONY: build
build:
	yarn tauri build

.PHONY: run
run:
	yarn tauri dev

.PHONY: clean
clean:
	rm -rf dist
	rm -rf src-tauri/target
	rm -rf node_modules
