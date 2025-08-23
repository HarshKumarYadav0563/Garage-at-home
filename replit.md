# Overview

Garageathome is a doorstep vehicle service platform that connects customers with professional mechanics for on-site bike and car maintenance and repair services. The application is built as a full-stack web platform with a React frontend and Express.js backend, focusing on simplicity and guest booking without requiring user accounts. The platform offers transparent pricing, real-time service tracking, and location-based mechanic matching to provide convenient vehicle servicing at customers' preferred locations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing with support for parameterized routes
- **Styling**: TailwindCSS with shadcn/ui component library for consistent, modern UI design
- **Animations**: Framer Motion for smooth page transitions and component animations
- **State Management**: Zustand for lightweight client-side state management, handling booking flow and UI state
- **Form Handling**: React Hook Form with Zod validation for robust form management and validation
- **Build Tool**: Vite for fast development builds and optimized production bundles

## Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Data Layer**: Drizzle ORM with PostgreSQL schema definitions for type-safe database interactions
- **Storage Strategy**: In-memory storage implementation for development with interfaces designed for easy database migration
- **API Design**: RESTful endpoints for services, mechanics search, lead management, and tracking
- **Development Server**: Hot module replacement with Vite middleware integration for seamless development experience

## Data Storage
- **Database**: PostgreSQL configured through Drizzle ORM with schema-first approach
- **Schema Design**: Normalized tables for services, mechanics, leads, and status updates with proper relationships
- **Development Mode**: In-memory storage using Maps for rapid prototyping and testing
- **Migration Strategy**: Drizzle Kit for database schema migrations and version control

## Core Features
- **Guest Booking Flow**: Multi-step booking process without user registration requirements
- **Location Services**: Geolocation API integration with Haversine distance calculations for mechanic matching
- **Service Tracking**: Real-time status updates with unique tracking IDs for order monitoring
- **Mechanic Ranking**: Algorithm-based mechanic selection considering distance, rating, experience, and availability
- **SEO Optimization**: City-specific landing pages with structured data for local search optimization

## API Structure
- **Services API**: GET endpoints for service listings and vehicle-type filtering
- **Mechanics API**: POST endpoint for location-based mechanic search with ranking algorithm
- **Leads API**: POST endpoint for booking creation and GET endpoints for tracking
- **Admin APIs**: Read-only endpoints for leads and mechanics management

## Business Logic
- **No Authentication**: Guest-only booking system for simplified user experience
- **Location-Based Matching**: Mechanics are filtered and ranked by proximity, rating, and availability
- **Time Slot Management**: 2-hour service windows with availability checking
- **Status Workflow**: Predefined status progression from pending to completed
- **Pricing Transparency**: Base service prices with additional charges for parts and materials

# External Dependencies

## UI and Styling
- **@radix-ui**: Comprehensive set of unstyled, accessible UI primitives for complex components
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **framer-motion**: Production-ready motion library for React animations and transitions
- **lucide-react**: Modern icon library with consistent design and tree-shaking support

## Data Management
- **@tanstack/react-query**: Powerful data synchronization library for server state management
- **drizzle-orm**: Type-safe ORM with excellent TypeScript integration and migration support
- **@neondatabase/serverless**: Serverless PostgreSQL driver optimized for edge environments
- **zod**: Schema validation library for runtime type checking and form validation

## Development Tools
- **vite**: Next-generation build tool for fast development and optimized production builds
- **typescript**: Static type checking for enhanced developer experience and code reliability
- **wouter**: Minimalist routing library as lightweight alternative to React Router

## Form Handling
- **react-hook-form**: Performant forms library with minimal re-renders and built-in validation
- **@hookform/resolvers**: Integration adapters for external validation libraries like Zod

## Utilities
- **date-fns**: Modern date utility library for time slot management and formatting
- **class-variance-authority**: Utility for creating type-safe component variants
- **clsx**: Utility for conditionally joining class names

## Geographic Services
- **Browser Geolocation API**: Native location detection for automatic address population
- **Haversine Formula**: Mathematical calculation for distance measurement between coordinates