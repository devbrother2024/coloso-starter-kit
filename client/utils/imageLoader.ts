export default function imageLoader({ src, width, quality }: { src: number; width: number; quality: number }) {
  return `${src}?w=${width}&q=${quality || 75}`;
}
