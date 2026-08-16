import type { Metadata } from "next";
import Link from "next/link";
import { getMenuItems, getMenuSections } from "@/lib/menu";
import { deleteItemAction, deleteSectionAction } from "@/lib/menu/actions";
import { buttonClass, buttonGhostClass } from "@/components/admin/formStyles";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const metadata: Metadata = { title: "Menu" };

export default async function AdminMenuPage() {
  const [sections, items] = await Promise.all([getMenuSections(), getMenuItems()]);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-3xl">Menu</h1>
        <Link href="/admin/menu/sections/nouveau" className={buttonClass}>
          + Nouvelle section
        </Link>
      </div>

      {sections.length === 0 ? (
        <p className="text-ink-soft/70">Aucune section pour le moment.</p>
      ) : (
        <div className="flex flex-col gap-14">
          {sections.map((section) => {
            const sectionItems = items.filter((i) => i.section_id === section.id);
            return (
              <div key={section.id}>
                <div className="flex items-center justify-between border-b border-ink/10 pb-3 mb-4">
                  <h2 className="font-display text-xl">{section.title}</h2>
                  <div className="flex items-center gap-5">
                    <Link
                      href={`/admin/menu/items/nouveau?section=${section.id}`}
                      className={buttonGhostClass}
                    >
                      + Item
                    </Link>
                    <Link
                      href={`/admin/menu/sections/${section.id}`}
                      className={buttonGhostClass}
                    >
                      Éditer la section
                    </Link>
                    <ConfirmDeleteButton
                      onConfirm={deleteSectionAction.bind(null, section.id)}
                      warning={
                        sectionItems.length > 0
                          ? `Supprime aussi ${sectionItems.length} item${sectionItems.length > 1 ? "s" : ""}`
                          : undefined
                      }
                    />
                  </div>
                </div>

                {sectionItems.length === 0 ? (
                  <p className="text-[0.9rem] text-ink-soft/50">Aucun item dans cette section.</p>
                ) : (
                  <ul className="flex flex-col">
                    {sectionItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-4 py-3 border-b border-ink/5"
                      >
                        <p className="flex-1 min-w-0 truncate">{item.name}</p>
                        {item.price && (
                          <p className="font-utility text-[11px] text-grey-700">{item.price}</p>
                        )}
                        <Link
                          href={`/admin/menu/items/${item.id}`}
                          className="font-utility text-[11px] uppercase tracking-[0.16em] text-ink-soft/70 hover:text-ink transition-colors"
                        >
                          Éditer
                        </Link>
                        <ConfirmDeleteButton onConfirm={deleteItemAction.bind(null, item.id)} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
