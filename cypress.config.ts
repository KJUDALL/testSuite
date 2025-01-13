import { defineConfig } from "cypress";

export default defineConfig({
	component: {
		devServer: {
			framework: "react",
			bundler: "vite",
		},
		specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
	},

	e2e: {
		baseUrl: "http://localhost:3000", // Add the baseUrl only here
		setupNodeEvents(on, config) {
			// Implement node event listeners here
		},
	},
});
