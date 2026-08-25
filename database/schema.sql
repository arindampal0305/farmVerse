-- =====================================================
-- FarmVerse - Precision Agriculture Management Platform
-- Database Schema
-- Database: PostgreSQL
-- =====================================================

-- Users table with updated fields
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('FARMER', 'ADMIN', 'GUEST')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create farms table
CREATE TABLE farms (
    id BIGSERIAL PRIMARY KEY,
    farm_name VARCHAR(100) NOT NULL,
    farm_type VARCHAR(50) NOT NULL,
    area_sq_mt NUMERIC(10, 2) NOT NULL,
    soil_type VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    farmer_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create crops table
CREATE TABLE crops (
    id BIGSERIAL PRIMARY KEY,
    crop_name VARCHAR(100) NOT NULL,
    crop_type VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    sowing_date DATE NOT NULL,
    harvest_date DATE NOT NULL,
    farm_id BIGINT NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

-- Create conversation_messages table
CREATE TABLE conversation_messages (
    id BIG SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('USER', 'ASSISTANT')),
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
);