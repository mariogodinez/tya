<script>
	import axios from 'axios'
	import HeaderComponent from './HeaderComponent.vue'
	export default {
		name:'Problem',
		data(){
			return {
				problemObj: {
					name:'',
					usersProblem: '',
					activity: '',
					description: '',
					canVote: [],
					peopleWithProblem: null,
					peopleWithoutProblem: null,
					createdBy: ''
				},
				allUsers: [],
				areas: [],
				todos: true
			}
		},
		components: {
			HeaderComponent
		},
		computed:{
			userInfo(){
				return this.$store.getters.userInfo
			}
		},
		beforeCreate () {
            if (!this.$store.state.logged) {
                this.$router.replace('/login')
            }
        },
		created(){
			let self = this
			this.getAllUsers()
			
			
		},
		methods:{
			addCanVote(item,index){
				
				this.areas[index].checked = !this.areas[index].checked
					let allChecked = this.areas.filter(i => {
						return i.checked
				})
				console.log(allChecked)
				if(allChecked.length < this.areas.length){
					this.todos = false
					// des-selecccionar 'todos'
				}

				if(allChecked.length == this.areas.length){
					this.todos = true

					// selecccionar 'todos'
				}
			},
			toggleAllAreas(){
				let self = this
				this.todos = !this.todos
				this.areas.forEach( item => item.checked = self.todos)
			},
			getAllUsers(){
				let self = this
				axios.get('/api/allUsers')
					.then(res => {
						self.allUsers = res.data.users
						let areas = res.data.users.map(item => {
							return {name: item.area, checked: true}
						})
						self.areas = areas
					})
					.catch(err => {
						console.log(err)
					})
			},
			rightToggler(){
				$('.rightToMobile').toggleClass('right0')
				$('.leftToMobile').toggleClass('hidden')
				

			},
			togglerWho(){
				$('#slideIt').slideToggle()
				$('.fa-chevron-up').toggleClass('hide')
				$('.fa-chevron-down').toggleClass('hide')
			},
			sendProblem(){
				let self = this
					// sAlert({
					// 	title: "Error!",
					//   text: "Here's my error message!",
					//   type: "error",
					//   confirmButtonText: "Cool"
					// })
// guardar el usuario (id) y checarlo cuando se vota
//cuando se crea un problema agregarle en el votedBy el usuario que lo creoo y que sirva como contador, ademas para no mostrar/ocultar en la seccion de votar de acorde a esa condicion

				if(is.empty(self.problemObj.name)){
						sAlert({
						title: "Error!",
						  text: "Ingresa un título de problema que quieres  guardar!",
						  type: "error",
						  confirmButtonText: "ok",
						  confirmButtonColor: "#a8843f"

						})

						return false
					}

				if(is.empty(self.problemObj.usersProblem)){
					sAlert({
					title: "Error!",
					  text: "Describe los usuarios que tienen dicho problema!",
					  type: "error",
					  confirmButtonText: "ok",
					  confirmButtonColor: "#a8843f"

					})

					return false
				}
				if(is.empty(self.problemObj.activity)){
					sAlert({
					title: "Error!",
					  text: "Ingresa la actividad deseada!",
					  type: "error",
					  confirmButtonText: "ok",
					  confirmButtonColor: "#a8843f"

					})

					return false
				}

				if(is.empty(self.problemObj.description)){
					sAlert({
					title: "Error!",
					  text: "Por favor, describe el problema!",
					  type: "error",
					  confirmButtonText: "ok",
					  confirmButtonColor: "#a8843f"

					})

					return false
				}
				if(self.problemObj.peopleWithProblem > 10){
					sAlert({
					title: "Error!",
					  text: "La cantidad de usuarios debe ser menor o igual a 10",
					  type: "error",
					  confirmButtonText: "ok",
					  confirmButtonColor: "#a8843f"

					})

					return false
				}

				if(self.problemObj.peopleWithoutProblem > 10){
					sAlert({
					title: "Error!",
					  text: "La cantidad de usuarios debe ser menor o igual a 10",
					  type: "error",
					  confirmButtonText: "ok",
					  confirmButtonColor: "#a8843f"

					})

					return false
				}


				if(!is.number(self.problemObj.peopleWithProblem) || !is.number(self.problemObj.peopleWithoutProblem)){
					sAlert({
					title: "Error!",
					  text: "El campo de la cantidad de usuarios que tienen dicho problema debe de ser un número!",
					  type: "error",
					  confirmButtonText: "ok",
					  confirmButtonColor: "#a8843f"

					})

					return false
				}

			

				if(this.problemObj.name){
				  	let canVote = this.areas.filter(i => {
						return i.checked
					})
					let myCanVote = canVote.map(item => item.name)

					this.problemObj.canVote = myCanVote
					
					if(this.problemObj.canVote.length == 0){
						sAlert({
						  title: "Error!",
						  text: "Elige quién puede votar este problema!",
						  type: "error",
						  confirmButtonText: "ok",
						  confirmButtonColor: "#a8843f"
						})
						return false
					}
					this.problemObj.createdBy = JSON.parse(localStorage.user)
					$('.loader-wrap').toggleClass('hide')
					axios.post('/api/problem', this.problemObj)
						.then((res)=> {
							this.problemObj.name = ''
							this.problemObj.usersProblem =  ''
							this.problemObj.activity =  ''
							this.problemObj.description =  ''
							this.problemObj.peopleWithProblem =  null
							this.todos = false
							this.problemObj.peopleWithoutProblem =  null
							this.areas.forEach( item => item.checked = this.todos)
						  	$('.loader-wrap').toggleClass('hide')
						  	sAlert("Genial!", "Has registrado in nuevo problema", "success")
						})
						.catch( err => console.log(err))
				}
				

			}
		}
	}
