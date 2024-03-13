<template>
    <div class="pt-16">
        <form v-if="!waittingOnVerification" action="#" @submit.prevent="handleLogin">
            <h1 class="text-3xl font-semibold mb-4">Enter your phone number</h1>
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="text" v-maska data-maska="#### ### ####" name="phone" id="phone" required
                            v-model="credentials.phone" placeholder="0123 456 789"
                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button type="submit" @submit.prevent="handleLogin"
                        class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Continue</button>
                </div>
            </div>
        </form>

        <form v-else action="#" @submit.prevent="handleVerification">
            <h1 class="text-3xl font-semibold mb-4">Enter the verification code</h1>
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="text" v-maska data-maska="# # # # # #" name="verifyCode" id="verifyCode" required
                            v-model="credentials.login_code" placeholder="1 2 3 4 5 6"
                            class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button type="submit" @submit.prevent="handleVerification"
                        class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Verify</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { vMaska } from 'maska';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()

const credentials = reactive({
    phone: null,
    login_code: null
});

const waittingOnVerification = ref(false);

onMounted(() => {
    if (localStorage.getItem('token')) {
        router.push({ name: 'landing' });
    }
})

const handleLogin = () => {
    axios.post('http://localhost:8000/api/login', {
        phone: credentials.phone.replace(/\s/g, '').replace(' ', '')
    })
        .then(response => {
            console.log(response.data);
            waittingOnVerification.value = true;
        })
        .catch(error => {
            console.log(error.response);
            // alert(error.response.data.message);
        });
}

const handleVerification = () => {
    axios.post('http://localhost:8000/api/login/verify', {
        phone: credentials.phone.replace(/\s/g, '').replace(' ', ''),
        login_code: credentials.login_code.replace(/\s/g, '').replace(' ', '')
    })
        .then(response => {
            console.log(response.data);
            localStorage.setItem('token', response.data);
            router.push({ name: 'landing' });
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data.message);
        });
}
</script>