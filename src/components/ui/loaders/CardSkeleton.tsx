// ----------------------
// Skeleton for loading state
// ----------------------
export function CardSkeleton() {
  return (
    <div className="w-full h-96 md:h-80 flex flex-col md:flex-row bg-gray-200 rounded-3xl overflow-hidden animate-pulse">
      <div className="md:w-1/2 h-56 md:h-full bg-gray-300" />
      <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
        <div>
          <div className="h-6 bg-gray-400 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-400 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-400 rounded w-full mb-2" />
          <div className="h-3 bg-gray-400 rounded w-3/4 mb-1" />
          <div className="h-3 bg-gray-400 rounded w-1/2" />
        </div>
        <div className="h-10 bg-gray-400 rounded w-full" />
      </div>
    </div>
  );
}