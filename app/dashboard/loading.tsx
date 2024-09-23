export default function Loading() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-wood-texture animate-pulse">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="w-64 h-96 bg-gray-300 rounded-lg shadow-md">
          <div className="h-3/4 bg-gray-400 rounded-t-lg"></div>
          <div className="h-1/4 p-4">
            <div className="w-3/4 h-4 bg-gray-400 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-400 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
