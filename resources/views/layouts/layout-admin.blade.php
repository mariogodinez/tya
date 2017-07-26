<!DOCTYPE html>
<html lang="es">
<head>
	@include('admin.includes.head')
</head>
<body>
	<section id="admin-wrapper">
		<span id="url-location" data-url="<?php echo URL::to('/').'/admin/'; ?>"></span>
		@include('admin.includes.header')

		@yield('content')
	</section>
	<!-- JS -->
	<script type="text/javascript">
		 window.Laravel = { csrfToken: '{{ csrf_token() }}' };
	</script>
	@include('admin.includes.scripts')
</body>
</html>