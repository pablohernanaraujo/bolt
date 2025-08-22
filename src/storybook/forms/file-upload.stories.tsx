// /src/storybook/forms/file-upload.stories.tsx
// FileUpload component stories showcasing all variants, sizes, features and states
// Complete documentation for the FileUpload compound component
// RELEVANT FILES: ../../ui/file-upload/index.tsx, ../utils/decorators.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useState } from 'react';
import { Icon, Upload } from '../../icons';
import { Button, VStack } from '../../ui';
import { FileUpload, type FileUploadFile } from '../../ui/file-upload';
import * as fileUploadStyles from '../../ui/file-upload/file-upload.css';
import { withThemeAndPadding } from '../utils/decorators';

const meta: Meta<typeof FileUpload.Root> = {
  title: 'Forms/FileUpload',
  component: FileUpload.Root,
  decorators: [withThemeAndPadding],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible file upload component built with React Aria Components. Supports drag-and-drop, multiple files, file type restrictions, size validation, and image previews. Perfect for forms requiring document or media uploads.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outline', 'filled'],
      description: 'Visual style variant of the file upload area',
      defaultValue: 'outline',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the file upload area',
      defaultValue: 'medium',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether to allow multiple file selection',
      defaultValue: false,
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files allowed',
    },
    maxFileSize: {
      control: 'number',
      description: 'Maximum file size in bytes (e.g., 5242880 for 5MB)',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the file upload is disabled',
      defaultValue: false,
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the file upload has an error state',
      defaultValue: false,
    },
    accept: {
      control: 'object',
      description: 'Array of accepted file types (MIME types or extensions)',
      defaultValue: undefined,
    },
  },
  args: {
    variant: 'outline',
    size: 'medium',
    multiple: false,
    isDisabled: false,
    hasError: false,
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload.Root>;

/**
 * Default FileUpload Story
 */
export const Default: Story = {
  render: (args) => {
    const DefaultComponent = (): ReactElement => {
      const [files, setFiles] = useState<FileUploadFile[]>([]);
      const [error, setError] = useState<string>('');

      return (
        <div style={{ width: '400px' }}>
          <FileUpload.Root
            {...args}
            files={files}
            onFilesChange={setFiles}
            onError={setError}
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
            <FileUpload.List files={files} />
          </FileUpload.Root>
          {error && (
            <div
              style={{
                color: 'var(--colors-text-error)',
                fontSize: '14px',
                marginTop: '8px',
              }}
            >
              {error}
            </div>
          )}
        </div>
      );
    };

    return <DefaultComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic file upload with drag-and-drop support and file list display.',
      },
    },
  },
};

/**
 * Multiple Files Story
 */
export const MultipleFiles: Story = {
  render: () => {
    const MultipleFilesComponent = (): ReactElement => {
      const [files, setFiles] = useState<FileUploadFile[]>([]);
      const [error, setError] = useState<string>('');

      return (
        <div style={{ width: '400px' }}>
          <FileUpload.Root
            multiple
            maxFiles={5}
            files={files}
            onFilesChange={setFiles}
            onError={setError}
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
                Arrastra múltiples archivos o haz clic
              </div>
              <FileUpload.Trigger>
                <div className={fileUploadStyles.triggerContent}>
                  <Icon icon={Upload} size="sm" />
                  <span>Seleccionar archivos</span>
                </div>
              </FileUpload.Trigger>
            </div>
            <FileUpload.List files={files} />
          </FileUpload.Root>
          {error && (
            <div
              style={{
                color: 'var(--colors-text-error)',
                fontSize: '14px',
                marginTop: '8px',
              }}
            >
              {error}
            </div>
          )}
        </div>
      );
    };

    return <MultipleFilesComponent />;
  },
  parameters: {
    docs: {
      description: {
        story: 'File upload supporting multiple files with a maximum limit.',
      },
    },
  },
};

/**
 * Image Upload with Preview Story
 */
export const ImageUpload: Story = {
  render: () => {
    const ImageUploadComponent = (): ReactElement => {
      const [files, setFiles] = useState<FileUploadFile[]>([]);
      const [error, setError] = useState<string>('');

      return (
        <div style={{ width: '400px' }}>
          <FileUpload.Root
            multiple
            accept={['image/*']}
            maxFiles={3}
            maxFileSize={5 * 1024 * 1024} // 5MB
            files={files}
            onFilesChange={setFiles}
            onError={setError}
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
                Solo imágenes, máximo 5MB cada una
              </div>
              <FileUpload.Trigger>
                <div className={fileUploadStyles.triggerContent}>
                  <Icon icon={Upload} size="sm" />
                  <span>Seleccionar imágenes</span>
                </div>
              </FileUpload.Trigger>
            </div>
            <FileUpload.List files={files} showPreviews />
          </FileUpload.Root>
          {error && (
            <div
              style={{
                color: 'var(--colors-text-error)',
                fontSize: '14px',
                marginTop: '8px',
              }}
            >
              {error}
            </div>
          )}
        </div>
      );
    };

    return <ImageUploadComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Image-specific upload with preview thumbnails and file type restrictions.',
      },
    },
  },
};

