export default function OpportunitiesLoading() {
  return (
    <div className="flex flex-col gap-6 py-7 px-4 sm:px-6 lg:px-8 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-card rounded-xl border border-border/80 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="h-3 w-40 bg-muted rounded" />
            <div className="h-6 w-72 bg-muted rounded" />
            <div className="h-3 w-80 bg-muted rounded" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-background border border-border/80 rounded-xl px-4 py-3 min-w-[110px] space-y-2">
                <div className="h-2.5 w-12 bg-muted rounded" />
                <div className="h-6 w-10 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 xl:col-span-3 bg-card rounded-xl border border-border/80 p-5 space-y-5">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-9 w-full bg-muted rounded-lg" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-muted rounded" />
          ))}
          <div className="h-9 w-full bg-muted rounded-lg" />
        </div>
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-4">
          <div className="bg-card rounded-xl border border-border/80 px-4 py-3 h-10" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card rounded-xl p-5 border border-border/80 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-muted" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-48 bg-muted rounded" />
                  <div className="h-3 w-64 bg-muted rounded" />
                </div>
                <div className="w-16 h-10 bg-muted rounded" />
              </div>
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-border/40">
                {[1, 2, 3].map(j => <div key={j} className="h-3 w-24 bg-muted rounded" />)}
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map(j => <div key={j} className="h-5 w-16 bg-muted rounded" />)}
                </div>
                <div className="h-8 w-20 bg-muted rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
