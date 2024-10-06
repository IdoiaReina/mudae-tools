/* Type declarations -------------------------------------------------------- */
export interface ImgurUpload {
  id: string;
  deletehash: string;
  account_id: string | null;
  account_url: string | null;
  ad_type: string | null;
  ad_url: string | null;
  title: string;
  description: string;
  name: string;
  type: string;
  width: number;
  height: number;
  size: number;
  views: number;
  section: string | null;
  vote: string | null;
  bandwidth: number;
  animated: boolean;
  favorite: boolean;
  in_gallery: boolean;
  in_most_viral: boolean;
  has_sound: boolean;
  is_ad: boolean;
  nsfw: string | null;
  link: string;
  tags: string[];
  datetime: number;
  mp4: string;
  hls: string;
}

export interface ImgurUploadResponse {
  data: ImgurUpload;
  status: number;
  success: boolean;
}

export interface ImgurImage {
  id: string;
  title: string | null;
  description: string | null;
  datetime: number;
  type: string;
  animated: boolean;
  width: number;
  height: number;
  size: number;
  views: number;
  bandwidth: number;
  deletehash: string;
  section: string | null;
  link: string;
}

export interface ImgurImagesResponse {
  data: ImgurImage[];
  status: number;
  success: boolean;
}
