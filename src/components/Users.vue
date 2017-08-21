<script>
	import axios from 'axios'
	import HeaderComponent from './HeaderComponent.vue'
	import sAlert from 'sweetalert'
	import ModalUser from './ModalUser.vue'
	import ModalUserEdit from './ModalUserEdit.vue'

	export default {
		name:'Problem',
		data(){
			return {
				allUsers: [],
				areas: []
			}
		},
		components: {
			HeaderComponent,
			ModalUser,
			ModalUserEdit
		},
		methods:{
			getAllUsers(){
				let self = this
				axios.get('/api/allUsers')
					.then(res => {
						self.allUsers = res.data.users
						let areas = res.data.users.map(item => item.area)
						self.areas = areas
					})
					.catch(err => {
						console.log(err)
					})
			},
			deleteUser (user) {
				let self = this
				
				sAlert({
				  title: "",
				  text: `Estás seguro que deseas eliminar a ${user.email} ?`,
				  type: "info",
				  showCancelButton: true,
				  closeOnConfirm: false,
				  showLoaderOnConfirm: true,
				},
				function(){
					
				  setTimeout(function(){
					axios.post('/api/deleteUser', {id: user._id})
				  		.then(res=>{
				  			swal("¡Se ha eliminado!");
				  			self.getAllUsers()

				  		})
				  		.catch(err => {
				  		})
					  }, 1000);
				});
			},
			addUser(){
				$('#myModal').modal('show')
			},
			newUser(){
				let self = this
				this.$on('newUser', function(data){
					self.allUsers = data
				})
			},
			addEmail (email) {
				this.email = email 
				
			},
			getUser (email) {
				let self = this

				axios.post('/api/getUser', {email: email})
					.then(res => {
						self.userToEdit = res.data.user
						console.log(res.data.user)
						self.$emit('userToEdit', res.data.user)
					
						$('#editUser').modal('show')
						// self.userToEdit = res.data.user
					})
			}
		},
		mounted(){
			let self = this
			this.$on('newUser', function(data){
				if(data){
					this.getAllUsers()
				}
				
			})
		},
		beforeCreate () {
            if (!this.$store.state.logged) {
                this.$router.replace('/login')
            }
        },
		created(){
			
			this.getAllUsers()
			
		}
	}
</script>

<template>
<transition appear  name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
	<section class="padding-top70">
		<ModalUser></ModalUser>
		<ModalUserEdit></ModalUserEdit>

		<section class="margin20-40">
			<article class="padding0 margin-top20 flex flex-between flex-middle">
				<h3 class="margin0 text-uppercase font20 color-darkblue">Usuarios</h3>
				<button class="my-btn back-gold color-white text-uppercase" style="width: 200px" @click="addUser">Agregar usuario</button>
			</article>

			<article class="padding0 margin-top20 width100">

				<section class="flex flex-between width100">
					<div class="width100">
						<h4 class="margin0 text-uppercase">Nombre</h4>
					</div>
					<div class="" style="width:120%;">
						<h4 class="margin0 text-uppercase">ID</h4>
					</div>
					<div class="" style="width:80%;">
						<h4 class="margin0 text-uppercase">área</h4>
					</div>
					<div class="" style="width:50%;">
						<h4 class="margin0 text-uppercase">rol</h4>
					</div>
					<div class="flex margin-right20" style="visibility:hidden">
						<span class="color-gold fa fa-times margin-right20"></span>
						<span class="color-gold fa fa-edit margin-left10"></span>
					</div>
				</section>
				<section class="flex flex-between width100 padding20-0" style="border-bottom:1px solid grey;" v-for="user in allUsers">
					<div class="width100">
						<h4 class="margin0 font20 font-normal">{{user.fullName}}</h4>
					</div>
					<div class="" style="width:120%;">
						<h4 class="margin0 font20 font-normal">{{user.email}}</h4>
					</div>
					<div class="" style="width:80%;">
						<h4 class="margin0 font20 font-normal">{{user.area}}</h4>
					</div>
					<div class="" style="width:50%;">
						<h4 class="margin0 font20 font-normal">{{user.rol}}</h4>
					</div>

					<div class="flex margin-right20" style="">
						<span class="color-gold pointer margin-right20 fa fa-times-circle font20" @click="deleteUser(user)"></span>
						<span class="color-gold pointer fa fa-edit font20" @click="getUser(user.email)"></span>
					</div>
				</section>
			</article>
		</section>
		
	</section>
</transition>
</template>