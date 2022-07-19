import {
  IsFile,
  MaxFileSize,
  HasMimeType,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class UploadImageDto {
  @IsFile()
  @MaxFileSize(1e7)
  @HasMimeType(['image/jpeg', 'image/png', 'image/webp'])
  image?: MemoryStoredFile;
}
