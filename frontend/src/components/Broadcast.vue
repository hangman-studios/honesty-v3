<script setup lang="ts">
import type { RealtimeChannel } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'
const client = useSupabaseClient<Database>()
const message = useRef('');
let realtimeChannel: RealtimeChannel

const { pending, data: endpoints, refresh: refreshEndpoints, status } = await useAsyncData('notification_states', async () => {
    const { data } = await client.from('notification_states').select("endpoint")
    return data
})

const broadcast = async () => {
    endpoints.value?.forEach(endpoint => {

    })
}

onMounted(() => {
    // Real time listener for new workouts
    realtimeChannel = client.channel('public:notification_states').on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rooms' },
        () => refreshEndpoints()
    )
    realtimeChannel.subscribe()
})
// Don't forget to unsubscribe when user left the page
onUnmounted(() => {
    client.removeChannel(realtimeChannel)
})
</script>
<template>
    <div>
        <input v-model="message" />
        <button @click="broadcast">Broadcast</button>
    </div>
</template>