-- ==========================================
-- SCI Database Migrations
-- Phase 1: Extensions & Base Setup
-- ==========================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "moddatetime";

-- Setup for Vector extension if needed later for AI
-- CREATE EXTENSION IF NOT EXISTS "vector";

-- Update Timestamp function for triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
