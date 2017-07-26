@section('header')
	<div v-show="error" class="error-bar">
		<div class="container">
			<div class="row">
				<div class="col-md-12" >
					<h5 class="text-center" >@{{ msg }}</h5>
				</div>
			</div>
		</div>
	</div>
@show