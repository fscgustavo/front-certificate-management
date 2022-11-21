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
import { ethers } from 'ethers';
import { useWriteOperation } from '../../hooks/useWriteOperation';
import { generateNewURL } from '../../utils/certificate';

type FormData = {
  title: string;
  issueDate: string;
  expirationDate: string;
  description: string;
  fileName: string;
};

type FormProps = {
  certifierAddress: string;
  universityOfCertifier: string;
};

export function RegisterCertificateForm({
  certifierAddress,
  universityOfCertifier,
}: FormProps) {
  const [form, setForm] = useState<FormData>({
    title: '',
    issueDate: '',
    expirationDate: '',
    description: '',
    fileName: '',
  });

  const inputFileRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const downloadAnchorRef = useRef<HTMLAnchorElement>({} as HTMLAnchorElement);

  function getCertificateStructure() {
    const descriptionWithExpiration = `${form.description}. Data de expiração: ${form.expirationDate}`;

    const metadataStructure = {
      title: form.title,
      author: certifierAddress,
      subject: descriptionWithExpiration,
      creator: universityOfCertifier,
      creationDate: new Date(form.issueDate),
    };

    const metadataString = JSON.stringify(metadataStructure);

    const certificateHash = ethers.utils.id(metadataString);

    return {
      certificateID: certificateHash,
      metadata: metadataStructure,
    };
  }

  const { certificateID, metadata } = getCertificateStructure();

  const { writeAsync: registerCertificate, isLoading: isRegistering } =
    useWriteOperation({
      functionName: 'registerCertificate',
      args: [certificateID, form.issueDate, form.expirationDate],
    });

  function updateFormValue(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { value, type, id } = event.target;

    // valueAsNumber does not exist in HTMLTextAreaElement
    const formValue = type.includes('date') ? new Date(value).getTime() : value;

    setForm((previousForm) => ({
      ...previousForm,
      [id]: formValue,
    }));
  }

  async function generateNewCertificate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!inputFileRef.current.files) {
      return;
    }

    const transaction = await registerCertificate?.();

    const downloadURL = await generateNewURL({
      files: inputFileRef.current.files,
      metadata,
      certificateHash: certificateID,
      transactionHash: transaction?.hash ?? '',
    });

    downloadAnchorRef.current.href = downloadURL;

    downloadAnchorRef.current.click();

    event.currentTarget.reset();
  }

  return (
    <form onSubmit={generateNewCertificate}>
      <fieldset disabled={isRegistering}>
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
                required
                accept=".pdf"
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
                required
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
                  required
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
            <Grid rowGap="0.5rem">
              <Text htmlFor="fileName" as="label">
                Nome do arquivo a ser salvo
              </Text>
              <Input id="fileName" onChange={updateFormValue} required />
            </Grid>
            <Text>ID do certificado: {certificateID}</Text>
          </Grid>
          <Flex gap="1rem" direction={{ base: 'column', sm: 'row' }}>
            <Button
              type="submit"
              colorScheme="green"
              width="100%"
              isLoading={isRegistering}
            >
              Registrar
            </Button>
          </Flex>
          <ChakraLink
            display="none"
            href=""
            download={form.fileName}
            ref={downloadAnchorRef}
          >
            Baixar certificado registrado
          </ChakraLink>
        </Grid>
      </fieldset>
    </form>
  );
}
