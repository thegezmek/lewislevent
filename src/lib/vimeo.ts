export type VimeoRef = {
  id: string;
  hash?: string;
};

export function parseVimeoUrl(url?: string): VimeoRef | null {
  if (!url) return null;
  const match = url.match(
    /vimeo\.com\/(?:video\/)?(\d+)(?:\/([A-Za-z0-9]+))?/i,
  );
  if (!match) return null;
  return match[2] ? { id: match[1], hash: match[2] } : { id: match[1] };
}

export function vimeoEmbedSrc(url?: string, autoplay = false): string | undefined {
  const parsed = parseVimeoUrl(url);
  if (!parsed) return undefined;
  const params = new URLSearchParams();
  if (parsed.hash) params.set("h", parsed.hash);
  if (autoplay) params.set("autoplay", "1");
  params.set("title", "0");
  params.set("byline", "0");
  params.set("portrait", "0");
  params.set("dnt", "1");
  return `https://player.vimeo.com/video/${parsed.id}?${params.toString()}`;
}
