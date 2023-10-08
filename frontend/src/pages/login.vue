<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const token = ref('')

const signInWithOtp = async () => {
    const { error } = await supabase.auth.signInWithOtp({
        email: email.value,
        options: {
            emailRedirectTo: 'https://honesty.niiclas.de/confirm',
        }
    })
    if (error) console.log(error)
}
const verify = async () => {
    const { error } = await supabase.auth.verifyOtp({
        email: email.value,
        token: token.value,
        type: 'magiclink'
    })
    if (error) { console.log(error) }
    else {
        navigateTo('/confirm')
    }
}
</script>
<template>
    <div>
        <button @click="signInWithOtp">
            Sign In with E-Mail
        </button>
        <input v-model="email" type="email" />
    </div>
    <div>
        <button @click="verify">
            verify
        </button>
    </div>
    <input v-model="token" />
</template>
