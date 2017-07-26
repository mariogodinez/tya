<script type="text/javascript">
	export default {
		data(){
			return {

			}
		},
		methods: {
			addUser () {
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
			      	<h5 class="margin0 text-uppercase">Crear/Editar Usuario</h5>
			      </div>
		      		
		        <div class="flex flex-center flex-middle square25 rounded color-white pointer" data-dismiss="modal" aria-label="Close" style="position:absolute; top:-30px; right:0px; border:1px solid white;">
		          <span aria-hidden="true" class="fa fa-times color-white"></span>
		        </div>
		      </div>
		      <div class="modal-body padding20">
		        <div class="margin-bottom15">
		        	<input type="text" class="my-input-simple back-grisclaro" name="" placeholder="Nombre completo">
		        </div>
		        <div class="margin-bottom15">
		        	<input type="text" class="my-input-simple back-grisclaro" name="" placeholder="ID">
		        </div>
		        <div class="margin-bottom15">
		        	<input type="text" class="my-input-simple back-grisclaro" name="" placeholder="Área">
		        </div>

		        <div class="margin-bottom15">
		        	<input type="text" class="my-input-simple back-grisclaro" name="" placeholder="Rol">
		        </div>
		        <div class="margin-bottom15">
		        	<input type="text" class="my-input-simple back-grisclaro" name="" placeholder="Crear contraseña">
		        </div>
		        <div class="margin-bottom15">
		        	<input type="text" class="my-input-simple back-grisclaro" name="" placeholder="Confirmar contraseña">
		        </div>
		      </div>
		      <div class="modal-footer border0" style="padding-top:0;">
		        <button class="center-block my-btn back-gold color-white text-uppercase" style="width: 200px" @click="sendProblem">Crear Usuario</button>
		      </div>
		    </div>
		  </div>
		</div>
	</section>
</template>