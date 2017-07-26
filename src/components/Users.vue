<script>
	import axios from 'axios'
	import HeaderComponent from './HeaderComponent.vue'
	import sAlert from 'sweetalert'
	import ModalUser from './ModalUser.vue'
	export default {
		name:'Problem',
		data(){
			return {
				
			}
		},
		components: {
			HeaderComponent,
			ModalUser
		},
		methods:{
			addUser(){
				$('#myModal').modal('show')
			}
		},
		created(){

		}
	}
</script>

<template>
<transition appear  name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
	<section class="padding-top70">
		<ModalUser></ModalUser>
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
					<div class="width100">
						<h4 class="margin0 text-uppercase">ID</h4>
					</div>
					<div class="width100">
						<h4 class="margin0 text-uppercase">área</h4>
					</div>
					<div class="width100" style="">
						<h4 class="margin0 text-uppercase">rol</h4>
					</div>
					<div class="flex margin-right20" style="visibility:hidden">
						<span class="color-gold fa fa-times margin-right20"></span>
						<span class="color-gold fa fa-edit margin-left10"></span>
					</div>
				</section>
				<section class="flex flex-between width100 padding10-0 margin-top10" style="border-bottom:1px solid grey;" v-for="i in 8">
					<div class="width100">
						<h4 class="margin0 font20 font-normal">Nombre</h4>
					</div>
					<div class="width100">
						<h4 class="margin0 font20 font-normal">ID</h4>
					</div>
					<div class="width100">
						<h4 class="margin0 font20 font-normal">área</h4>
					</div>
					<div class="width100">
						<h4 class="margin0 font20 font-normal">rol</h4>
					</div>
					<div class="flex margin-right20" style="">
						<span class="color-gold pointer margin-right20 fa fa-times-circle font20"></span>
						<span class="color-gold pointer fa fa-edit font20"></span>
					</div>
				</section>
			</article>
		</section>
		
	</section>
</transition>
</template>