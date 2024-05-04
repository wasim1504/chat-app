-- 1. Create Database by below command

-- CREATE DATABASE chatapplication;

-- 2. Create table by below command

CREATE TABLE "messages" (
    id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);


