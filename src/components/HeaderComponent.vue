<script type="text/javascript">
	export default {
		data(){
			return {
				available: null
			}
		},
		mounted(){

		},
		methods:{
			toggleMenu(){
				$('#my-nav').toggleClass('right0')
			},
			logout(){
				localStorage.removeItem('token')
				localStorage.removeItem('user')
	            this.$store.dispatch('logoutUser')
	            this.$router.replace('/login')
			}
		},
		computed:{
			logged(){
				return this.$store.state.logged
			}
		},
		created(){

		}
	}
</script>

<template>
	<section class="" v-if="logged">
		<header class="app-header back-lightgray flex flex-middle flex-between" >
			<article class="flex flex-middle">
				<div class="color-white margin-right15 pointer" style="font-size: 45px;border-right:1px solid lightgray; padding:8px 27px 8px 0" @click="toggleMenu">
					<span class="ion-navicon " id="burger-menu" ></span>
				</div>
				<div class="flex flex-middle">

					<div class="" >
						<figure class="logo">
							<img src="img/tya_white.png" alt="">
						</figure>
					</div>
				</div>
			</article>
			<article>
				<figure class="margin0" style="width:130px; margin-right:100px !important;">
					<img class="width100" src="img/unexpect_blue.png" alt="">
				</figure>
			</article>
		</header>

		<nav class="my-nav" id="my-nav">
		<ul class="my-nav-list">

			<li class="my-nav-list-item">
				<router-link to="/">
					<span class="margin-right5">
						<i class="fa fa-indent" aria-hidden="true"></i>
					</span>
					Registrar problema
				</router-link>
			</li>

			<li class="my-nav-list-item">
				<router-link to="/results">
					<span class="margin-right5">
						<i class="fa fa-line-chart" aria-hidden="true"></i>
					</span>
					Mis problemas
				</router-link>
			</li>
			<li class="my-nav-list-item">
				<router-link to="/problem-vote">
					<span class="margin-right5">
						<i class="fa fa-calendar-check-o" aria-hidden="true"></i>
					</span>
					Votar problemas
				</router-link>
			</li>
			<li class="my-nav-list-item">
				<router-link to="/users">
					<span class="margin-right5">
						<i class="fa fa-key" aria-hidden="true"></i>
					</span>
					Usuarios
				</router-link>
			</li>
			<li class="my-nav-list-item logout" >
				<a @click="logout" class="pointer">
					<span class="margin-right5">
						<i class="fa fa-lock" aria-hidden="true"></i>
					</span>
					<span>Cerrar sesión</span>
				</a>
			</li>
		</ul>
	</nav>
	</section>
</template>
