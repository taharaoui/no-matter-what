import type { Metadata } from "next";
import { getMenuSections } from "@/lib/menu";
import ItemForm from "../../ItemForm";

export const metadata: Metadata = { title: "Nouvel item" };

export default async function NewItemPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const [{ section }, sections] = await Promise.all([searchParams, getMenuSections()]);

  return (
    <div>
      <h1 className="font-display text-3xl mb-10">Nouvel item</h1>
      <ItemForm sections={sections} defaultSectionId={section} />
    </div>
  );
}
