<script lang="ts" setup>
import type { RealtimeChannel } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'
const client = useSupabaseClient<Database>()
const newRoomName = ref("")
let realtimeChannel: RealtimeChannel
// Fetch rooms and get the refresh method provided by useAsyncData
const { pending, data: rooms, refresh: refreshRooms, status } = await useAsyncData('rooms', async () => {
    const { data } = await client.from('rooms').select("name, id")
    return data
})

async function addRoom() {
    const user = useSupabaseUser()
    if (user.value) {
        const { error } = await client.from("rooms").insert({ user_id: user.value.id, name: newRoomName.value })
        console.log(error)
    }
}

// Once page is mounted, listen to changes on the `rooms` table and refresh rooms when receiving event
onMounted(() => {
    // Real time listener for new workouts
    realtimeChannel = client.channel('public:rooms').on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rooms' },
        () => refreshRooms()
    )
    realtimeChannel.subscribe()
})
// Don't forget to unsubscribe when user left the page
onUnmounted(() => {
    client.removeChannel(realtimeChannel)
})

</script>
<template>
    <div v-if="pending && !rooms?.length">Loading...</div>
    <div>
        <div v-for="room in rooms" :key="room.id">{{ room.name }}</div>
    </div>
    <input v-model="newRoomName" />
    <button @click="addRoom">Add</button>
</template>