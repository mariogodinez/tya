<script type="text/javascript">
	export default {
		data(){
			return {
				user:{
					name:'',
					email:'',
					area: '',
					rol: '',
					password:''
				},
				repeatPassword:''
			}
		},
		methods: {
			addUser () {
				let self = this
				axios.post('/api/signUp', self.user)
					.then(res => {
						$('#myModal').modal('hide')
						console.log(res)
						self.user = {
							name:'',
							email:'',
							area: '',
							rol: '',
							password:''
						}
						setTimeout(function(){
							sAlert("Genial!", "Se ha creado el usuario corréctamente", "success")

						},500)

						axios.get('/api/allUsers')
						.then(res => {
							self.$parent.$emit('newUser', res.data.users)
						})


					})
			}
		},
		mounted(){
		}
	}
</script>


<template>
	<section>
		<!-- Button trigger modal -->
		<!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
		   <span @click="addUser">Launch demo modal</span>

		</button> -->

		<!-- Modal -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:1000000000000;">
		  <div class="modal-dialog flex flex-middle flex-center" style="height:100%;" role="document">
		    <div class="modal-content padding0-20" style="width:400px;min-height:200px;">
		      <div class="modal-header padding0 border0">
			      <div class="padding20" style="padding-bottom:0;">
			      	<h5 class="margin0 text-uppercase">Crear Usuario</h5>
			      </div>
		      		
		        <div class="flex flex-center flex-middle square25 rounded color-white pointer" data-dismiss="modal" aria-label="Close" style="position:absolute; top:-30px; right:0px; border:1px solid white;">
		          <span aria-hidden="true" class="fa fa-times color-white"></span>
		        </div>
		      </div>
		      <div class="modal-body padding20">
		        <div class="margin-bottom15">
		        	<input type="text" class="my-input-simple back-grisclaro" name="" placeholder="Nombre completo" v-model="user.name">
		        </div>
		        <div class="margin-bottom15">
		        	<input type="text" class="my-input-simple back-grisclaro" name="" placeholder="ID" v-model="user.email">
		        </div>
		        <div class="margin-bottom15">
		        	<input type="text" class="my-input-simple back-grisclaro" name="" placeholder="Área" v-model="user.area">
		        </div>

		        <div class="margin-bottom15">
		        	<input type="text" class="my-input-simple back-grisclaro" name="" placeholder="Rol" v-model="user.rol">
		        </div>
		        <div class="margin-bottom15">
		        	<input type="password" class="my-input-simple back-grisclaro" name="" placeholder="Crear contraseña" v-model="user.password">
		        </div>
		        <div class="margin-bottom15">
		        	<input type="password" class="my-input-simple back-grisclaro" name="" placeholder="Confirmar contraseña" v-model="repeatPassword">
		        </div>
		      </div>
		      <div class="modal-footer border0" style="padding-top:0;">
		        <button class="center-block my-btn back-gold color-white text-uppercase" style="width: 200px" @click="addUser">Crear Usuario</button>
		      </div>
		    </div>
		  </div>
		</div>
	</section>
</template>