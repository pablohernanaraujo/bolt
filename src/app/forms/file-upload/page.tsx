// /src/app/forms/file-upload/page.tsx
// File Upload component showcase page
// Displays FileUpload variants, states, features, and integration examples
// RELEVANT FILES: ../../../ui/file-upload, ../../../icons

'use client';

import { type FC, type ReactElement, useState } from 'react';

import { Icon, Upload } from '@/icons';
import { Body2, Button, H1, H2, VStack } from '@/ui';
import { FileUpload, type FileUploadFile } from '@/ui/file-upload';
import * as fileUploadStyles from '@/ui/file-upload/file-upload.css';
import { FormField } from '@/ui/form-field';

import * as styles from '../../page.css';

/**
 * File Upload page component
 * Comprehensive showcase of FileUpload component with all features and states
 */
const FileUploadPage: FC = (): ReactElement => {
  // State for different examples
  const [basicFiles, setBasicFiles] = useState<FileUploadFile[]>([]);
  const [multipleFiles, setMultipleFiles] = useState<FileUploadFile[]>([]);
  const [imageFiles, setImageFiles] = useState<FileUploadFile[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  /**
   * Handle file upload errors
   */
  const handleError = (error: string): void => {
    setErrorMessage(error);
    // Clear error after 5 seconds
    setTimeout(() => setErrorMessage(''), 5000);
  };

  return (
    <div className={styles.section}>
      <H1>FileUpload</H1>
      <Body2>
        Componente de carga de archivos accesible construido con React Aria
        Components. Soporta arrastrar y soltar, múltiples archivos, validación
        de tipo y tamaño, y vista previa de imágenes. Perfecto para formularios
        que requieren subida de documentos o imágenes.
      </Body2>

      {/* Basic File Upload */}
      <div className={styles.showcase}>
        <H2>Basic File Upload</H2>
        <Body2>
          Ejemplo básico con un solo archivo. Permite seleccionar archivos
          haciendo clic en el botón o arrastrando y soltando.
        </Body2>
        <VStack space="4">
          <FileUpload.Root
            files={basicFiles}
            onFilesChange={setBasicFiles}
            onError={handleError}
          >
            <div style={{ textAlign: 'center' }}>
              <Icon
                icon={Upload}
                size="lg"
                style={{
                  marginBottom: '8px',
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  marginBottom: '8px',
                  fontWeight: 500,
                }}
              >
                Arrastra archivos aquí o haz clic para seleccionar
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'var(--colors-text-secondary)',
                  marginBottom: '12px',
                }}
              >
                Soporta cualquier tipo de archivo
              </div>
              <FileUpload.Trigger>
                <div className={fileUploadStyles.triggerContent}>
                  <Icon icon={Upload} size="sm" />
                  <span>Seleccionar archivo</span>
                </div>
              </FileUpload.Trigger>
            </div>
            <FileUpload.List files={basicFiles} />
          </FileUpload.Root>

          {errorMessage && (
            <div
              style={{
                color: 'var(--colors-text-error)',
                fontSize: '14px',
              }}
            >
              {errorMessage}
            </div>
          )}
        </VStack>
      </div>

      {/* Multiple Files */}
      <div className={styles.showcase}>
        <H2>Multiple Files</H2>
        <Body2>
          Permite seleccionar múltiples archivos con límite máximo y validación
          de tamaño.
        </Body2>
        <VStack space="4">
          <FileUpload.Root
            multiple
            maxFiles={5}
            maxFileSize={5 * 1024 * 1024} // 5MB
            files={multipleFiles}
            onFilesChange={setMultipleFiles}
            onError={handleError}
          >
            <div style={{ textAlign: 'center' }}>
              <Icon
                icon={Upload}
                size="lg"
                style={{
                  marginBottom: '8px',
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  marginBottom: '8px',
                  fontWeight: 500,
                }}
              >
                Selecciona hasta 5 archivos
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'var(--colors-text-secondary)',
                  marginBottom: '12px',
                }}
              >
                Máximo 5MB por archivo
              </div>
              <FileUpload.Trigger>
                <div className={fileUploadStyles.triggerContent}>
                  <Icon icon={Upload} size="sm" />
                  <span>Seleccionar archivos</span>
                </div>
              </FileUpload.Trigger>
            </div>
            <FileUpload.List files={multipleFiles} />
          </FileUpload.Root>
        </VStack>
      </div>

      {/* Image Files with Preview */}
      <div className={styles.showcase}>
        <H2>Image Upload with Preview</H2>
        <Body2>
          Específico para imágenes con vista previa automática. Acepta solo
          archivos de imagen.
        </Body2>
        <VStack space="4">
          <FileUpload.Root
            multiple
            maxFiles={3}
            accept={['image/*']}
            files={imageFiles}
            onFilesChange={setImageFiles}
            onError={handleError}
          >
            <div style={{ textAlign: 'center' }}>
              <Icon
                icon={Upload}
                size="lg"
                style={{
                  marginBottom: '8px',
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  marginBottom: '8px',
                  fontWeight: 500,
                }}
              >
                Sube imágenes con vista previa
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'var(--colors-text-secondary)',
                  marginBottom: '12px',
                }}
              >
                Solo archivos de imagen (JPG, PNG, GIF, etc.)
              </div>
              <FileUpload.Trigger>
                <div className={fileUploadStyles.triggerContent}>
                  <Icon icon={Upload} size="sm" />
                  <span>Seleccionar imágenes</span>
                </div>
              </FileUpload.Trigger>
            </div>
            <FileUpload.List files={imageFiles} showPreviews />
          </FileUpload.Root>
        </VStack>
      </div>

      {/* Variants */}
      <div className={styles.showcase}>
        <H2>Variants</H2>
        <Body2>Diferentes estilos visuales: outline y filled.</Body2>
        <VStack space="6">
          <div>
            <h3
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Outline Variant
            </h3>
            <FileUpload.Root variant="outline">
              <div style={{ textAlign: 'center' }}>
                <Icon
                  icon={Upload}
                  size="lg"
                  style={{
                    marginBottom: '8px',
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}
                >
                  Outline variant
                </div>
                <FileUpload.Trigger>
                  <div className={fileUploadStyles.triggerContent}>
                    <Icon icon={Upload} size="sm" />
                    <span>Seleccionar</span>
                  </div>
                </FileUpload.Trigger>
              </div>
              <FileUpload.List files={[]} />
            </FileUpload.Root>
          </div>

          <div>
            <h3
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Filled Variant
            </h3>
            <FileUpload.Root variant="filled">
              <div style={{ textAlign: 'center' }}>
                <Icon
                  icon={Upload}
                  size="lg"
                  style={{
                    marginBottom: '8px',
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}
                >
                  Filled variant
                </div>
                <FileUpload.Trigger>
                  <div className={fileUploadStyles.triggerContent}>
                    <Icon icon={Upload} size="sm" />
                    <span>Seleccionar</span>
                  </div>
                </FileUpload.Trigger>
              </div>
              <FileUpload.List files={[]} />
            </FileUpload.Root>
          </div>
        </VStack>
      </div>

      {/* Sizes */}
      <div className={styles.showcase}>
        <H2>Sizes</H2>
        <Body2>Diferentes tamaños: small, medium y large.</Body2>
        <VStack space="6">
          <div>
            <h3
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Small
            </h3>
            <FileUpload.Root size="small">
              <div style={{ textAlign: 'center' }}>
                <Icon
                  icon={Upload}
                  size="md"
                  style={{
                    marginBottom: '4px',
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    marginBottom: '8px',
                    fontWeight: 500,
                    fontSize: '14px',
                  }}
                >
                  Small upload area
                </div>
                <FileUpload.Trigger size="small">
                  <div className={fileUploadStyles.triggerContent}>
                    <Icon icon={Upload} size="sm" />
                    <span>Seleccionar</span>
                  </div>
                </FileUpload.Trigger>
              </div>
              <FileUpload.List files={[]} />
            </FileUpload.Root>
          </div>

          <div>
            <h3
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Medium
            </h3>
            <FileUpload.Root size="medium">
              <div style={{ textAlign: 'center' }}>
                <Icon
                  icon={Upload}
                  size="lg"
                  style={{
                    marginBottom: '8px',
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}
                >
                  Medium upload area
                </div>
                <FileUpload.Trigger size="medium">
                  <div className={fileUploadStyles.triggerContent}>
                    <Icon icon={Upload} size="sm" />
                    <span>Seleccionar</span>
                  </div>
                </FileUpload.Trigger>
              </div>
              <FileUpload.List files={[]} />
            </FileUpload.Root>
          </div>

          <div>
            <h3
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Large
            </h3>
            <FileUpload.Root size="large">
              <div style={{ textAlign: 'center' }}>
                <Icon
                  icon={Upload}
                  size="xl"
                  style={{
                    marginBottom: '12px',
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    marginBottom: '12px',
                    fontWeight: 500,
                    fontSize: '18px',
                  }}
                >
                  Large upload area
                </div>
                <FileUpload.Trigger size="large">
                  <div className={fileUploadStyles.triggerContent}>
                    <Icon icon={Upload} size="sm" />
                    <span>Seleccionar</span>
                  </div>
                </FileUpload.Trigger>
              </div>
              <FileUpload.List files={[]} />
            </FileUpload.Root>
          </div>
        </VStack>
      </div>

      {/* States */}
      <div className={styles.showcase}>
        <H2>States</H2>
        <Body2>Diferentes estados: normal, disabled y error.</Body2>
        <VStack space="6">
          <div>
            <h3
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Normal State
            </h3>
            <FileUpload.Root>
              <div style={{ textAlign: 'center' }}>
                <Icon
                  icon={Upload}
                  size="lg"
                  style={{
                    marginBottom: '8px',
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}
                >
                  Estado normal
                </div>
                <FileUpload.Trigger>
                  <div className={fileUploadStyles.triggerContent}>
                    <Icon icon={Upload} size="sm" />
                    <span>Seleccionar</span>
                  </div>
                </FileUpload.Trigger>
              </div>
              <FileUpload.List files={[]} />
            </FileUpload.Root>
          </div>

          <div>
            <h3
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Disabled State
            </h3>
            <FileUpload.Root isDisabled>
              <div style={{ textAlign: 'center' }}>
                <Icon
                  icon={Upload}
                  size="lg"
                  style={{
                    marginBottom: '8px',
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}
                >
                  Estado deshabilitado
                </div>
                <FileUpload.Trigger>
                  <div className={fileUploadStyles.triggerContent}>
                    <Icon icon={Upload} size="sm" />
                    <span>Seleccionar</span>
                  </div>
                </FileUpload.Trigger>
              </div>
              <FileUpload.List files={[]} />
            </FileUpload.Root>
          </div>

          <div>
            <h3
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Error State
            </h3>
            <FileUpload.Root hasError>
              <div style={{ textAlign: 'center' }}>
                <Icon
                  icon={Upload}
                  size="lg"
                  style={{
                    marginBottom: '8px',
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}
                >
                  Estado de error
                </div>
                <FileUpload.Trigger>
                  <div className={fileUploadStyles.triggerContent}>
                    <Icon icon={Upload} size="sm" />
                    <span>Seleccionar</span>
                  </div>
                </FileUpload.Trigger>
              </div>
              <FileUpload.List files={[]} />
            </FileUpload.Root>
            <div
              style={{
                color: 'var(--colors-text-error)',
                fontSize: '14px',
                marginTop: '8px',
              }}
            >
              Error: Tipo de archivo no válido
            </div>
          </div>
        </VStack>
      </div>

      {/* Integration with FormField */}
      <div className={styles.showcase}>
        <H2>FormField Integration</H2>
        <Body2>
          Integración con FormField para formularios completos con etiquetas y
          mensajes de error.
        </Body2>
        <VStack space="4">
          <FormField
            label="Documentos de identidad"
            hint="Sube tu cédula o pasaporte (máximo 2 archivos, 10MB cada uno)"
            inputProps={{
              'aria-describedby': 'file-upload-help',
            }}
          >
            <div id="file-upload-help">
              <FileUpload.Root
                multiple
                maxFiles={2}
                maxFileSize={10 * 1024 * 1024} // 10MB
                accept={['image/*', '.pdf']}
                onError={handleError}
              >
                <div style={{ textAlign: 'center' }}>
                  <Icon
                    icon={Upload}
                    size="lg"
                    style={{
                      marginBottom: '8px',
                      opacity: 0.6,
                    }}
                  />
                  <div
                    style={{
                      marginBottom: '8px',
                      fontWeight: 500,
                    }}
                  >
                    Arrastra tus documentos aquí
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: 'var(--colors-text-secondary)',
                      marginBottom: '12px',
                    }}
                  >
                    Formatos: JPG, PNG, PDF
                  </div>
                  <FileUpload.Trigger>
                    <div className={fileUploadStyles.triggerContent}>
                      <Icon icon={Upload} size="sm" />
                      <span>Examinar archivos</span>
                    </div>
                  </FileUpload.Trigger>
                </div>
                <FileUpload.List files={[]} />
              </FileUpload.Root>
            </div>
          </FormField>
        </VStack>
      </div>

      {/* Custom Trigger */}
      <div className={styles.showcase}>
        <H2>Custom Trigger</H2>
        <Body2>
          Usando asChild pattern para crear disparadores personalizados.
        </Body2>
        <VStack space="4">
          <FileUpload.Root>
            <div style={{ textAlign: 'center' }}>
              <Icon
                icon={Upload}
                size="lg"
                style={{
                  marginBottom: '8px',
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  marginBottom: '8px',
                  fontWeight: 500,
                }}
              >
                Trigger personalizado
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'var(--colors-text-secondary)',
                  marginBottom: '12px',
                }}
              >
                Botón personalizado usando asChild
              </div>
              <FileUpload.Trigger asChild>
                <Button variant="primary" size="large">
                  <div className={fileUploadStyles.triggerContent}>
                    <Icon icon={Upload} size="sm" />
                    <span>Botón personalizado</span>
                  </div>
                </Button>
              </FileUpload.Trigger>
            </div>
            <FileUpload.List files={[]} />
          </FileUpload.Root>
        </VStack>
      </div>

      {/* File Type Restrictions */}
      <div className={styles.showcase}>
        <H2>File Type Restrictions</H2>
        <Body2>Diferentes restricciones de tipos de archivo.</Body2>
        <VStack space="6">
          <div>
            <h3
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Solo documentos PDF
            </h3>
            <FileUpload.Root accept={['.pdf']}>
              <div style={{ textAlign: 'center' }}>
                <Icon
                  icon={Upload}
                  size="lg"
                  style={{
                    marginBottom: '8px',
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}
                >
                  Solo archivos PDF
                </div>
                <FileUpload.Trigger>
                  <div className={fileUploadStyles.triggerContent}>
                    <Icon icon={Upload} size="sm" />
                    <span>Seleccionar PDF</span>
                  </div>
                </FileUpload.Trigger>
              </div>
              <FileUpload.List files={[]} />
            </FileUpload.Root>
          </div>

          <div>
            <h3
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Documentos de oficina
            </h3>
            <FileUpload.Root
              accept={[
                '.doc',
                '.docx',
                '.xls',
                '.xlsx',
                '.ppt',
                '.pptx',
                '.pdf',
              ]}
            >
              <div style={{ textAlign: 'center' }}>
                <Icon
                  icon={Upload}
                  size="lg"
                  style={{
                    marginBottom: '8px',
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}
                >
                  Documentos de Office
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: 'var(--colors-text-secondary)',
                    marginBottom: '12px',
                  }}
                >
                  Word, Excel, PowerPoint, PDF
                </div>
                <FileUpload.Trigger>
                  <div className={fileUploadStyles.triggerContent}>
                    <Icon icon={Upload} size="sm" />
                    <span>Seleccionar documento</span>
                  </div>
                </FileUpload.Trigger>
              </div>
              <FileUpload.List files={[]} />
            </FileUpload.Root>
          </div>
        </VStack>
      </div>
    </div>
  );
};

export default FileUploadPage;
