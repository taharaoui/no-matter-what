"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPieceAction, updatePieceAction } from "@/lib/gallery/actions";
import type { PieceRow } from "@/lib/gallery";
import Field from "@/components/admin/Field";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { buttonClass, buttonGhostClass, inputClass } from "@/components/admin/formStyles";

const TONES = ["ink", "grey900", "grey700", "grey500", "grey300", "grey100", "paper"] as const;
const FORMATS = ["portrait", "square", "landscape"] as const;

const schema = z.object({
  slug: z
    .string()
    .min(1, "Requis")
    .regex(/^[a-z0-9-]+$/, "Minuscules, chiffres et tirets seulement"),
  title: z.string().min(1, "Requis"),
  artistSlug: z.string().min(1, "Requis"),
  year: z.string(),
  medium: z.string().min(1, "Requis"),
  dimensions: z.string().min(1, "Requis"),
  edition: z.string(),
  price: z.string(),
  sold: z.boolean(),
  label: z.string().min(1, "Requis"),
  note: z.string(),
  imageSrc: z.string(),
  imageAlt: z.string(),
  tone: z.enum(TONES),
  format: z.enum(FORMATS),
  featured: z.boolean(),
  sortOrder: z.string().regex(/^-?\d+$/, "Doit être un nombre entier"),
});

type FormValues = z.infer<typeof schema>;

function toFormValues(piece?: PieceRow): FormValues {
  return {
    slug: piece?.slug ?? "",
    title: piece?.title ?? "",
    artistSlug: piece?.artist_slug ?? "",
    year: piece?.year ?? "",
    medium: piece?.medium ?? "",
    dimensions: piece?.dimensions ?? "",
    edition: piece?.edition ?? "",
    price: piece?.price ?? "",
    sold: piece?.sold ?? false,
    label: piece?.label ?? "",
    note: piece?.note ?? "",
    imageSrc: piece?.image_src ?? "",
    imageAlt: piece?.image_alt ?? "",
    tone: (piece?.tone as (typeof TONES)[number]) ?? "grey100",
    format: (piece?.format as (typeof FORMATS)[number]) ?? "portrait",
    featured: piece?.featured ?? false,
    sortOrder: String(piece?.sort_order ?? 0),
  };
}

function toPieceInput(values: FormValues): PieceRow {
  return {
    slug: values.slug,
    title: values.title,
    artist_slug: values.artistSlug,
    year: values.year || null,
    medium: values.medium,
    dimensions: values.dimensions,
    edition: values.edition || null,
    price: values.price || null,
    sold: values.sold,
    label: values.label,
    note: values.note || null,
    image_src: values.imageSrc || null,
    image_alt: values.imageAlt || null,
    tone: values.tone,
    format: values.format,
    featured: values.featured,
    sort_order: Number(values.sortOrder),
  };
}

type PieceFormProps = {
  piece?: PieceRow;
  /** Only slug/name are used here — accepts either the raw row or the
   *  public Artist shape, so callers don't need an admin-specific read. */
  artists: { slug: string; name: string }[];
};

export default function PieceForm({ piece, artists }: PieceFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const isEditing = Boolean(piece);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: toFormValues(piece),
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const input = toPieceInput(values);
    const result = isEditing
      ? await updatePieceAction(piece!.slug, input)
      : await createPieceAction(input);

    if (result.error) {
      setServerError(result.error);
      return;
    }
    router.push("/admin/galerie");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Titre" htmlFor="title" error={errors.title?.message}>
          <input id="title" className={inputClass} {...register("title")} />
        </Field>

        <Field label="Identifiant (slug)" htmlFor="slug" error={errors.slug?.message}>
          <input
            id="slug"
            className={inputClass}
            disabled={isEditing}
            {...register("slug")}
          />
        </Field>
      </div>

      <Field label="Artiste" htmlFor="artistSlug" error={errors.artistSlug?.message}>
        <select id="artistSlug" className={inputClass} {...register("artistSlug")}>
          <option value="">— Choisir —</option>
          {artists.map((artist) => (
            <option key={artist.slug} value={artist.slug}>
              {artist.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid sm:grid-cols-3 gap-6">
        <Field label="Année" htmlFor="year">
          <input id="year" className={inputClass} {...register("year")} />
        </Field>
        <Field label="Médium" htmlFor="medium" error={errors.medium?.message}>
          <input id="medium" className={inputClass} {...register("medium")} />
        </Field>
        <Field label="Dimensions" htmlFor="dimensions" error={errors.dimensions?.message}>
          <input id="dimensions" className={inputClass} {...register("dimensions")} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Édition" htmlFor="edition">
          <input id="edition" className={inputClass} {...register("edition")} />
        </Field>
        <Field label="Prix / disponibilité" htmlFor="price">
          <input
            id="price"
            className={inputClass}
            placeholder="ex: 450 $ ou Disponible — prix au comptoir"
            {...register("price")}
          />
        </Field>
      </div>

      <Field label="Texte du cartel (label)" htmlFor="label" error={errors.label?.message}>
        <textarea id="label" rows={3} className={`${inputClass} resize-none`} {...register("label")} />
      </Field>

      <Field label="Note (texte long, page de l'œuvre)" htmlFor="note">
        <textarea id="note" rows={4} className={`${inputClass} resize-none`} {...register("note")} />
      </Field>

      <ImageUploadField
        label="Photo de l'œuvre"
        value={watch("imageSrc")}
        onChange={(url) => setValue("imageSrc", url, { shouldDirty: true })}
        pathPrefix="gallery"
      />

      <Field label="Texte alternatif de l'image" htmlFor="imageAlt">
        <input id="imageAlt" className={inputClass} {...register("imageAlt")} />
      </Field>

      <div className="grid sm:grid-cols-3 gap-6">
        <Field label="Format" htmlFor="format">
          <select id="format" className={inputClass} {...register("format")}>
            {FORMATS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Teinte de repli (sans photo)" htmlFor="tone">
          <select id="tone" className={inputClass} {...register("tone")}>
            {TONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Ordre" htmlFor="sortOrder">
          <input
            id="sortOrder"
            type="number"
            className={inputClass}
            {...register("sortOrder")}
          />
        </Field>
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-2 font-utility text-[11px] uppercase tracking-[0.14em] text-grey-700">
          <input type="checkbox" {...register("sold")} />
          Vendue
        </label>
        <label className="flex items-center gap-2 font-utility text-[11px] uppercase tracking-[0.14em] text-grey-700">
          <input type="checkbox" {...register("featured")} />
          Mise en avant
        </label>
      </div>

      {serverError && <p className="text-[0.9rem] text-red-700">{serverError}</p>}

      <div className="flex items-center gap-6">
        <button type="submit" disabled={isSubmitting} className={buttonClass}>
          {isSubmitting ? "Enregistrement…" : isEditing ? "Enregistrer" : "Créer l'œuvre"}
        </button>
        <button type="button" onClick={() => router.push("/admin/galerie")} className={buttonGhostClass}>
          Annuler
        </button>
      </div>
    </form>
  );
}
