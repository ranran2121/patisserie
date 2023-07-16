-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_sweetId_fkey";

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_sweetId_fkey" FOREIGN KEY ("sweetId") REFERENCES "Sweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
