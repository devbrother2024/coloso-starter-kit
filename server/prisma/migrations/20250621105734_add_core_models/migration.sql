/*
  Warnings:

  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "courses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "publicTitle" TEXT,
    "publicDescription" TEXT,
    "description" TEXT,
    "state" TEXT NOT NULL DEFAULT 'ONGOING',
    "slug" TEXT,
    "instructor" TEXT,
    "keywords" TEXT,
    "qualification" TEXT,
    "clipCount" INTEGER,
    "runningTime" INTEGER,
    "paidPeriod" TEXT,
    "openAt" DATETIME,
    "desktopCoverImage" TEXT,
    "mobileCoverImage" TEXT,
    "desktopCardAsset" TEXT,
    "coverVideo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" INTEGER,
    CONSTRAINT "courses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "publicTitle" TEXT,
    "subtitle" TEXT,
    "description" TEXT,
    "state" TEXT NOT NULL DEFAULT 'NORMAL',
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "listPrice" REAL NOT NULL,
    "salePrice" REAL NOT NULL,
    "discountAmount" REAL,
    "discountPercent" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "courseId" INTEGER,
    CONSTRAINT "products_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "state" TEXT NOT NULL DEFAULT 'PENDING',
    "listPrice" REAL NOT NULL,
    "salePrice" REAL NOT NULL,
    "discountPrice" REAL NOT NULL,
    "paymentMethod" TEXT,
    "paymentPg" TEXT,
    "paymentState" TEXT,
    "paymentAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "listPrice" REAL NOT NULL,
    "salePrice" REAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "voucher_templates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publicDescription" TEXT,
    "code" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "discountType" TEXT NOT NULL,
    "discountAmount" REAL,
    "discountRate" REAL,
    "maxDiscountAmount" REAL,
    "minPaymentAmount" REAL,
    "total" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "periodType" TEXT NOT NULL,
    "periodDuration" INTEGER,
    "periodBeginAt" DATETIME,
    "periodEndAt" DATETIME,
    "redeemBeginAt" DATETIME,
    "redeemEndAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "vouchers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "useBeginAt" DATETIME,
    "useEndAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "templateId" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "vouchers_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "voucher_templates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "vouchers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "voucher_usage_histories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voucherId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "voucher_usage_histories_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "vouchers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "voucher_usage_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "enrollments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "state" TEXT NOT NULL DEFAULT 'ONGOING',
    "periodBeginAt" DATETIME,
    "periodEndAt" DATETIME,
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "enrollments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "enrollments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "maskedEmail" TEXT,
    "phone" TEXT,
    "language" TEXT,
    "country" TEXT,
    "postalCode" TEXT,
    "address" TEXT,
    "addressExtra" TEXT,
    "phoneCertifiedAt" DATETIME,
    "emailMarketingAgreedAt" DATETIME,
    "phoneMarketingAgreedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("createdAt", "email", "id", "name", "updatedAt") SELECT "createdAt", "email", "id", "name", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "courses_slug_key" ON "courses"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "voucher_templates_code_key" ON "voucher_templates"("code");

-- CreateIndex
CREATE UNIQUE INDEX "voucher_usage_histories_voucherId_key" ON "voucher_usage_histories"("voucherId");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_userId_courseId_key" ON "enrollments"("userId", "courseId");
