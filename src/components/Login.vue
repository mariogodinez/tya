<script >
	export default {
		name:'login',
		data() {
			return {
				userInfo: {
					email:'',
					password:''
				}
			}
		},
		beforeCreate () {
			if (this.$store.state.logged) {
                this.$router.push('/')
            }
        },
		mounted() {
            
			/*this.$http.get(url + '/api/user-rol').then(response=>{
				console.log(response.data)
			})*/
		},
		methods:{
			gopass(){
				this.$router.push('/nueva-contrasena')
			},
			sendForm() {
				let self = this
					if(is.empty(self.userInfo.email) && is.empty(self.userInfo.password)){
						sAlert({
						title: "Error!",
						  text: "Por favor, ingresa tus datos!",
						  type: "error",
						  confirmButtonText: "OK",
						  confirmButtonColor: "#a8843f"
						})
						return false
					}
					if(is.not.email(self.userInfo.email)){
						sAlert({
						title: "Error!",
						  text: "Ingresa un email válido!",
						  type: "error",
						  confirmButtonText: "OK",
						  confirmButtonColor: "#a8843f"

						})

						return false
					}

					if(is.empty(self.userInfo.password)){
						sAlert({
						title: "Error!",
						  text: "Olvidaste escribir tu contraseña!",
						  type: "error",
						  confirmButtonText: "OK",
						  confirmButtonColor: "#a8843f"

						})
						return false
					}

					if(is.email(self.userInfo.email) && is.not.empty(self.userInfo.password)) {
						$('.loader-wrap').toggleClass('hide')
						setTimeout(function(){
							axios.post('/api/login', self.userInfo).then(res=>{
								console.log(res)
								$('.loader-wrap').toggleClass('hide')

								if( res.status == 200 ){
									
									
									localStorage.token = res.data.token
									localStorage.user = JSON.stringify(res.data.userLogged)
									self.$store.dispatch('setUser', res.data.userLogged)
									self.$store.dispatch('loginUser')

									self.$router.push('/')

								}
							}).catch(error=>{
								$('.loader-wrap').toggleClass('hide')

								console.log(error)
								sAlert({
								title: "Error!",
								  text: "Las credenciales no coinciden!",
								  type: "error",
								  confirmButtonText: "Intentar de nuevo",
								  confirmButtonColor: "#a8843f"

								})
								console.log(error)
							})
						}, 1000)
						

					}


				
			},
			forgotPassword(){
				this.$router.push('/contraseña-olvidada')
			}
		}
	}
</script>
<style>
	.login{
		background: #eceff1;
	}
	.sweet-alert p{
		font-size: 1.2em
	}
</style>
<template>
<transition appear  name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
	<section class="login flex flex-center flex-middle height100vh">
		<article class="login-form  flex flex-column flex-middle padding40 margin-top20" style="width:400px;">
			<figure class="margin-bottom30" style=" width:160px; margin-top:90px;" @click="gopass">
				<img src="http://elbuenfin.org/media/logo800x500tya.png" alt="" class="width100">

			</figure>
			<div class="margin-bottom20">
				<h3 class="text-uppercase  color-darkblue margin0 font20 text-center">
					Registro de problemas
				</h3>
			</div>

					<div style="border-radius: 5px 5px 0 0;" class="my-input-simple flex flex-middle" id="emailBox">
						<span class="margin-left10 fa fa-user font20" style="color:#666"></span>
						<input type="email" placeholder="Email" class="my-input-simple border0" v-model="userInfo.email" style="color:#6d6d6d"
					>
					</div>


					<div style="border-radius:0 0 5px 5px;" class="my-input-simple flex flex-middle">
						<span class="margin-left10 fa fa-lock font20" style="color:#666"></span>
						<input type="password" placeholder="Contraseña" class="my-input-simple border0" v-model="userInfo.password" style="color:#6d6d6d"
					>
					</div>

				<button class="center-block  my-btn back-gold" style="width:250px; margin:20px auto !important;" @click="sendForm">
					<span class="font20">
						Entrar
					</span>

				</button>
			<div class="font20 margin-bottom30">
				<div class="margin-top10">
					<p class="anchor color-darkblue text-center" @click="forgotPassword">
						Olvidé mi contraseña
					</p>
				</div>
			</div>
			<div class="padding20">

			</div>
		</article>
	</section>
</transition>

</template>
<style type="text/css">

</style>