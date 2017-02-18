/* GET about page*/

'use strict';

module.exports.about = function(req, res) {
	res.render('generic-text', {
		title: 'Sobre',
		paragraphs: [
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum ipsum nec purus molestie rutrum. Donec suscipit ullamcorper euismod. Morbi volutpat, quam nec hendrerit sagittis, eros nisl vestibulum orci, id gravida libero lectus et lorem. Aliquam sed efficitur nibh. Maecenas blandit, ante ac mattis dignissim, metus sem maximus ipsum, quis malesuada arcu sem ut ex. Sed eu tortor quis mauris convallis blandit in pharetra ante. Nam accumsan urna sed nibh rutrum, a sollicitudin purus hendrerit. Ut sit amet leo vel ex congue porta quis at felis. Fusce venenatis quam sit amet urna tempor mollis. Integer eu dolor hendrerit, imperdiet ipsum id, mattis leo. Quisque pellentesque felis turpis, quis tempus tortor consequat pulvinar. Suspendisse fringilla augue id arcu pretium euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam vitae porta mi, nec tincidunt tortor. Sed malesuada, neque id aliquet lobortis, lorem lectus laoreet diam, ut gravida purus quam tempus dui.',
			'Nam vel lorem turpis. Aenean lorem nisi, dictum sed mattis in, placerat sit amet nisi. Integer et nunc quis magna vehicula finibus. Maecenas aliquam, ex eu mollis blandit, dolor metus porttitor massa, at placerat lorem eros malesuada eros. Integer vulputate lorem erat, a volutpat mauris tincidunt at. Aliquam quis ligula scelerisque, rutrum tellus ut, placerat dui. In sollicitudin urna molestie, viverra purus ut, volutpat sem. Nulla pretium cursus venenatis. Nullam porta rutrum neque a venenatis.',
			'Praesent tempor leo erat, sed bibendum ipsum luctus eu. Donec semper tortor vel laoreet dapibus. In luctus ornare risus non molestie. Sed fermentum arcu vel tortor efficitur, sed consequat libero maximus. Suspendisse potenti. Suspendisse vulputate nisl ipsum, id vestibulum tortor lacinia a. Aliquam erat volutpat. Praesent sit amet sapien sit amet neque bibendum sodales eget non lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis neque purus, placerat sed dolor et, fringilla fringilla velit. Nam et ante rutrum, consequat nisl nec, imperdiet eros. Morbi maximus ligula eget augue faucibus, eget dictum ipsum bibendum.'
		]
	});
}

