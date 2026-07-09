-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "programSlug" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "location" TEXT,
    "needsConfirmation" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "jp" INTEGER,
    "durationDays" INTEGER NOT NULL,
    "basePrice" INTEGER,
    "excerpt" TEXT NOT NULL,
    "description" JSONB NOT NULL DEFAULT '[]',
    "careerNote" TEXT NOT NULL DEFAULT '',
    "audience" JSONB NOT NULL DEFAULT '[]',
    "syllabus" JSONB NOT NULL DEFAULT '[]',
    "benefits" JSONB NOT NULL DEFAULT '[]',
    "faqs" JSONB NOT NULL DEFAULT '[]',
    "keywords" JSONB NOT NULL DEFAULT '[]',
    "seoTitle" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "related" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("slug")
);

-- CreateIndex
CREATE INDEX "Batch_programSlug_idx" ON "Batch"("programSlug");
