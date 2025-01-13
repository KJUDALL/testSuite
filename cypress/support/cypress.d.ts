/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable<Subject = any> {
		mount(method: string, url: string, response: any): Chainable<null>;
	}
}

interface MountOptions {
	routerProps?: {
		initialEntries?: string[];
	};
	[key: string]: any;
}
