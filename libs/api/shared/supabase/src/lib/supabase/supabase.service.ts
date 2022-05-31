import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { SUPABASE_URL, SUPABASE_KEY } from '../../contants';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>(SUPABASE_URL),
      this.configService.get<string>(SUPABASE_KEY)
    );
  }

  async upload({
    bucket,
    file,
    filename,
    contentType,
    upsert,
  }: {
    bucket: string;
    file: any;
    filename: string;
    contentType?: string;
    upsert?: boolean;
  }) {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .upload(filename, file, {
          contentType,
          upsert,
        });

      if (error) {
        throw error;
      }

      let url = '';

      if (data) {
        const { publicURL, error: publicURLError } = this.supabase.storage
          .from(bucket)
          .getPublicUrl(filename);

        if (publicURLError) {
          throw publicURLError;
        }

        url = publicURL;
      }

      return url;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
