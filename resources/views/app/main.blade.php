@extends('layouts.layout-app')
@section('content')


<div id="app">
	<nav style="position:absolute; top:20px; right:200px">
		<ul>
			<li>
				<router-link class="margin-right15 color-white" to="/login">Home</router-link>
				<router-link class="margin-right15 color-white" to="/problem">Problem</router-link>
				<router-link class="margin-right15 color-white" to="/results">Resultados y Métricas</router-link>
				<router-link class="margin-right15 color-white" to="/problem-vote">Problem vote</router-link>
			</li>
		
		</ul>
	</nav>
	<router-view class="main-content"></router-view>
</div>
<!-- app -->
@endsection
@section('scripts')
	@parent
	<script type="text/javascript" src="{{ asset('assets/app/js/main.js' ) }}"></script>
@endsection