import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  controllers: [],
  providers: [SupabaseService],
  exports: [SupabaseService],
  imports: [],
})
export class ApiSharedSupabaseModule {}
