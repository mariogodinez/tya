<script>
import HeaderComponent from './HeaderComponent.vue'

	export default {
		data(){
			return {
				problems: null,
				number: 0,
				user: ''
			}
		},
		methods:{
			fadeToggle(){
				$('#fadeToggle').slideToggle(200)
				setTimeout(function(){
					$('#fadeToggle').slideToggle(200)
				},500)
			},
			addProblem(){
				this.$router.push('/')
			},
			voteDown(id){
				console.log(this.user)
				let self = this
				axios.post('/api/problem/voteDown/' + id, {user: self.user})
				.then(res => {
					self.getProblems(true)
					console.log(res)
				})
			},
			voteUp(id){
				console.log(this.user)
				let self = this
				axios.post('/api/problem/voteUp/' + id, {user: self.user})
				.then(res => {
					self.getProblems(true)
					console.log(res)
				})
			},
			next(){ 
				let self = this
				let length  = this.problems.length - 1
				if(this.number < length){
					this.fadeToggle()
					setTimeout( function(){
						self.number ++
					},300)
					
				}
				
			},
			back(){ 
				let self = this
				if(this.number > 0){
					this.fadeToggle()
					setTimeout( function(){
						self.number --
					},300)
				}
				
			},
			getProblems(vote){
				let self = this
				axios.get('/api/problems')
					.then(res => {

						self.problems = res.data.problems
					})

				if(vote){
					self.next()
				}
			}
		},
		computed:{
			currentProblem(){
				if(this.problems){
					return this.problems[this.number]
				}
				
			},
			votedUser(){
				let self = this
				let user = this.currentProblem.votedBy.filter(item => {
					return item == self.user
				})

				if(user.length > 0){
					return true
				} else {
					return false
				}
			}
		},
		components:{
			HeaderComponent
		},
		beforeCreate () {
            if (!this.$store.state.logged) {
                this.$router.replace('/login')
            }
        },
		created(){
			this.getProblems()
			let user = JSON.parse(localStorage.getItem('user'))
			this.user = user
		}
	}
</script>

<style>
	.box-question{
		background-color:#e5e9ed;
		border-radius: 5px;
		min-height: 300px;
		padding: 20px;
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
	<section class="back-white padding-top70 relative" style="height:100vh;">
		<div class="center-block" style="max-width:600px;" v-if="problems.length > 0">
		<br>
			<div class="padding20" style="min-height:300px;">
				<h3 class="font-normal color-lightgray font20">Problema:</h3>
				<section v-if="currentProblem" id="fadeToggle">
					<article class="">
						<h3 class="margin10-0 text-uppercase font20 color-darkblue">
							<span class="margin-left20 color-gold">
								{{currentProblem.name}}
							</span>
						</h3>
					</article>
					<article class="">
						<div class="box-question flex flex-center flex-middle">

							<h3 class="margin0 color-darkblue font20 text-center">
							<span class="font-normal">{{currentProblem.usersProblem}}</span>
							<span class="color-gold">... intentan ...</span>
							<span class="font-normal">{{currentProblem.activity}}</span>
							<span class="color-gold">... pero ...</span>

							<span class="font-normal">{{currentProblem.description}}</span>
								
							</h3>
						</div>
					</article>
				</section>
			</div>
				

			

			<article class="flex flex-column flex-center flex-middle" style="position:absolute; bottom:3vh; left:50%; right:50%;">
				<span v-show="votedUser" class="color-green font-bold text-center relative" style="width:290px; top:15px;">Ya has votado este problema!</span>

				<section class="flex flex-center flex-middle">
					<div>
						<button class="square70 margin-right30 box-shadow pointer margin20-40 rounded flex flex-center flex-middle" @click="voteDown(currentProblem._id)" :disabled="votedUser">
							<span class="font35 color-red" >
								<i class="fa fa-times" aria-hidden="true"></i>
							</span>
						</button>
						<p class="text-center margin0 pointer font20 color-red" @click="back" >
							<span :class="{'color-gray': number == 0}">
								<span class="ion-arrow-left-b" ></span>
								Anterior
							</span>
							
						</p>
					</div>

					

					

					<div>

						<button class="square70 box-shadow pointer margin20-40 rounded flex flex-center flex-middle btn-active" @click="voteUp(currentProblem._id)" :disabled="votedUser">
							<span class="font35 color-green" >
								<i class="fa fa-check" aria-hidden="true"></i>
							</span>
						</button>
						<p class="text-center margin0 pointer font20 color-red" @click="next">
							<span :class="{'color-gray': number == problems.length -1}">
								Siguiente
								<span class=" ion-arrow-right-b"></span>
							</span>
							
						</p>
					</div>
				</section>
				

			</article>
		</div>
		<div style="margin-top:150px;" class="text-center" v-if="problems.length == 0">
			<span class="fa fa-database " style="font-size:50px;"></span>
			<h3 class="text-uppercase text-center margin-top20">No Existen problemas ingresados</h3>
			<button @click="addProblem" class="margin-top20 my-btn back-gold center-block">Registrar nuevo problema</button>
		</div>
		
	</section>
</transition>
</template>