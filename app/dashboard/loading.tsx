// app/dashboard/loading.tsx
export default function Loading() {
  // We use the same 'p-8 max-w-5xl mx-auto' to match your main container
  return (
    <main className="p-8 max-w-5xl mx-auto animate-pulse">
      {/* Skeleton for Title and Subtitle */}
      <div className="h-8 w-48 bg-stone-200 rounded mb-2"></div>
      <div className="h-4 w-72 bg-stone-200 rounded mb-8"></div>
      
      {/* Grid matching your dashboard layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="h-[160px] bg-stone-100 rounded-xl border border-stone-200 p-6 flex flex-col justify-between"
          >
            {/* Mocking the icon and text areas inside the card */}
            <div className="flex justify-between">
              <div className="w-24 h-4 bg-stone-200 rounded"></div>
              <div className="w-8 h-8 bg-stone-200 rounded-lg"></div>
            </div>
            <div className="w-32 h-8 bg-stone-200 rounded mt-2"></div>
            <div className="w-20 h-4 bg-stone-200 rounded mt-4"></div>
          </div>
        ))}
      </div>
    </main>
  );
}