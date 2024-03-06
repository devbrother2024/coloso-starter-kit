export interface TypeAsset {
  code: string;
  createdAt: string;
  description: string | null;
  extras: any;
  flags: number;
  id: number;
  imageHeight: number;
  imageWidth: number;
  md5: null;
  mimeType: string;
  name: string | null;
  playTime: number;
  size: number;
  state: string;
  type: string;
  updatedAt: string;
  url: string;
  courseId?: number;
  sequence?: number;
  assetId?: string;
  downloadedAtLabel?: string;
}

export interface ExtendedAssets {
  assets: TypeAsset[];
}
