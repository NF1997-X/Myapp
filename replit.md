# Multi-App Launcher

## Overview

This is a full-stack TypeScript application that serves as a multi-app launcher with password protection. The system features a modern React frontend built with Vite and a Node.js/Express backend. The application includes a secure password entry system, loading states, and a dashboard for launching multiple sub-applications (Expired, Routes, Mapper, SMS, and Video apps).

The architecture follows a monorepo structure with shared TypeScript schemas and utilities, implementing a clean separation between client and server code while maintaining type safety throughout the stack.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **UI Components**: Built on Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming, supporting both light and dark modes
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and interactive animations
- **Form Handling**: React Hook Form with Zod validation schemas

The frontend implements a three-state application flow: password entry → loading screen → main dashboard. The password screen uses a custom numeric keypad interface, and the dashboard displays a grid of application launchers with animated interactions.

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Build System**: esbuild for production bundling, tsx for development
- **Development Setup**: Vite middleware integration for hot module replacement
- **API Structure**: RESTful API design with `/api` prefix routing
- **Error Handling**: Centralized error middleware with structured error responses
- **Request Logging**: Custom middleware for API request/response logging

The server uses a modular routing system with a storage abstraction layer currently implemented as in-memory storage, designed to be easily replaceable with a database implementation.

### Data Storage
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless adapter for cloud PostgreSQL
- **Type Safety**: Generated TypeScript types from database schema
- **Validation**: Zod schemas for runtime type checking and validation

The storage layer implements an interface-based design pattern, allowing for easy swapping between in-memory storage (development) and PostgreSQL (production).

### Development Workflow
- **Package Management**: npm with lockfile for dependency consistency
- **TypeScript**: Strict mode enabled with path mapping for clean imports
- **Code Organization**: Monorepo structure with shared utilities and schemas
- **Asset Handling**: Vite-based asset processing with alias support
- **Environment**: Environment variable configuration for database connections

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database queries and schema management
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI/UX Libraries
- **Radix UI**: Comprehensive set of accessible React components
- **shadcn/ui**: Pre-built component system built on Radix primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Framer Motion**: Animation library for smooth interactions
- **Lucide React**: Modern icon library for consistent iconography

### Development Tools
- **Vite**: Fast build tool with hot module replacement
- **TypeScript**: Static type checking and enhanced developer experience
- **Replit Integration**: Development environment optimizations and debugging tools
- **esbuild**: Fast JavaScript bundler for production builds

### State Management & Data Fetching
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Runtime type validation and schema definition

The application is designed to be easily deployable on Replit with integrated development tools and can scale to production environments with minimal configuration changes.