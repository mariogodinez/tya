<script>
	import HeaderComponent from './components/HeaderComponent.vue'
	import Loader from './components/Loader.vue'

	export default {
	  name: 'app',
	  components: {
	    HeaderComponent,
	    Loader
	  },
	  created(){
	  }
	}
</script>
<template>
<section>
	<Loader></Loader>	
	<div id="app" class="relative">
		<HeaderComponent></HeaderComponent>
		<!-- <nav class="" style="position: absolute; right: 300px; top:30px; z-index:1000000;">
			<ul class="">
				<li class="">
					<router-link style="color:white;" to="/login">login</router-link>

					<router-link style="color:white;" to="/">Problem</router-link>
					<router-link style="color:white;" to="/problem-vote">ProblemVote</router-link>
					<router-link style="color:white;" to="/results">Results</router-link>

					<router-link style="color:white;" to="/users">Users</router-link>

				</li>
			</ul>
		</nav> -->
	     <router-view></router-view>
	  </div>
</section>
 
</template>


