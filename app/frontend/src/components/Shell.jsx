export default function Shell({ children }) {
  return (
    <div
      className="flex h-screen flex-col"
      style={{ backgroundColor: "#003631" }}
    >
      <header
        className="border-b px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: "#003631", borderColor: "#004d45" }}
      >
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#FFEDA8" }}
        >
          PRessure
        </h1>
        <div className="flex items-center gap-4">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: "#004d45", color: "#FFEDA8" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </header>
      <main
        className="flex-1 overflow-auto p-8"
        style={{ backgroundColor: "#003631" }}
      >
        {children}
      </main>
      <nav
        className="border-t flex items-center justify-around px-4 py-3"
        style={{ backgroundColor: "#002b27", borderColor: "#004d45" }}
      >
        <button className="flex flex-col items-center gap-1 transition-all hover:scale-105">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#FFEDA8" }}
          >
            <svg
              className="w-6 h-6"
              style={{ color: "#003631" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <span className="text-xs" style={{ color: "#FFEDA8" }}>
            Home
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 transition-all hover:scale-105">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#004d45", color: "#FFEDA8" }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <span className="text-xs" style={{ color: "#7a9995" }}>
            Stats
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 transition-all hover:scale-105">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#004d45", color: "#FFEDA8" }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-xs" style={{ color: "#7a9995" }}>
            Timer
          </span>
        </button>
      </nav>
    </div>
  );
}
