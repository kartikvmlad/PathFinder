-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "savedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "academics" TEXT NOT NULL,
    "interests" TEXT NOT NULL,
    "personality" TEXT NOT NULL,
    "workPreferences" TEXT NOT NULL,
    "values" TEXT NOT NULL
);
