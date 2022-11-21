import { ethers } from 'ethers';
import { PDFDocument } from 'pdf-lib';
import { MetadataStructure } from '../types';

type GenerateNewURL = {
  files: FileList;
  metadata: MetadataStructure;
  certificateHash: string;
  transactionHash: string;
};

export async function generateNewURL({
  files,
  metadata,
  certificateHash,
  transactionHash,
}: GenerateNewURL) {
  const certificateArrayBuffer = await files[0].arrayBuffer();

  const certificate = await PDFDocument.load(certificateArrayBuffer);

  certificate.setTitle(metadata.title);
  certificate.setSubject(metadata.subject);
  certificate.setAuthor(metadata.author);
  certificate.setCreator(metadata.creator);
  certificate.setCreationDate(new Date(metadata.creationDate));
  certificate.setKeywords([
    `ID do certificado: ${certificateHash}`,
    `Transação: ${transactionHash}`,
  ]);

  const newCertificateBytes = await certificate.save();

  const newCertificateBlob = new Blob([newCertificateBytes.buffer], {
    type: 'application/pdf',
  });

  const url = URL.createObjectURL(newCertificateBlob);

  return url;
}

export async function getCertificateHash({ files }: { files: FileList }) {
  const certificateArrayBuffer = await files[0].arrayBuffer();

  const certificate = await PDFDocument.load(certificateArrayBuffer);

  const metadata = {
    title: certificate.getTitle() ?? '',
    author: certificate.getAuthor() ?? '',
    subject: certificate.getSubject() ?? '',
    creator: certificate.getCreator() ?? '',
    creationDate: certificate.getCreationDate() ?? new Date(0),
  };

  const keywords = certificate.getKeywords();

  const metadataString = JSON.stringify(metadata);

  const hash = ethers.utils.id(metadataString);

  return { metadata, keywords, hash };
}
