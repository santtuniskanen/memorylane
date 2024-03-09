.PHONY: frontend backend

frontend:
	cd frontend && bun run dev &

backend: 
	cd backend && bun server.ts &

run: frontend backend
	@echo "Frontend and backend are running..."

stop: 
	pkill -f "bun run dev"
	pkill -f "bun server.ts"
