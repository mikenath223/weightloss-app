<script lang="ts">
	import Chart, { type ChartItem } from 'chart.js/auto';

	let { chartConfig } = $props();

	let chartObject: Chart<'bar', any, string>;

	function chart(node: ChartItem, _data: any) {
		function setupChart() {
			chartObject = new Chart(node, chartConfig);
		}
		setupChart();
		return {
			update() {
				chartObject.destroy();
				setupChart();
			},
			destroy() {
				chartObject.destroy();
			}
		};
	}
</script>

<section class="relative h-full md:h-[40vh]">
	<canvas use:chart={chartConfig.data}></canvas>
</section>
