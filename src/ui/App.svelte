<script>
	import TitleBar from './TitleBar.svelte'
	import AddForm from './AddForm.svelte'
	import Display from './Display.svelte'
</script>

<main>
	<TitleBar />
	<div>
		<AddForm />
		<Display />
	</div>
</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;
		height: 100%;
	}

	div{
		position: relative;
	}


</style>