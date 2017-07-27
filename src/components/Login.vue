<script >
	export default {
		name:'login',
		data() {
			return {
				userInfo: {
					email:'',
					password:'',
					displayName: ''
				}
			}
		},
		mounted() {
			/*this.$http.get(url + '/api/user-rol').then(response=>{
				console.log(response.data)
			})*/
		},
		methods:{
			sendForm() {
				let self = this
				axios.post('/api/signup', this.userInfo).then(res=>{
					if( res.status == 200 ){
						console.log(res)
						self.$router.push('/')
						localStorage.token = res.data.token
					}
				}).catch(error=>{
					console.log(error)
				})
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
</style>
<template>
<transition appear  name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
	<section class="login flex flex-center flex-middle height100vh">
		<article class="login-form  flex flex-column flex-middle padding40 margin-top20" style="width:400px;">
			<figure class="margin-bottom30" style=" width:200px; margin-top:70px;">
				<img src="img/tya_white.png" alt="" class="width100">
			</figure>
			<div class="margin-bottom20">
				<h3 class="text-uppercase  color-darkblue margin0 font20 text-center">
					Registro de problemas
				</h3>
			</div>



					<div style="border-radius: 5px 5px 0 0;" class="my-input-simple flex flex-middle">
						<span class="margin-left10 fa fa-user font20" style="color:#666"></span>
						<input type="email" placeholder="Email" class="my-input-simple border0" v-model="userInfo.email" style="color:#6d6d6d"
					>
					</div>




					<div style="border-radius:0;" class="my-input-simple flex flex-middle">
						<span class="margin-left10 fa fa-user font20" style="color:#666"></span>
						<input type="text" placeholder="Nombre" class="my-input-simple border0" v-model="userInfo.displayName" style="color:#6d6d6d"
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
