// Skeleton grid shown while data loads. Ready for when services become async.
export default function LoadingState({ count = 4 }) {
  return (
    <div className="product-grid" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }, (_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton skeleton-image" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
        </div>
      ))}
    </div>
  )
}
