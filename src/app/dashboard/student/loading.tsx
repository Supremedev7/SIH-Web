export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-7 py-7 px-4 sm:px-6 lg:px-8 animate-pulse">
      {/* Hero strip */}
      <div className="rounded-xl border border-border/80 bg-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="h-3 w-56 bg-muted rounded" />
            <div className="h-6 w-64 bg-muted rounded" />
            <div className="h-3 w-80 bg-muted rounded" />
          </div>
          <div className="flex gap-8">
            <div className="space-y-2">
              <div className="h-3 w-24 bg-muted rounded" />
              <div className="h-7 w-16 bg-muted rounded" />
              <div className="h-1 w-32 bg-muted rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-28 bg-muted rounded" />
              <div className="h-7 w-12 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card rounded-xl border border-border/80 p-4 space-y-2">
            <div className="h-4 w-4 bg-muted rounded" />
            <div className="h-5 w-8 bg-muted rounded" />
            <div className="h-3 w-20 bg-muted rounded" />
          </div>
        ))}
      </div>
      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        <div className="lg:col-span-8 space-y-7">
          <div className="bg-card rounded-xl border border-border/80 p-5 space-y-4">
            <div className="h-4 w-40 bg-muted rounded" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border/60 p-4 space-y-3">
                <div className="flex gap-3.5">
                  <div className="w-10 h-10 rounded-md bg-muted" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-32 bg-muted rounded" />
                    <div className="h-4 w-48 bg-muted rounded" />
                    <div className="h-3 w-64 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card rounded-xl border border-border/80 p-5 space-y-4">
            <div className="h-4 w-32 bg-muted rounded" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-3 rounded-lg border border-border/60 space-y-2">
                <div className="h-3 w-24 bg-muted rounded" />
                <div className="h-3 w-36 bg-muted rounded" />
                <div className="grid grid-cols-5 gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="h-1 rounded-full bg-muted" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
