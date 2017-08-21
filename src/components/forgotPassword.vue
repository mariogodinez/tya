<script type="text/javascript">
	export default {
		data () {
			return {
				email: '',
				error: false
			}
		},
		methods: {
			sendEmail () {
				let self = this
				if(is.empty(self.email) ){
						sAlert({
						title: "Error!",
						  text: "Por favor, ingresa un email!",
						  type: "error",
						  confirmButtonText: "OK",
						  confirmButtonColor: "#a8843f"
						})
						return false
					}
				if(is.not.email(self.email)){
						sAlert({
						title: "Error!",
						  text: "Ingresa un email válido!",
						  type: "error",
						  confirmButtonText: "OK",
						  confirmButtonColor: "#a8843f"

						})

						return false
					}
				$('.loader-wrap').toggleClass('hide')
				setTimeout(function(){
					axios.post('/api/mail-reset', {email: self.email})
						.then(res => {
							if(res.status == 200){
							$('.loader-wrap').toggleClass('hide')

								self.$router.replace('/correo-enviado')
							}
						})
						.catch(err => {
							$('.loader-wrap').toggleClass('hide')
							
							self.error = true

						})
				},1000)
				
			}
		}
	}
</script>

<template>
	<section class="back-white padding-top70">
		<article class="padding20 margin-top20 center-block" style="max-width:420px;">
			<h4 class="text-uppercase">Olvidé mi contraseña</h4>
			<p class="font20 margin-top10">
				Ingresa tu usuario para recuperar tu contraseña
			</p>
			<div>
				<input type="text" v-model="email" class="my-input-simple back-grisclaro" :class="{ border2gold : error}" placeholder="ID...">
			</div>
			<p class="font20 margin-top10 color-gold" v-if="error">
				No se encuentra el registro del ID
			</p>
			<p class="margin-top20" style="color:#aaa; ">
				Se enviará un enlace al correo electrónico registrado para recuperar tu contraseña.
			</p>
			<div class="center-block padding20-0" style="width:200px;">
				<button class="my-btn width100 back-gold color-white text-uppercase" @click="sendEmail">Enviar</button>
			</div>
		</article>

	</section>
</template>

<style>
	.border2gold{
		border: 2px solid #A8843F;
	}
</style>