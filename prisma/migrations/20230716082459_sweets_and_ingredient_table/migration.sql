-- CreateTable
CREATE TABLE "Sweet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "madeAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sweetId" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_sweetId_fkey" FOREIGN KEY ("sweetId") REFERENCES "Sweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
