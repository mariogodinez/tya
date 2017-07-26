<script>
	import HeaderComponent from './HeaderComponent.vue'
	export default {
		components: {
			HeaderComponent
		}
	}
</script>

<template>
	<section>
		<HeaderComponent></HeaderComponent>
		<article class="padding20">
			<h3 class="margin0 text-uppercase font20 color-darkblue">Visión desde el problema</h3>
			<div class="margin-top10">
				<input type="text" class="my-input back-white" placeholder="Problema:">
			</div>
		</article>

		<article class="back-white padding20">
			<div class="margin-bottom20">
				<h4 class="margin0">¿Quién o quienes tienen el problema?</h4>
				<textarea class="margin-top15 my-input back-grisclaro" name="" id="" cols="30" rows="10" placeholder="Describe al grupo de usuarios"></textarea>
			</div>

			<div class="margin-bottom20">
				<h4 class="margin0">¿Qué intentan hacer/lograr?</h4>
				<textarea class="margin-top15 my-input back-grisclaro" name="" id="" cols="30" rows="10" placeholder="Actividad"></textarea>
			</div>
			<div class="margin-bottom20">
				<h4 class="margin0">Pero..</h4>
				<textarea class="margin-top15 my-input back-grisclaro" name="" id="" cols="30" rows="10" placeholder="Describe el problema"></textarea>
			</div>

			<div class="margin-bottom20">
				<h4 class="margin0">Porque..</h4>
				<textarea class="margin-top15 my-input back-grisclaro" name="" id="" cols="30" rows="10" placeholder="Motivo del problema"></textarea>
			</div>
			

			<div class="margin-top15">
				<h4 class="margin0 font20">Métrica de validación</h4>
				<div class="flex flex-between margin-top15">
					<p class="color-darkblue margin0 font20" style="max-width: 280px">¿Cuántas personas crees que tienen el problema?</p>
					<input type="text" class="my-input back-grisclaro" style="max-width: 150px">
				</div>
			</div>

			<div class="margin-top15 margin-bottom25">
				<h4 class="margin0 font20">Bright spot hint</h4>
				<div class="flex flex-between margin-top15">
					<p class="color-darkblue margin0 font20" style="max-width: 280px">¿Cuántas personas crees NO que tienen el problema?</p>
					<input type="text" class="my-input back-grisclaro" style="max-width: 150px">
				</div>
			</div>
			
			<div class="flex flex-center margin-top15 padding20">
				<button class="my-btn-flex back-gold color-white text-uppercase padding20-10 " style="max-width: 280px">
					<h4 class="color-white text-uppercase margin0 font20">Guardar</h4>
				</button>
			</div>
		</article>
		
	</section>
</template>