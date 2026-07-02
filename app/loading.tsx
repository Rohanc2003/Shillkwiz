export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-[#c3dfff]" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[#00418d] animate-spin" />
        </div>
        {/* Brand wordmark */}
        <span className="text-[#00418d] font-bold text-lg tracking-wide">
          Skill<span className="text-[#f73e5d]">Kwiz</span>
        </span>
      </div>
    </div>
  );
}
