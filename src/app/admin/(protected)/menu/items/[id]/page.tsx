import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMenuItems, getMenuSections } from "@/lib/menu";
import ItemForm from "../../ItemForm";

export const metadata: Metadata = { title: "Modifier l'item" };

export default async function EditItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const itemId = Number(id);
  const [items, sections] = await Promise.all([getMenuItems(), getMenuSections()]);
  const item = items.find((i) => i.id === itemId);

  if (!item) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl mb-10">{item.name}</h1>
      <ItemForm item={item} sections={sections} />
    </div>
  );
}
