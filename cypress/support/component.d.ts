import './commands';
import React from 'react';
import { MountOptions } from 'cypress/react18';
import { MemoryRouterProps } from 'react-router-dom';
declare global {
    namespace Cypress {
        interface Chainable<T = any> {
            mount(component: React.ReactNode, options?: MountOptions & {
                routerProps?: MemoryRouterProps;
            }): Cypress.Chainable<T>;
        }
    }
}
