export default function Loading() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#0F3D66] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#0F3D66] font-medium animate-pulse">Loading content...</p>
      </div>
    </div>
  );
}
