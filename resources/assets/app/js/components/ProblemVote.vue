<script>
import HeaderComponent from './HeaderComponent.vue'

	export default {
		components:{
			HeaderComponent
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
</style>

<template>
	<section class="back-white">
	<HeaderComponent></HeaderComponent>
		<article class="padding20 margin-bottom25">
			<h3 class="font-normal color-lightgray font20">Problema:</h3>
			<h3 class="margin0 text-uppercase font20 color-darkblue">
				No se genera documentación:
			</h3>
		</article>
		<article class="padding10">
			<div class="box-question flex flex-center flex-middle">
				<h3 class="margin0 color-darkblue text-center">
					El área de desarrollo que intentan realizar proyectos en tiempos cortos, pero la estructura de el proyecto se crea sobre la marcha, porque se ignoran/sobre simplifican u obvian detalles pertinentes al área de desarrollo.
				</h3>
			</div>
		</article>

		<article class="flex flex-center">
			<div class="square70 box-shadow pointer margin20-40 rounded flex flex-center flex-middle">
				<span class="font35 color-wine">
					<i class="fa fa-times" aria-hidden="true"></i>
				</span>
			</div>

			<div class="square70 box-shadow pointer margin20-40 rounded flex flex-center flex-middle">
				<span class="font35 color-green">
					<i class="fa fa-check" aria-hidden="true"></i>
				</span>
			</div>
		</article>
	</section>
</template>