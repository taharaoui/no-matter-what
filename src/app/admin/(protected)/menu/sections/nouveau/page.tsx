import type { Metadata } from "next";
import SectionForm from "../../SectionForm";

export const metadata: Metadata = { title: "Nouvelle section" };

export default function NewSectionPage() {
  return (
    <div>
      <h1 className="font-display text-3xl mb-10">Nouvelle section</h1>
      <SectionForm />
    </div>
  );
}
