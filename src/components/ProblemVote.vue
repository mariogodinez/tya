<script>
import HeaderComponent from './HeaderComponent.vue'

	export default {
		data(){
			return {
				problems: null,
				number: 0
			}
		},
		methods:{
			voteDown(id){
				axios.put('/api/problem/voteDown/' + id)
				.then(res => {
					console.log(res)
				})
			},
			voteUp(id){
				axios.put('/api/problem/voteUp/' + id)
				.then(res => {
				})
			},
			next(){
				let length  = this.problems.length -1
				if(this.number < length){
					this.number ++
				}
				
			},
			back(){
				if(this.number > 0){
					this.number --
				}
				
			}
		},
		computed:{
			currentProblem(){
				if(this.problems){
					return this.problems[this.number]
				}
				
			}
		},
		components:{
			HeaderComponent
		},
		created(){
			axios.get('/api/problems')
				.then(res => {

					this.problems = res.data.problems
				})
		}
	}
</script>

<style>
	.box-question{
		background-color:#e5e9ed;
		border-radius: 5px;
		padding:20px;
		min-height: 300px;
	}
	.box-question .color-darkblue{
		line-height: 29px;
	}

	.bounce-enter-active {
	  animation: bounce-in .5s;
	}
	.bounce-leave-active {
	  animation: bounce-in .5s reverse;
	}
	@keyframes bounce-in {
	  0% {
	    transform: scale(0);
	  }
	  50% {
	    transform: scale(1.5);
	  }
	  100% {
	    transform: scale(1);
	  }
	}
</style>

<template>
<transition appear  name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
	<section class="back-white padding-top70">
		<div class="center-block" style="max-width:600px;">
			<article class="padding20 margin-top10">
				<h3 class="font-normal color-lightgray font20">Problema:</h3>
				<h3 class="margin0 text-uppercase font20 color-darkblue">
					<span class="margin-left20 color-gold" v-if="currentProblem">
						{{currentProblem.name}}
					</span>
				</h3>
			</article>
			<article class="padding10">
				<div class="box-question flex flex-center flex-middle">
					<h3 class="margin0 color-darkblue text-center" v-if="currentProblem">
						{{currentProblem.description}}
					</h3>

				</div>
			</article>

			<article class="flex flex-center flex-middle">
				<div>
					<div class="square70 margin-right30 box-shadow pointer margin20-40 rounded flex flex-center flex-middle">
						<span class="font35 color-red" @click="voteDown(currentProblem._id)">
							<i class="fa fa-times" aria-hidden="true"></i>
						</span>
					</div>
					<p class="text-center margin0 pointer font20 color-red" @click="back" >
						<span :class="{'color-gray': number == 0}">
							<span class="ion-arrow-left-b" ></span>
							Anterior
						</span>
						
					</p>
				</div>

				

				

				<div>
					<div class="square70 box-shadow pointer margin20-40 rounded flex flex-center flex-middle btn-active">
						<span class="font35 color-green" @click="voteUp(currentProblem._id)">
							<i class="fa fa-check" aria-hidden="true"></i>
						</span>
					</div>
					<p class="text-center margin0 pointer font20 color-red" @click="next">
						<span :class="{'color-gray': number == problems.length -1}">
							Siguiente
							<span class=" ion-arrow-right-b"></span>
						</span>
						
					</p>
				</div>
			</article>
		</div>
		
	</section>
</transition>
</template>