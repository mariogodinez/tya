<!DOCTYPE html>
<html lang="es">
<head>
	@include('portal.includes.head')
</head>
<body>
	<section id="portal-wrapper">
		@include('portal.includes.header')

		@yield('content')
	</section>
	<!-- JS -->
	<script type="text/javascript">
		 window.Laravel = { csrfToken: '{{ csrf_token() }}' };
	</script>
	@include('portal.includes.scripts')
</body>
</html>