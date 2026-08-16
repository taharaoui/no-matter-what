"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createItemAction, updateItemAction } from "@/lib/menu/actions";
import type { MenuItemRow, MenuSectionRow } from "@/lib/menu";
import Field from "@/components/admin/Field";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { buttonClass, buttonGhostClass, inputClass } from "@/components/admin/formStyles";

const schema = z.object({
  sectionId: z.string().min(1, "Requis"),
  name: z.string().min(1, "Requis"),
  description: z.string(),
  price: z.string(),
  note: z.string(),
  image: z.string(),
  tags: z.string(),
  sortOrder: z.string().regex(/^-?\d+$/, "Doit être un nombre entier"),
});

type FormValues = z.infer<typeof schema>;

function toFormValues(item?: MenuItemRow, defaultSectionId?: string): FormValues {
  return {
    sectionId: item?.section_id ?? defaultSectionId ?? "",
    name: item?.name ?? "",
    description: item?.description ?? "",
    price: item?.price ?? "",
    note: item?.note ?? "",
    image: item?.image ?? "",
    tags: item?.tags?.join(", ") ?? "",
    sortOrder: String(item?.sort_order ?? 0),
  };
}

type ItemFormProps = {
  item?: MenuItemRow;
  sections: MenuSectionRow[];
  defaultSectionId?: string;
};

export default function ItemForm({ item, sections, defaultSectionId }: ItemFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const isEditing = Boolean(item);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: toFormValues(item, defaultSectionId),
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const input = {
      section_id: values.sectionId,
      name: values.name,
      description: values.description || null,
      price: values.price || null,
      note: values.note || null,
      image: values.image || null,
      tags: values.tags
        ? values.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : null,
      sort_order: Number(values.sortOrder),
    };
    const result = isEditing
      ? await updateItemAction(item!.id, input)
      : await createItemAction(input);

    if (result.error) {
      setServerError(result.error);
      return;
    }
    router.push("/admin/menu");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 max-w-xl">
      <Field label="Section" htmlFor="sectionId" error={errors.sectionId?.message}>
        <select id="sectionId" className={inputClass} {...register("sectionId")}>
          <option value="">— Choisir —</option>
          {sections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Nom" htmlFor="name" error={errors.name?.message}>
        <input id="name" className={inputClass} {...register("name")} />
      </Field>

      <Field label="Description (optionnel)" htmlFor="description">
        <textarea
          id="description"
          rows={2}
          className={`${inputClass} resize-none`}
          {...register("description")}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Prix (optionnel)" htmlFor="price">
          <input id="price" className={inputClass} {...register("price")} />
        </Field>
        <Field label="Note (optionnel)" htmlFor="note" error={errors.note?.message}>
          <input
            id="note"
            className={inputClass}
            placeholder="ex: allergènes, format"
            {...register("note")}
          />
        </Field>
      </div>

      <Field label="Étiquettes (séparées par des virgules)" htmlFor="tags">
        <input
          id="tags"
          className={inputClass}
          placeholder="ex: signature, végane"
          {...register("tags")}
        />
      </Field>

      <ImageUploadField
        label="Photo (optionnel)"
        value={watch("image")}
        onChange={(url) => setValue("image", url, { shouldDirty: true })}
        pathPrefix="menu"
      />

      <Field label="Ordre" htmlFor="sortOrder">
        <input id="sortOrder" type="number" className={inputClass} {...register("sortOrder")} />
      </Field>

      {serverError && <p className="text-[0.9rem] text-red-700">{serverError}</p>}

      <div className="flex items-center gap-6">
        <button type="submit" disabled={isSubmitting} className={buttonClass}>
          {isSubmitting ? "Enregistrement…" : isEditing ? "Enregistrer" : "Créer l'item"}
        </button>
        <button type="button" onClick={() => router.push("/admin/menu")} className={buttonGhostClass}>
          Annuler
        </button>
      </div>
    </form>
  );
}
