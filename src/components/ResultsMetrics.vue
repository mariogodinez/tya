<script>
	import HeaderComponent from './HeaderComponent.vue'
	export default {
		data(){
			return {
				problems: null
			}
		},
		computed:{
			problemsLength(){
				return this.problems.length || 0
			}
		},
		components: {
			HeaderComponent
		},
		methods:{
			addProblem(){
				this.$router.push('/')
			}
		},
		beforeCreate () {
            if (!this.$store.state.logged) {
                this.$router.replace('/login')
            }
        },
		created(){
			axios.get('/api/problems')
				.then(res => {

					this.problems = res.data.problems
				})
		}
	}
</script>

<template>
<transition appear  name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
	<section class="padding-top70 back-white">
		<section class="padding0-20" v-if="problems.length > 0">
			<article class="padding10-20 margin-top20">
				<h3 class="margin0 text-uppercase font20 color-darkblue">
					Resultados y Métricas <span>({{problemsLength}})</span>
				</h3>
			</article>

			<article class="back-white ">
				<div class="padding20">
					<input class="back-grisclaro my-input padding10" type="text" placeholder="Buscar...">
				</div>

				<div class="" v-if="problems">
					<article class="margin-bottom20 border-bottom1 padding0-20 " v-for="(item, index) in problems">
						<div class="flex flex-between flex-middle margin-bottom20">
							<h4 class="margin0 color-gold">{{item.name}}</h4>
							<span class="square25 color-white rounded flex flex-center flex-middle" style="background: #98a2a8;">
								<i class="fa fa-chevron-right " style="position: relative; left: 1px;"></i>
							</span>
						</div>
						<div class="flex">
							<div class="width100 padding0-20" style="border-right:1px solid gray;">
								<h5 style="padding-bottom:2px;" class="margin0 text-center color-lightgray font-normal">Vistos</h5>
								<h4 class="color-darkblue margin0 text-center">{{item.seen}}</h4>
							</div>
							<div class="width100 padding0-20" style="border-right:1px solid gray;">
								<h5 style="padding-bottom:2px;" class="margin0 text-center color-lightgray font-normal">Rechazados</h5>
								<h4 class="color-darkblue margin0 text-center">{{item.rejected.length}}</h4>
							</div>
							<div class="width100 padding0-20" style="border-right:1px solid gray;">
								<h5 style="padding-bottom:2px;" class="margin0 text-center color-lightgray font-normal">Aprobados</h5>
								<h4 class="color-darkblue margin0 text-center">{{item.aproved.length}}</h4>
							</div>
							<div class="width100 padding0-20">
								<h5 style="padding-bottom:2px;" class="margin0 text-center color-lightgray font-normal">Porcentaje</h5>
								<h4 class="color-darkblue margin0 text-center">84%</h4>
							</div>

							<div class="padding0" style="min-width:350px;">
								<p>
									<h5 class="margin0 color-darkblue font1em">
										<span class="font-normal">{{item.usersProblem}}</span>
										<span class="color-gold">... intentan ...</span>
										<span class="font-normal">{{item.activity}}</span>
										<span class="color-gold">... pero ...</span>

										<span class="font-normal">{{item.description}}</span>
										
									</h5>
								</p>
							</div>
						</div>
					</article>
				</div>
				
			</article>
		</section>
		<div style="margin-top:150px;" class="text-center" v-if="problems.length == 0">
			<span class="fa fa-database " style="font-size:50px;"></span>
			<h3 class="text-uppercase text-center margin-top20">No Existen problemas ingresados</h3>
			<button @click="addProblem" class="margin-top20 my-btn back-gold center-block">Registrar nuevo problema</button>
		</div>
	</section>
</transition>
</template>