interface Props {
  message: string | null;
}

export function InvalidGuessToast({ message }: Props) {
  if (!message) return null;
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-600 text-white px-4 py-2 rounded-lg shadow-lg z-40 text-sm font-bold">
      {message}
    </div>
  );
}