</script>

<template>
<transition appear  name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
	<section class="padding-top70 back-white">
		<article class="padding10-20 flex margin-top15 flex-between flex-middle">
			<h3 class="margin0 text-uppercase font20 color-darkblue">Visión desde el problema</h3>
			<button class="my-btn back-gold color-white text-uppercase" style="width: 200px" @click="sendProblem">Guardar</button>
		</article>
		<section class="flex margin0-20">
			<div class="width100 leftToMobile">
				<article class="padding0-20 back-gold color-white">
					<h5 class="margin0 text-uppercase" style="padding:10px 0 5px 0;">Título del problema</h5>
					<div class="flex">
						<input v-model="problemObj.name" type="text" class="my-input back-white" placeholder="Título:">
					</div>
					<br>
				</article>
				<article class="back-white padding20-0">
					<div class="margin-bottom20">
						<h4 class="margin0 font20">¿Quién o quienes tienen el problema?</h4>
						<div class="flex">
							<textarea class="margin-top15 my-input back-grisclaro" name="" id="" cols="30" rows="5" placeholder="Describe al grupo de usuarios" v-model="problemObj.usersProblem"></textarea>
						</div>
					</div>

					<div class="margin-bottom20">
						<h4 class="margin0 font20">¿Qué es lo que 
						<span class="color-gold relative"> 
						<i class="ion-arrow-graph-up-right font20" style="transform: rotate(-12deg); position:absolute; top:-16px; left:12px"></i> 
						ellos</span> intentan hacer/lograr?</h4>
						<div class="flex">
							<textarea class="margin-top15 my-input back-grisclaro" name="" id="" cols="30" rows="5" placeholder="¿Cúal es el objetivo/actividad deseada?" v-model="problemObj.activity"></textarea>
						</div>
					</div>
					<div class="margin-bottom20">
						<h4 class="margin0 font20">Pero/Porque...</h4>
						<div class="flex">
							<textarea class="margin-top15 my-input back-grisclaro" name="" id="" cols="30" rows="5" placeholder="Describe el problema" v-model="problemObj.description"></textarea>
						</div>
					</div>


					<div class="margin-top15">
						<h4 class="margin0 font20">Métrica de validación</h4>
						<div class="flex flex-between margin-top15">
							<p class="color-darkblue margin0 font20" style="max-width: 280px">De 10 usuarios, ¿cuántos crees que tienen el problema?</p>
								<input type="text" class="my-input back-grisclaro" style="max-width: 150px" v-model.number="problemObj.peopleWithProblem">
						</div>
					</div>

					<div class="margin-top15 margin-bottom25">
						<h4 class="margin0 font20">Bright spot hint</h4>
						<div class="flex flex-between margin-top15">
							<p class="color-darkblue margin0 font20" style="max-width: 280px">De 10 usuarios, ¿cuántos crees que NO tienen el problema?</p>
							
							<input type="text" class="my-input back-grisclaro" style="max-width: 150px" v-model.number="problemObj.peopleWithoutProblem">
						</div>
					</div>
					<div class="margin-top20 margin-bottom25 width100">
						<h4 class="margin0">¿Quién 
						puede votar?</h4>
						<div class="margin-top10 pointer flex flex-between back-gold padding10" style="border:2px solid #A8843F; margin-left:2px;" @click="togglerWho">
							<h5 class="text-uppercase margin0" >Todos</h5>
							<span class="fa fa-chevron-down"></span>
							<span class="fa fa-chevron-up hide"></span>
						</div>
						<div class="width100 hide back-grisclaro" style="border-radius:3px; margin-top:2px;border:1px solid #e7e7e7;" id="slideIt">
							<article class="flex flex-middle padding10">
								<div class=" margin-right10" style="position:relative; top:-7px;">
			                        <input type="checkbox" :checked="todos" class="check" id="test1" @change="toggleAllAreas"/>
			                       <label for="test1"></label>
			                    </div>
								<h4 class="font20 margin0">Todos</h4>
							</article>
							<article class="flex flex-middle padding10" v-for="(item, index) in areas">
								<div class=" margin-right10" style="position:relative; top:-7px;">
			                        <input type="checkbox" :checked="item.checked" class="check" :id="item.name" @change="addCanVote(item, index)"/>
			                       <label :for="item.name"></label>
			                    </div>
								<h4 class="font20 margin0">{{item.name}}</h4>
							</article>
						</div>
					</div>
				</article>
			</div>
			<div class="width100 margin-left20 rightToMobile relative">
				<div class="square40 back-gold hide pointer flex flex-center flex-middle" id="rightToggler" @click="rightToggler" style="position:fixed; right:0px; top:46vh;">
					<span class="fa fa-cog color-white font20"></span>
				</div>
				
				<article class="padding0-20" style="background:#d1d1d1">
					<h5 class="margin0 text-uppercase" style="padding:10px 0 5px 0;">Al final se debe leer así:</h5>
					<div class="flex">
						<div class="my-input back-white flex flex-middle" style="min-height:45px;">Ventas que no se concretan</div>
					</div>
					<br>
				</article>

				<article class="padding10-20" style="background:#f2f2f2">	
					<div class="margin-top10 margin-bottom15">
						<div  class="my-input back-white flex flex-middle" style="min-height:45px;">Los asesores de ventas</div>
					</div>
					<div class="margin20-0">
						<h4 class="font20">...intentan...</h4>
					</div>
					

					<div class="margin-top10 margin-bottom15">
						<div  class="my-input back-white flex flex-middle" style="min-height:45px;">vender al cliente un producto deseado.</div>
					</div>
					<div class="margin20-0">
						<h4 class="font20" >...pero/porque...</h4>
					</div>
					

					<div class="margin-top10 margin-bottom15">
						<div  class="my-input back-white" style="height:80px;">no vendemos ya que el cliente no lo encuentra disponible</div>
					</div>

					<div class="margin-top15">
						<h4 class="margin0 font20">Métrica de validación</h4>
						<div class="flex flex-between margin-top15">
							<p class="color-darkblue margin0 font20" style="max-width: 280px">De 10 usuarios, ¿cuántos crees que tienen el problema?</p>
								<div class="my-input back-white flex flex-center flex-middle" style="max-width: 150px">8
								</div>
						</div>
					</div>

					<div class="margin-top15 margin-bottom25">
						<h4 class="margin0 font20">Bright spot hint</h4>
						<div class="flex flex-between margin-top15">
							<p class="color-darkblue margin0 font20" style="max-width: 280px">De 10 usuarios, ¿cuántos crees que NO tienen el problema?</p>
							
							<div class="my-input back-white flex flex-center flex-middle" style="max-width: 150px">2</div>
						</div>
					</div>

					

				</article>
				<article class="padding20 width100" style="min-height:290px;background:#d1d1d1">
						<h4 class="text-uppercase">Otro ejemplo:</h4>
						<p class="padding10-0 font20" style="padding-right:30px;">Hombres con barba de 25 a 55 años <span class="color-gold">intentan</span> alistarse para irse al trabajo rápidamente  <span class="color-gold">pero</span> el tener que rasurarse los atrasa incumpliendo a su trabajo.
						</p>
						<div class="flex flex-middle flex-between width100">
							<p class="padding0 margin0 font20" style="padding-right:30px;">Métrica de validación:</p>
							<p class="padding0 margin0 font20" style="padding-right:30px;">9/10</p>
						</div>


						<div class="flex flex-middle flex-between width100">
							<p class="margin0 padding0 font20" style="padding-right:30px;">Bright Spot Hint:</p>
							<p class="margin0 padding0 font20" style="padding-right:30px;">1/10</p>
						</div>
						<br>
					</article>
					<div class="flex flex-between padding20-0 flex-middle margin-top15">
						<span style="visibility:hidden;">.</span>
						<button class="my-btn back-gold margin-right20 color-white text-uppercase" style="width: 200px;" @click="sendProblem">Guardar</button>
					</div>
			</div>
		</section>
		
		
	</section>
</transition>
</template>