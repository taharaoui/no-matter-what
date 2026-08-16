"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/auth/browser";
import { labelClass } from "./formStyles";

type ImageUploadFieldProps = {
  label: string;
  /** Current image URL — a Supabase Storage public URL, or one of the
   *  existing /images/*.jpg paths for rows not re-uploaded yet. */
  value: string;
  onChange: (url: string) => void;
  /** Folder inside the content-images bucket — keeps uploads sorted by
   *  the entity they belong to (gallery/, menu/, about/). */
  pathPrefix: string;
};

/* Uploads straight from the browser to Supabase Storage — not through a
   Server Action — because the admin's session already lives in the
   browser client, and routing a file through a Server Action means
   base64-encoding it into the request body for no benefit. RLS on
   storage.objects (see the migration) is what actually keeps this
   locked to the signed-in admin, same guarantee either way. */
export default function ImageUploadField({
  label,
  value,
  onChange,
  pathPrefix,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${pathPrefix}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("content-images")
        .upload(path, file, { upsert: false });
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("content-images").getPublicUrl(path);
      onChange(publicUrl);
    } catch (err) {
      console.error("[admin] image upload failed:", err);
      setError("Le téléversement a échoué — réessayez.");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  }

  const shown = previewUrl ?? value;

  return (
    <div>
      <p className={`${labelClass} mb-2`}>{label}</p>

      {shown && (
        <div className="relative w-32 aspect-[4/5] overflow-hidden border border-ink/10 mb-3 bg-grey-100">
          <Image
            src={shown}
            alt=""
            fill
            sizes="128px"
            className="object-cover"
            unoptimized={shown.startsWith("blob:")}
          />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="block text-[0.85rem] text-ink-soft/80 file:mr-4 file:py-2 file:px-4 file:border file:border-ink file:bg-transparent file:font-utility file:text-[11px] file:uppercase file:tracking-[0.14em] file:cursor-pointer hover:file:bg-ink hover:file:text-paper-light file:transition-colors"
      />

      {uploading && <p className="mt-2 text-[0.85rem] text-ink-soft/60">Téléversement…</p>}
      {error && <p className="mt-2 text-[0.85rem] text-red-700">{error}</p>}
    </div>
  );
}
