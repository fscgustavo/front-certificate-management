import {
  Button,
  Flex,
  Grid,
  Input,
  Link as ChakraLink,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ethers } from 'ethers';
import { useAccount, useContractRead } from '@web3modal/react';
import { useContractAddress } from '../../hooks/useContractAdresses';
import certificateManagementABI from '../../constants/CertificateManagement.json';

type FormData = {
  title: string;
  issueDate: string;
  expirationDate: string;
  description: string;
};

export function RegisterCertificate() {
  const [form, setForm] = useState<FormData>({
    title: '',
    issueDate: '',
    expirationDate: '',
    description: '',
  });

  const inputFileRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const downloadAnchorRef = useRef<HTMLAnchorElement>({} as HTMLAnchorElement);
  const [newCertificateUrl, setNewCertificateUrl] = useState('');
  const { contractAddress } = useContractAddress();

  const { data } = useContractRead({
    address: contractAddress,
    abi: certificateManagementABI,
    functionName: 'getUniversityOfCertifier',
  });

  console.log('getUniversityOfCertifier', data);

  const {
    account: { address: certifierAddress },
  } = useAccount();

  function updateFormValue(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { value, type, id } = event.target;

    // valueAsNumber does not exist in HTMLTextAreaElement
    const formValue = type.includes('date') ? new Date(value).getTime() : value;

    setForm({
      ...form,
      [id]: formValue,
    });
  }

  function getCertificateStructure() {
    const descriptionWithExpiration = `${form.description}. Data de expiração: ${form.expirationDate}`;

    const metadataStructure = {
      title: form.title,
      author: certifierAddress,
      subject: descriptionWithExpiration,
      creator: '0x728729b313b59F78dAa0Ad7D13A7F41cb10B0040',
      producer: '0xefA95A16a47BCDff135E83eC6fe158787489170D',
      creationDate: form.issueDate,
    };

    const metadataString = JSON.stringify(metadataStructure);

    const certificateHash = ethers.utils.id(metadataString);

    return {
      hash: certificateHash,
      metadata: metadataStructure,
    };
  }

  async function alterCertificate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!inputFileRef.current.files) {
      return;
    }

    const certificateArrayBuffer =
      await inputFileRef.current.files[0].arrayBuffer();

    const certificate = await PDFDocument.load(certificateArrayBuffer);

    certificate.setTitle('Master of Arts');
    certificate.setSubject(`Certificate of Jhon Doe. University Example`);
    certificate.setAuthor('123');
    certificate.setCreator('456');
    certificate.setProducer('456');
    certificate.setCreationDate(new Date('06/10/2013'));

    const newCertificateBytes = await certificate.save();

    const newCertificateBlob = new Blob([newCertificateBytes.buffer], {
      type: 'application/pdf',
    });

    const url = URL.createObjectURL(newCertificateBlob);

    setNewCertificateUrl(url);

    downloadAnchorRef.current.click();
  }

  const hashDemo = getCertificateStructure().hash;

  return (
    <form onSubmit={alterCertificate}>
      <Grid rowGap="1.5rem">
        <Grid rowGap="1rem">
          <Grid rowGap="0.5rem">
            <Text htmlFor="certificate" as="label">
              Arquivo
            </Text>
            <Input
              id="certificate"
              name="certificate"
              type="file"
              placeholder="Selecione o certificado"
              ref={inputFileRef}
            />
          </Grid>
          <Grid rowGap="0.5rem">
            <Text htmlFor="title" as="label">
              Título
            </Text>
            <Input
              id="title"
              placeholder="Bacharelado de Ciência da Computação"
              onChange={updateFormValue}
            />
          </Grid>
          <Grid templateColumns={{ sm: '1fr 1fr' }} gap="1rem">
            <Grid rowGap="0.5rem">
              <Text htmlFor="issueDate" as="label">
                Data de emissão
              </Text>
              <Input
                id="issueDate"
                type="datetime-local"
                onChange={updateFormValue}
              />
            </Grid>
            <Grid rowGap="0.5rem">
              <Text htmlFor="expirationDate" as="label">
                Data de expiração
              </Text>
              <Input
                id="expirationDate"
                type="datetime-local"
                onChange={updateFormValue}
              />
            </Grid>
          </Grid>
          <Grid rowGap="0.5rem">
            <Text htmlFor="description" as="label">
              Descrição
            </Text>
            <Textarea id="description" onChange={updateFormValue} />
          </Grid>
          <Text>ID do certificado: {hashDemo}</Text>
        </Grid>
        <Flex gap="1rem" direction={{ base: 'column', sm: 'row' }}>
          <Button type="submit" colorScheme="green" width="100%">
            Registrar
          </Button>
        </Flex>
        {/* <Text
        borderWidth="1px"
        borderColor="gray.200"
        padding="0.5rem"
        borderRadius="8px"
      >
        Última transação: 0x232193219214
      </Text> */}
        <ChakraLink
          display="none"
          href={newCertificateUrl}
          download="registered_certificate"
          ref={downloadAnchorRef}
        >
          Baixar certificado registrado
        </ChakraLink>
      </Grid>
    </form>
  );
}
