/*
	Vue
 */
const errors = new Vue({
	el: '.error-bar',
	data: {
		error: false,
		msg: ""
	},
	watch:{
		error(){
	
			if (this.error == true) {
				setTimeout(function(){
					$(".error-bar").slideUp('slow')
					this.error == false;
				},2000);
			}
			 
		}
	} 
});

window.errors = errors;