/**
 * Variants Story
 */
export const Variants: Story = {
  render: () => (
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
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available visual variants: outline (border style) and filled (background style).',
      },
    },
  },
};

/**
 * Sizes Story
 */
export const Sizes: Story = {
  render: () => (
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
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available upload area sizes: small, medium, and large.',
      },
    },
  },
};

/**
 * States Story
 */
export const States: Story = {
  render: () => (
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
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different file upload states: normal, disabled, and error.',
      },
    },
  },
};

/**
 * File Type Restrictions Story
 */
export const FileTypeRestrictions: Story = {
  render: () => {
    const FileTypeRestrictionsComponent = (): ReactElement => {
      const [pdfFiles, setPdfFiles] = useState<FileUploadFile[]>([]);
      const [officeFiles, setOfficeFiles] = useState<FileUploadFile[]>([]);
      const [error, setError] = useState<string>('');

      return (
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
            <FileUpload.Root
              accept={['.pdf']}
              files={pdfFiles}
              onFilesChange={setPdfFiles}
              onError={setError}
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
                  Solo archivos PDF
                </div>
                <FileUpload.Trigger>
                  <div className={fileUploadStyles.triggerContent}>
                    <Icon icon={Upload} size="sm" />
                    <span>Seleccionar PDF</span>
                  </div>
                </FileUpload.Trigger>
              </div>
              <FileUpload.List files={pdfFiles} />
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
              multiple
              files={officeFiles}
              onFilesChange={setOfficeFiles}
              onError={setError}
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
                    <span>Seleccionar documentos</span>
                  </div>
                </FileUpload.Trigger>
              </div>
              <FileUpload.List files={officeFiles} />
            </FileUpload.Root>
          </div>

          {error && (
            <div
              style={{
                color: 'var(--colors-text-error)',
                fontSize: '14px',
              }}
            >
              {error}
            </div>
          )}
        </VStack>
      );
    };

    return <FileTypeRestrictionsComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'File upload with different file type restrictions (PDF only, Office documents).',
      },
    },
  },
};

/**
 * Custom Trigger Story
 */
export const CustomTrigger: Story = {
  render: () => {
    const CustomTriggerComponent = (): ReactElement => {
      const [files, setFiles] = useState<FileUploadFile[]>([]);

      return (
        <div style={{ width: '300px' }}>
          <FileUpload.Root files={files} onFilesChange={setFiles}>
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
            <FileUpload.List files={files} />
          </FileUpload.Root>
        </div>
      );
    };

    return <CustomTriggerComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'File upload with custom trigger using asChild pattern for complete styling control.',
      },
    },
  },
};

/**
 * Size Validation Story
 */
export const SizeValidation: Story = {
  render: () => {
    const SizeValidationComponent = (): ReactElement => {
      const [files, setFiles] = useState<FileUploadFile[]>([]);
      const [error, setError] = useState<string>('');

      return (
        <div style={{ width: '400px' }}>
          <FileUpload.Root
            multiple
            maxFileSize={1024 * 1024} // 1MB
            maxFiles={3}
            files={files}
            onFilesChange={setFiles}
            onError={setError}
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
                Validación de tamaño
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'var(--colors-text-secondary)',
                  marginBottom: '12px',
                }}
              >
                Máximo 1MB por archivo, hasta 3 archivos
              </div>
              <FileUpload.Trigger>
                <div className={fileUploadStyles.triggerContent}>
                  <Icon icon={Upload} size="sm" />
                  <span>Seleccionar archivos</span>
                </div>
              </FileUpload.Trigger>
            </div>
            <FileUpload.List files={files} />
          </FileUpload.Root>
          {error && (
            <div
              style={{
                color: 'var(--colors-text-error)',
                fontSize: '14px',
                marginTop: '8px',
              }}
            >
              {error}
            </div>
          )}
        </div>
      );
    };

    return <SizeValidationComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'File upload with size validation (1MB max per file, 3 files max).',
      },
    },
  },
};

/**
 * Interactive Playground Story
 */
export const Playground: Story = {
  render: (args) => {
    const PlaygroundComponent = (): ReactElement => {
      const [files, setFiles] = useState<FileUploadFile[]>([]);
      const [error, setError] = useState<string>('');

      return (
        <div style={{ width: '400px' }}>
          <FileUpload.Root
            {...args}
            files={files}
            onFilesChange={setFiles}
            onError={setError}
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
                Playground FileUpload
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'var(--colors-text-secondary)',
                  marginBottom: '12px',
                }}
              >
                Prueba todas las configuraciones
              </div>
              <FileUpload.Trigger>
                <div className={fileUploadStyles.triggerContent}>
                  <Icon icon={Upload} size="sm" />
                  <span>Seleccionar archivos</span>
                </div>
              </FileUpload.Trigger>
            </div>
            <FileUpload.List files={files} />
          </FileUpload.Root>
          {error && (
            <div
              style={{
                color: 'var(--colors-text-error)',
                fontSize: '14px',
                marginTop: '8px',
              }}
            >
              {error}
            </div>
          )}
        </div>
      );
    };

    return <PlaygroundComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all FileUpload props and combinations.',
      },
    },
  },
};
