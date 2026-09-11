export default function SkillsLoading() {
  return (
    <div className="flex flex-col gap-7 py-7 px-4 sm:px-6 lg:px-8 animate-pulse">
      {/* Header skeleton */}
      <div className="rounded-xl border border-border/80 bg-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="h-3 w-48 bg-muted rounded" />
            <div className="h-6 w-80 bg-muted rounded" />
            <div className="h-3 w-64 bg-muted rounded" />
          </div>
          <div className="flex gap-6">
            <div className="space-y-2">
              <div className="h-3 w-20 bg-muted rounded" />
              <div className="h-7 w-16 bg-muted rounded" />
              <div className="h-1 w-32 bg-muted rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-20 bg-muted rounded" />
              <div className="h-7 w-24 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
      {/* Radar + gaps skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        <div className="lg:col-span-6 bg-card rounded-xl border border-border/80 p-5 h-[500px]">
          <div className="h-4 w-40 bg-muted rounded mb-4" />
          <div className="w-full h-[380px] bg-muted/50 rounded-xl" />
        </div>
        <div className="lg:col-span-6 bg-card rounded-xl border border-border/80 p-5 space-y-4">
          <div className="h-4 w-40 bg-muted rounded" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2 py-3 border-b border-border/40 last:border-0">
              <div className="flex justify-between">
                <div className="h-3 w-32 bg-muted rounded" />
                <div className="h-3 w-16 bg-muted rounded" />
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
