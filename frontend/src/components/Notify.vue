<script setup lang="ts" >
import type { Database } from '../types/database.types'
const client = useSupabaseClient<Database>()
const config = useRuntimeConfig()
const subscribeState = ref(false)
onMounted(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration!.pushManager.getSubscription();
    const user = useSupabaseUser()
    if (subscription && user.value) {
        const { error, count } = await client
            .from("notification_states")
            .select()
            .eq('endpoint', subscription.endpoint)
            .eq('user_id', user.value.id)
        console.log(error)
        if (!error && (count || 0) >= 1) {
            subscribeState.value = true
        }
    }
});
async function subscribe() {
    const result = await Notification.requestPermission();
    if (result === 'denied') {
        console.error('The user explicitly denied the permission request.');
        return;
    }
    if (result === 'granted') {
        console.info('The user accepted the permission request.');
    }
    const registration = await navigator.serviceWorker.getRegistration();
    const subscribed = await registration!.pushManager.getSubscription();
    if (subscribed) {
        console.info('User is already subscribed.');
        subscribeState.value = true
        return;
    }
    const subscription = await registration!.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(config.public.webPushPublicKey as string)
    });
    const user = useSupabaseUser()
    if (user.value) {
        const { error } = await client
            .from("notification_states")
            .insert({ user_id: user.value.id, endpoint: subscription.endpoint, expiration_time: subscription.expirationTime })
        console.log(error)
        subscribeState.value = true
    }
}
async function unsubscribe() {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration!.pushManager.getSubscription();
    const user = useSupabaseUser()
    if (subscription && user.value) {
        const { error } = await client
            .from("notification_states")
            .delete()
            .eq('endpoint', subscription.endpoint)
            .eq('user_id', user.value.id)
        console.log(error)
        if (!error) {
            await subscription.unsubscribe()
            subscribeState.value = false
        }
    }

}
function urlB64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
</script>
<template>
    <button v-if="subscribeState" @click="unsubscribe">Unsubscribe</button>
    <button v-else @click="subscribe">Subscribe</button>
</template>