
-- 1. Create Database by below command

-- CREATE DATABASE chatapplication;

-- 2. Create table by below command
  CREATE TABLE "Users" (
    id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT Users_email_key UNIQUE (email),
    CONSTRAINT Users_username_key UNIQUE (username)
);