<script >
	export default {
		name:'login', 
		data() {
			return {
				userInfo: {
					email:'hulk@tya.com',
					password:'test-1123'
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
				this.$http.post(url +'/login', this.userInfo).then(res=>{
					if( res.status == 200 ){
						this.$router.replace(res.data.redirectTo)
						location.reload()
					}
				}).catch(error=>{
					//Si soy 401 reload o router a vista login
					if(error.status == 401){
						badRequest()
					}
				})
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
	<section class="login flex flex-center flex-middle height100vh">
		<article class="login-form  flex flex-column padding40">
			<figure style="padding:55px;">
				<img src="http://tya.dev/assets/app/img/tya-logo-full.png" alt="" class="width100">
			</figure>
			<div class="margin-bottom20">
				<h3 class="text-uppercase  color-darkblue margin0 font20 text-center">			Registro de problemas
				</h3>
			</div>

			<div class="margin-bottom30">
				<label for="" class="width100 margin0">
					<div style="border-radius: 5px 5px 0 0; background:#c9cbcd;" class="my-input back-grisclaro flex flex-middle">
						<span class="fa fa-user font20" style="color:#666"></span>
						<input type="email" placeholder="Contraseña" class="my-input border0" v-model="userInfo.email" style="color:#6d6d6d"
					>
					</div>
					
					
				</label>

				<label for="" class="width100 margin0">
					<div style="border-radius:0 0 5px 5px; background:#c9cbcd;" class="my-input back-grisclaro flex flex-middle">
						<span class="fa fa-lock font20" style="color:#666"></span>
						<input type="password" placeholder="Email" class="my-input border0" v-model="userInfo.password" style="color:#6d6d6d"
					>
					</div>
					
				</label>
				<label for="" class="width100 margin-top20">
					<input type="button" class=" my-input text-uppercase back-gold color-white" value="log in"
					@click.prevent="sendForm">
				</label>


			</div>

			<div class="font20 margin-bottom30">
				<label for="" class="width100 margin0">
					<input type="checkbox">
					<span>Recuérdame</span>
				</label>

				<div class="margin-top10">
					<p class="anchor color-darkblue">
						Olvidé mi contraseña
					</p>
				</div>
			</div>
			<div class="flex flex-center margin-top20">
				<figure class="" style="width:170px">
					<img class="width100" src="http://tya-register.dev/assets/app/img/unexpect_blue.png" alt="" style="filter:grayscale()">
				</figure>
			</div>
		</article>
	</section>
</template>
