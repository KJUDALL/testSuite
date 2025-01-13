import { defineConfig } from "cypress";

export default defineConfig({
	component: {
		devServer: {
			framework: "react",
			bundler: "vite",
		},
		specPattern: "**/*.cy.{js,jsx,ts,tsx}",
	},

	e2e: {
		baseUrl: "http://localhost:3001", // Add the baseUrl only here
		setupNodeEvents(on, config) {
			// Implement node event listeners here
		},
	},
});
