export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          avatar_url: string | null;
          website: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
      };
      rooms: {
        Row: {
          user_id: string;
          updated_at: string | null;
          name: string | null;
          id: string;
        };
        Insert: {
          user_id: string;
          updated_at?: string | null;
          name?: string | null;
          id?: string;
        };
        Update: {
          user_id?: string;
          updated_at?: string | null;
          name?: string | null;
          id?: string;
        };
      };
      room_members: {
        Row: {
          room_id: string;
          user_id: string;
          updated_at: string | null;
        };
        Insert: {
          room_id: string;
          user_id: string;
          updated_at?: string | null;
        };
        Update: {
          room_id?: string;
          user_id?: string;
          updated_at?: string | null;
        };
      };
      notification_states: {
        Row: {
          user_id: string;
          updated_at: string | null;
          endpoint: string | null;
          expiration_time: string | null;
          id: string;
        };
        Insert: {
          user_id: string;
          updated_at?: string | null;
          endpoint?: string | null;
          expiration_time?: string | null;
          id?: string;
        };
        Update: {
          user_id?: string;
          updated_at?: string | null;
          endpoint?: string | null;
          expiration_time?: string | null;
          id?: string;
        };
      };
    };
    Functions: {
      user_search: {
        Args: { uname: string };
        Returns: Record<string, unknown>[];
      };
      delete_storage_object: {
        Args: { bucket: string; object: string; OUT: unknown; OUT: unknown };
        Returns: Record<string, unknown>[];
      };
      delete_avatar: {
        Args: { avatar_url: string; OUT: unknown; OUT: unknown };
        Returns: Record<string, unknown>[];
      };
    };
  };
  storage: {
    Tables: {
      objects: {
        Row: {
          bucket_id: string | null;
          name: string | null;
          owner: string | null;
          metadata: Json | null;
          id: string;
          created_at: string | null;
          updated_at: string | null;
          last_accessed_at: string | null;
          path_tokens: string[] | null;
        };
        Insert: {
          bucket_id?: string | null;
          name?: string | null;
          owner?: string | null;
          metadata?: Json | null;
          id?: string;
          created_at?: string | null;
          updated_at?: string | null;
          last_accessed_at?: string | null;
          path_tokens?: string[] | null;
        };
        Update: {
          bucket_id?: string | null;
          name?: string | null;
          owner?: string | null;
          metadata?: Json | null;
          id?: string;
          created_at?: string | null;
          updated_at?: string | null;
          last_accessed_at?: string | null;
          path_tokens?: string[] | null;
        };
      };
      migrations: {
        Row: {
          id: number;
          name: string;
          hash: string;
          executed_at: string | null;
        };
        Insert: {
          id: number;
          name: string;
          hash: string;
          executed_at?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          hash?: string;
          executed_at?: string | null;
        };
      };
      buckets: {
        Row: {
          id: string;
          name: string;
          owner: string | null;
          created_at: string | null;
          updated_at: string | null;
          public: boolean | null;
        };
        Insert: {
          id: string;
          name: string;
          owner?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          public?: boolean | null;
        };
        Update: {
          id?: string;
          name?: string;
          owner?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          public?: boolean | null;
        };
      };
    };
    Functions: {
      foldername: {
        Args: { name: string };
        Returns: string[];
      };
      filename: {
        Args: { name: string };
        Returns: string;
      };
      extension: {
        Args: { name: string };
        Returns: string;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: Record<string, unknown>[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits: unknown;
          levels: unknown;
          offsets: unknown;
          search: unknown;
          sortcolumn: unknown;
          sortorder: unknown;
        };
        Returns: Record<string, unknown>[];
      };
    };
  };
  auth: {
    Tables: {
      identities: {
        Row: {
          id: string;
          user_id: string;
          identity_data: Json;
          provider: string;
          last_sign_in_at: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          user_id: string;
          identity_data: Json;
          provider: string;
          last_sign_in_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          identity_data?: Json;
          provider?: string;
          last_sign_in_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      instances: {
        Row: {
          id: string;
          uuid: string | null;
          raw_base_config: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          uuid?: string | null;
          raw_base_config?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          uuid?: string | null;
          raw_base_config?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      schema_migrations: {
        Row: {
          version: string;
        };
        Insert: {
          version: string;
        };
        Update: {
          version?: string;
        };
      };
      refresh_tokens: {
        Row: {
          instance_id: string | null;
          token: string | null;
          user_id: string | null;
          revoked: boolean | null;
          created_at: string | null;
          updated_at: string | null;
          id: number;
          parent: string | null;
        };
        Insert: {
          instance_id?: string | null;
          token?: string | null;
          user_id?: string | null;
          revoked?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
          id?: number;
          parent?: string | null;
        };
        Update: {
          instance_id?: string | null;
          token?: string | null;
          user_id?: string | null;
          revoked?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
          id?: number;
          parent?: string | null;
        };
      };
      users: {
        Row: {
          instance_id: string | null;
          id: string;
          aud: string | null;
          role: string | null;
          email: string | null;
          encrypted_password: string | null;
          invited_at: string | null;
          confirmation_token: string | null;
          confirmation_sent_at: string | null;
          recovery_token: string | null;
          recovery_sent_at: string | null;
          email_change_token_new: string | null;
          email_change: string | null;
          email_change_sent_at: string | null;
          last_sign_in_at: string | null;
          raw_app_meta_data: Json | null;
          raw_user_meta_data: Json | null;
          is_super_admin: boolean | null;
          created_at: string | null;
          updated_at: string | null;
          phone: string | null;
          phone_confirmed_at: string | null;
          phone_change_sent_at: string | null;
          email_confirmed_at: string | null;
          confirmed_at: string | null;
          phone_change: string | null;
          phone_change_token: string | null;
          email_change_token_current: string | null;
          email_change_confirm_status: number | null;
          banned_until: string | null;
          reauthentication_token: string | null;
          reauthentication_sent_at: string | null;
        };
        Insert: {
          instance_id?: string | null;
          id: string;
          aud?: string | null;
          role?: string | null;
          email?: string | null;
          encrypted_password?: string | null;
          invited_at?: string | null;
          confirmation_token?: string | null;
          confirmation_sent_at?: string | null;
          recovery_token?: string | null;
          recovery_sent_at?: string | null;
          email_change_token_new?: string | null;
          email_change?: string | null;
          email_change_sent_at?: string | null;
          last_sign_in_at?: string | null;
          raw_app_meta_data?: Json | null;
          raw_user_meta_data?: Json | null;
          is_super_admin?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
          phone?: string | null;
          phone_confirmed_at?: string | null;
          phone_change_sent_at?: string | null;
          email_confirmed_at?: string | null;
          confirmed_at?: string | null;
          phone_change?: string | null;
          phone_change_token?: string | null;
          email_change_token_current?: string | null;
          email_change_confirm_status?: number | null;
          banned_until?: string | null;
          reauthentication_token?: string | null;
          reauthentication_sent_at?: string | null;
        };
        Update: {
          instance_id?: string | null;
          id?: string;
          aud?: string | null;
          role?: string | null;
          email?: string | null;
          encrypted_password?: string | null;
          invited_at?: string | null;
          confirmation_token?: string | null;
          confirmation_sent_at?: string | null;
          recovery_token?: string | null;
          recovery_sent_at?: string | null;
          email_change_token_new?: string | null;
          email_change?: string | null;
          email_change_sent_at?: string | null;
          last_sign_in_at?: string | null;
          raw_app_meta_data?: Json | null;
          raw_user_meta_data?: Json | null;
          is_super_admin?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
          phone?: string | null;
          phone_confirmed_at?: string | null;
          phone_change_sent_at?: string | null;
          email_confirmed_at?: string | null;
          confirmed_at?: string | null;
          phone_change?: string | null;
          phone_change_token?: string | null;
          email_change_token_current?: string | null;
          email_change_confirm_status?: number | null;
          banned_until?: string | null;
          reauthentication_token?: string | null;
          reauthentication_sent_at?: string | null;
        };
      };
      audit_log_entries: {
        Row: {
          instance_id: string | null;
          id: string;
          payload: Json | null;
          created_at: string | null;
          ip_address: string;
        };
        Insert: {
          instance_id?: string | null;
          id: string;
          payload?: Json | null;
          created_at?: string | null;
          ip_address?: string;
        };
        Update: {
          instance_id?: string | null;
          id?: string;
          payload?: Json | null;
          created_at?: string | null;
          ip_address?: string;
        };
      };
    };
    Functions: {
      uid: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      role: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      email: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      jwt: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
    };
  };
  supabase_migrations: {
    Tables: {
      schema_migrations: {
        Row: {
          version: string;
          statements: string[] | null;
          name: string | null;
        };
        Insert: {
          version: string;
          statements?: string[] | null;
          name?: string | null;
        };
        Update: {
          version?: string;
          statements?: string[] | null;
          name?: string | null;
        };
      };
    };
    Functions: {};
  };
  extensions: {
    Tables: {};
    Functions: {
      uuid_nil: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      uuid_ns_dns: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      uuid_ns_url: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      uuid_ns_oid: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      uuid_ns_x500: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      uuid_generate_v1: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      uuid_generate_v1mc: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      uuid_generate_v3: {
        Args: { namespace: string; name: string };
        Returns: string;
      };
      uuid_generate_v4: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      uuid_generate_v5: {
        Args: { namespace: string; name: string };
        Returns: string;
      };
      digest: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      digest: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      hmac: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      hmac: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      crypt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      gen_salt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      gen_salt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      encrypt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      decrypt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      encrypt_iv: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      decrypt_iv: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      gen_random_bytes: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      gen_random_uuid: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      pgp_sym_encrypt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_sym_encrypt_bytea: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_sym_encrypt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_sym_encrypt_bytea: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_sym_decrypt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_sym_decrypt_bytea: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_sym_decrypt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_sym_decrypt_bytea: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_pub_encrypt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_pub_encrypt_bytea: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_pub_encrypt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_pub_encrypt_bytea: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_pub_decrypt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_pub_decrypt_bytea: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_pub_decrypt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_pub_decrypt_bytea: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_pub_decrypt: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_pub_decrypt_bytea: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_key_id: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      armor: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      armor: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      dearmor: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      pgp_armor_headers: {
        Args: Record<string, unknown>;
        Returns: Record<string, unknown>[];
      };
      url_encode: {
        Args: { data: string };
        Returns: string;
      };
      url_decode: {
        Args: { data: string };
        Returns: string;
      };
      algorithm_sign: {
        Args: { signables: string; secret: string; algorithm: string };
        Returns: string;
      };
      sign: {
        Args: { payload: Json; secret: string; algorithm: unknown };
        Returns: string;
      };
      verify: {
        Args: { token: string; secret: string; algorithm: unknown };
        Returns: Record<string, unknown>[];
      };
      try_cast_double: {
        Args: { inp: string };
        Returns: number;
      };
      grant_pg_cron_access: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      grant_pg_net_access: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      pgrst_ddl_watch: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      pgrst_drop_watch: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      grant_pg_graphql_access: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      set_graphql_placeholder: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
    };
  };
  vault: {
    Tables: {
      secrets: {
        Row: {
          name: string | null;
          secret: string;
          id: string;
          description: string;
          key_id: string | null;
          nonce: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name?: string | null;
          secret: string;
          id?: string;
          description?: string;
          key_id?: string | null;
          nonce?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string | null;
          secret?: string;
          id?: string;
          description?: string;
          key_id?: string | null;
          nonce?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Functions: {
      create_secret: {
        Args: {
          new_secret: string;
          new_name: unknown;
          new_description: unknown;
          new_key_id: unknown;
        };
        Returns: string;
      };
      update_secret: {
        Args: {
          secret_id: string;
          new_secret: unknown;
          new_name: unknown;
          new_description: unknown;
          new_key_id: unknown;
        };
        Returns: undefined;
      };
    };
  };
  pgsodium_masks: {
    Tables: {};
    Functions: {};
  };
  pgsodium: {
    Tables: {
      key: {
        Row: {
          key_type:
            | "aead-ietf"
            | "aead-det"
            | "hmacsha512"
            | "hmacsha256"
            | "auth"
            | "shorthash"
            | "generichash"
            | "kdf"
            | "secretbox"
            | "secretstream"
            | "stream_xchacha20"
            | null;
          id: string;
          status: "default" | "valid" | "invalid" | "expired" | null;
          raw_key: string | null;
          raw_key_nonce: string | null;
          parent_key: string | null;
          name: string | null;
          associated_data: string | null;
          key_id: number | null;
          key_context: string | null;
          expires: string | null;
          created: string;
          comment: string | null;
          user_data: string | null;
        };
        Insert: {
          key_type?:
            | "aead-ietf"
            | "aead-det"
            | "hmacsha512"
            | "hmacsha256"
            | "auth"
            | "shorthash"
            | "generichash"
            | "kdf"
            | "secretbox"
            | "secretstream"
            | "stream_xchacha20"
            | null;
          id?: string;
          status?: "default" | "valid" | "invalid" | "expired" | null;
          raw_key?: string | null;
          raw_key_nonce?: string | null;
          parent_key?: string | null;
          name?: string | null;
          associated_data?: string | null;
          key_id?: number | null;
          key_context?: string | null;
          expires?: string | null;
          created?: string;
          comment?: string | null;
          user_data?: string | null;
        };
        Update: {
          key_type?:
            | "aead-ietf"
            | "aead-det"
            | "hmacsha512"
            | "hmacsha256"
            | "auth"
            | "shorthash"
            | "generichash"
            | "kdf"
            | "secretbox"
            | "secretstream"
            | "stream_xchacha20"
            | null;
          id?: string;
          status?: "default" | "valid" | "invalid" | "expired" | null;
          raw_key?: string | null;
          raw_key_nonce?: string | null;
          parent_key?: string | null;
          name?: string | null;
          associated_data?: string | null;
          key_id?: number | null;
          key_context?: string | null;
          expires?: string | null;
          created?: string;
          comment?: string | null;
          user_data?: string | null;
        };
      };
    };
    Functions: {
      randombytes_random: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      randombytes_uniform: {
        Args: { upper_bound: number };
        Returns: number;
      };
      randombytes_buf: {
        Args: { size: number };
        Returns: string;
      };
      crypto_secretbox_keygen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_secretbox_noncegen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_secretbox: {
        Args: { message: string; nonce: string; key: string };
        Returns: string;
      };
      crypto_secretbox_open: {
        Args: { ciphertext: string; nonce: string; key: string };
        Returns: string;
      };
      crypto_auth: {
        Args: { message: string; key: string };
        Returns: string;
      };
      crypto_auth_verify: {
        Args: { mac: string; message: string; key: string };
        Returns: boolean;
      };
      crypto_auth_keygen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_generichash: {
        Args: { message: string; key: unknown };
        Returns: string;
      };
      crypto_shorthash: {
        Args: { message: string; key: string };
        Returns: string;
      };
      crypto_box_noncegen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_box: {
        Args: {
          message: string;
          nonce: string;
          public: string;
          secret: string;
        };
        Returns: string;
      };
      crypto_box_open: {
        Args: {
          ciphertext: string;
          nonce: string;
          public: string;
          secret: string;
        };
        Returns: string;
      };
      crypto_sign: {
        Args: { message: string; key: string };
        Returns: string;
      };
      crypto_sign_open: {
        Args: { signed_message: string; key: string };
        Returns: string;
      };
      crypto_sign_detached: {
        Args: { message: string; key: string };
        Returns: string;
      };
      crypto_sign_verify_detached: {
        Args: { sig: string; message: string; key: string };
        Returns: boolean;
      };
      crypto_pwhash_saltgen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_pwhash: {
        Args: { password: string; salt: string };
        Returns: string;
      };
      crypto_pwhash_str: {
        Args: { password: string };
        Returns: string;
      };
      crypto_pwhash_str_verify: {
        Args: { hashed_password: string; password: string };
        Returns: boolean;
      };
      crypto_box_seal: {
        Args: { message: string; public_key: string };
        Returns: string;
      };
      crypto_box_seal_open: {
        Args: { ciphertext: string; public_key: string; secret_key: string };
        Returns: string;
      };
      crypto_kdf_keygen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_kx_new_keypair: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      crypto_kx_new_seed: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_kx_seed_new_keypair: {
        Args: { seed: string };
        Returns: unknown;
      };
      crypto_kx_client_session_keys: {
        Args: { client_pk: string; client_sk: string; server_pk: string };
        Returns: unknown;
      };
      crypto_kx_server_session_keys: {
        Args: { server_pk: string; server_sk: string; client_pk: string };
        Returns: unknown;
      };
      crypto_auth_hmacsha512_keygen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_auth_hmacsha512: {
        Args: { message: string; secret: string };
        Returns: string;
      };
      crypto_auth_hmacsha512_verify: {
        Args: { hash: string; message: string; secret: string };
        Returns: boolean;
      };
      randombytes_new_seed: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      randombytes_buf_deterministic: {
        Args: { size: number; seed: string };
        Returns: string;
      };
      crypto_sign_init: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_sign_update: {
        Args: { state: string; message: string };
        Returns: string;
      };
      crypto_sign_final_create: {
        Args: { state: string; key: string };
        Returns: string;
      };
      crypto_sign_final_verify: {
        Args: { state: string; signature: string; key: string };
        Returns: boolean;
      };
      crypto_sign_update_agg1: {
        Args: { state: string; message: string };
        Returns: string;
      };
      crypto_sign_update_agg2: {
        Args: { cur_state: string; initial_state: string; message: string };
        Returns: string;
      };
      crypto_sign_update_agg: {
        Args: { message: string };
        Returns: string;
      };
      crypto_sign_update_agg: {
        Args: { state: string; message: string };
        Returns: string;
      };
      crypto_box_new_keypair: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      crypto_sign_new_keypair: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      crypto_box_new_seed: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_box_seed_new_keypair: {
        Args: { seed: string };
        Returns: unknown;
      };
      crypto_sign_new_seed: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_sign_seed_new_keypair: {
        Args: { seed: string };
        Returns: unknown;
      };
      pgsodium_derive: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      crypto_auth_hmacsha256_keygen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_auth_hmacsha256: {
        Args: { message: string; secret: string };
        Returns: string;
      };
      crypto_auth_hmacsha256_verify: {
        Args: { hash: string; message: string; secret: string };
        Returns: boolean;
      };
      crypto_hash_sha256: {
        Args: { message: string };
        Returns: string;
      };
      crypto_hash_sha512: {
        Args: { message: string };
        Returns: string;
      };
      crypto_kdf_derive_from_key: {
        Args: {
          subkey_size: number;
          subkey_id: number;
          context: string;
          primary_key: string;
        };
        Returns: string;
      };
      derive_key: {
        Args: { key_id: number; key_len: unknown; context: unknown };
        Returns: string;
      };
      crypto_shorthash_keygen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_generichash_keygen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_secretbox: {
        Args: {
          message: string;
          nonce: string;
          key_id: number;
          context: unknown;
        };
        Returns: string;
      };
      crypto_secretbox_open: {
        Args: {
          message: string;
          nonce: string;
          key_id: number;
          context: unknown;
        };
        Returns: string;
      };
      crypto_auth: {
        Args: { message: string; key_id: number; context: unknown };
        Returns: string;
      };
      crypto_auth_verify: {
        Args: {
          mac: string;
          message: string;
          key_id: number;
          context: unknown;
        };
        Returns: boolean;
      };
      crypto_aead_ietf_keygen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_aead_ietf_noncegen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_aead_ietf_encrypt: {
        Args: {
          message: string;
          additional: string;
          nonce: string;
          key: string;
        };
        Returns: string;
      };
      crypto_aead_ietf_decrypt: {
        Args: {
          message: string;
          additional: string;
          nonce: string;
          key: string;
        };
        Returns: string;
      };
      crypto_aead_ietf_encrypt: {
        Args: {
          message: string;
          additional: string;
          nonce: string;
          key_id: number;
          context: unknown;
        };
        Returns: string;
      };
      crypto_aead_ietf_decrypt: {
        Args: {
          message: string;
          additional: string;
          nonce: string;
          key_id: number;
          context: unknown;
        };
        Returns: string;
      };
      crypto_secretstream_keygen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_stream_xchacha20_keygen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_stream_xchacha20_noncegen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_stream_xchacha20: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      crypto_stream_xchacha20_xor: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      crypto_stream_xchacha20_xor_ic: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      crypto_stream_xchacha20: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      crypto_stream_xchacha20_xor: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      crypto_stream_xchacha20_xor_ic: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      crypto_cmp: {
        Args: Record<string, unknown>;
        Returns: boolean;
      };
      crypto_generichash: {
        Args: { message: string; key: number; context: unknown };
        Returns: string;
      };
      crypto_shorthash: {
        Args: { message: string; key: number; context: unknown };
        Returns: string;
      };
      crypto_auth_hmacsha512: {
        Args: { message: string; key_id: number; context: unknown };
        Returns: string;
      };
      crypto_auth_hmacsha512_verify: {
        Args: {
          hash: string;
          message: string;
          key_id: number;
          context: unknown;
        };
        Returns: boolean;
      };
      crypto_auth_hmacsha256: {
        Args: { message: string; key_id: number; context: unknown };
        Returns: string;
      };
      crypto_auth_hmacsha256_verify: {
        Args: {
          hash: string;
          message: string;
          key_id: number;
          context: unknown;
        };
        Returns: boolean;
      };
      crypto_aead_det_keygen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_aead_det_encrypt: {
        Args: {
          message: string;
          additional: string;
          key: string;
          nonce: unknown;
        };
        Returns: string;
      };
      crypto_aead_det_decrypt: {
        Args: {
          ciphertext: string;
          additional: string;
          key: string;
          nonce: unknown;
        };
        Returns: string;
      };
      crypto_aead_det_encrypt: {
        Args: {
          message: string;
          additional: string;
          key_id: number;
          context: unknown;
          nonce: unknown;
        };
        Returns: string;
      };
      crypto_aead_det_decrypt: {
        Args: {
          message: string;
          additional: string;
          key_id: number;
          context: unknown;
          nonce: unknown;
        };
        Returns: string;
      };
      crypto_signcrypt_new_keypair: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      crypto_signcrypt_sign_before: {
        Args: {
          sender: string;
          recipient: string;
          sender_sk: string;
          recipient_pk: string;
          additional: string;
        };
        Returns: unknown;
      };
      crypto_signcrypt_sign_after: {
        Args: { state: string; sender_sk: string; ciphertext: string };
        Returns: string;
      };
      crypto_signcrypt_verify_before: {
        Args: {
          signature: string;
          sender: string;
          recipient: string;
          additional: string;
          sender_pk: string;
          recipient_sk: string;
        };
        Returns: unknown;
      };
      crypto_signcrypt_verify_after: {
        Args: {
          state: string;
          signature: string;
          sender_pk: string;
          ciphertext: string;
        };
        Returns: boolean;
      };
      crypto_signcrypt_verify_public: {
        Args: {
          signature: string;
          sender: string;
          recipient: string;
          additional: string;
          sender_pk: string;
          ciphertext: string;
        };
        Returns: boolean;
      };
      sodium_bin2base64: {
        Args: { bin: string };
        Returns: string;
      };
      sodium_base642bin: {
        Args: { base64: string };
        Returns: string;
      };
      version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_aead_det_noncegen: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      crypto_aead_det_encrypt: {
        Args: { message: string; additional: string; key_uuid: string };
        Returns: string;
      };
      crypto_aead_det_decrypt: {
        Args: { message: string; additional: string; key_uuid: string };
        Returns: string;
      };
      crypto_aead_det_encrypt: {
        Args: {
          message: string;
          additional: string;
          key_uuid: string;
          nonce: string;
        };
        Returns: string;
      };
      crypto_aead_det_decrypt: {
        Args: {
          message: string;
          additional: string;
          key_uuid: string;
          nonce: string;
        };
        Returns: string;
      };
      crypto_aead_ietf_encrypt: {
        Args: {
          message: string;
          additional: string;
          nonce: string;
          key_uuid: string;
        };
        Returns: string;
      };
      crypto_aead_ietf_decrypt: {
        Args: {
          message: string;
          additional: string;
          nonce: string;
          key_uuid: string;
        };
        Returns: string;
      };
      has_mask: {
        Args: { role: unknown; source_name: string };
        Returns: boolean;
      };
      mask_columns: {
        Args: { source_relid: unknown };
        Returns: Record<string, unknown>[];
      };
      decrypted_columns: {
        Args: { relid: unknown };
        Returns: string;
      };
      encrypted_columns: {
        Args: { relid: unknown };
        Returns: string;
      };
      create_mask_view: {
        Args: { relid: unknown; debug: unknown };
        Returns: undefined;
      };
      trg_mask_update: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      mask_role: {
        Args: { masked_role: unknown; source_name: string; view_name: string };
        Returns: undefined;
      };
      create_key: {
        Args: {
          key_type: unknown;
          name: unknown;
          raw_key: unknown;
          raw_key_nonce: unknown;
          parent_key: unknown;
          key_context: unknown;
          expires: unknown;
          associated_data: unknown;
        };
        Returns: unknown;
      };
      crypto_auth_hmacsha256: {
        Args: { message: string; key_uuid: string };
        Returns: string;
      };
      crypto_auth_hmacsha256_verify: {
        Args: { signature: string; message: string; key_uuid: string };
        Returns: boolean;
      };
      crypto_auth_hmacsha512: {
        Args: { message: string; key_uuid: string };
        Returns: string;
      };
      crypto_auth_hmacsha512_verify: {
        Args: { signature: string; message: string; key_uuid: string };
        Returns: boolean;
      };
      crypto_auth: {
        Args: { message: string; key_uuid: string };
        Returns: string;
      };
      crypto_auth_verify: {
        Args: { mac: string; message: string; key_uuid: string };
        Returns: boolean;
      };
      crypto_shorthash: {
        Args: { message: string; key_uuid: string };
        Returns: string;
      };
      crypto_generichash: {
        Args: { message: string; key_uuid: string };
        Returns: string;
      };
      crypto_kdf_derive_from_key: {
        Args: {
          subkey_size: number;
          subkey_id: number;
          context: string;
          primary_key: string;
        };
        Returns: string;
      };
      crypto_secretbox: {
        Args: { message: string; nonce: string; key_uuid: string };
        Returns: string;
      };
      crypto_secretbox_open: {
        Args: { message: string; nonce: string; key_uuid: string };
        Returns: string;
      };
      quote_assoc: {
        Args: Record<string, unknown>;
        Returns: string;
      };
      get_key_by_id: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      get_key_by_name: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      get_named_keys: {
        Args: { filter: unknown };
        Returns: unknown;
      };
      create_mask_view: {
        Args: { relid: unknown; subid: number; debug: unknown };
        Returns: undefined;
      };
      enable_security_label_trigger: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      disable_security_label_trigger: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      update_mask: {
        Args: { target: unknown; debug: unknown };
        Returns: undefined;
      };
      update_masks: {
        Args: { debug: unknown };
        Returns: undefined;
      };
      encrypted_column: {
        Args: { relid: unknown; m: Record<string, unknown>[] };
        Returns: string;
      };
    };
  };
  graphql: {
    Tables: {};
    Functions: {
      _internal_resolve: {
        Args: Record<string, unknown>;
        Returns: Json;
      };
      exception: {
        Args: { message: string };
        Returns: string;
      };
      comment_directive: {
        Args: { comment_: string };
        Returns: Json;
      };
      increment_schema_version: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      get_schema_version: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      resolve: {
        Args: Record<string, unknown>;
        Returns: Json;
      };
    };
  };
  graphql_public: {
    Tables: {};
    Functions: {
      graphql: {
        Args: Record<string, unknown>;
        Returns: Json;
      };
    };
  };
  realtime: {
    Tables: {};
    Functions: {};
  };
  _realtime: {
    Tables: {
      schema_migrations: {
        Row: {
          version: number;
          inserted_at: string | null;
        };
        Insert: {
          version: number;
          inserted_at?: string | null;
        };
        Update: {
          version?: number;
          inserted_at?: string | null;
        };
      };
      extensions: {
        Row: {
          id: string;
          type: string | null;
          settings: Json | null;
          tenant_external_id: string | null;
          inserted_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          type?: string | null;
          settings?: Json | null;
          tenant_external_id?: string | null;
          inserted_at: string;
          updated_at: string;
        };
        Update: {
          id?: string;
          type?: string | null;
          settings?: Json | null;
          tenant_external_id?: string | null;
          inserted_at?: string;
          updated_at?: string;
        };
      };
      tenants: {
        Row: {
          id: string;
          name: string | null;
          external_id: string | null;
          jwt_secret: string | null;
          inserted_at: string;
          updated_at: string;
          postgres_cdc_default: string | null;
          max_events_per_second: number;
          max_concurrent_users: number;
          max_bytes_per_second: number;
          max_channels_per_client: number;
          max_joins_per_second: number;
        };
        Insert: {
          id: string;
          name?: string | null;
          external_id?: string | null;
          jwt_secret?: string | null;
          inserted_at: string;
          updated_at: string;
          postgres_cdc_default?: string | null;
          max_events_per_second?: number;
          max_concurrent_users?: number;
          max_bytes_per_second?: number;
          max_channels_per_client?: number;
          max_joins_per_second?: number;
        };
        Update: {
          id?: string;
          name?: string | null;
          external_id?: string | null;
          jwt_secret?: string | null;
          inserted_at?: string;
          updated_at?: string;
          postgres_cdc_default?: string | null;
          max_events_per_second?: number;
          max_concurrent_users?: number;
          max_bytes_per_second?: number;
          max_channels_per_client?: number;
          max_joins_per_second?: number;
        };
      };
    };
    Functions: {};
  };
}
