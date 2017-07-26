<!DOCTYPE html>
<html lang="es">
<head>
	@include('app.includes.head')
</head>
<body>
	<section id="app-wrapper">
		<span id="url-location" data-url="<?php echo URL::to('/').'/app/'; ?>"></span>
		@include('app.includes.header')

		@yield('content')
	</section>
	<!-- JS -->
	<script type="text/javascript">
		 window.Laravel = { csrfToken: '{{ csrf_token() }}' };
	</script>
	@include('app.includes.scripts')
</body>
</html>