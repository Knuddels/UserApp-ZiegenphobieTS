import { polyfillRequestAnimationFrame } from './requestAnimationFramePolyfill';

polyfillRequestAnimationFrame();

const LightManager = new class {

	private lightIndex = 0;
	private differentLightCount = 3;
	private lightRotationMillis = 300;

	private rotationInterval: number;

	public startLightRotation() {
		if (!this.rotationInterval) {
			this.rotationInterval = window.setInterval(() => {
				this.rotateLight();
			}, this.lightRotationMillis);
		}
	}

	private rotateLight() {
		Array.from(document.querySelectorAll('.door .light'))
			.forEach((element: HTMLElement) => {
				element.classList.remove('light_rotation_' + (this.lightIndex % 3));
			});

		++this.lightIndex;

		Array.from(document.querySelectorAll('.door .light'))
			.forEach((element: HTMLElement) => {
				element.classList.add('light_rotation_' + (this.lightIndex % 3));
			});
	}

	public stopLightRotation(elem: HTMLElement) {
		window.clearInterval(this.rotationInterval);
		this.rotationInterval = null;

		Array.from(elem.querySelectorAll('.light'))
			.forEach((element: HTMLElement) => {
				element.classList.add('light_selected');
			});
		// $('.light', $elem).addClass('light_selected');
	}

};

document.addEventListener('DOMContentLoaded', () => {

	LightManager.startLightRotation();

	Array.from(document.querySelectorAll('.door'))
		.forEach((element: HTMLElement) => {
			element.addEventListener('click', (event: Event) => {
				LightManager.stopLightRotation(element);

				Client.sendEvent('selectedEntry', element.getAttribute('id'));
			});
		})

});

// Hier kommt das Event vom AppServer an.
Client.addEventListener('openDoor', (event: any) => {

	const data = event.data;

	LightManager.startLightRotation();

	document.querySelector('#result' + data.winningDoor)
		.setAttribute('src', 'i/result_knuddels.gif');
	Array.from(document.querySelectorAll('#door' + data.door + ' .curtain'))
		.forEach((element: HTMLElement) => {
			element.classList.add('open');
		});
	Array.from(document.querySelectorAll('.playtext'))
		.forEach((element: HTMLElement) => {
			element.innerHTML = data.text;
		})
});