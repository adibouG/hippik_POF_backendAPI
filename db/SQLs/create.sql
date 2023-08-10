CREATE TABLE "accounts" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"email"	TEXT NOT NULL UNIQUE,
	"created"	NUMERIC NOT NULL,
	"modified"	NUMERIC NOT NULL,
	"status"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
)

CREATE TABLE "contests" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"location"	TEXT,
	"startdate"	NUMERIC NOT NULL,
	"enddate"	NUMERIC,
	"created"	NUMERIC NOT NULL,
	"modified"	NUMERIC NOT NULL,
	"status"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
)

CREATE TABLE "trials" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT,
	"contest"	INTEGER NOT NULL,
	"desc"	TEXT,
	"type"	INTEGER NOT NULL,
	"startdate"	NUMERIC,
	"enddate"	NUMERIC,
	"location"	TEXT,
	"status"	INTEGER,
	"createddate"	NUMERIC,
	"modifieddate"	NUMERIC,
	"createdBy"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
)

CREATE TABLE "contest_participants" (
	"id"	INTEGER NOT NULL UNIQUE,
	"contest"	INTEGER NOT NULL,
	"participant"	INTEGER NOT NULL,
	"created"	NUMERIC,
	"modified"	NUMERIC,
	"status"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
)

CREATE TABLE "trial_participants" (
	"id"	INTEGER NOT NULL UNIQUE,
	"trial"	INTEGER NOT NULL,
	"participant"	INTEGER NOT NULL,
	"created"	NUMERIC,
	"modified"	NUMERIC,
	"status"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
)