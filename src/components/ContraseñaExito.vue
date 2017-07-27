<script>
	export default {
		data(){
			return {

			}
		},
		methods:{
			goLogin(){
				this.$router.replace('/login')
			}
		}
	}
</script>

<template>
	<section class="back-white padding-top70">
		<article class="padding20 margin-top20 center-block text-center" style="max-width:420px;">
			<h4 class="text-uppercase">Recuperar contraseña</h4>
			<p class="font20 margin-top10">
				Se ha creado una nueva contraseña.
			</p>
			<div class="padding5">
				<figure class="center-block margin-top20 margin-bottom20" style="width:80px;">
					<img class="width100" src="/img/tick-inside-circle.svg" alt="">
				</figure>
			</div>

			<p class="pointer margin-top20 font20 font-bold color-gold" @click="goLogin">
				Entrar
				<span>
					<i class="fa fa-angle-double-right" aria-hidden="true"></i>
				</span>
			</p>
		</article>
	</section>
</template>

<style>

</style>