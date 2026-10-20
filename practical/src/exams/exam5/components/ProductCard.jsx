const CARD =
  'flex w-full cursor-pointer flex-col gap-1.5 px-3.5 py-2.5 text-left transition-colors hover:bg-wash focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand';

/** Literal class strings so Tailwind's static scanner can find every one. */
const CATEGORY_TAG = {
  Audio: 'bg-tag-purple text-tag-purple-ink',
  Wearables: 'bg-tag-green text-tag-green-ink',
  Keyboards: 'bg-tag-orange text-tag-orange-ink',
  Monitors: 'bg-tag-blue text-tag-blue-ink',
  Cameras: 'bg-tag-yellow text-tag-yellow-ink',
  Accessories: 'bg-tag-gray text-tag-gray-ink',
};

/**
 * A single row. Presentational: it reports the click upward with the product id
 * and never touches state itself.
 *
 * Deliberately NOT wrapped in React.memo. The list around it is already
 * memoized, so a row only renders when the list renders, and adding a second
 * memo layer would add prop-comparison cost for each of the up-to-600 rows
 * without changing the outcome.
 */
export default function ProductCard({ product, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(product.id)}
      aria-pressed={selected}
      data-testid={`product-${product.id}`}
      className={`${CARD} ${selected ? 'bg-brand-soft hover:bg-brand-soft' : ''}`}
    >
      <span className="flex items-start justify-between gap-3 text-[15px]">
        <span className="font-medium">{product.name}</span>
        <span className="whitespace-nowrap tabular-nums">${product.price.toFixed(2)}</span>
      </span>
      <span className="flex flex-wrap items-center gap-2 text-sm text-ink-2">
        <span
          className={`rounded-[3px] px-1.5 py-px text-[13px] leading-5 ${
            CATEGORY_TAG[product.category] ?? CATEGORY_TAG.Accessories
          }`}
        >
          {product.category}
        </span>
        <span>★ {product.rating.toFixed(1)}</span>
        <span className={product.inStock ? '' : 'text-warn'}>
          {product.inStock ? 'In stock' : 'Backordered'}
        </span>
        {selected && <span className="font-medium text-brand-ink">· selected</span>}
      </span>
    </button>
  );
}
