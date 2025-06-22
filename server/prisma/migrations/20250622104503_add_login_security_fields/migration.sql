-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "maskedEmail" TEXT,
    "phone" TEXT,
    "language" TEXT,
    "country" TEXT,
    "postalCode" TEXT,
    "address" TEXT,
    "addressExtra" TEXT,
    "metadata" TEXT,
    "phoneCertifiedAt" DATETIME,
    "emailMarketingAgreedAt" DATETIME,
    "phoneMarketingAgreedAt" DATETIME,
    "loginAttempts" INTEGER NOT NULL DEFAULT 0,
    "lockedUntil" DATETIME,
    "lastLoginAt" DATETIME,
    "lastFailedLoginAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("address", "addressExtra", "country", "createdAt", "email", "emailMarketingAgreedAt", "emailVerified", "id", "language", "maskedEmail", "metadata", "name", "password", "phone", "phoneCertifiedAt", "phoneMarketingAgreedAt", "postalCode", "role", "updatedAt", "username") SELECT "address", "addressExtra", "country", "createdAt", "email", "emailMarketingAgreedAt", "emailVerified", "id", "language", "maskedEmail", "metadata", "name", "password", "phone", "phoneCertifiedAt", "phoneMarketingAgreedAt", "postalCode", "role", "updatedAt", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
