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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("address", "addressExtra", "country", "createdAt", "email", "emailMarketingAgreedAt", "id", "language", "maskedEmail", "name", "password", "phone", "phoneCertifiedAt", "phoneMarketingAgreedAt", "postalCode", "role", "updatedAt") SELECT "address", "addressExtra", "country", "createdAt", "email", "emailMarketingAgreedAt", "id", "language", "maskedEmail", "name", "password", "phone", "phoneCertifiedAt", "phoneMarketingAgreedAt", "postalCode", "role", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
