export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-primary">BlendNRush</h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* ThemeToggle has been removed */}
        </div>
      </div>
    </header>
  );
}
