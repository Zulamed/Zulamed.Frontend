<script lang="ts">
	import { auth } from '$lib/firebase/client';
	import { sendEmailVerification } from 'firebase/auth';
    import { logout } from '$lib/stores/auth';

	function sendVerificationEmail() {
        if (auth.currentUser){
            sendEmailVerification(auth.currentUser, {url: "http://localhost:5173"});
        }
    }

</script>

<div>
	<div>You need to be verified to use your account</div>
	<div>Please verify your email:</div>
	<button on:click={logout}>Logout</button>
	<button on:click={sendVerificationEmail}>Send verification email</button>
</div>


<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
</style>
