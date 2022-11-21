export type MetadataStructure = {
  title: string;
  subject: string;
  author: string;
  creator: string;
  producer?: string;
  keywords?: string[];
  creationDate: Date;
};

export type Certificate = {
  hash: string;
  metadata?: MetadataStructure;
  keywords?: string;
};
