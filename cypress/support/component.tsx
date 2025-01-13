// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
// ***********************************************************

import './commands';
import React from 'react';
import { mount, MountOptions, MountReturn } from 'cypress/react18';
import { MemoryRouterProps, MemoryRouter } from 'react-router-dom';

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable<T = any> { // Update the type definition to make it generic
      mount(
        component: React.ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps }
      ): Cypress.Chainable<T>; // Fix the type parameter
    }
  }
}

// Custom `mount` command
const customMount = (
  component: React.ReactNode,
  options: { routerProps?: MemoryRouterProps } = {}
): Cypress.Chainable<MountReturn> => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options;

  const wrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>;

  try {
    return mount(wrapped, mountOptions);
  } catch (error) {
    console.error('Error mounting component:', error);
    throw error;
  }
};

// Add the custom `mount` command to Cypress
Cypress.Commands.add('mount', customMount as Cypress.CommandFn);