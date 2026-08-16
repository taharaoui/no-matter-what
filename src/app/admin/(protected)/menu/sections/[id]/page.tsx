import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMenuSections } from "@/lib/menu";
import SectionForm from "../../SectionForm";

export const metadata: Metadata = { title: "Modifier la section" };

export default async function EditSectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sections = await getMenuSections();
  const section = sections.find((s) => s.id === id);

  if (!section) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl mb-10">{section.title}</h1>
      <SectionForm section={section} />
    </div>
  );
}
