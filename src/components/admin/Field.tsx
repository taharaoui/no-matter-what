import type { ReactNode } from "react";
import { labelClass } from "./formStyles";

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
};

/* Label + input slot + error message, repeated across every admin form
   (pieces have ~14 fields, sections/items/about more) — pulled out once
   rather than hand-repeated per field. */
export default function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[0.85rem] text-red-700">{error}</p>}
    </div>
  );
}
