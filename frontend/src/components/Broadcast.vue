<script setup lang="ts">
import type { RealtimeChannel } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'

const message = useRef('')

const broadcast = async () => {
    const { body } = await $fetch('/api/notify', {
    method: 'post',
    body: { title: message.value, room_id: 0 }
  })
}

</script>
<template>
    <div>
        <input v-model="message" />
        <button @click="broadcast">Broadcast</button>
    </div>
</template>