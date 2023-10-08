<script setup>
const user = useSupabaseUser()
if (!process.server && 'serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('./service-worker.js').then(serviceWorkerRegistration => {
        console.info('Service worker was registered.');
        console.info({ serviceWorkerRegistration });
    }).catch(error => {
        console.error('An error occurred while registering the service worker.');
        console.error(error);
    });
} else {
    console.error('Browser does not support service workers or push messages.');
}
</script>

<template>
    <div class="container" style="padding: 50px 0 100px 0">
        <Account v-if="user" />
        <NuxtLink v-else to="/login">
            login & register!
        </NuxtLink>
        <Rooms v-if="user" />
        <Notify v-if="user" />
    </div>
</template>