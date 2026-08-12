import Image from "next/image";
import type { MenuItem } from "@/lib/menu";

type MenuItemCardProps = {
  item: MenuItem;
};

/**
 * One product tile for the /menu grid. Same register as the site's other
 * card grids (Boutique, Galerie): 4:5 photo, sharp corners, a grain texture
 * instead of a shadow, a quiet hover zoom instead of anything louder — no
 * new visual vocabulary introduced here.
 *
 * Most items don't have a photo yet. Rather than a generic "image
 * manquante" placeholder, an item with no `image` gets a flat cream card
 * with its name set large in the display face — reads as an unphotographed
 * menu entry, not a broken asset.
 */
export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden grain border border-ink/10">
        {item.image ? (
          <Image
            src={item.image}
            alt={`${item.name}, servi au café No Matter What`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover saturate-[0.94] transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-grey-100 px-6 text-center">
            <p className="font-display text-2xl leading-snug text-ink-soft/70">
              {item.name}
            </p>
          </div>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="bg-paper-light/95 text-ink font-utility text-[10px] uppercase tracking-[0.1em] px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="font-display text-xl leading-snug">{item.name}</p>
        {item.price ? (
          <p className="font-utility text-sm text-grey-700 whitespace-nowrap">
            {item.price} $
          </p>
        ) : (
          <p className="font-utility text-[10px] uppercase tracking-[0.14em] text-grey-500 whitespace-nowrap">
            Nouveau
          </p>
        )}
      </div>

      {item.desc && (
        <p className="mt-1 text-[0.9rem] text-ink-soft/70 leading-snug">
          {item.desc}
        </p>
      )}
      {item.note && (
        <p className="mt-1 font-utility text-[10px] uppercase tracking-[0.14em] text-ink-soft/50">
          {item.note}
        </p>
      )}
    </div>
  );
}
